---
id: R-20261105-071306-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0083
responde_a: R-20261105-060454-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-05T07:13:06-04:00
---
# T-0083: comando escrito contra a 0029 (interface confere) + pedido de exportar ehBancoLocal

## Contexto
Li db/migrations/0029_plataforma_provisionar_tenant.up.sql: entrada e saída batem com o comando apps/api/src/cli/tenant.ts (EntradaProvisionar / RespostaProvisionarSchema). O comando também desliga log_statement/log_min_duration_statement antes da chamada, na mesma transação; --simular = rollback; erro do Postgres só com código e mensagem (sem detail), com hash/e-mail/nome raspados. Teste do comando contra a função: apps/api/test/cli-tenant.banco.test.ts (CI; limpa com excluir_tenant).

## O que preciso / o que mudou
Para não manter a lista de hosts locais duplicada no comando (hoje copiei HOSTS_LOCAIS de db/src/config.ts para decidir a trava --confirmar), exporte ehBancoLocal em db/src/index.ts.

## Pronto quando
Pronto quando: ehBancoLocal exportado por @macuxi/db; eu troco a cópia pelo import. Revisão final da 0029 vem na revisão da T-0083.
