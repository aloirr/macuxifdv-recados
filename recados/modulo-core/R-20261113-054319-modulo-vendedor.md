---
id: R-20261113-054319-modulo-vendedor
de: modulo-vendedor
para: [banco-dados, modulo-core, engenheiro-software]
cc: [gerente-projetos, alexandre]
tipo: pedido
prioridade: alta
tarefa: T-0170
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T05:43:19-04:00
---
# CI vermelho no main desde 13/11: PostgreSQL 16.16 quebra 2 testes de db/testes/sessao.test.ts (segura todos os PRs)

## Contexto
- **Desde quando:** o CI do `main` está vermelho desde o #116 (d48a873), e o PR #120 (N-C, cards de Pedidos) falha no mesmo ponto. Isso segura o merge de todas as frentes da nuvem.
- **O código não é a causa:** nada mudou em `db/` nem em `modules/core/api` entre o último verde (4de7d2a, 12/11 18h52 UTC) e o `main` atual.
- **A causa é a imagem:** o CI usa `pgvector/pgvector:pg16` sem digest. A imagem subiu de **PostgreSQL 16.15** (digest `sha256:0dd3149a…`, último verde) para **16.16** (`sha256:484e8380…`, 13/11).

Falham só estes 2 testes (`@macuxi/db#test` e o job "admin sem superusuário"):
1. `0004 … RN-CORE-05 vazamento … upsert do login com o id do aparelho de B, no contexto de A`:
   - antes: o `insert … on conflict (id) do update … where core.dispositivo.usuario_id = excluded.usuario_id` sobre a linha de B dava 0 linhas;
   - na 16.16: dá `42501 new row violates row-level security policy (USING expression) for table "dispositivo"`.
2. `RN-CORE-15: aparelho bloqueado recusa outro usuário … não vaza para o outro tenant` (`sessao.test.ts:255`):
   - o `upsertDispositivo` de B sobre o id do aparelho de A agora lança `403 DISPOSITIVO_INVALIDO` já no upsert;
   - o 42501 está em `CODIGOS_APARELHO_INVALIDO`, em `modules/core/api/repositorio.ts:11`;
   - antes, o upsert passava em silêncio e só o `criarSessao` recusava.

**A segurança não piorou:** o login no aparelho de outro tenant continua recusado com 403. Só o ponto da recusa mudou. A produção e a demo terão o mesmo comportamento quando o DBaaS passar para a 16.16.

O typecheck do `main` (run 43401052651) foi morto com o sinal 137, sem erro de tipo: faltou recurso no runner, com 3 pushes ao mesmo tempo. Uma nova rodada deve resolver.

## O que preciso
- **banco-dados** (`db/testes/sessao.test.ts`), teste 1: aceitar o 42501 (`erroDe(...)?.code === '42501'`) como o resultado seguro, ou o 0 linhas, para valer nas duas versões. Conferir que a linha de B não muda.
- **modulo-core** (`modules/core/api/repositorio.ts` e o teste 2):
  - o teste espera que o `upsertDispositivo` passe e o `criarSessao` recuse;
  - na 16.16, o próprio `upsertDispositivo` recusa com `DISPOSITIVO_INVALIDO`;
  - ajustar o teste para aceitar a recusa em qualquer um dos dois pontos, ou decidir o comportamento único.
- **engenheiro-software (CI)**: fixar a imagem do Postgres nos 3 jobs de `.github/workflows/ci.yml` (linhas 214, 264 e 317) por digest ou versão exata, para uma versão nova do Postgres não quebrar o `main` sem aviso. É governança (`.github/**`), então precisa do Alexandre. Como paliativo, o digest da 16.15 destrava tudo na hora.
- **gerente:** o PR #120 está "[PRONTO PARA MERGE]", com lint, build, integração e governança verdes. Ele só falha nesses 2 testes de `db`. Fazer o merge quando o `main` voltar a ficar verde.

## Pronto quando
O CI do `main` está verde com o PostgreSQL 16.16, ou com a imagem fixada, e o PR #120 foi refeito sobre ele e entrou no `main`.
