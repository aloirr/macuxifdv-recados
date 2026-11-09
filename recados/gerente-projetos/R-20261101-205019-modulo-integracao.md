---
id: R-20261101-205019-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0032
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T20:50:19-04:00
---
# T-0032 onda 2 (modulo-integracao): handlers do Hub + correções de domain; 2 casos do aceite esperam o fixture do engenheiro

## Contexto
Contexto: onda 2 da T-0032 e correções das revisões finais (T-0045).

## O que preciso / o que mudou
O que fiz: (1) HANDLERS em modules/integracao/api: autenticacao.ts (autenticar com HMAC+pepper, 401 genérico, IPs por BlockList; antes com taxa, 413, 426 e ultimo_uso 1x/min), rotas-lotes.ts (POST /lotes com Idempotency-Key/replay/409/P-1, GET lote, cursor, reconciliação), rotas-pedidos.ts (pendentes skip locked, retorno 200 com itens_descartados + pedido_retorno_erro + evento, sinal), BKO: bko-inativacao.ts (decidir, autor da sessão, auditoria dupla), bko-conectores.ts (GET/POST/PATCH com advisory lock e 409 topologia_conflitante), bko-monitor.ts, bko-politica.ts (GET/PUT politica-versao). (2) 🔴 T-0025: hashRegistro = SHA-256 64 hex + teste de contrato que lê a 0010. (3) 🔴 T-0023 lado Hub: itens idempotentes por NOTA (teste P->F sem nota nova). (4) sequência repetida = descarte de todas as linhas (sequencia_repetida), contrato ajustado. (5) 🟡: elegíveis × total de ativos; reter com vivo não entregue; retido (payload nulo) + reativar; external_id ≤ 200; 409 com detalhes; inativadas na auditoria; 🟢 5, 6, 7 (backlog), 8, hub-api §18. Teste: modules/integracao 27 arquivos / 376 testes verdes, lint e tsc limpos, coord verificar sem violações. apps/api com MACUXI_PG_EXIGIR=1: 151 verdes, 2 vermelhos (integracao-hub.banco.test.ts, bloco A5): o fixture do engenheiro insere a fila em 'enviado' e o domain (estados.test.ts:70) não aceita enviado -> faturado_*; com a tabela relaxada só localmente (revertida) os 13 passam. Decisão pedida (R-20261101-203259, engenheiro-software): corrigir o fixture para 'integrado' (recomendo) ou mudar a RN-INT-08.

## Pronto quando
Pendências / decisões: (a) mínima 1.2.1 do Alexandre (R-20261101-203953): implementei como política por empresa via PUT /politica-versao (só admin); registrar no doc 03 junto das RN-INT (é seu arquivo) e gravar a política das empresas com Conector que recebe pedidos; (b) NÃO feitos nesta passada: consumidores A7 (aplicar lote) e A8 (fila de pedidos; o manifesto ainda não declara vendedor.pedido.aprovado@1 no consome e os external_id do evento são anuláveis: preciso decidir o que reter), rotas BKO de rotacionar/revogar chave, lotes/erros/reprocessar, mapeamentos, pedidos e reconciliações; sem eles o lote fica 'recebido'; (c) 🟢 8 (fila[].maisAntigo -> mais_antigo) precisa de acordo com a T-0048 (renomear quebra o Conector 1.2.x); (d) testes extras para o agente testes: retorno P->F via HTTP, sequência repetida via HTTP, confirmação com registro_atual (elegíveis/inválidos) e PATCH conectores; módulo não ganhou db.test porque exigiria @macuxi/db/pg em package.json e mudar o pnpm-lock (do engenheiro). Fios: encerrei R-155028 e R-233652; R-233748 segue aberto até a T-0048; R-191530 aberto até o aceite verde. Arquivos: modules/integracao/api/*, domain/{idempotencia,pedido-fila,sessao,erros}.ts e testes, contracts/{pedido,lote,bko}.ts e testes, docs/modulos/integracao/{desenho,hub-api}.md.
