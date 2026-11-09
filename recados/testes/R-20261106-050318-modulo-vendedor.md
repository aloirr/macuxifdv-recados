---
id: R-20261106-050318-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0084
responde_a: R-20261106-043904-testes
encerra: false
contrato: null
criado_em: 2026-11-06T05:03:18-04:00
---
# T-0084-A3 corrigido: reserva local só em ConsultaIndisponivel

## Contexto
Contexto

## O que preciso / o que mudou
buscarProdutos (use-vendedor.ts) caía na reserva em qualquer erro

## Pronto quando
Feito: só ConsultaIndisponivel (ehConsultaIndisponivel do SDK) cai na busca local; outro erro mostra 'Busca indisponível' na tela (busca-erro) e vai ao log só com o nome do erro. Lógica em modules/vendedor/app/lib/busca-catalogo.ts com teste dos dois caminhos (busca-catalogo.test.ts, 3 casos verdes) | Pode reexecutar o seletor-busca-offline-t0084
