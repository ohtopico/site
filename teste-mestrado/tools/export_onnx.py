"""Exporta a MobileNet de cena treinada em mobilenet_cenas (best.pt) para o site.

Gera cena.onnx (entrada float32 [1, 3, 224, 224], RGB normalizado ImageNet) e
cena_labels.txt; copie os dois para modelos/. Sem eles o site funciona, só não fala o ambiente.

  python tools/export_onnx.py --repo <pasta mobilenet_cenas> --run_dir <results/.../seed0> --out modelos
"""
import argparse
import json
import sys
from pathlib import Path

import torch


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--repo", required=True, help="pasta mobilenet_cenas (para importar src.models)")
    ap.add_argument("--run_dir", required=True, help="pasta com config.json, metrics.json e best.pt")
    ap.add_argument("--out", default="modelos")
    args = ap.parse_args()

    sys.path.insert(0, str(Path(args.repo).resolve()))
    from src.models import build_model

    run = Path(args.run_dir)
    cfg = json.loads((run / "config.json").read_text())
    classes = json.loads((run / "metrics.json").read_text())["classes"]
    if cfg.get("fusion", "none") != "none":
        sys.exit("Só modelos RGB funcionam no navegador (fusion: none).")

    model = build_model(cfg["model"], len(classes), "none", pretrained=False)
    model.load_state_dict(torch.load(run / "best.pt", map_location="cpu"))
    model.eval()

    size = cfg.get("img_size", 224)
    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    torch.onnx.export(model, torch.randn(1, 3, size, size), out / "cena.onnx",
                      input_names=["imagem"], output_names=["logits"], opset_version=17, dynamo=False)
    (out / "cena_labels.txt").write_text("\n".join(classes) + "\n", encoding="utf-8")
    print(f"ok: {out / 'cena.onnx'} ({len(classes)} classes)")


if __name__ == "__main__":
    main()
