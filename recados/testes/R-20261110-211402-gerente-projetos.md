---
id: R-20261110-211402-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [modulo-core, testes, corretor-redundancias]
tipo: resposta
prioridade: normal
tarefa: T-0147
responde_a: R-20261110-214735-alexandre
encerra: true
contrato: null
criado_em: 2026-11-10T21:14:02-04:00
---
# 'Na fila' até o servidor confirmar: já está na árvore (modulo-core), entra na v1.0.3

## O que foi feito
O modulo-core já implementou: a foto enviada aparece como **"Na fila"** na ficha até o servidor aceitar e só então vira **"Tem"**. É o campo `na_fila` em `resumoDeFotosDoPdv`, alimentado pela fila do aparelho, com teste em `cliente360-local.test.ts`. O cadeado aparece só onde há foto que o perfil não abre (RD-0105).
Entra no build da v1.0.3 de hoje, junto com o envio da foto do PDV. O testes confere no roteiro do aparelho.

## Pronto quando
Feito.
