---
id: R-20261106-014640-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0085
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T01:46:40-04:00
---
# Revisão do lote (T-0084/T-0085 + portal da Integração): sem 🔴 no T-0084/T-0085; 🔴 de fronteira no Core (portal); lock assumido; o que pode subir

## Contexto
Revisão de código do próximo lote do main (base origin/main 6cbcd87): T-0084/T-0085 (Catálogo, Promotor, Vendedor, 0034, seeds/fixtures, pnpm-lock.yaml), as rotas do portal da Integração (T-0087 P, contra `docs/desenho/T-0087.md` §5.2) e o registro do `promotor.concorrentes@1`.

## O que fiz
Vereditos (nenhum 🔴 no lote T-0084/T-0085):
- **Catálogo**: sem 🔴, 2 🟡 e 4 🟢 (R-20261106-013208). A fronteira está ok: o Catálogo importa só `@macuxi/promotor/contracts`. A exportação foi aprovada como página única v1 (R-20261106-013302).
  - 🟡 1: gravar e ler o retrato `marca_nome` no PUT, no consumidor do ERP, no pull e no enriquecer (risco 2 da ADR 0027; "próximo lote" pela ADR).
  - 🟡 2: caso de banco no CI para o consumidor de referências do ERP.
- **Promotor**: `promotor.concorrentes@1` aprovado, com 3 🟢 (R-20261106-013329). A linha 47 de `.coord/contratos/modulos.md` agora está como "publicada".
- **banco-dados**: a 0034 foi aprovada (nula, sem backfill, sem índice, aparelho na v3), com 1 🟡 (R-20261106-013433). A árvore `db/` mistura a 0034 e a 0035 nos mesmos arquivos (`estatico.test.ts:139-140` já exige a 0035, mais `excecoes.ts`, `esquema/plataforma.ts`, `conferir-rls.sql`, `src/teste/index.ts`, `conformidade.test.ts` e `provisionar-tenant.test.ts`). Por isso a 0034 não sobe sozinha. Além disso, `modules/catalogo/db/nuvem.ts` (marca_nome) precisa da 0034, e o Catálogo precisa ir junto.
- **Vendedor**: sem 🔴 nem 🟡, 3 🟢 (R-20261106-014324).
- **Integração** (portal): sem 🔴, 1 🟡 e 3 🟢 (R-20261106-013549). O 🟡: `aplicar-lote.ts:441` e `:460` ainda usam `PARAMETROS_PADRAO.limiteInativacaoPct` em vez do parâmetro do tenant. Não é regressão.
- **Core (T-0087)**: 🔴 R-20261106-014054. `modules/core/domain/super-admin.ts:9` importa `node:crypto`, e `pnpm fronteiras` fica vermelho (`domain-usa-modulo-do-node`). Isso bloqueia o lote do portal, não o T-0084/T-0085.
- **pnpm-lock.yaml**: ok, assumo (R-20261106-014510). São 3 linhas, só o link workspace do `@macuxi/promotor` no Catálogo, sem upgrade. Trailer `Agente: engenheiro-software`.
- **SDK** (o seu R-20261106-000853 e o pedido do Catálogo): leitura de `depende` no aparelho, mais `versaoLinhas`/`linhasPorCampo`, na rodada seguinte ao lote do portal, até 16h (R-20261106-014532).

## O que pode subir já
1. **Lote T-0084/T-0085**:
   - `modules/catalogo`, `modules/promotor`, `modules/vendedor`, `pnpm-lock.yaml` e `.coord/contratos/modulos.md`;
   - junto com `db/` (0034 e seeds), que hoje arrasta a 0035. Por isso passa ANTES pela branch de verificação (stack-isolado verde, inclusive `referencia-marca-nome`, `seed-demo`, `aplicacao-referencia`, `provisionar-tenant` e `super-admin`): o push no main migra a demo, e a 0035 recria `plataforma.provisionar_tenant`.
   - Alternativa: o banco-dados separa a 0035 (cabe a ele dizer qual caminho, recado R-20261106-013433).
2. **O meu T-0087** (SDK, `apps/api/src/plataforma.ts`, `preparar-vm.sh`, `producao-publicar.yml`) **pode subir antes da 0035 sem quebrar a demo**:
   - sem `MACUXI_JWT_SEGREDO_PLATAFORMA`, o `autenticarSuperAdmin` do Core devolve null sem ir ao banco (`modules/core/api/super-admin.ts:314-315`); sem o serviço do Core, a API usa `async () => null`;
   - token de tenant não passa na verificação do token de plataforma, então os usuários normais nas rotas `aceita` seguem o fluxo de sempre;
   - `/v1/plataforma/*` responde 401 e a auditoria só roda para super-admin;
   - `producao-publicar.yml` só roda por tag `v*`;
   - nenhum segredo novo é exigido no boot.

   Condição: subir no mesmo commit, ou depois, das rotas da Integração com `superAdmin`, que dependem do `RotaModulo.superAdmin` do SDK. Observação: o `apps/api/src/app.ts` está sendo alterado em paralelo (`cabecalhosPublicos` para o R-20261106-010602 do Core). Confira lint, typecheck e test da raiz no fim.
3. **Não sobe ainda**: o lote do portal, até sair o 🔴 do Core (fronteiras) e com a 0035 verde no CI.

## Testes
- Vitest: Catálogo 43 arquivos / 612 testes verdes; Promotor 32/364; Integração 43/548; Vendedor 70/796. Os arquivos de banco foram pulados e ficam para o CI.
- `node scripts/fronteiras.mjs`: 1 erro (Core, T-0087) e 3 avisos de ciclo, já existentes.
- `node scripts/coord.mjs verificar engenheiro-software`: sem violações.

## Pendências
- Os 🟡 aos donos.
- SDK até 16h.
- ajv, ajv-formats e tsx no lock depois do merge do #99.
