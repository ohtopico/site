-- Mundo da turma (apoiadores do Catarse): banco de dados no Supabase.
-- Como usar: no painel do Supabase, abra "SQL Editor", cole este arquivo inteiro e clique em "Run".
-- Pode rodar de novo sem perder dados (tudo usa "if not exists" / "or replace").
--
-- Dados guardados (LGPD, o mínimo): da professora, e-mail e nome; do aluno, só apelido,
-- a senha (embaralhada, nunca legível) e o progresso do jogo. Nada de sobrenome, e-mail ou foto de aluno.

create extension if not exists pgcrypto with schema extensions;

-- Professora: criada sozinha no primeiro login. Só usa turmas depois que a Júlia marcar aprovado = true
-- (Table Editor > professores), conferindo a lista de apoiadores do Catarse.
create table if not exists public.professores (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  nome text not null default '',
  aprovado boolean not null default false,
  criado timestamptz not null default now()
);

create table if not exists public.turmas (
  id uuid primary key default gen_random_uuid(),
  professor_id uuid not null references public.professores(id) on delete cascade,
  nome text not null check (char_length(nome) between 1 and 60),
  codigo text not null unique,
  criado timestamptz not null default now()
);
-- mapas que a professora liberou para a turma (ids das vilas do Mundo, ex.: redes, ia, arte, enem).
-- Vazio: as vilas abrem na ordem, como no Mundo sem login.
alter table public.turmas add column if not exists mapas text[] not null default '{}';

create table if not exists public.alunos (
  id uuid primary key default gen_random_uuid(),
  turma_id uuid not null references public.turmas(id) on delete cascade,
  apelido text not null check (char_length(apelido) between 1 and 30),
  senha_hash text not null,
  progresso text not null default '',
  pontos integer not null default 0,
  acertos integer not null default 0,
  falhas integer not null default 0,
  bloqueado_ate timestamptz,
  atualizado timestamptz,
  criado timestamptz not null default now(),
  unique (turma_id, apelido)
);

-- aula ao vivo (adicionado depois: "add column if not exists" deixa rodar de novo em banco que já existe)
alter table public.alunos add column if not exists online_em timestamptz;
alter table public.alunos add column if not exists fazendo text not null default '';

create table if not exists public.sessoes_aluno (
  token uuid primary key default gen_random_uuid(),
  aluno_id uuid not null references public.alunos(id) on delete cascade,
  expira timestamptz not null default now() + interval '12 hours'
);

alter table public.professores enable row level security;
alter table public.turmas enable row level security;
alter table public.alunos enable row level security;
alter table public.sessoes_aluno enable row level security;

-- professora aprovada?
create or replace function public.eu_aprovada() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select aprovado from professores where id = auth.uid()), false);
$$;

drop policy if exists "ve o proprio cadastro" on public.professores;
create policy "ve o proprio cadastro" on public.professores for select using (id = auth.uid());

drop policy if exists "turmas da professora" on public.turmas;
create policy "turmas da professora" on public.turmas for select using (professor_id = auth.uid() and public.eu_aprovada());
drop policy if exists "apaga turma" on public.turmas;
create policy "apaga turma" on public.turmas for delete using (professor_id = auth.uid() and public.eu_aprovada());

-- a professora vê os alunos das turmas dela, mas nunca a senha (a coluna não é liberada abaixo)
drop policy if exists "alunos da professora" on public.alunos;
create policy "alunos da professora" on public.alunos for select
  using (public.eu_aprovada() and exists (select 1 from turmas t where t.id = turma_id and t.professor_id = auth.uid()));
drop policy if exists "apaga aluno" on public.alunos;
create policy "apaga aluno" on public.alunos for delete
  using (public.eu_aprovada() and exists (select 1 from turmas t where t.id = turma_id and t.professor_id = auth.uid()));

revoke all on public.professores, public.turmas, public.alunos, public.sessoes_aluno from anon, authenticated;
grant select on public.professores to authenticated;
grant select, delete on public.turmas to authenticated;
grant select (id, turma_id, apelido, pontos, acertos, atualizado, criado, online_em, fazendo), delete on public.alunos to authenticated;

-- ---------- funções da professora ----------
create or replace function public.prof_entrar(p_nome text default '') returns public.professores
language plpgsql security definer set search_path = public as $$
declare r professores;
begin
  if auth.uid() is null then raise exception 'sem login'; end if;
  insert into professores (id, email, nome)
    values (auth.uid(), coalesce((select email from auth.users where id = auth.uid()), ''), left(coalesce(p_nome, ''), 80))
    on conflict (id) do update set nome = case when excluded.nome <> '' then excluded.nome else professores.nome end;
  select * into r from professores where id = auth.uid();
  return r;
end $$;

create or replace function public._codigo(n int) returns text
language sql volatile as $$
  -- sem 0/O, 1/I/L para não confundir na hora de digitar
  select string_agg(substr('ABCDEFGHJKMNPQRSTUVWXYZ23456789', 1 + floor(random() * 31)::int, 1), '')
  from generate_series(1, n);
$$;

create or replace function public.prof_criar_turma(p_nome text) returns public.turmas
language plpgsql security definer set search_path = public as $$
declare r turmas; c text;
begin
  if not eu_aprovada() then raise exception 'professora nao aprovada'; end if;
  if (select count(*) from turmas where professor_id = auth.uid()) >= 40 then raise exception 'limite de turmas'; end if;
  loop
    c := _codigo(6);
    exit when not exists (select 1 from turmas where codigo = c);
  end loop;
  insert into turmas (professor_id, nome, codigo) values (auth.uid(), left(trim(p_nome), 60), c) returning * into r;
  return r;
end $$;

-- cria o aluno (ou troca a senha, se o apelido já existe na turma) e devolve a senha nova, uma única vez
create or replace function public.prof_aluno_senha(p_turma uuid, p_apelido text) returns text
language plpgsql security definer set search_path = public, extensions as $$
declare s text; a text := left(trim(p_apelido), 30);
begin
  if not eu_aprovada() then raise exception 'professora nao aprovada'; end if;
  if not exists (select 1 from turmas where id = p_turma and professor_id = auth.uid()) then raise exception 'turma'; end if;
  if a = '' then raise exception 'apelido'; end if;
  if not exists (select 1 from alunos where turma_id = p_turma and lower(apelido) = lower(a))
     and (select count(*) from alunos where turma_id = p_turma) >= 60 then raise exception 'limite de alunos'; end if;
  s := lower(_codigo(5));
  insert into alunos (turma_id, apelido, senha_hash) values (p_turma, a, crypt(s, gen_salt('bf')))
    on conflict (turma_id, apelido) do update set senha_hash = excluded.senha_hash, falhas = 0, bloqueado_ate = null;
  delete from sessoes_aluno where aluno_id in (select id from alunos where turma_id = p_turma and apelido = a);
  return s;
end $$;

-- a professora escolhe quais mapas do Mundo ficam abertos para a turma (só ids simples, no máximo 30)
create or replace function public.prof_turma_mapas(p_turma uuid, p_mapas text[]) returns text[]
language plpgsql security definer set search_path = public as $$
declare m text[];
begin
  if not eu_aprovada() then raise exception 'professora nao aprovada'; end if;
  select coalesce(array_agg(distinct x order by x), '{}') into m from unnest(coalesce(p_mapas, '{}')) as x where x ~ '^[a-z]{2,20}$';
  if coalesce(array_length(m, 1), 0) > 30 then raise exception 'mapas'; end if;
  update turmas set mapas = m where id = p_turma and professor_id = auth.uid();
  if not found then raise exception 'turma'; end if;
  return m;
end $$;

-- ---------- funções do aluno (sem conta de e-mail: código da turma + apelido + senha) ----------
create or replace function public.aluno_entrar(p_codigo text, p_apelido text, p_senha text) returns json
language plpgsql security definer set search_path = public, extensions as $$
declare al alunos; tu turmas; tk uuid;
begin
  select * into tu from turmas where codigo = upper(trim(p_codigo));
  if not found or not exists (select 1 from professores where id = tu.professor_id and aprovado) then
    return json_build_object('erro', 'turma');
  end if;
  select * into al from alunos where turma_id = tu.id and lower(apelido) = lower(trim(p_apelido));
  if not found then return json_build_object('erro', 'senha'); end if;
  if al.bloqueado_ate is not null and al.bloqueado_ate > now() then return json_build_object('erro', 'bloqueado'); end if;
  if al.senha_hash <> crypt(lower(trim(p_senha)), al.senha_hash) then
    update alunos set
      bloqueado_ate = case when falhas + 1 >= 8 then now() + interval '10 minutes' else null end,
      -- depois do bloqueio, recomeça a contagem
      falhas = case when falhas + 1 >= 8 then 0 else falhas + 1 end
      where id = al.id;
    return json_build_object('erro', 'senha');
  end if;
  update alunos set falhas = 0, bloqueado_ate = null where id = al.id;
  delete from sessoes_aluno where expira < now();
  insert into sessoes_aluno (aluno_id) values (al.id) returning token into tk;
  return json_build_object('token', tk, 'apelido', al.apelido, 'turma', tu.nome, 'progresso', al.progresso, 'mapas', tu.mapas);
end $$;

create or replace function public.aluno_salvar(p_token uuid, p_progresso text, p_pontos int, p_acertos int) returns boolean
language plpgsql security definer set search_path = public as $$
declare aid uuid;
begin
  select aluno_id into aid from sessoes_aluno where token = p_token and expira > now();
  if aid is null then return false; end if;
  if char_length(p_progresso) > 400000 then raise exception 'grande demais'; end if;
  update alunos set progresso = p_progresso, pontos = greatest(0, coalesce(p_pontos, 0)),
    acertos = greatest(0, coalesce(p_acertos, 0)), atualizado = now() where id = aid;
  update sessoes_aluno set expira = now() + interval '12 hours' where token = p_token;
  return true;
end $$;

-- sinal de vida leve (a cada 20 s com a aba aberta): onde o aluno está e os pontos, sem mandar o salvamento inteiro.
-- p_ativo = false quando a aba vai para segundo plano: o painel da aula mostra o aluno como fora do jogo.
create or replace function public.aluno_ping(p_token uuid, p_fazendo text, p_pontos int, p_acertos int, p_ativo boolean default true) returns boolean
language plpgsql security definer set search_path = public as $$
declare aid uuid;
begin
  select aluno_id into aid from sessoes_aluno where token = p_token and expira > now();
  if aid is null then return false; end if;
  update alunos set
    online_em = case when p_ativo then now() else null end,
    fazendo = left(coalesce(p_fazendo, ''), 120),
    pontos = greatest(pontos, coalesce(p_pontos, 0)),
    acertos = greatest(acertos, coalesce(p_acertos, 0))
    where id = aid;
  return true;
end $$;

-- mapas liberados pela professora (o Mundo do aluno confere de tempos em tempos; null = sessão vencida)
create or replace function public.aluno_mapas(p_token uuid) returns text[]
language sql stable security definer set search_path = public as $$
  select t.mapas from sessoes_aluno s join alunos a on a.id = s.aluno_id join turmas t on t.id = a.turma_id
  where s.token = p_token and s.expira > now();
$$;

create or replace function public.aluno_sair(p_token uuid) returns void
language sql security definer set search_path = public as $$
  update alunos set online_em = null, fazendo = '' where id = (select aluno_id from sessoes_aluno where token = p_token);
  delete from sessoes_aluno where token = p_token;
$$;

revoke all on function public.eu_aprovada(), public._codigo(int), public.prof_entrar(text), public.prof_criar_turma(text),
  public.prof_aluno_senha(uuid, text), public.aluno_entrar(text, text, text), public.aluno_salvar(uuid, text, int, int),
  public.aluno_sair(uuid), public.aluno_ping(uuid, text, int, int, boolean),
  public.prof_turma_mapas(uuid, text[]), public.aluno_mapas(uuid) from public, anon, authenticated;
grant execute on function public.eu_aprovada(), public.prof_entrar(text), public.prof_criar_turma(text),
  public.prof_aluno_senha(uuid, text), public.prof_turma_mapas(uuid, text[]) to authenticated;
grant execute on function public.aluno_entrar(text, text, text), public.aluno_salvar(uuid, text, int, int),
  public.aluno_sair(uuid), public.aluno_ping(uuid, text, int, int, boolean), public.aluno_mapas(uuid) to anon, authenticated;
