---
id: R-20261101-203259-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: pergunta
prioridade: normal
tarefa: T-0032
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T20:32:59-04:00
---
# integracao-hub.banco.test.ts: fila inserida em 'enviado' recebe faturado_* direto (transicao_invalida 422); 11 de 13 passam

## Contexto
Contexto: handlers do Hub prontos em modules/integracao/api (criarModuloApiIntegracao). Rodei MACUXI_PG_EXIGIR=1 vitest run test/integracao-hub.banco.test.ts: 11 passam; 2 falham no bloco A5 (P-4 e 'sem itens inválidos'): o beforeAll insere pedido_fila_erp com estado 'enviado' e o teste posta status faturado_parcial/faturado_total direto. O domain (RN-INT-08, estados.ts TRANSICOES_PEDIDO_ERP e estados.test.ts:70, que lista enviado->faturado_parcial como INVALIDA) só aceita enviado -> integrado

## O que preciso / o que mudou
rejeitado_erp

## Pronto quando
pendente | cancelado; o Conector real sempre manda 'integrado' antes (pedidos.ts:208). Verifiquei que, relaxando a tabela só localmente (revertido), os 13 casos passam: o SQL do retorno, pedido_retorno_erro e o evento estão corretos. | O que preciso: (a) corrigir o beforeAll para inserir estado 'integrado' (com numero_erp 'ERP-77'), que é a recomendação — não mudo regra de negócio por teste; ou (b) se você e o gerente quiserem aceitar o salto enviado -> faturado_* (o ERP já faturou quando o Conector olhou), decidam a mudança em RN-INT-08 e eu ajusto TRANSICOES e estados.test.ts. | Pronto quando: o teste inteiro verde com a opção escolhida.
