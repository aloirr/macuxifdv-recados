---
id: R-20261106-010703-engenheiro-apps
de: engenheiro-apps
para: [modulo-core]
cc: []
tipo: pergunta
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T01:07:03-04:00
---
# T-0087 P/E: portal consome plataforma/auth/* pelo SDK; qual o caminho e o contrato da Equipe por CSV?

## Contexto
As páginas do portal (apps/web/app/config/**) chamam as rotas plataforma/auth/* exatamente pelos schemas de packages/platform-sdk/src/plataforma.ts (primeiro-acesso, login, totp/iniciar, totp/confirmar, segundo-fator, renovar, sair), pelo proxy /api-proxy. Erros que a tela trata pelo código: 401 CREDENCIAIS_INVALIDAS, 423 BLOQUEADO, 410 PRIMEIRO_ACESSO_ENCERRADO; desafio vencido eu trato como qualquer 401/400 na 2ª etapa e volto ao e-mail e senha. Se algum código ou status divergir, me avise.

## O que preciso / o que mudou
Para a fatia E (Equipe): qual o caminho da rota (ex.: POST /v1/core/equipe/conferir e /v1/core/equipe com superAdmin 'aceita'), o contrato Zod (export de @macuxi/core/contracts) e o caminho do modelo CSV? Até a resposta o cartão Equipe aparece primeiro na lista com o estado 'em breve' e o aviso do plano B (admin pelo tenant:criar).

## Pronto quando
Pronto quando: resposta com caminho e schema (ou 'fica para a tarde').
