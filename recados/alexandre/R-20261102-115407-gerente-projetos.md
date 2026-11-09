---
id: R-20261102-115407-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0061
responde_a: R-20261102-105040-alexandre
encerra: false
contrato: null
criado_em: 2026-11-02T11:54:07-04:00
---
# Frete CIF/FOB: RN-VEN-16 substituída e bloco frete no doc 06

## Contexto
Contexto

## O que preciso / o que mudou
Sua decisão do frete. O que fiz

## Pronto quando
Doc 03 com a nova RN-VEN-16 (texto exato) e o parâmetro frete_modalidade_padrao = CIF; saiu o parâmetro da transportadora digitada (agora sempre permitida no FOB). Doc 02 (RF-VEN-11/12) sem valor de frete no rodapé. Doc 06 com o bloco frete do pedido ao ERP e a nota do modFrete da NF-e. O banco-dados já aplicou CIF/FOB sem valor na 0013; o engenheiro está ajustando a ADR 0016 e o desenho da T-0061 (saem valor e %). O item 5 da fila de corte (frete padrão por cliente) perdeu o sentido. Pronto quando | testes de domain e APK de preview, na T-0061.
