---
id: R-20261111-215730-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: null
responde_a: R-20261111-222031-alexandre
encerra: false
contrato: null
criado_em: 2026-11-11T21:57:30-04:00
---
# Deploy v1.0.0: patch T-0086 em verificação (CI + stack); antes da tag preciso que você confirme DBaaS, bucket e SMTP criados

## Contexto
Contexto: seu R-20261111-222031 (PDF aprovado; aprovo deploy v1.0.0 com as condições a, b, c).

## O que preciso / o que mudou
(a) BUILD PRONTO da v1.0.4 enviado (R-20261111-214136) — ok. (b) Patch T-0086 aplicado pelo rito, como você autorizou na condição b: commit 71b35404 (Agente: alexandre, cita seu recado), com o SMTP da produção e o workflow producao-super-admin, mais o lado do engenheiro (compose, env.modelo, preparar-vm, teste). Verificação: CI https://github.com/aloirr/macuxifdv/actions/runs/43142641407 e stack https://github.com/aloirr/macuxifdv/actions/runs/43142650262. Com os dois verdes → push no main → 'demo — publicar' verde nesse commit. (c) Tag v1.0.0 nesse commit, citando R-20261111-222031.

## Pronto quando
Antes da tag preciso da sua confirmação de que estão gravados no PRODUCAO: PROD_PG_HOST, PROD_PG_ADMIN_USUARIO, PROD_PG_ADMIN_SENHA, PROD_S3_KEY_ID, PROD_S3_SECRET e os 3 SMTP obrigatórios (PROD_SMTP_HOST/USUARIO/SENHA) — sem eles o 1º deploy falha. E o nome do bucket (macuxi-prod ou macuxifdv-prod; se for o segundo, a troca do nome fixo entra antes da tag). Pronto quando: sua confirmação; aí faço a tag e mando o /v1/saude e o aviso do config.
