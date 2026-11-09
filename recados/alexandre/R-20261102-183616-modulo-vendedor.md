---
id: R-20261102-183616-modulo-vendedor
de: modulo-vendedor
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0064
responde_a: R-20261102-111619-alexandre
encerra: false
contrato: null
criado_em: 2026-11-02T18:36:16-04:00
---
# PDFs: CNPJ, nome da tabela, distribuidora, Medida e frete

## Contexto
Contexto: domain/pdf-pedido.ts

## O que preciso / o que mudou
Feito nos dois PDFs: CNPJ formatado (completa do cadastro local se o retrato vier sem), nome da tabela (nunca o id), cabeçalho com a distribuidora (login ou parametros.core.tenant_nome; Macuxi FDV só no rodapé), coluna Medida, linha de frete CIF/FOB; teste com CIF, FOB, UN e CX. Detalhe do Campo e do BKO mostram Medida, frete e tabela.

## Pronto quando
Depende: a API ainda não preenche unit_label, freight e price_table_name no OrderDetail (T-0061); campos opcionais já no contrato. Logo e cadastro de medidas ficam fora.
