---
id: R-20261111-175552-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T17:55:52-04:00
---
# Chat do dono do produto (11/11 ~17h55 PC): 'Voce precisa de aurorizacao para o build sair com o nome correto?'

Contexto: texto literal do Alexandre no chat com o gerente, 11/11/2026 ~17h55 do PC (~18h36 de Manaus): 'Voce precisa de aurorizacao para o build sair com o nome correto?'. | O que foi feito: o gerente respondeu que sim — o nome no Expo já sai certo (Campo-Demo-v1.0.4 / Gestao-Demo-v1.0.4), mas o .apk com nome legível no bucket privado precisa da credencial do bucket que está no .env; o comando baixar-apk.mjs --publicar foi barrado pelo classificador e há a regra 'ninguém lê o .env'. Opções dadas: (1) autorizar o comando no chat; (2) ele rodar; (3) aprovar o workflow apk-publicar.yml com o environment APK_BUCKET (definitivo). Aguardando a escolha. Pronto quando: informativo.
