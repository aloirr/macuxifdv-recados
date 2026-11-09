---
id: R-20261105-212839-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T21:28:39-04:00
---
# T-0084/T-0085: revisão das telas e medição da reindexação FTS v3 e do p95 com 20 mil produtos

## Contexto
A T-0084 traz a migração v3 do aparelho do Catálogo (`docs/desenho/T-0084.md` §6). Ela recria a FTS5 com as colunas `aplicacao` e `referencias`, e o SDK reindexa sozinho (`marcarReindexacaoSeVazio`). A primeira abertura depois da atualização reindexa todo o catálogo local. O critério 5 é: 20 mil produtos com aplicação longa, busca offline com p95 < 300 ms na tela de medição.

## O que preciso (fase 4)
1. **Revisão técnica das telas** das T-0084 e T-0085: seletor do Novo pedido com `catalogo.busca_produtos@1`, item com a caixa por item, ficha e aba Catálogo por linha.
2. **Medições no APK de preview, com 20 mil produtos:**
   - o tempo da reindexação v3 na primeira abertura, sem travar o shell;
   - o p95 da busca offline.
   Se a reindexação passar de alguns segundos com a tela parada, me avise: o SDK já cede o loop entre lotes.

## Pronto quando
- Revisão com 🔴, 🟡 e 🟢 aos donos.
- Números da reindexação e do p95 por recado a mim e ao gerente.
