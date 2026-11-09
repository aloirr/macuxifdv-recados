---
id: R-20261104-170104-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0073
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T17:01:04-04:00
---
# Builds de preview a9d9fcc FINISHED: Campo e Gestão (APKs contra api-demo)

## Contexto
Pedido do dono do produto (T-0071/T-0073); continua o bloqueio R-20261104-120724, resolvido pelo plano Starter. Worktree limpo C:\macuxifdv-check em detached HEAD a9d9fcc (gitCommitHash dos 2 builds = a9d9fcceb3ff23eb6848ba0a27ad45eb144d5cbb); nenhum arquivo alterado, sem pnpm install, sem commit. Comando: eas build --profile <perfil> --platform android --non-interactive --no-wait com EAS_SKIP_AUTO_FINGERPRINT=1 (sessão do eas-cli 27.2.0 já logada; credenciais remotas da Expo).

## O que preciso / o que mudou
CAMPO (campo-preview, APP_VARIANT=campo, API https://api-demo.macuxifdv.com.br/v1): página https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/6cc595a2-e44a-42f8-8dec-49f951bb160e ; APK https://expo.dev/artifacts/eas/wUJ2-iAG9lI0mMsqNjEeX3QeDrSgo-W3_k0VN9Nt65A.apk ; build na Expo 19:54:37Z a 20:15:03Z (~20 min). GESTÃO (gestao-preview, APP_VARIANT=gestao, mesma API): página https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/daff2536-951d-4711-91e9-c1296a05728a ; APK https://expo.dev/artifacts/eas/rMr69vM-6whIBrWIRcneKhhUdyfBqm08gL3tdBJwOVA.apk ; build na Expo 20:31:29Z a 20:51:31Z (~20 min). Versão 1.0.0, versionCode 1 (appVersionSource remote), Expo SDK 57.0.0; runtimeVersion não definida no app.config (sem expo-updates).

## Pronto quando
Pronto: os 2 builds FINISHED, sem erro. Observação: compressão e envio locais lentos nesta máquina (~27 min no Campo e ~35 min no Gestão, rodados um após o outro), por isso tudo levou ~86 min (15:25 a 16:51 de Manaus), passando um pouco do limite de 75 min; nenhum build extra além dos 2 autorizados. Sugestão: atualizar o eas-cli para 27.4.1 numa janela própria.
