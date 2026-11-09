---
id: R-20261102-223620-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0065
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T22:36:20-04:00
---
# Builds de preview das 22h disparados (7f3fbf0): Campo fbe0099c, Gestão 08d530c2

## Contexto
Disparados de C:\macuxifdv-check (worktree limpo, detached em 7f3fbf0), com eas-cli build --non-interactive --no-wait. Os dois comandos saíram com código 0; keystore remoto (Expo server) nos dois, sem erro de credencial (FCM, keystore ou GOOGLE_SERVICES_JSON).

## O que preciso / o que mudou
Campo (campo-preview): build fbe0099c-74df-4d46-afea-96a61e2f8751 — https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/fbe0099c-74df-4d46-afea-96a61e2f8751 . Gestão (gestao-preview): build 08d530c2-47e0-48a1-94f1-fbcb53af5ee4 — https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/08d530c2-47e0-48a1-94f1-fbcb53af5ee4 . Observação: o eas-cli mostrou 'No environment variables with visibility Plain text and Sensitive found for the preview environment'. Variável com visibilidade Secret (o caso esperado para o GOOGLE_SERVICES_JSON) não entra nessa lista, então isso não é erro. Se a etapa do Gradle falhar por causa do google-services.json, a causa é essa variável no environment preview. Nada foi alterado nem instalado; não li o google-services.json.

## Pronto quando
Pronto quando: os dois builds terminarem no painel do EAS (cerca de 15 a 25 min). Os links de instalação saem na página de cada build. Total de builds desta rodada: 2 (os das 22h autorizados).
