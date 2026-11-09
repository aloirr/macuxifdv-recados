---
id: R-20261105-130510-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: revisao
prioridade: alta
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T13:05:10-04:00
---
# Revisão final do lote L: não liberado ainda (🔴 R1 teste t0077:344, 🔴 R2 lock do @types/node, 🔴 R3 condicional Catálogo; condição E2 do UNSTABLE_router)

## Contexto
Revisão final do lote L (T-0071, T-0072, T-0052, T-0077), na árvore contra origin/main (9e5e931). O Catálogo (modules/catalogo) ficou de fora, como pedido. Rodei no PC, sem Docker e sem banco: os testes do Vendedor (563 verdes), os do apps/mobile historico-telas/transicao (24 verdes), o tsc do apps/mobile e do Vendedor (verdes), o eslint dos arquivos revisados (verde) e tests/modulos preco-minimo, pedidos-busca-t0077 e catalogo-busca-offline.

## O que preciso / o que mudou
🔴 **R1 (testes).** `tests/modulos/pedidos-busca-t0077.test.ts:344` está vermelho: a tela passou a usar `textoDoVazio`. Pedido em R-20261105-130353.
🔴 **R2 (você, antes do commit).** `apps/mobile/package.json` ganhou `@types/node ^22.18.0` (T-0008, engenheiro-apps), mas o `pnpm-lock.yaml` não tem a entrada no importador `apps/mobile`. O CI roda `pnpm install --frozen-lockfile` (.github/actions/preparar) e vai falhar. Rode `pnpm install` na raiz e commite o lock junto. O lock é do meu caminho, mas não posso rodar install nesta rodada: fica autorizado no seu commit.
🔴 **R3 (testes, condicional).** Se as mudanças do Catálogo (B1/B2/B4) entrarem neste push, `tests/modulos/catalogo-busca-offline-t0052.test.ts` fica com 3 vermelhos: B-O2b e B-O6 passaram a passar, e B-O1:194 `freio ceramica` está estrito demais com o FTS5 em OR. Se o Catálogo ficar fora do push, não há bloqueio.
🟡 **E1/E2 (engenheiro-apps, R-20261105-130317).** Aceitei o `UNSTABLE_router` (ADR 0026, nova: docs/decisoes/0026-historico-por-aba-no-roteador-do-tabs.md). Não aceitei o `__unsafe_action__` com a janela de 1 s: a proposta é um parâmetro interno no JUMP_TO que o próprio roteador monta. A condição do aceite é um teste de guarda (UNSTABLE_router ainda mesclado pelo useNavigationBuilder; forma da ação REPLACE gerada pelo expo-router) **antes do push do lote L**. Os arquivos do shell mudaram durante a revisão (abaAcesa, historico-do-shell): confiro só o delta quando ele responder.
🟡 **V1 (modulo-vendedor, backlog, R-20261105-130424).** W1: "0" digitado com foco não grava; Salvar/aba sem sair do campo mantém a quantidade antiga.
🟢 Aprovados: RN-VEN-11 no envio, no PUT e no Transformar, com o mínimo para cima igual ao Core e C6r-1 verde; Gestão sem Transformar/Editar/Cancelar e fora de "Para aprovar"; W2–W4 e Y1; `textoDoVazio`; os C6/C8 da T-0071; os casos de API da T-0052 (CI).
🟢 Nota: `modules/catalogo/zz-tempo.test.ts` (não rastreado) parece arquivo temporário de medição. Confirme com o modulo-catalogo antes de commitar.

## Pronto quando
**Lote L ainda não liberado.** Ele libera quando R1 estiver verde, R2 com o lock no commit, E2 (teste de guarda) no código e R3 verde ou o Catálogo fora do push. E1 pode entrar junto ou logo depois.
