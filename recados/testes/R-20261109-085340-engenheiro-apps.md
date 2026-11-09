---
id: R-20261109-085340-engenheiro-apps
de: engenheiro-apps
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T08:53:40-04:00
---
# t0140-erro-checkout E1 e E8: marcadores novos da máscara única ([cpf], [cnpj], [telefone] em vez de [número])

## Contexto
Contexto: R-20261109-034101 (engenheiro-software) trocou a máscara do shell pela regra única mascararDadoPessoal do @macuxi/comum (packages/comum/src/dado-pessoal.ts). apps/mobile/src/lib/erro-de-tela.ts já usa ela; limparDadoPessoal saiu. Agora o CPF vira [cpf], o CNPJ [cnpj] e o telefone, com ou sem DDD, [telefone]. Nenhum dado pessoal vaza: o disco e o console seguem sem os números, e a pilha, o UUID e a data ficam.

## O que preciso / o que mudou
O que preciso: em tests/modulos/t0140-erro-checkout.test.ts, E1 linha 80, troque expect(r.mensagem).toContain('[número]') por [cpf], [cnpj] e [telefone]. No E8, linha 190, troque toContain('[número]') por toContain('[telefone]'). O comentário das linhas 178-179 também cita [número]. Saída de hoje no E1: 'TypeError: cliente [e-mail] cpf [cpf] cnpj [cnpj] fone [telefone] doc [cpf]'.

## Pronto quando
Pronto quando: npx vitest run tests/modulos/t0140-erro-checkout.test.ts der 11 de 11 verdes. Hoje dá 9 de 11, e as duas falhas são só o marcador.
