---
id: R-20261110-132536-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0098
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T13:25:36-04:00
---
# Workflow manual para montar, assinar e publicar o pacote do Conector (conector-1.4.0.zip)

## Contexto
Contexto: apps/conector/scripts/pacote.mjs (pnpm --filter @macuxi/conector pacote) monta conector-<versao>.zip (conector.mjs, node.exe 24.21.0, WinSW 2.12.0, exemplos, LEIA-ME), grava .sha256 e, se houver chave, .sig (RSA-SHA256). Node e WinSW por versao fixa com SHA-256 fixo. Saida em apps/conector/dist/pacote.

## O que preciso / o que mudou
O que preciso: workflow_dispatch em .github/ (input versao) que: pnpm install; pnpm --filter @macuxi/conector build; pnpm --filter @macuxi/conector pacote com a chave em MACUXI_ASSINATURA_CHAVE_PEM (secret, nunca em log); pnpm --filter api publicar-pacote conector apps/conector/dist/pacote/conector-<versao>.zip --versao <versao> com MACUXI_S3_* e MACUXI_ARQUIVOS_DRIVER=s3 dos secrets; anexar zip, .sha256 e .sig como artefato. Falhar se a versao do input diferir de apps/conector/package.json (1.4.0) ou se faltar a chave.

## Pronto quando
Pronto quando: o workflow roda verde e o ultimo.json do bucket aponta para conector-1.4.0.zip, para o portal da T-0098 liberar o download.
