---
id: R-20261111-102017-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0160
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T10:20:17-04:00
---
# T-0160 itens 1 a 7 no branch agente/t0160-actions (73ea3427, sem PR nem merge): −40% no ritmo de hoje, −56% com 1 ensaio por lote; rito de governança

## Contexto
T-0160, itens 1 a 7, preparados no branch `agente/t0160-actions`, criado a partir do `origin/main` 4d121d89, sem PR e sem merge. São 2 commits com o trailer `Agente: engenheiro-software`:
- 9db5d5ec: a mudança;
- 73ea3427: a estimativa da ADR corrigida com os números reais.

O push do branch não dispara workflow: o CI roda só em PR e no main, e o stack isolado e o dbaas só em `verificacao/**`. O build de hoje não é afetado. A pasta `.github/**` é de governança: o merge passa pelo rito, com o "aprovo" do dono do produto e o `Agente: alexandre`.

## O que mudou (item → arquivo)
1. **Só os pacotes afetados** em PR, ensaio e push:
   - entram os alterados, os dependentes declarados em cadeia e os que leem a pasta alterada pelos inputs do `turbo.json`, por tarefa. O tests/ da raiz roda inteiro sempre que há código;
   - todos os pacotes no noturno, na sexta em Manaus (véspera da produção) e no manual com `completo`. Lockfile, `package.json`, `turbo.json`, `.github` e `scripts` também rodam todos;
   - arquivos: `scripts/ci/escopo.mjs` e `.github/workflows/ci.yml`.
2. **O push ao main reaproveita a árvore verde:**
   - o `ci-ok` verde grava o artefato `ci-verde-<matriz>-<tree>`;
   - o push da mesma árvore roda só a governança (donos por commit e trailer);
   - o `escopo.mjs` confere o run verde do `ci.yml` e a árvore do commit do run. Assim, um branch com outro `ci.yml` não forja o artefato.
3. **Só documentação não testa nem publica.** Documentação é `.coord/**`, `docs/**` e `*.md` da raiz, menos `docs/modulos/`, que o teste da Integração lê. A guarda R4 de `scripts/ci/grafo-turbo.mjs` passa a cobrir isso.
4. **5 jobs em vez de 12:**
   - `governanca`;
   - `estatico`: lint, fronteiras, timers, typecheck e build só se web ou mobile foram afetados;
   - `testes-pacotes`: com o db sem superusuário num 2º Postgres, na porta 5433, só se o db foi afetado;
   - `testes-integracao`: o tests/ numa execução;
   - `ci-ok`: exige success nos jobs do escopo e skipped nos outros.
   O cache do pnpm já existia. O turbo usa cache no PR. O `cache-turbo-extra` sem uso saiu de `.github/actions/preparar`.
5. **PR em rascunho não roda** (`ready_for_review` roda). `cancel-in-progress` vale em todo evento: a base do push é o último push verde do main, então o push cancelado não deixa commit sem verificação.
6. **demo-publicar:** novo job `mudou` com `scripts/ci/demo-mudou.mjs`.
   - Compara com o commit do último deploy verde na VM. Publica só com mudança em `apps/**`, `modules/**`, `packages/**` ou `db/**`, mais o que monta a imagem e `scripts/deploy/demo/**`.
   - O manual sempre publica.
7. **Noturno só em dias úteis** (`0 7 * * 1-5`). A carga de 20 mil continua semanal, sem mudança.
- ADR: `docs/decisoes/0044-ci-por-pacotes-afetados-e-reaproveitamento.md`, com a linha no README.

## Testes
- `node --test scripts/ci/*.test.mjs`: 39 de 39 verdes. Inclui o `escopo.test.mjs` novo (documentação, afetados, sexta, reaproveitado, CLI em git real), a R4 nova e o `demo-mudou.test.mjs`.
- `node scripts/ci/grafo-turbo.mjs` passa no repositório real.
- YAML dos 3 arquivos parseado.
- `turbo run ... --filter=//` conferido em dry-run: o tests/ da raiz entra com o filtro.
- A prova final é o 1º CI do PR do rito: o próprio PR roda o `ci.yml` novo, com todos os pacotes, porque mexe em `.github`.

## Estimativa (minutos por semana, números de 04 a 11/11: 244 runs do CI, 85 de 333 commits do main só de documentação)
- **Antes:** ~10.300 min (CI ~9.400: 104 ensaios × ~47, 70 pushes × ~43, 63 PRs × ~30, 7 noturnos × ~47; mais demo ~600 e stack ~300).
- **Depois, no ritmo de hoje (104 ensaios):** ~6.100 min (**−40%**). Cada run com código cai para ~28 min (~37 com todos os pacotes). O push de ensaio verde e o commit só de documentação ficam em ~2. A demo cai para ~410 min.
- **Depois, com 1 ensaio verde por lote (~50 por semana):** ~4.500 min (**−56%**).
- O item 8 (Telegram e resumo de hora em hora no repositório de recados) soma à parte. O que ainda pesa é a suíte de integração (~12 min em todo run com código) e o número de ensaios. Os ~70% da proposta só saem com menos ensaios mais o item 8.

## Pendências e premissas
- **Premissa 1:** "véspera da produção" = toda sexta-feira em Manaus, com todos os pacotes em todo evento daquele dia.
- **Premissa 2:** o item 6 também publica com mudança em `package.json`, lockfile, `pnpm-workspace.yaml`, `.nvmrc`, `turbo.json` e `scripts/deploy/demo/**` (o que monta a imagem e o deploy). Commit em `apps/mobile` ou `apps/conector` também publica, como diz o item.
- **Premissa 3:** `*.md` = só os da raiz. O `modules/integracao/docs/guia-api-hub.md` é lido por teste e continua sendo código.
- **Wall time:** o tests/ num job só leva ~12 min, contra ~7 antes, e vira o caminho crítico.
- **Rito:** o gerente abre o PR do branch e pede o "aprovo" com o head SHA.
- Na semana seguinte, comparar o consumo (critério 3 da T-0160).
