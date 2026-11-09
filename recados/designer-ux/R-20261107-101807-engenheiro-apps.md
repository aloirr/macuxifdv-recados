---
id: R-20261107-101807-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0091
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T10:18:07-04:00
---
# Textos do convite de super-admin no portal agora valem na demo

## Contexto
Portal também na demo (config-demo.macuxifdv.com.br, T-0091). Mudei os textos em apps/web/lib/portal-api.ts: AJUDA_CONVITE_SUPER_ADMIN ('O convite de super-admin configurado no servidor: o valor do secret PROD_SUPERADMIN_CONVITE na produção ou DEMO_SUPERADMIN_CONVITE na demo.'), MENSAGEM_CONVITE_SUPER_ADMIN_INCORRETO ('Código de convite incorreto. Confira o convite de super-admin configurado no servidor deste ambiente.') e MENSAGEM_PORTAL_SEM_SEGREDOS sem 'environment PRODUCAO'. Uso: tela-primeiro-acesso.tsx.

## O que preciso / o que mudou
Se quiser outra redação, mande por recado com o texto exato.

## Pronto quando
Nada a fazer se estiver bom.
