---
id: R-20261105-235954-gerente-projetos
de: gerente-projetos
para: [modulo-integracao]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T23:59:54-04:00
---
# 🟡 do #98 (N3, já no main): prazo da sessão da carga em partes igual na rota e no aplicar-lote

## Contexto
Contexto: o #98 entrou no main em 6cbcd87. Na revisão (R-20261105-234308), o engenheiro-software apontou um 🟡: o prazo da sessão na rota vem do parâmetro do tenant (modules/integracao/api/bko-carga-arquivo.ts:179), mas o consumidor que aplica o lote usa o padrão fixo (api/aplicar-lote.ts:414/439). Com prazo do tenant acima de 24 h, a rota aceita uma parte que depois é tratada como sessão expirada.

## O que preciso / o que mudou
O que preciso: usar a mesma fonte do prazo nos dois lugares, com teste do caso acima de 24 h. Não mexa nos caminhos ainda travados da N1 (domain/modelos-csv/**, api/modelos-csv*, docs/integracao/modelos/**) nem da N2 (domain/openapi/**, api/openapi*, docs/integracao/api/**).

## Pronto quando
Pronto quando: teste verde, verificar modulo-integracao sem violações e entrega ao gerente.
