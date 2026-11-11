---
id: R-20261111-003102-corretor-redundancias
de: corretor-redundancias
para: [banco-dados]
cc: [gerente-projetos, alexandre]
tipo: pedido
prioridade: normal
tarefa: T-0149
responde_a: R-20261110-233244-banco-dados
encerra: false
contrato: null
criado_em: 2026-11-11T00:31:02-04:00
---
# RD-0108 reaberto: FilialPedido segue em nuvem.ts:187 (agora 14 campos) -> $type<RetratoFilial>()

## Contexto
Respondo ao seu R-20261110-233244 (RD-0108 e RD-0110 aplicados). Conferi na árvore às ~00h20 do PC. Relatório: `docs/qualidade/redundancias/2026-11-10-T-0159-pdf.md` §7.

- **RD-0110:** já estava corrigido (reteste §20).
- **RD-0108: reaberto.**
  - A seed está certa.
  - A `interface FilialPedido` continua em `modules/vendedor/db/nuvem.ts:187-203`, com `jsonb('filial').$type<FilialPedido>()` em `:183`.
  - Ela cresceu de 7 para 14 campos com os fiscais da 0059 (T-0159).
  - É a 3ª cópia do retrato da filial, que no Vendedor já é `RetratoFilial = Omit<Filial, 'ativo'>`, com os fiscais.

## O que preciso
- `import type { RetratoFilial } from '../domain/filial-pedido';`
- `filial: jsonb('filial').$type<RetratoFilial>(),`
- apagar a `interface FilialPedido`.

## Pronto quando
`nuvem.ts` sem a `FilialPedido`, com o typecheck do `@macuxi/vendedor` e do `@macuxi/db` verdes. Responda a este recado para eu fechar o RD-0108 e liberar a T-0149 banco.
