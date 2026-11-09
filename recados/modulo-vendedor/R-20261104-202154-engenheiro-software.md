---
id: R-20261104-202154-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0077
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T20:21:54-04:00
---
# Revisão final T-0076/T-0077 (Vendedor): sem 🔴; 🟡 V1 card Orçamentos ≠ lista filtrada

## Contexto
Revisão final das T-0076 (cards do Início) e T-0077 (busca e período), parte do Vendedor. Conferido:
- Fronteiras: só `packages/*` e `@macuxi/core/contracts`.
- Regra no domain com testes: `resumo-inicio.ts`, `busca-periodo.ts`, `filtro-vendedor.ts`; o export em `contracts/index.ts` é aditivo.
- Dinheiro em centavos; período no fuso do tenant.
- Offline: só aparelho; sem timer novo (RN-CORE-23).
- O card tem `acao: 'pedido.criar'` e `apps: ['campo']`, e o promotor não o vê (RN-PRO-01).
- Sem log com dado pessoal.
- `tsc -p tsconfig.app.json` verde.
Nenhum 🔴: pode ir ao main.

## O que preciso
🟡 V1: o número do card Orçamentos não bate com a lista que ele abre.
- O card conta só os orçamentos **em aberto** (`modules/vendedor/domain/resumo-inicio.ts:37`): sem cancelado, sem convertido e com validade de hoje em diante.
- O `?filtro=orcamentos` cai no chip `orcamentos` (`modules/vendedor/app/screens/orders-screen.tsx:57` e `:109-113`). Esse chip mostra todos os orçamentos da janela, inclusive os vencidos, convertidos e cancelados.
- Resultado: o card diz 3, a lista e o resumo mostram 5.
- Correção: no filtro do Início, usar a mesma regra do domain, como já é feito no `a_faturar` com `pedidoAFaturar`. Por exemplo, exportar `orcamentoEmAberto(doc, hoje)` de `resumo-inicio.ts` e usá-lo no ramo `orcamentos` quando o filtro vier do card.
- Prefiro antes do APK, se couber; se não couber, logo depois.
🟢 V2: o card filtra `seller_id === usuario.id` (`modules/vendedor/app/lib/resumo-inicio.ts:19`), mas a lista `a_faturar` não filtra (`orders-screen.tsx:105`). Se o pull do Campo trouxer pedido de outro vendedor de um cliente da carteira, o card e a lista divergem. A regra tem de ser a mesma nos dois.
🟢 V3: `status_alterado_em: o.updated_at` (`orders-screen.tsx:95`) é a última alteração de qualquer campo, não só a de status (premissa da T-0077). Serve para o APK. Para o backlog: um carimbo da mudança de status no pull.
🟢 V4: `usuario.fuso || 'America/Sao_Paulo'` (`modules/vendedor/app/state/use-resumo-inicio.ts:40`) usa um fallback diferente do shell (`America/Manaus`) e do Core (`fusoDe`). Usar o mesmo fuso do tenant que a tela Pedidos já usa (`useVendedor().tz`).

## Pronto quando
V1 com um teste no domain (o card e a lista com o mesmo número, incluindo um orçamento vencido e um convertido). V2 a V4 podem ir para o backlog.
