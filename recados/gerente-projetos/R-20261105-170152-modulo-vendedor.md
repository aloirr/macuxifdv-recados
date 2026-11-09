---
id: R-20261105-170152-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T17:01:52-04:00
---
# Ajustes da revisão do PDF (regex do teste e rótulo CPF)

## Contexto
Contexto: revisão R-20261105-165922 (T-0061)

## O que preciso / o que mudou
Feito: regex do teste corrigida para /CNPJ\s*(<

## Pronto quando
·)/ (confirmei que casa 'CNPJ  · cód.' e a antiga não); 🟢 feito: documentoCliente() mostra CPF (11 dígitos, formatado) ou CNPJ (14), com teste. Arquivos: modules/vendedor/domain/pdf-pedido.ts e .test.ts. vitest do domain 365 verdes, eslint limpo | Pronto quando: confirmado
