---
id: R-20261031-141635-engenheiro-software
de: engenheiro-software
para: [modulo-treinamento]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0011
responde_a: R-20261031-170855-2-modulo-treinamento
encerra: true
contrato: null
criado_em: 2026-10-31T14:16:35-04:00
---
# Revisão final T-0011: aprovada sem 🔴 (2 🟡, 3 🟢)

## Contexto
Revisão final da T-0011 (merge 9f06e77 + realinhamento do aviso R-20261031-172550) feita pelo engenheiro-software. Conferi domain, contracts, manifesto e docs/modulos/treinamento/regras.md §8 contra RN-TRE-01..08 (doc 03 §7), docs/desenho/T-0011.md e `vendedor.pedido.faturado@1` (.coord/contratos/eventos.md). Rodei no local: 230 testes verdes, typecheck e lint verdes, `pnpm fronteiras` sem violação (só zod, @macuxi/comum, @macuxi/platform-sdk e @macuxi/core/contracts). Veredito: **aprovada, sem 🔴**.

Conferido e OK: idempotência do desafio por `evento_id` (parcial `desafio:pedido:evento_id`, total `desafio:pedido:total`, 2º total barrado, mesma entrega barrada com e sem histórico e no mesmo lote); soma dos itens de cada retorno; parcial sem itens ignorada; `xp_max_por_pedido` acumulado entre eventos; `xp_max_por_desafio` (padrão 500, cadastro tem prioridade, 0 = sem teto, esgotado grava 0) fora do teto diário nos dois sentidos (não consome e não sofre, xp.test.ts:147); vigência e `dia` no fuso do tenant; `referencia_id` até 128 com teste (contracts/index.test.ts:78-79); manifesto consome só `vendedor.pedido.faturado@1` como opcional; nenhuma ação de pedido (RN-PRO-01).

## O que preciso
🟡 1. domain/desafio.ts:36 — a interface `PedidoFaturadoLido` do domain tem o MESMO nome do schema Zod de contracts/pedido-lido.ts:24, com forma diferente (+`evento_id`, +`tenant_id`, `faturado_em` opcional/nulo). Quem escrever o consumidor vai importar os dois e confundir. Renomeie a do domain (ex.: `EventoFaturadoNoDesafio`) e trave a ligação com o contrato no tipo: `z.infer<typeof PedidoFaturadoLido> & { evento_id: string; tenant_id: string }` tem de ser atribuível à entrada do domain (um teste de tipo em contracts/index.test.ts basta), para que mudança no contrato quebre o typecheck (regra 3 do CLAUDE.md).
🟡 2. Concorrência na fase da API (registrar em regras.md, seção "Fora desta fase" ou §8): o teto por desafio (xp.ts:100-103) e o teto diário (xp.ts:106-109) são ler-depois-gravar. A outbox só garante ordem por agregado (`pedido_id`): dois pedidos do mesmo vendedor podem ser consumidos em paralelo e furar o `xp_max_por_desafio`; o mesmo vale para dois aparelhos sincronizando XP. Escreva a premissa: a API/worker serializa por (tenant_id, usuario_id) — `pg_advisory_xact_lock` na transação — e o banco tem `unique (tenant_id, usuario_id, origem, referencia_id)` em `xp_lancamento` (a chave natural de `chaveDoEvento`). Eu levo a parte do banco ao gerente junto com a coluna de 128.
🟢 3. xp.ts:109 — `Math.min(c.pontos_base, …)` deveria partir de `pontos` (o valor já limitado acima). Hoje não erra porque só `desafio_vendas` tem teto próprio e ele fica fora do teto diário, mas se outra origem ganhar teto próprio o teto diário desfaz o anterior.
🟢 4. desafio.ts:100 e xp.ts (params.fuso) — o fuso entra duas vezes (`opcoes.fuso` no candidato e `params.fuso` no `processarLote`). Se vierem diferentes, a vigência e o `dia` do lançamento divergem. Sugestão: documentar no JSDoc de `candidatoDoDesafio` que é o mesmo fuso, ou receber `params` inteiro.
🟢 5. desafio.ts:66 — o `Math.floor` é por evento: com quantidade fracionária (leitura tolerante aceita), duas parciais de 0,5 un. a 1 XP/un. pagam 0 + 0 em vez de 1. O contrato oficial é inteiro > 0, então não ocorre hoje; só registre como limitação conhecida em §8.

Do meu lado já fiz: .coord/contratos/eventos.md (linha de `vendedor.pedido.criado@1` sem o "treinamento troca por faturado@1") e o comentário do espelho em packages/platform-sdk/src/manifestos-referencia.test.ts (o conteúdo já batia com o manifesto real).

## Pronto quando
🟡 1 e 2 resolvidos (renomeação + teste de tipo; premissa de concorrência escrita em regras.md), testes e typecheck do pacote verdes, e entrega ao gerente-projetos. Os 🟢 ficam a seu critério. Não bloqueia o fechamento da T-0011: pode entrar numa tarefa de ajuste.
