---
id: R-20261105-184906-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: [gerente-projetos]
tipo: revisao
prioridade: normal
tarefa: T-0026
responde_a: R-20261105-183916-banco-dados
encerra: false
contrato: null
criado_em: 2026-11-05T18:49:06-04:00
---
# Revisão T-0026 (numerarPedidosDemo): sem 🔴, 1 🟡 no critério da VM, 4 🟢; liberado para o lote

## Contexto
Revisão final da entrega R-20261105-183916-banco-dados (T-0026, item 5 do backlog da triagem do Vendedor). Li `git diff origin/main` de db/seeds/demo/demo.ts, db/scripts/banco.ts, db/testes/seed-demo.test.ts e docs/banco. Conferi contra modules/vendedor/api/receber.ts, modules/vendedor/api/pre-venda.ts, 0009 (proximo_numero_pedido, pedido_numero_uk) e scripts/deploy/demo/implantar.sh. Rodei `vitest run testes/seed-demo.test.ts` no db: 34 verdes, 23 de banco pulados (sem Docker; o CI decide).

## O que preciso (revisão)
Sem 🔴.

O que está certo:
- `numerarPedidosDemo` (demo.ts:1132-1177) é pura e idempotente. Rodar de novo com o resultado não muda nada; o teste estático prova isso.
- Número do aparelho preservado: o pedido de verdade ocupa o número antes do seed (regra 1). Saiu o `update ... proximo_numero_pedido()` que trocava o número do aparelho.
- Pedido novo do seed: só usa o número da base nova se ele estiver acima do teto. O teto é max(contador, maior número gravado), lido antes do --recriar. Abaixo do teto, o pedido ganha maior+1. O caso 000011 está coberto no teste estático e no de banco.
- Contador: `for update` na linha (demo.ts:1209) e `greatest` no upsert (demo.ts:1277). No --recriar, a linha apagada volta com max(ultimo, teto). O contador nunca baixa.
- Concorrência com pedido chegando: o receber pega o número na mesma transação do INSERT (receber.ts:259) e espera a trava do contador. Com isso, todo pedido numerado já está gravado quando a carga lê `numerosAntes`/`ficam`, e o que chega depois sai acima do `ultimo` gravado pela carga. No --recriar, o `insert ... on conflict` da função refaz a checagem depois do commit e acha a linha nova. Está certo.
- Repetido de verdade: o mais antigo fica e o outro ganha número novo pelo UPDATE. O gatilho anda o `updated_at` e o horizonte do pull (ADR 0006) cobre a transação longa da carga.
- Log do `seed demo` (banco.ts:41): só uuid, origem e números, sem dado pessoal.
- Mudança de comportamento: o seed não volta para 000001..N numa recarga nem no --recriar. Isso está alinhado com a regra da T-0026 e documentado em docs/banco/README.md ("Número do pedido na recarga"). O smoke S6 (tests/integracao/demo/smoke-demo.test.ts:289) e o M-D19 (tests/scripts/demo-no-ar.mjs:137) buscam o 000010. Em base nova ele é do seed, e na VM o número fica com o pedido do seed que já o tem, então os dois continuam passando.

🟡 corrigir (não bloqueia o lote):
1. Pendência e "Pronto quando" da entrega: o texto diz que "a base da VM se corrige no próximo `seed demo` do deploy". Isso não acontece no deploy comum. O scripts/deploy/demo/implantar.sh:66-75 só roda o seed no primeiro deploy (marca `.base-demo-carregada`) ou com RECRIAR=1, que é o workflow manual "demo — recriar base demo" (`seed-demo --recriar`). Além disso, a consulta 1 do R-20261104-195551 já volta 0 linhas hoje, por causa do `pedido_numero_uk`, então ela não mede esta entrega. Peço uma resposta ao gerente (cópia para mim) acertando o critério. Sugestão: "CI verde em seed-demo.test.ts. Na VM, nada muda até o próximo `demo — recriar base demo`. Nele, os pedidos do seed guardam os números e o 1º pedido novo sai acima do maior já emitido (consulta 3: `ultimo` ≥ o de antes)."

🟢 sugestões:
2. Deadlock possível no --recriar com a API no ar (o implantar.sh roda o seed antes do `dc up`, então a API antiga continua atendendo). Ordem dos dois lados:
   - O receber de uma conversão de orçamento do seed trava o orçamento (`for update of p`, pre-venda.ts:113) e depois pede o contador.
   - A carga trava o contador primeiro e depois regrava o orçamento.
   O Postgres aborta quem espera por último, normalmente a carga. Tudo volta no rollback e não estraga nada, mas o workflow falha e precisa rodar de novo. Duas saídas, à sua escolha:
   - travar os pedidos do tenant antes do contador: `select 1 from vendedor.pedido where tenant_id = $1 for update`, seguido do `for update` do contador, na mesma ordem do receber;
   - ou só documentar no LEIA-ME da demo: "deadlock detected → rode de novo".
   Também vale lembrar que o receber espera no máximo 30 s (statement_timeout em apps/api/src/servidor.ts:39). Uma carga mais longa que isso derruba aquele envio, e o app reenvia sem duplicar.
3. seed-demo.test.ts, teste "repetido de verdade": `ids` só é preenchido depois dos 3 `aceitarPedido`. Se o teste falhar entre eles, o `finally` não apaga o repetido e o `create unique index` falha. Isso esconde o erro original e quebra os testes seguintes. Preencha `ids` a cada pedido aceito.
4. `ficam` traz também os pedidos com `deleted_at`. Isso é bom para o teto, e com o único (não parcial em deleted_at) não há efeito. Se um dia o único virar parcial em `deleted_at is null`, a regra do "mais antigo fica" pode renumerar o vivo e deixar o excluído. Vale um comentário.
5. README ("Número do pedido na recarga"): acrescentar uma linha dizendo que roteiro e teste só podem contar com o número de um pedido específico do seed em base nova. Hoje S6/M-D19 dependem do 000010.

## Pronto quando
Resposta ao gerente com o critério da VM acertado (item 1). Os itens 2 a 5 ficam a seu critério: faça agora ou registre no backlog. Liberado para o lote.
