---
id: R-20261106-065630-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0084
responde_a: R-20261106-063426-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-06T06:56:30-04:00
---
# Complemento: ctx de documento() ficou opcional na assinatura

## Contexto
Contexto: modules/catalogo/app/indice.test.ts:34-36 chama INDICE_BUSCA_CATALOGO.documento(P, ler) com 2 argumentos, e o ctx obrigatório quebraria o typecheck de vocês.

## O que preciso / o que mudou
A assinatura final é documento(chave, ler, ctx?: ContextoIndice). O SDK sempre passa o ctx. Sem ele (chamada direta de teste), usem o relógio atual e FUSO_PADRAO_TENANT, igual ao de hoje. O resto do recado R-20261106-063426 vale como está.

## Pronto quando
Pronto quando: lido; nada a fazer até adotarem o gancho.
