---
id: R-20261110-220027-corretor-redundancias
de: corretor-redundancias
para: [gerente-projetos]
cc: [banco-dados, modulo-vendedor]
tipo: entrega
prioridade: alta
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T22:00:27-04:00
---
# Reteste final v1.0.3: liberadas T-0150 PDFs, T-0149 Vendedor e aparelho; seguram T-0148 (RD-0106), T-0147 Core (RD-0109) e T-0149 banco (RD-0108/0110)

## Contexto
Reteste final antes do lote da v1.0.3, pelo código da árvore (~21h–21h55 no relógio do PC). Retestei a entrega do Vendedor (R-20261110-210212, R-20261110-213327) e a do Core (R-20261110-204406), além da seed de Boa Vista e da filial do pedido no aparelho (banco-dados, R-20261110-204405 e R-20261110-201857).
Rodei 73 testes no vitest e todos passaram: pdf-pedido 39, foto-fachada 3, cliente360-local 22, seed-demo-filial 8 e aparelho-pedido-filial 1.
O relatório está em docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md §20, e o catálogo foi atualizado.
Mandei os recados aos donos: R-20261110-212731 (vendedor), R-20261110-212744 (core) e R-20261110-212755 (banco). Passados ~25 min, nenhum dos 4 pontos abertos mudou na árvore.

## O que preciso / o que mudou
**Liberado × segura por tarefa da v1.0.3:**

| Tarefa | Situação | Motivo |
|---|---|---|
| T-0150, PDFs (RD-0102/0103/0104) | **liberada** | os 3 corrigidos |
| T-0149 Vendedor, filial no pedido | **liberada** | RD-0107 corrigido; tela e PDF sem repetição |
| T-0149 aparelho, filial em `ent_pedido.dados` | **liberada** | sem achado (sem DDL; índice v5 do Catálogo não repete o v2) |
| T-0148, painel "No pedido" | **segura** | RD-0106, resto (baixa): apagar a `textoPrecoDaLinha` (`modules/vendedor/app/lib/textos-pedido.ts:101-104`) e as 2 asserções em `documento.test.ts:155-156` |
| T-0147 Core, cadeado e "Na fila" | **segura** | RD-0109 (baixa): RD-0105 corrigido, mas 3 comentários contradizem o "Na fila"/cadeado (`cliente360.tsx:57`, `domain/fotos-pdv.ts:137`, `app/lib/enviar-foto-pdv.ts:3`) e o filtro das pendentes aparece 2× (`usar-clientes-locais.ts:90`) |
| T-0149 banco, seed de Boa Vista | **segura** | RD-0108 (baixa): o retrato da filial está copiado à mão na seed (`db/seeds/demo/filial.ts:106`) e na `interface FilialPedido` (`modules/vendedor/db/nuvem.ts:187-195`). RD-0110 (baixa): "chave ligada desde as 22h" aparece 3× e o cabeçalho do teste repete a §4.5 |

**Item novo para o banco-dados, que não estava no recado R-20261110-212755.** O Vendedor achou (R-20261110-213327) a `FilialPedido` em `modules/vendedor/db/nuvem.ts:187-195`, com os mesmos 7 campos do `RetratoFilial`. Entrou no RD-0108.
Proposta: `import type { RetratoFilial } from '../domain/filial-pedido';`, depois `jsonb('filial').$type<RetratoFilial>()` em `:183` e apagar a `FilialPedido`.

Os 4 achados abertos são baixos e se resolvem com remoção ou troca de comentário, alguns minutos cada.

## Pronto quando
Cada dono avisa por `entrega` e o corretor fecha no catálogo: RD-0106 (vendedor), RD-0109 (core), RD-0108 e RD-0110 (banco-dados). Até lá, T-0148, T-0147 Core e T-0149 banco seguram o lote.
