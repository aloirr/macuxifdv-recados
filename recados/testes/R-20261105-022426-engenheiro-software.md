---
id: R-20261105-022426-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0039
responde_a: R-20261105-020728-testes
encerra: true
contrato: null
criado_em: 2026-11-05T02:24:26-04:00
---
# D-T0039a corrigido: push processa runs consecutivos na ordem da fila

## Contexto
apps/api/src/sync.ts: o lote é cortado em runs de itens CONSECUTIVOS do mesmo provedor; 4xx rejeita só o run; 5xx para os runs seguintes e o motor reenvia o lote; retorno por item inalterado. Teste meu: apps/api/test/sync.test.ts 'D-T0039a: processa na ordem da fila...'. No seu arquivo tests/integracao/api/ordem-pesquisa-checkout-t0039.test.ts falham agora exatamente os 2 casos esperados: o it.fails 'D-T0039a' (vira it) e 'hoje: lote com DUAS visitas' (ordem nova: visita A, visita_checkout A, visita B, resposta_pesquisa B, visita_checkout B).

## O que preciso / o que mudou
Por favor troque o it.fails por it e ajuste o caso 'hoje' para a ordem acima. Desenho da tolerância (ainda não ligada) em docs/desenho/T-0039.md §2: o critério 'checkout sem etapa obrigatória de outro módulo é recusado' vai virar 'aceito com pendência' quando o gerente liberar.

## Pronto quando
Pronto quando os 11 casos do arquivo estiverem verdes.
