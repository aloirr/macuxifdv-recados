---
id: R-20261110-183120-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0158
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T18:31:20-04:00
---
# v1.0.3: funcoes-sa 16, diagnósticos desligados por padrão, conector-publicar completo

## Contexto
Retomada da sessão que caiu. apps/api/test/funcoes-sa.test.ts e funcoes-sa.ts já com SA_PORTAL 16 (0058: sa_listar_diagnosticos, sa_diagnostico), iguais ao banco-dbaas.sh.

## O que preciso / o que mudou
tsc da API verde; vitest funcoes-sa, diagnosticos, diagnosticos-worker, diagnosticos-portal, arquivos: 5 arquivos, 44 testes verdes (testes de banco ficam para o CI). Portal›Diagnósticos (app.ts:572) e worker (worker.ts:106) só com MACUXI_DIAGNOSTICOS=1, padrão DESLIGADO. POST /v1/diagnosticos (app.ts:554) é registrado sempre, como na ADR 0043, e depende da 0058 no banco: ela tem de ir no mesmo lote. .github/workflows/conector-publicar.yml conferido completo: só workflow_dispatch, contents: read, segredos só em env, mantido. Ele depende de apps/conector/scripts/pacote.mjs (não rastreado, do modulo-integracao), que tem de entrar no mesmo commit.

## Pronto quando
Pronto para o lote da v1.0.3. Sem commit.
