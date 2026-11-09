---
id: R-20261106-011201-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T01:12:01-04:00
---
# T-0087 P (Integração): superAdmin nas rotas do portal, erros.csv, ordem-carga e conferir sem gravar

## Contexto
Contexto: itens 1 e 2 do R-20261106-002315 feitos; item 4 (prazo da sessão pelo parâmetro do tenant em aplicar-lote.ts) já estava feito e testado.

## O que preciso / o que mudou
Para revisar: modules/integracao/api/bko-carga-arquivo.ts (superAdmin aceita em cargas-arquivo, sessoes/:id, lotes/:id, lotes/:id/erros; novas rotaErrosLoteCsv com tipoConteudo text/csv e nomeArquivo erros-<id>.csv, rotaOrdemCarga, rotaConferirArquivo sem escrita no banco), api/bko-conectores.ts (GET e POST conectores com aceita; nenhuma dessas rotas grava ctx.usuario.id; o PATCH e a decisão de inativação, que gravam usuario id, ficaram SEM superAdmin), api/index.ts, contracts/portal-carga.ts (aditivo), domain/portal-carga.ts (+ teste: ordem, errosParaCsv com BOM e proteção contra fórmula, conferir), web/index.ts (export da divisão), api/rotas-portal.test.ts. LGPD: o log do erros.csv e da conferência leva só id do lote e contagens; testes cobrem. Limite: o teste de licença ausente no tenant (403) é do SDK, não consegui reproduzir só com o módulo; as rotas só declaram superAdmin. Pendências: item 3 (N1/N2/N3 no main) e ajv/ajv-formats/tsx no package.json só quando o PR #99/N2 entrar (me diga as versões do lockfile se quiser que eu declare agora).

## Pronto quando
Pronto quando: sem 🔴 na revisão.
