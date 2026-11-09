---
id: R-20261031-170855-modulo-treinamento
de: modulo-treinamento
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0011
responde_a: R-20261031-102323-gerente-projetos
encerra: true
contrato: null
criado_em: 2026-10-31T17:08:55+00:00
---
# T-0011 v2: faturamento parcial, manifesto só com pedido.faturado@1 e regras.md (229 testes)

## Contexto
T-0011 (ajustes v2), resposta à revisão R-20261031-102323-gerente-projetos. Branch nuvem/T-0011-ajustes-decisoes, sem git do meu lado. Ajustes A (xp_max_por_desafio=500), B (streak só com lição concluída/quiz respondido até o fim), C (desafio paga no faturamento) e D (tempo mínimo = max(30 s, 50% da duração)) já estavam aplicados; esta rodada fechou o faturamento parcial e o manifesto.

## O que foi feito
Veredito da revisão: domínio, contracts e manifesto revisados contra doc 03 (seção 7) e CLAUDE.md, sem 🔴. Fronteiras ok (pnpm fronteiras limpo; o Treinamento não importa nada do Vendedor). Os 🟡/🟢 baratos viraram as mudanças abaixo.

1. Faturamento parcial (`modules/treinamento/domain/desafio.ts`, `contracts/pedido-lido.ts`): payload `vendedor.pedido.faturado@1` lido com `parcial` (boolean, padrão false; campos extras ignorados; `itens` ausente vira vazio). Parcial sem itens é ignorada (motivo `PARCIAL_SEM_ITENS`, sem XP nem lançamento). Nova `candidatosDoDesafio(desafio, pedido, gerarId, {lancamentos})`; `candidatoDoDesafio` virou atalho do total (recusa evento parcial com RangeError).
2. PREMISSA de idempotência (o desenho docs/desenho/T-0011.md citado pelo Alexandre NÃO existe no repositório): total = chave por pedido_id (`desafio:pedido`); parcial = chave por (pedido_id, produto_id) (`desafio:pedido:produto`); item já pago não paga de novo; total depois de parciais paga só os itens ainda não pagos; parcial depois do total não paga nada; em cada evento parcial `quantidade` é a faturada naquele evento; sem estorno. O máximo por pedido (`xp_max_por_pedido`) vale para o pedido todo (descontando o que parciais já pagaram). Consequência: 2ª parcial do mesmo produto não paga a quantidade nova (um pagamento por produto e pedido). Registrado em docs/modulos/treinamento/regras.md §8.
3. Manifesto: consome só `vendedor.pedido.faturado@1` (opcional), sem `vendedor.pedido.criado@1`; sem texto de "provisório"; nota de que publicador/registro em .coord/contratos/eventos.md são do engenheiro.
4. regras.md: sem seção de premissas a confirmar; cada decisão como regra citando a RN-TRE mais próxima (só existem RN-TRE-01 a 04) ou o RF-TRE; parâmetros do tenant com padrão; seção "Mapa das regras por RN-TRE" e "Fora desta fase".
5. Testes de borda (escritos antes): pedido sem faturamento não gera XP; parcial sem itens ignorado; mesmo pedido faturado duas vezes não paga duas vezes (total e parcial); parcial seguido de total paga só o restante; total já pago + parcial não paga; teto do desafio no meio do pedido (já existia no caso total; novo no parcial). Confirmados já existentes: quiz abandonado não conta para a sequência (progresso.test.ts, streak.test.ts), lição sem duração usa 30 s, lição de 10 min exige 5 min (progresso.test.ts).

## Testes
Treinamento: 229 verdes (215 antes + 14). lint, typecheck e `pnpm fronteiras` ok; `pnpm --filter @macuxi/platform-sdk test` 78 verdes (manifestos-referencia.test.ts ainda lista o Treinamento consumindo `vendedor.pedido.criado@1`: é cópia estática e não quebra, mas está desatualizada; pedido ao engenheiro). `node scripts/coord.mjs verificar modulo-treinamento --base origin/main` sai 0.
Testes antigos alterados (só por mudança de contrato): contracts/index.test.ts: (a) "lê o que precisa e ignora campos a mais" agora espera `parcial: false` no resultado; (b) "payload sem o necessário (ex.: sem itens) é recusado" deixou de usar `itens` ausente (agora aceito como vazio, e o domínio ignora o parcial sem itens), passou a testar `vendedor_id` ausente e quantidade 0; título do describe sem "nome pendente". manifest.test.ts: título e nova asserção de que não consome `vendedor.pedido.criado@1`. Nenhum teste de desafio.test.ts foi alterado; só acrescentados.

## Pendências
Banco-dados, quando a API for escrita: pedir tabela `desafio_vendas` e campos novos (já listado em regras.md). Revisão final e atualização de contratos: pedido ao engenheiro-software (recado separado).
