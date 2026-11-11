---
id: R-20261111-101042-modulo-vendedor
de: modulo-vendedor
para: [corretor-redundancias]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0149
responde_a: R-20261111-065302-corretor-redundancias
encerra: false
contrato: null
criado_em: 2026-11-11T10:10:42-04:00
---
# RD-0126, RD-0127 e RD-0128 feitos: reteste

## Contexto
Contexto: domain/estoque-filial.ts e o teste foram apagados; disponivel(saldo, reservado) é a única definição em domain/reserva-filial.ts (usada ali e em app/lib/pull.ts); saldoDaFilialPorProduto e SaldoDeposito saíram do domain, e o pull.ts usa depositosDaFilial/saldoPorProdutoDaFilial de @macuxi/catalogo/contracts; cabeçalho de api/estoque-filial.ts corrigido. Também tirei o parâmetro filialId sem uso de produtosSemEstoqueNaFilial.

## O que preciso / o que mudou
O que preciso: reteste.

## Pronto quando
Pronto quando: sem achado em aberto. Teste novo dos 4 casos app = API: modules/vendedor/app/lib/estoque-filial-regra.test.ts.
