---
id: R-20261031-141636-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0011
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T14:16:36-04:00
---
# Revisão final T-0011: APROVADA (sem 🔴) + pendências de backlog (banco-dados e API)

## Contexto
Revisão final da T-0011 (Treinamento: domain, contracts, manifesto, regras.md §8) pelo engenheiro-software, depois do merge 9f06e77 e do realinhamento R-20261031-172550. Rodei no local: 230 testes, typecheck e lint verdes; `pnpm fronteiras` sem violação; platform-sdk 95 testes verdes.

## Veredito: APROVADA (sem 🔴)
Idempotência por `evento_id`, soma dos itens, `xp_max_por_pedido` acumulado, `xp_max_por_desafio` fora do teto diário e fuso do tenant estão conforme RN-TRE-01..08 e o desenho T-0011. Achados ao modulo-treinamento (recado de pedido nesta tarefa): 🟡 1 nome `PedidoFaturadoLido` repetido em domain/desafio.ts:36 e contracts/pedido-lido.ts:24 com formas diferentes (renomear + teste de tipo); 🟡 2 registrar a premissa de concorrência (serializar XP por tenant+usuário na API); 3 🟢. Nenhum bloqueia o fechamento.

Arquivos meus nesta revisão: .coord/contratos/eventos.md (linha de `vendedor.pedido.criado@1` sem a menção ao treinamento) e packages/platform-sdk/src/manifestos-referencia.test.ts (só o comentário do espelho do treinamento; o conteúdo já batia).

## O que preciso (gerente)
1. **Backlog, banco-dados** (quando a API do Treinamento for escrita): `treinamento.xp_lancamento.referencia_id` com pelo menos **varchar(128)** (a referência do desafio tem até 110: `desafio_id:pedido_id:evento_id`; o contrato `LancamentoXp` já aceita 128) e `unique (tenant_id, usuario_id, origem, referencia_id)` (chave natural da idempotência do XP, `chaveDoEvento`). Junto com as tabelas `desafio_vendas`, `desafio_vendas_produto` e `publico_alvo` já pedidas (R-20261031-105033).
2. **Backlog, API do Treinamento**: o consumidor de `vendedor.pedido.faturado@1` e a sincronização de XP serializam por (tenant_id, usuario_id) (`pg_advisory_xact_lock`): a outbox só ordena por pedido, e dois pedidos do mesmo vendedor em paralelo furariam o `xp_max_por_desafio`.
3. **Doc 03 (seu)**: a RN-TRE-08 diz "idempotente por pedido". Pelo desenho T-0011 §2 o certo é: "idempotente por evento (`evento_id`); os retornos do mesmo pedido (parciais e total) somam até `xp_max_por_pedido`".
4. Aviso: durante a revisão o guardião de Bash acusou alteração em modules/core/api/autenticacao.test.ts e modules/core/api/erros.ts depois de um comando meu só de leitura. É o modulo-core trabalhando em paralelo; não desfiz nada.

## Pronto quando
Itens 1 e 2 no backlog, RN-TRE-08 ajustada no doc 03 e T-0011 fechada.
