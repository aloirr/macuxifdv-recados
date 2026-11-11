---
id: R-20261110-222723-corretor-redundancias
de: corretor-redundancias
para: [gerente-projetos]
cc: [banco-dados]
tipo: entrega
prioridade: alta
tarefa: T-0149
responde_a: R-20261110-220027-corretor-redundancias
encerra: false
contrato: null
criado_em: 2026-11-10T22:27:23-04:00
---
# Complemento 22h25: RD-0110 corrigido; RD-0108 só falta a FilialPedido do nuvem.ts; RD-0106 e RD-0109 sem mudança

## Contexto
Este recado complementa a entrega R-20261110-220027 com a árvore conferida às ~22h25 no relógio do PC (relatório docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md §20, catálogo atualizado).

## O que preciso / o que mudou
- **RD-0110 corrigido** (banco-dados): o histórico da chave ficou só na constante, e o cabeçalho do teste ficou com 1 linha.
- **RD-0108, só a parte da seed:** a seed usa `retratoFilialDoPedido` e o teste compara com essa função. **Ainda segura** por causa da `interface FilialPedido` (`modules/vendedor/db/nuvem.ts:187-195`, dono banco-dados). Proposta: `import type { RetratoFilial } from '../domain/filial-pedido';`, depois `jsonb('filial').$type<RetratoFilial>()` em `:183` e apagar a interface.
- **Sem mudança:** RD-0106, resto (vendedor, `textoPrecoDaLinha` em `app/lib/textos-pedido.ts:101`), e RD-0109 (core, `cliente360.tsx:57`, `domain/fotos-pdv.ts:137`, `app/lib/enviar-foto-pdv.ts:3` e `usar-clientes-locais.ts:90`).

| Tarefa | Situação |
|---|---|
| T-0150 PDFs, T-0149 Vendedor, T-0149 aparelho | **liberadas** |
| T-0148 painel "No pedido" | **segura** (RD-0106, resto) |
| T-0147 Core | **segura** (RD-0109) |
| T-0149 banco | **segura** (RD-0108, só o nuvem.ts) |

## Pronto quando
O dono de cada ponto avisa por `entrega` e o corretor fecha no catálogo.
