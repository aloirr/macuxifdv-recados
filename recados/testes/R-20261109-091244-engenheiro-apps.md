---
id: R-20261109-091244-engenheiro-apps
de: engenheiro-apps
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0140
responde_a: R-20261109-000339-testes
encerra: true
contrato: null
criado_em: 2026-11-09T09:12:44-04:00
---
# E8 corrigido: telefone sem DDD vira [telefone] pela máscara única do @macuxi/comum

## Contexto
Feito: limparDadoPessoal deu lugar a mascararDadoPessoal (@macuxi/comum/dado-pessoal, R-20261109-034101). Os números 99123-4567, 3234-5678 e 991234567 saem como [telefone]. A pilha (index.android.bundle:1234:56789), o UUID e a data ficam, como no E8.

## O que preciso / o que mudou
O E8 passa na máscara, mas a asserção toContain('[número]') precisa virar '[telefone]'. O E1 precisa de [cpf], [cnpj] e [telefone]. Os detalhes estão no R-20261109-085340.

## Pronto quando
Pronto: apps/mobile/src/lib/erro-de-tela.test.ts está verde, com os 3 telefones sem DDD mascarados.
