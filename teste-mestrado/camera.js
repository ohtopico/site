// Abre a câmera traseira, preferindo a ultra-angular (0,5x) quando o celular deixa escolher:
// ela mostra mais do ambiente, então objetos dos lados saem menos do enquadramento.

const RESOLUCAO = { width: { ideal: 640 }, height: { ideal: 480 } };
// Nomes que os navegadores dão à ultra-angular (iPhone: "Back Ultra Wide Camera")
const ULTRA = /ultra|grande.?angular|0[.,]5/i;

/** Devolve { stream, grandeAngular }. */
export async function abrirCamera() {
  let stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: "environment", ...RESOLUCAO }, audio: false,
  });
  try {
    // Os nomes das câmeras só aparecem depois da permissão, por isso a lista vem agora
    const atual = stream.getVideoTracks()[0].getSettings().deviceId;
    const ultra = (await navigator.mediaDevices.enumerateDevices())
      .find(d => d.kind === "videoinput" && ULTRA.test(d.label) && !/front|frontal/i.test(d.label));
    if (ultra && ultra.deviceId !== atual) {
      const outra = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: ultra.deviceId }, ...RESOLUCAO }, audio: false,
      });
      stream.getTracks().forEach(t => t.stop());
      return { stream: outra, grandeAngular: true };
    }
    if (ultra) return { stream, grandeAngular: true };
    // Alguns Android expõem a ultra-angular como zoom abaixo de 1x na mesma câmera
    const trilha = stream.getVideoTracks()[0];
    const zoom = trilha.getCapabilities?.().zoom;
    if (zoom && zoom.min < 1) {
      await trilha.applyConstraints({ advanced: [{ zoom: zoom.min }] });
      return { stream, grandeAngular: true };
    }
  } catch {
    // Sem como escolher: segue com a câmera padrão
  }
  return { stream, grandeAngular: false };
}
