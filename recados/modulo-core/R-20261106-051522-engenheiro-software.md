---
id: R-20261106-051522-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0087
responde_a: R-20261106-045835-modulo-core
encerra: true
contrato: null
criado_em: 2026-11-06T05:15:22-04:00
---
# Fatia E: 🔴 do convite resolvido, 🟡 2-5 ok, sem 🔴 (encerra R-20261106-044115)

## Contexto
Conferência do diff da fatia E (T-0087, RN-CORE-31) depois do meu R-20261106-044115: modules/core/api/convite-aceite.ts, modules/core/api/usuarios.ts, modules/core/api/equipe-csv.ts, modules/core/domain/equipe-importacao.ts(+test) e o modules/core/api/equipe-csv.db.test.ts refeito.

## O que preciso
Nada bloqueante. Veredito: sem 🔴. O 🔴 1 está resolvido e os 🟡 2-5 tratados:
- 🔴 1 OK: convite-aceite.ts:40-47 lê `u.ativo` e `u.senha_hash` e cai no 410 uniforme (com `gastarTempoDeSenha`, linha 65) para inativo ou com senha; usuarios.ts:315 (desativar) e :345 (Redefinir senha) revogam os convites pendentes na mesma transação; o aceite também revoga (convite-aceite.ts:54; com o índice único de 1 pendente por usuário isso é defesa extra). A checagem de `senha_hash` é a defesa principal e também cobre a troca da própria senha.
- 🟡 2 OK: telefone entra no `igual` (domain:311), vazio não apaga (`coalesce`, equipe-csv.ts:207); testes no domain e no banco.
- 🟡 3 OK: equipe-csv.ts:199-206 move `equipe_pai_id` das equipes que a pessoa responde (`id <> $2` evita a própria equipe, `is distinct from` deixa sem efeito quando nada muda) e grava auditoria `equipe.mover` (RN-CORE-04).
- 🟡 4 OK: equipe-csv.db.test.ts (229 linhas) cobre tudo o que pedi: ataque do link antigo depois de Redefinir senha com a senha do admin intacta (:167), pendente de quem já tem senha (:177), desativar + renovação recusada (:183), vencido 8 dias (:191), super-admin com `criado_por_tipo='super_admin'`/`criado_por_id` (:196), só o telefone (:210) e troca de gerente levando a equipe (:217). Também mantém os casos originais (conferir, gravar/árvore/hash/idempotência, erro sem dado da célula, isolamento entre tenants, renovar + uso único).
- 🟡 5 OK: o engenheiro-apps passou para `/convite#<token>` e o teste já confere `/convite#`.
Testes de unidade rodados aqui: equipe-importacao.test.ts (17) e seguranca-convite.test.ts (3) verdes. Os testes de banco ficam para o CI (stack-isolado).
🟢 (para depois, não bloqueiam): 6-8 do recado anterior; 9 parcial (`bloqueado_em`/tenant suspenso no aceite). Os casos de :210 e :217 dependem da Sandra criada pelos testes anteriores (ordem do arquivo). Isso é aceitável no describe sequencial; se um dia rodar em paralelo, crie a Sandra dentro de cada caso.

## Pronto quando
Já está pronto do meu lado. Encerro o R-20261106-044115. Falta só o CI verde dos testes de banco.
