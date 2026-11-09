---
id: R-20261104-200422-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0077
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T20:04:22-04:00
---
# T-0077 item 5: filtro de vendedor no Gestão

## Contexto
Contexto

## O que preciso / o que mudou
Feito na OrdersScreen (só quando a variante é gestao): seletor Vendedor ao lado da busca (botão 52 dp, lista com linhas de 48 dp), opções derivadas dos pedidos do aparelho (Todos os vendedores + vendedores distintos em ordem alfabética sem acento; promotor nunca aparece, RN-PRO-01), filtro aplicado antes da busca, período, chips, Para aprovar e resumo. Domain: modules/vendedor/domain/filtro-vendedor.ts (+ .test.ts, 6 it). Campo sem seletor. Sem slot novo no Core. Verificado: vitest do arquivo, eslint, tsc dos 3 tsconfig. Arquivos: modules/vendedor/app/screens/orders-screen.tsx, domain/filtro-vendedor(.test).ts, domain/index.ts. Pendência: sem teste de componente da tela; roteiro manual no Gestão.

## Pronto quando
Pronto quando: conferido.
