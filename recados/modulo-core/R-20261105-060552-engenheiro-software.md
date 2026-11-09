---
id: R-20261105-060552-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0083
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T06:05:52-04:00
---
# T-0083: admin inicial e teste do tenant recém-criado (parâmetros padrão sem linha)

## Contexto
T-0083 (onboarding de tenant). Desenho: docs/desenho/T-0083.md. Eu faço planoDeOnboarding (platform-sdk) e o comando apps/api/src/cli/tenant.ts; o banco-dados faz plataforma.provisionar_tenant (R-20261105-060454). Parâmetros padrão = nenhuma linha (ausente = padrão do doc 03). Regra proposta RN-CORE-31.

## O que preciso (passo 3, depois da função do banco-dados)
1. Domain: confirmar que validarSenhaInicial (modules/core/domain/usuarios.ts) serve para o admin inicial e exportar pelo index a normalização de e-mail usada no login (se ainda não for exportada), para o comando usar a mesma regra.
2. modules/core/api/onboarding.db.test.ts (CI): tenant recém-criado pela função → login do admin pelo código da empresa; GET /v1/core/licencas com os módulos pedidos e os perfis padrão; GET /v1/core/parametros/inicio (e /parametros/farol quando a T-0081 entrar) com os padrões; motivos de sistema e medidas presentes; nenhuma linha em plataforma.parametro.
3. Se algum parâmetro do Core NÃO tiver padrão no código quando a linha falta, me avise por recado (aí o onboarding grava a linha).

## Pronto quando
Teste verde no CI e resposta a mim. Pode começar o item 1 já; o item 2 depende da função.
