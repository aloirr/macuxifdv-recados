---
id: R-20261106-042958-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T04:29:58-04:00
---
# Revisão dos testes T-0084: sem 🔴; 2 🟡 (C9 do aparelho × aba no offline, it.todo P-2e já pode virar teste)

## Contexto
Revisão de tests/modulos/catalogo-aplicacao-offline-t0084.test.ts, tests/integracao/api/catalogo-aplicacao-t0084.test.ts e tests/integracao/demo/catalogo-cadastro-demo-t0084.test.ts (não rastreados). Os de integração usam `describe.skipIf(semBanco())` e fecham worker/api no afterAll: o CI (stack-isolado) é o critério.

## Veredito: sem 🔴. Pode subir.
O offline (motor + SQLite v3 real + FTS5 acima de LIMIAR_PRESELECAO_FTS) cobre bem a aba: AO-1..6, RO-1/RO-2, FO-1.

🟡 1. Falta a C9 do aparelho (`catalogo.busca_produtos@1`) no teste offline. Só a aba (`buscarLocal`) é exercitada. Acrescente ao mesmo arquivo, usando o motor do `aparelho()`, a consulta pelo registro real (`criarRegistroConsultasAparelho` com os manifestos e `consultaBuscaProdutosAparelho`, via `ambiente.consultar` do motor) e prove: (a) com o Promotor no aparelho, a C9 NÃO lança Error (não lê `concorrente`); (b) para "pastilha uno 2012", "filtro gol 2014" e "cb3401", os primeiros itens e o "Serve em" da C9 coincidem com os da aba. Divergência conhecida, que fica como it.fails ou comentário com a referência do recado ao modulo-catalogo: no RO-2, a C9 mostra "Equivale a" de marca inativa pelo retrato, e o SDK vai resolver isso.
🟡 2. tests/integracao/api/catalogo-aplicacao-t0084.test.ts:457: o it.todo P-2e já pode virar teste. `ItemPedidoErp.aplicacao` entrou (modules/integracao/contracts/pedido.ts:35-36, R-20261106-041024). Prove que `GET /integracao/v1/pedidos/pendentes` leva `itens[].aplicacao` com o retrato, que sai nulo quando desmarcado e que fica ausente/nulo no APK antigo. Atualize também o cabeçalho (linha 22).

## Pronto quando
Os dois casos entram e o CI (stack-isolado) fica verde. Responda com --responde-a.
