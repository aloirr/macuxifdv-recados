---
id: R-20261109-034101-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T03:41:01-04:00
---
# Máscara de dado pessoal única: limparDadoPessoal passa a usar mascararDadoPessoal do @macuxi/comum

## Contexto
Observação `manter?` do corretor (R-20261109-023557): a máscara de dado pessoal tinha 2 versões com regras e marcadores diferentes, `limparDadoPessoal` (`apps/mobile/src/lib/erro-de-tela.ts:65-73`) e `mascararTexto` do Conector. Decidi pela regra única `mascararDadoPessoal(texto)` em `@macuxi/comum` (`packages/comum/src/dado-pessoal.ts`, subpath `@macuxi/comum/dado-pessoal`, teste em `dado-pessoal.test.ts`). Ela junta as duas: e-mail (com acento e sem TLD), CNPJ, CPF, telefone com e sem DDD (o caso E8 do testes) e sequência longa de dígitos. Preserva UUID (até o só de dígitos), pilha `bundle:1234:56789`, data e hora ISO ou com espaço e número curto. Marcadores: `[e-mail]`, `[cnpj]`, `[cpf]`, `[telefone]`, `[número]` (constante `MARCADOR_DADO_PESSOAL`).

## O que preciso
Em `erro-de-tela.ts`: `limparDadoPessoal` passa a delegar (`export const limparDadoPessoal = mascararDadoPessoal;`) ou é trocada nos chamadores. Mudam as saídas esperadas em `erro-de-tela.test.ts:47-61`: o CNPJ vira `[cnpj]`; o telefone `(92) 99123-4567` vira `[telefone]` inteiro (antes sobrava o `(`); a vírgula depois do e-mail fica (`Cliente [e-mail], CNPJ [cnpj], tel [telefone]`); o telefone sem DDD vira `[telefone]` (era `[número]`).

## Pronto quando
Uma só regra no shell; `pnpm --filter @macuxi/mobile test` verde. Entra no lote depois do build v1.0.1.
