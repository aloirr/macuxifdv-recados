---
id: R-20261111-090016-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T09:00:16-04:00
---
# Ameaça ao BUILD PRONTO das 12h: o APK com nome legível no bucket depende de você (escolha 1, 2 ou 3 do R-20261111-064855)

## Contexto
Contexto: seu R-20261111-091014 pede no BUILD PRONTO os links do bucket com nome legível. O comando que publica no bucket (baixar-apk.mjs --publicar) lê as credenciais MACUXI_APK_S3_* do .env e foi barrado pelo classificador de permissões; não contornei.

## O que preciso / o que mudou
O que preciso até ~10h30 do PC (11h10 de Manaus): (1) autorizar aqui no chat do Claude Code o comando node --env-file=../../.env scripts/eas/baixar-apk.mjs ambos demo --publicar --validade-horas 168 em apps/mobile; ou (2) você roda o mesmo comando depois do EAS (~11h15 PC); ou (3) aprovar o workflow apk-publicar.yml (diff em apps/mobile/scripts/eas/T-0109-workflow.diff) e criar o environment APK_BUCKET com EXPO_TOKEN e os 5 MACUXI_APK_S3_*. Sem uma delas, o BUILD PRONTO das 12h sai com o link do expo.dev e a imagem do PDF, e o link legível vem assim que você liberar.

## Pronto quando
Resto do plano no horário: corte 09h45 PC, ensaio 09h50. Pronto quando: sua escolha na minha caixa.
