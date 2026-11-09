---
id: R-20261101-195046-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0038
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T19:50:46-04:00
---
# T-0038: APKs de preview com domínio fixo (campo aa9ca855, gestão be77a6c1, commit 0af7c1c), 2 builds FINISHED

## Contexto
T-0038 (domínio fixo da demo), passo dos builds. APKs de preview gerados do commit 0af7c1c do main (CI verde, run 41358517716), que inclui a entrega dos apps da T-0038 (eas.json com EXPO_PUBLIC_API_URL api-demo e EXPO_PUBLIC_PERFIL_BUILD=preview; login sem o campo Servidor). Disparo feito de uma worktree temporária limpa no 0af7c1c, no scratchpad (git status vazio; pnpm install --frozen-lockfile), então nada da pasta principal (modules/core e apps/api em edição por outros agentes) foi para a Expo. Worktree removida no fim.

## O que foi feito
- Bundle Metro local (expo export:embed --platform android --dev false) VERDE nas 2 variantes, com as variáveis do perfil preview (APP_VARIANT=campo|gestao, EXPO_PUBLIC_API_URL=https://api-demo.macuxifdv.com.br/v1, EXPO_PUBLIC_PERFIL_BUILD=preview). Conferido no bundle das duas: envUrl "https://api-demo.macuxifdv.com.br/v1" e lerPerfilBuild({ EXPO_PUBLIC_PERFIL_BUILD: "preview" }) inlinados (login sem campo Servidor; endereço salvo antigo ignorado). Nenhum endereço de rede local/trycloudflare do app no bundle (só os exemplos internos do expo-router/dev-server).
- 2 builds disparados (android, --non-interactive --no-wait), os 2 FINISHED, gitCommitHash 0af7c1c4b94b0f77af15e83df4c99736f1d427b0. Limite de 2 builds respeitado; nenhum novo disparo.
  - campo-preview — build aa9ca855-d2cb-4cac-a223-057b34567862 — APK: https://expo.dev/artifacts/eas/-j2R1plt2fqk25BX9CUV6aJfA4dW-W7RmaIGbRkU9JM.apk (página: https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/aa9ca855-d2cb-4cac-a223-057b34567862)
  - gestao-preview — build be77a6c1-7c35-4a81-bce9-5a8d0dd0a52d — APK: https://expo.dev/artifacts/eas/85bpIEGyrlCzhwxIusKIaFS9xbBzBtMIFWzDnwLIA00.apk (página: https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/be77a6c1-7c35-4a81-bce9-5a8d0dd0a52d)
- Não li nem copiei .env nem %USERPROFILE%\.cloudflared. Nenhum arquivo do repositório alterado (só o diário).

## Pendências / atenção
- O túnel nomeado ainda não existe (o Alexandre ainda vai rodar o "Uma vez só"; hoje há o bloqueio do configurar-dominio, R-20261101-190405). Até lá, os APKs novos mostram "Servidor indisponível — tente mais tarde" no login: é o ESPERADO, não é defeito do APK. Depois do túnel, nenhum build novo é necessário.
- APK interno com validade de link de 14 dias (expira em 2026-11-15).
- Segue aberto na minha caixa o 🟡 da revisão T-0034 (R-20261101-161003), já tratado com o it.fails na entrega da T-0038; falta só o recado de volta ao engenheiro-software.

## Pronto quando
Gerente repassa os 2 links ao Alexandre e registra em docs/status/demo.md e no quadro.
