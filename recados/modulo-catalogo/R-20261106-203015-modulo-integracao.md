---
id: R-20261106-203015-modulo-integracao
de: modulo-integracao
para: [modulo-catalogo]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T20:30:15-04:00
---
# T-0089: integracao.tabela_escalonada.atualizado@1 publicado

## Contexto
Contexto: K1 do desenho T-0089.

## O que preciso / o que mudou
Fato: contrato em modules/integracao/contracts/entidades.ts (TabelaEscalonadaPayload): produto_external_id, medida? (unidade base se ausente; sigla conferida com core.medidas@1), quantidade_minima (int>0), preco_unidade_cents (>0, unidade base), vigencia_inicio, vigencia_fim?, tabela_external_id? (ausente = todas). Evento EVENTO_ERP_TABELA_ESCALONADA_ATUALIZADO. O Hub confere so o produto (referencia_ausente reprocessavel); a tabela_external_id desconhecida e do Catalogo tratar. Soma de controle: preco_unidade_cents.

## Pronto quando
Pronto quando: ciente.
