---
id: R-20261102-211151-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0065
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T21:11:51-04:00
---
# Build EAS preview 22h: pronto (eas.json com environment explícito), comando e checklist de credencial

## Contexto
Conferência de prontidão do build EAS de preview das 22h (Campo e Gestão), sem disparar build e sem `pnpm install`. Main conferido: 76eb872 (desde a89018c só db/docs; nada de app). Firebase (FCM V1 + variável de arquivo `GOOGLE_SERVICES_JSON`) configurado pelo dono do produto; não li nem copiei o arquivo.

## O que conferi
1. `apps/mobile/eas.json`: perfis `campo-preview` e `gestao-preview` (APK interno, sem dev-client), `APP_VARIANT` campo/gestao, `EXPO_PUBLIC_API_URL=https://api-demo.macuxifdv.com.br/v1`, `EXPO_PUBLIC_PERFIL_BUILD=preview`, node 24.21.0, pnpm 12.11.2. **Alteração minha:** `"environment"` explícito em todos os perfis (`preview` nos *-preview, `production` nos *-producao, `development` nos de dev), para o EAS puxar a `GOOGLE_SERVICES_JSON` do ambiente preview sem depender da regra implícita (chave aceita pelo schema do @expo/eas-json do eas-cli 27.2.0).
2. `apps/mobile/.gitignore`: `google-services.json` e `GoogleService-Info.plist` ignorados (proteção; o arquivo só vem do EAS).
3. `apps/mobile/app.config.ts`: `googleServicesFile` só quando `process.env.GOOGLE_SERVICES_JSON` existe (testado com e sem a variável, caminho fictício); plugins `expo-background-task` e `expo-notifications` (canal `avisos`, igual ao `CANAL` de `src/services/push.ts`); `main` = `./index.ts` (expo-router/entry + tarefas globais de segundo plano e push); owner `macuxifdv`, projectId 48bb6c9b-e9ae-46af-ae98-abe16b450446; pacotes `br.com.macuxi.campo` / `br.com.macuxi.gestao`. `expo config` resolvido nas duas variantes. Sem mudança.
4. Dependências: `pnpm-lock.yaml` consistente com os 19 package.json (o `--frozen-lockfile` do EAS passa); hoisted com expo 57.0.31, expo-notifications 57.0.24, expo-background-task 57.0.21, expo-task-manager 57.0.21, react-native 0.86.3.
5. Bundle Android (`npx expo export --platform android`, env de preview): **Campo verde** (--clear, hbc 5,1 MB). **Gestão em andamento** (máquina carregada; o Campo levou 25 min) — mando recado assim que terminar. O JS das duas variantes é o mesmo (APP_VARIANT não é inlinado no código; muda só a config embutida).
6. apps/mobile: typecheck verde · 136/136 testes verdes · lint verde.

## O que preciso (comando exato, PowerShell, a partir de apps/mobile, DEPOIS do commit verde que inclui eas.json e .gitignore)
```
cd C:\macuxifdv\apps\mobile
npx eas-cli build --platform android --profile campo-preview --non-interactive --no-wait
npx eas-cli build --platform android --profile gestao-preview --non-interactive --no-wait
```
(eas-cli 27.2.0; `eas build ...` dá no mesmo se o `eas` global estiver no PATH.) Só esses 2 builds; o das 00h repete os mesmos 2 comandos a partir do commit da meia-noite. O EAS envia o working tree: rode com a árvore limpa (git status sem mudança em apps/, modules/, packages/).

## Se o EAS acusar credencial (painel expo.dev > macuxifdv > macuxi-fdv)
- **Credentials > Android > br.com.macuxi.campo e br.com.macuxi.gestao**: Keystore padrão presente (no `--non-interactive` o EAS não gera keystore nova; se faltar, uma vez `npx eas-cli credentials -p android` interativo pelo dono do produto); **FCM V1 service account key** cadastrada nos dois pacotes.
- **Environment variables**: `GOOGLE_SERVICES_JSON` do tipo **arquivo** (file), visibilidade Secret, marcada em **preview** (e production). Se o log do build não mostrar a variável carregada, ela não está no ambiente preview.
- **Gradle `No matching client found for package name 'br.com.macuxi.gestao'` (ou campo)**: o mesmo google-services.json serve às duas variantes, então precisa conter os DOIS apps Android do projeto Firebase (registrar os dois pacotes e baixar o arquivo de novo). Quem confere é o dono do produto; nenhum agente abre o arquivo.
- `appVersionSource: remote`: versionCode controlado pelo EAS; preview não auto-incrementa (normal).

## Pronto quando
Commit verde com eas.json e .gitignore; os 2 builds na fila do EAS; links por recado ao dono do produto. Nenhum build disparado por mim. Pendência: confirmação do bundle da Gestão (recado em seguida).
