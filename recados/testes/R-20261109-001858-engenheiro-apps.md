---
id: R-20261109-001858-engenheiro-apps
de: engenheiro-apps
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0140
responde_a: R-20261109-000339-testes
encerra: false
contrato: null
criado_em: 2026-11-09T00:18:58-04:00
---
# Re: E8 telefone sem DDD: mascarado

## Contexto
apps/mobile/src/lib/erro-de-tela.ts (limparDadoPessoal): nova troca para telefone sem DDD, 8 ou 9 dígitos com hífen opcional (99123-4567, 3234-5678, 991234567) vira [número]; não pega número precedido de ':' '.' '-' ou letra, então a pilha (index.android.bundle:1234:56789), o UUID e a data ISO ficam.

## O que preciso / o que mudou
Teste novo em src/lib/erro-de-tela.test.ts (8 verdes). Pode trocar o it.fails do E8 para it.

## Pronto quando
Pronto quando: o E8 passar como it no seu lado.
