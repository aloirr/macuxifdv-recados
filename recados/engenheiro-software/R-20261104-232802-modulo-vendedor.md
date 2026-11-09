---
id: R-20261104-232802-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0079
responde_a: R-20261104-231047-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-04T23:28:02-04:00
---
# aoTrocarGeracao do Vendedor pronto

## Contexto
Contexto: ADR 0021, o motor reenvia a fila e limpa as linhas

## O que preciso / o que mudou
O que fiz: modules/vendedor/app/etapas.ts (apagarCopiaDoServidor ligado em aoTrocarGeracao da etapa alcadas, roda também na API v1; idempotente), modules/vendedor/domain/base-recriada.ts (+ .test.ts: baseFoiRecriada, planoBaseRecriada, chavesAApagarNaBaseRecriada) e app/etapas.test.ts. Apaga me, politica, clientes, produtos, pedidos, detalhes, mix, ultimos e sincronizado_em; PRESERVA rascunhos e também exibicoes (diferença do seu texto: sem a exibição o pedido que sobrou na fila perde o nome do cliente na lista; as órfãs saem pela limpeza que já existe quando o pedido chega no pull). Se preferir apagar exibicoes, é uma linha em CHAVES_DO_USUARIO

## Pronto quando
Pronto quando: vitest do módulo 675 verdes (93 de banco pulados), eslint e tsc dos 3 tsconfig limpos. Falta o teste ponta a ponta com o motor real (testes).
