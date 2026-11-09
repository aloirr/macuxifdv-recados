---
id: R-20261105-071346-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0083
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T07:13:46-04:00
---
# T-0083: planoDeOnboarding e comando pnpm tenant:criar prontos (passos 1 e 4); falta o Core reexportar a política de senha

## Contexto
Passos 1 e 4 do desenho docs/desenho/T-0083.md (atualizado, §9). Sem commit, sem pnpm install, sem .env, sem Docker. A função do banco já existe: db/migrations/0029_plataforma_provisionar_tenant (banco-dados), e a interface confere.

## O que preciso / o que mudou
Feito: (1) packages/platform-sdk/src/onboarding.ts + onboarding.test.ts (13 testes RN-CORE-31: core sempre, dependência faltando recusa, opcional não recusa, perfis = manifesto, RN-PRO-01, código/fuso/licenças/admin) e export no index; suíte do SDK 433/433. (2) apps/api/src/cli/tenant.ts: executarTenant(argv, deps); senha só por MACUXI_TENANT_ADMIN_SENHA (removida do ambiente depois de lida) ou digitada 2x com eco desligado; qualquer opção com 'senha' em argumento é recusada sem ecoar; hash argon2id do @macuxi/db; conexão de administração; log de comando desligado na transação; --simular = rollback; fora do Postgres local exige --confirmar <codigo>; saída uma linha JSON com e-mail mascarado; erros do Postgres sem detail e com hash/e-mail/nome raspados. Testes: apps/api/test/cli-tenant.test.ts (16, banco falso, verdes) e apps/api/test/cli-tenant.banco.test.ts (3, contra a 0029: simular não grava, 2a rodada = mesmas contagens, módulo novo só acrescenta, --redefinir-senha troca só o hash; pulam sem Docker, rodam no CI). Scripts: tenant em apps/api/package.json e tenant:criar na raiz. tsc da API e do SDK (node e web) e eslint dos arquivos tocados verdes. verificar engenheiro-software OK.

## Pronto quando
Pendências: (a) modulo-core reexportar normalizarEmail/validarSenhaInicial em modules/core/api/index.ts (R-20261105-071302): até isso entrar, o comando recusa criar o admin, de propósito, para não ter uma regra paralela. (b) banco-dados exportar ehBancoLocal (R-20261105-071306); hoje a lista de hosts locais está copiada no comando. (c) Os testes de banco (meus e os da 0029) só rodam no CI. (d) modulo-core (onboarding.db.test.ts) e testes (isolamento) seguem pelos pedidos já enviados; revisão final da T-0083 depois deles. Premissas: o fuso padrão é America/Sao_Paulo (o padrão da coluna e o do desenho, não o America/Manaus do SDK); a senha é sempre pedida, mesmo na reexecução (sem --redefinir-senha ela não é usada); o hash vem do @macuxi/db e não do core/api/seguranca, porque esse não é exportado (é o mesmo formato PHC).
