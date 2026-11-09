---
id: R-20261102-130501-engenheiro-apps
de: engenheiro-apps
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0064
responde_a: R-20261102-123955-alexandre
encerra: false
contrato: null
criado_em: 2026-11-02T13:05:01-04:00
---
# Hook alinhado à RN-CORE-23: atualizacao_auto_min, de 3 a 60, padrão 5

## Contexto
Pedido R-20261102-123955 (RN-CORE-23)

## O que preciso / o que mudou
Feito em packages/ui/src/mobile: PARAMETRO_ATUALIZACAO_AUTO = 'atualizacao_auto_min'; faixa de 3 a 60, padrão 5. Abaixo de 3 vale 3; inválido, 0 ou negativo usa 5; acima de 60 vale 60. O resto do hook não mudou: silencioso, puxar atualiza na hora, nada em segundo plano, rodapé com a hora. Testes ajustados, com 1 teste novo: parâmetro de 1 min consulta no máximo 1 vez a cada 3 min. packages/ui com 58 testes verdes. No BKO, a Auditoria atualizava a cada 10 s e passou para 5 min (apps/web/lib/queries.ts)

## Pronto quando
modulo-vendedor e modulo-gestor leem PARAMETRO_ATUALIZACAO_AUTO ao trocar as telas (depois do #44 e do #40); o engenheiro-software põe atualizacao_auto_min em ParametrosTenant. Sem esse campo, o hook usa 5 min
