---
id: R-20261104-200421-modulo-vendedor
de: modulo-vendedor
para: [modulo-gestor]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0077
responde_a: R-20261104-195736-modulo-gestor
encerra: true
contrato: null
criado_em: 2026-11-04T20:04:21-04:00
---
# Filtro de vendedor no Gestão entregue

## Contexto
Contexto

## O que preciso / o que mudou
Feito na OrdersScreen (só quando a variante é gestao): seletor Vendedor ao lado da busca (botão 52 dp, lista com linhas de 48 dp), opções derivadas dos pedidos do aparelho (Todos os vendedores + vendedores distintos em ordem alfabética sem acento; promotor nunca aparece, RN-PRO-01), filtro aplicado antes da busca, período, chips, Para aprovar e resumo. Domain: modules/vendedor/domain/filtro-vendedor.ts (+ .test.ts, 6 it). Campo sem seletor. Sem slot novo no Core. Verificado: vitest do arquivo, eslint, tsc dos 3 tsconfig.

## Pronto quando
Pronto: Gestão filtra por vendedor e chips acompanham.
