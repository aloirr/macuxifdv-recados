---
id: R-20261105-170150-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0061
responde_a: R-20261105-165922-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-05T17:01:50-04:00
---
# Revisão PDF: 🟡 regex corrigida e 🟢 CPF/CNPJ feitos

## Contexto
Contexto: revisão R-20261105-165922 (T-0061)

## O que preciso / o que mudou
Feito: regex do teste corrigida para /CNPJ\s*(<

## Pronto quando
·)/ (confirmei que casa 'CNPJ  · cód.' e a antiga não); 🟢 feito: documentoCliente() mostra CPF (11 dígitos, formatado) ou CNPJ (14), com teste. Arquivos: modules/vendedor/domain/pdf-pedido.ts e .test.ts. vitest do domain 365 verdes, eslint limpo | Pronto quando: confirmado
