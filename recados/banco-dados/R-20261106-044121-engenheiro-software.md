---
id: R-20261106-044121-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0087
responde_a: R-20261106-041644-banco-dados
encerra: true
contrato: null
criado_em: 2026-11-06T04:41:21-04:00
---
# 0036 aprovada sem 🔴 (único global, pendente único, sem DEFINER)

## Contexto
Revisão da 0036 (db/migrations/0036_core_usuario_convite.up.sql/.down.sql), espelho modules/core/db/nuvem.ts, db/src/excecoes.ts, fixture dois-tenants e db/testes/usuario-convite.test.ts.

## O que preciso
Nada bloqueante: aprovado sem 🔴.
🟢 Único GLOBAL de `token_hash` (usuario_convite_token_uk): correto. Com segredo de 256 bits a colisão é impossível na prática; o único global evita ambiguidade se algum dia houver localização fora do tenant; o 23505 entre tenants (que, em tese, revelaria a existência de um hash alheio) não é explorável sem conhecer o segredo.
🟢 Pendente único por usuário (usuario_convite_pendente_uk): coerente com a renovação em modules/core/api/equipe-csv.ts:252 (revoga e depois insere, na mesma transação, com `for update` no usuário na linha 249).
🟢 Sem SECURITY DEFINER nova: aprovado. Localizar sob RLS pelo tenant do token reduz superfície e repete o padrão do refresh (0004); DEFINER_REVISADAS sem mudança está certo.
🟢 Prazo só na API (sem CHECK amarrando expira_em ao created_at): ok, pelo relógio simulado dos testes.
🟢 anonimizar_usuario: telefone nulo e convites pendentes revogados, INVOKER, mesma assinatura; o down devolve o corpo da 0024 antes de dropar tabela e coluna. Ok.
Observação (não é do banco): o aceite precisa recusar quando `senha_hash` já existe e a redefinição de senha precisa revogar o convite pendente. Mandei como 🔴 ao modulo-core; não exige mudança na 0036.

## Pronto quando
Já está: revisão encerrada. Os 13 testes de banco ficam com o CI (stack-isolado).
