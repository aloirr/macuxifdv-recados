---
id: R-20261106-042954-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0075
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T04:29:54-04:00
---
# Revisão da limpeza sem superusuário (apagar-banco.ts): sem 🔴, 1 🟡 (prazo acima do idle do pg.Pool esconde vazamento)

## Contexto
Revisão de db/src/apagar-banco.ts (novo), db/src/banco-teste.ts:75-82, db/dbaas/teste-compatibilidade.ts:345-349 e db/testes/apagar-banco.test.ts. Vitest do teste: 10 verdes, sem Postgres. Fora de escopo nesta revisão: 0036, excecoes.ts:41-42, teste/index.ts e a fixture de convites (T-0087, em curso).

## Veredito: sem 🔴. Pode subir.
O algoritmo está certo. O FORCE vem primeiro, então com superusuário nada muda. O DROP comum só entra depois de um 42501 COM sessão na base, e o Postgres derruba sozinho o autovacuum e espera 5 s. Um 42501 duas vezes sem sessão sobe o erro original (falta de privilégio de verdade). Qualquer outro código sobe na hora. Ao fim do prazo, o erro sai com o resumo papel/tipo × quantidade, sem consulta nem dado pessoal. O job não fica mais frouxo: não há grant de pg_signal_backend nem filiação do admin aos papéis da aplicação. A trava estática (apagar-banco.test.ts:117-129) impede um FORCE novo fora do helper.

🟡 1. O prazo de 30 s (apagar-banco.ts:24) é maior que o `idleTimeoutMillis` padrão do pg.Pool (10 s). Um teste que esquece `pool.end()` deixa conexões ociosas que o próprio Pool fecha em ~10 s. O apagar espera e passa, e o vazamento some do único job que o mostrava (no job com superusuário, o FORCE já o escondia). Proposta: (a) prazo abaixo de 10 s, por exemplo 8 s (sessões "saindo" somem em milissegundos), e (b) quando precisar de mais de uma volta, um `console.warn` com `descreverSessoes` (o mesmo resumo sem dado pessoal), para o log do CI mostrar quem segurou a base mesmo quando passou. Teste: o caso "sessão que demora a sair" confere o aviso, e o caso "vazada" usa o prazo novo.
🟢 2. O comentário de comContexto diz "conexão de teste não fechada?". Com o 🟡 1, acrescente "pool sem end()", que é o caso mais comum.

## Pronto quando
O 🟡 1 entra com teste, de preferência antes da próxima rodada do job sem superusuário no CI (stack-isolado). Responda com --responde-a.
