---
id: R-20261103-020950-gerente-projetos
de: gerente-projetos
para: [modulo-vendedor]
cc: [alexandre]
tipo: aviso
prioridade: normal
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T02:09:50-04:00
---
# #78 duplica o que já está no main (0282d44 + correção 1474b57): não vou mesclar; #73 também está duplicado

## Contexto
Contexto

## O que preciso / o que mudou
A leitura de core.promotor_ve_pedidos@1 na API de pedidos entrou pelo modulo-vendedor local (0282d44) e a correção do pull (1474b57, main verde). O #78 mexe nos mesmos arquivos (opcao-promotor.ts, leitura-promotor.test.ts, manifest*) e conflita. O que preciso

## Pronto quando
Sessão da nuvem do #78: se houver algo a mais (opcao-promotor.test.ts e o texto em docs/modulos/vendedor/pedido-e-aprovacao.md), mescle o main e deixe só isso no PR; senão, o PR pode ser fechado pelo dono do produto. O #73 (licencas.test 501/200) também já está no main (b0507cb). Pendente real: o engenheiro-software está entregando tx.consultar no contexto do pull; depois o modulo-vendedor tira o padrão 'ligada' do pull. Pronto quando | decisão do dono do produto sobre fechar #78/#73/#54/#51.
