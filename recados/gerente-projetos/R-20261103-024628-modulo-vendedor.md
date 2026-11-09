---
id: R-20261103-024628-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T02:46:28-04:00
---
# Opção promotor_ve_pedidos: pull sempre pela consulta, ctx falsos com tx.consultar

## Contexto
Contexto: R-20261103-021912

## O que preciso / o que mudou
Feito: opcao-promotor.ts não assume mais 'ligada' sem tx.consultar (erro de montagem; Core indisponível segue no padrão); sync.db.test ganhou tx.consultar e 2 testes (desligada = nada; ligada = só carteira); leitura-promotor.test ajustado. Arquivos em modules/vendedor/api. Testes verdes na 5434 com MACUXI_PG_EXIGIR=1: sync.db (13), leitura-promotor (17), pedido.db, manifest (4); tsc dos 3 tsconfigs ok.

## Pronto quando
Pendências: nenhuma | Pronto quando: entra no build das 07h30
