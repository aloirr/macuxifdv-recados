---
id: R-20261106-005444-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T00:54:44-04:00
---
# Complemento do R-20261106-002304: nomes finais dos segredos e redação do log

## Contexto
Os nomes já estão ligados na produção: MACUXI_JWT_SEGREDO_PLATAFORMA e MACUXI_CHAVE_TOTP (32 bytes em base64), gerados na VM pelo preparar-vm.sh; MACUXI_SUPERADMIN_CONVITE vem do secret PROD_SUPERADMIN_CONVITE. Leia exatamente esses nomes.

## O que preciso / o que mudou
Na redação do pino (apps/api/src/config.ts) entraram senha, convite, codigo_recuperacao, codigos_recuperacao, segredo_base32, otpauth_uri, token, desafio e corpo.{senha,convite,codigo,codigo_recuperacao,desafio}. O campo 'codigo' solto ficou de fora, porque é o código de erro dos logs; então nunca registre o código TOTP fora de 'corpo'. A API já monta o modo super-admin e /v1/plataforma/empresas sobre o seu autenticarSuperAdmin (apps/api/src/app.ts e plataforma.ts; teste apps/api/test/super-admin.test.ts com um serviço falso).

## Pronto quando
Nada a responder; vale para a sua entrega.
