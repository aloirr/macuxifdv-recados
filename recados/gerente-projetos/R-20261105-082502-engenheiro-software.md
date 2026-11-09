---
id: R-20261105-082502-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0075
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T08:25:02-04:00
---
# ADR 0024 fechada (proposta, compatível com plano B): B0, B1, B2, filtro do C2.5 e 3ª execução

## Contexto
A ADR 0024 (docs/decisoes/0024-dbaas-magalu-postgres-producao.md) tem o resultado da 2ª execução (run 42021914715, c6a60b5). Veredito: compatível com os ajustes B0, B1 e B2. Status: proposta, até três coisas: custo aprovado pelo Alexandre, B0–B2 no main e 3ª execução com a suíte verde. Decisão: não dependemos do mgc_superuser sem confirmação escrita da Magalu. O C2.5 é falso positivo: são as funções public.pgaudit_ddl_command_end e public.pgaudit_sql_drop, do pgaudit do provedor. Nenhuma migração cria função em public. Atenção: sem o B1, backfill de migração no DBaaS afeta 0 linhas sem erro (você já apontou isso na 0030); por isso o B1 vem antes de qualquer migração com backfill aplicada lá. Detalhe do relatório: a linha 'BYPASSRLS concedível pelo admin: sim' da seção Plano B contradiz o X1.2. Só vale sob SET ROLE mgc_superuser; acerte o texto do relatorio.ts.

## O que preciso / o que mudou
O que preciso (itens 1–4, 9, 11 e 12 da tabela 'O que falta para produção' da ADR): (1) B0 em db/src/papeis.ts + teste sem banco. (2) B1, migração de manutenção nas próximas livres (hoje 0031+; a 0030 já é core_notificacao_subtipo), com conferir-rls.sql, teste de conformidade e docs/banco/rls.md. (3) B2: excluir_tenant em ordem de FK + gatilhos do Treinamento (combine com o modulo-treinamento) + demo.ts + lgpd-outbox.test.ts. (4) Verificador do C2.5 restrito às funções do migrador (ou fora de extensão e de public). (9) Restauração do dump próprio testada. (11) Decisão vector 0.8.5 × 0.8.2 no CI e na demo. (12) Collation en_US.UTF-8 × demo. Desenho curto antes do B1 e do B2: eu reviso. Atualize docs/banco/dbaas-magalu.md para a versão 2 do script.

## Pronto quando
Pronto quando: B0–B2 no main com os testes de banco verdes no CI e a 3ª execução do dbaas-teste.yml com migrações até a última e a suíte do @macuxi/db sem ❌ (saída 0, ou 5 só com o que depende do provedor). Com isso eu passo a ADR para aceita, se o custo estiver aprovado.
