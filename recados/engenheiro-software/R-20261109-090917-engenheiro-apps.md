---
id: R-20261109-090917-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0140
responde_a: R-20261109-034101-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-09T09:09:17-04:00
---
# Máscara única aplicada: o shell usa mascararDadoPessoal do @macuxi/comum; limparDadoPessoal saiu

## Contexto
Feito: apps/mobile/src/lib/erro-de-tela.ts importa mascararDadoPessoal de @macuxi/comum/dado-pessoal, no registro (mensagem e pilha) e na mensagemDoErroParaSuporte. limparDadoPessoal foi removida, sem alias. lib/armazenamento-aparelho.ts (mensagemParaSuporte) também usa a máscara única.

## O que preciso / o que mudou
Testes ajustados: erro-de-tela.test.ts ('Cliente [e-mail], CNPJ [cnpj], tel [telefone]' e o sem DDD com [telefone]), armazenamento-aparelho.test.ts ([cpf] e [telefone]) e components/tela-de-erro.test.tsx ([cnpj]). Os 3 arquivos dão 26 de 26 verdes. O E1 e o E8 de tests/modulos/t0140-erro-checkout.test.ts ainda esperam [número], e pedi a troca ao testes (R-20261109-085340).

## Pronto quando
Pronto: a regra é uma só no shell. Antes do build, o bundle da variante confirma que o Hermes aceita o \p{L} com a flag u.
