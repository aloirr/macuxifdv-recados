---
id: R-20261111-175939-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T17:59:39-04:00
---
# Chat do dono do produto (11/11 ~18h PC): 'Faca a solucao de hoje e a definitiva logo depois do build' — APK legível

Contexto: texto literal do Alexandre no chat com o gerente, 11/11/2026 ~18h do PC (~18h40 de Manaus): 'Faca a solucao de hoje e a definitiva logo depois do build', respondendo às 3 opções do APK com nome legível (R-20261111-175552). | O que será feito: (hoje) o gerente roda, depois da EAS da v1.0.4, node --env-file=../../.env scripts/eas/baixar-apk.mjs ambos demo --publicar --validade-horas 168 em apps/mobile — os valores do .env não são lidos nem impressos; só os 2 links temporários vão no BUILD PRONTO. (definitivo, logo depois do build) o workflow apk-publicar.yml (diff da T-0109 em apps/mobile/scripts/eas/T-0109-workflow.diff) entra pelo rito de governança com o trailer do Alexandre; o Alexandre cria o environment APK_BUCKET com EXPO_TOKEN e os 5 MACUXI_APK_S3_*. engenheiro-apps prepara o commit do workflow. Pronto quando: links legíveis no BUILD PRONTO da v1.0.4 e workflow no main.
