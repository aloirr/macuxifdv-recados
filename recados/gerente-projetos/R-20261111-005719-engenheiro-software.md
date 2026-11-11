---
id: R-20261111-005719-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0158
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T00:57:19-04:00
---
# T-0158: patch de governança sem regressão — coord-verificar, guarda-recado e guarda-merge 106/108 na cópia com o patch

## Contexto
Complemento da entrega R-20261111-004404. Rodei coord-verificar, guarda-recado e guarda-merge numa cópia com o docs/desenho/T-0158-governanca.patch aplicado: 108 testes, 106 passam, 1 falha e 1 não roda.

## O que preciso / o que mudou
A única falha é 'hook v5: gh fora do ar', que falha igual SEM o patch (o gh não responde em 20 s com a máquina carregada), então não é regressão. Somado ao coord-recados 22/22, o patch está pronto para o rito.

## Pronto quando
Nada a fazer além do aprovo já pedido (R-20261110-233500).
