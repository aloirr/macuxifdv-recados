---
id: R-20261101-203404-modulo-treinamento
de: modulo-treinamento
para: [alexandre, gerente-projetos]
cc: [engenheiro-software]
tipo: entrega
prioridade: normal
tarefa: T-0036
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T20:34:04+00:00
---
# T-0036: Treinamento — 🟡/🟢 da revisão final no PR #28 (tipo único do pedido faturado)

## Contexto
T-0036 (nuvem), ajustes da revisão final da T-0011 (R-20261031-141635-engenheiro-software). PR: https://github.com/aloirr/macuxifdv/pull/28 (branch nuvem/T-0036-treinamento-revisao). Só alterei modules/treinamento/** e docs/modulos/treinamento/regras.md.

## O que fiz
- 🟡1 Tipo único: o domain não declara mais `PedidoFaturadoLido`. contracts/pedido-lido.ts ganhou `EventoFaturadoNoDesafio` (payload `PedidoFaturadoLido` + `evento_id`/`tenant_id` do envelope), `EVENTO_PEDIDO_FATURADO` e `lerPedidoFaturado(payload, envelope)`. Nessa leitura o envelope prevalece sobre o payload, e o que estiver fora do contrato vira null. domain/desafio.ts recebe só esse tipo, então mudança no contrato quebra o typecheck. Testes novos: teste de tipo (expectTypeOf) e leitura do `vendedor.pedido.faturado@1` de ponta a ponta (RN-TRE-08).
- 🟡2 Premissa de concorrência escrita em regras.md §8: `pg_advisory_xact_lock` por (tenant_id, usuario_id) e unique (tenant_id, usuario_id, origem, referencia_id) em `xp_lancamento`. A parte do banco continua com o engenheiro-software → gerente.
- 🟢3 xp.ts: o teto diário parte de `pontos`. Hoje o comportamento é o mesmo; a troca só protege o futuro.
- 🟢4 `OpcoesDesafio` estende Pick<ParametrosTreinamento,'fuso'|'xp_max_por_desafio'>: passa-se o mesmo `params` ao candidato e ao lote. Há teste na virada do dia comparando SP e Manaus.
- 🟢5 Arredondamento por evento registrado como limitação conhecida, sem correção (o contrato manda quantidade inteira).

## Testes
Treinamento: 230 → 237 verdes. pnpm lint, pnpm typecheck, pnpm fronteiras e `coord verificar modulo-treinamento --base origin/main` verdes. No contêiner falharam o Core/autenticação (Node 22 sem crypto.argon2) e os testes de banco (sem Docker), por causa do ambiente.

## Merge
Não fiz merge porque o CI do main (c969f2a, run #76) está VERMELHO no passo "testes". O PR fica marcado [PRONTO PARA MERGE] quando o CI dele ficar verde e o main voltar ao verde.

## Premissas
A ficha T-0036.md não existe (o gerente registra). O 🟡2 entrou porque é só documentação. Ainda não existe handler na API: o consumidor futuro usa `lerPedidoFaturado(payload, ctx.envelope)`. Falta a linha do diário em .coord/diario/modulo-treinamento.md; fica para o gerente, porque na nuvem não altero .coord.

## Pronto quando
CI do PR e do main verdes → merge squash; quadro e diário atualizados pelo gerente.
