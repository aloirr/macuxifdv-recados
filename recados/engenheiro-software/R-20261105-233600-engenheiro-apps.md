---
id: R-20261105-233600-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0086
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T23:36:00-04:00
---
# T-0086: texto do §5 item 6 do desenho (comandos do APK de produção)

## Contexto
T-0086. O `docs/desenho/T-0086.md` é seu, e o gerente pediu que o roteiro traga os comandos do build de produção do app. Os perfis estão na minha resposta ao R-20261105-224349.

## O que preciso
Cole no `docs/desenho/T-0086.md`, §5, no lugar do item 6 atual:

**6. APK de produção (Campo e Gestão).** Só depois do passo 4 verde e do tenant de teste criado. Nenhuma keystore no repositório: a assinatura é a gerenciada pela EAS.

**Antes:**
- `https://api.macuxifdv.com.br/v1/saude` mostra `"servico":"macuxi-api"` e `"versao":"v1.0.0"`;
- o commit da tag está numa cópia limpa (`C:\macuxifdv-check`), com `pnpm install --frozen-lockfile`;
- o bundle local está verde nas duas variantes, com estes comandos (PowerShell, em `apps/mobile`):

```
$env:APP_VARIANT='campo';  $env:EXPO_PUBLIC_API_URL='https://api.macuxifdv.com.br/v1'; $env:EXPO_PUBLIC_PERFIL_BUILD='producao'; pnpm exec expo export:embed --eager --platform android --dev false --bundle-output $env:TEMP\prod-campo.js --assets-dest $env:TEMP\prod-campo-assets
$env:APP_VARIANT='gestao'; pnpm exec expo export:embed --eager --platform android --dev false --bundle-output $env:TEMP\prod-gestao.js --assets-dest $env:TEMP\prod-gestao-assets
```

**Build** (2 builds, um por variante; nada além disso sem autorização do Alexandre):

```
cd C:\macuxifdv-check\apps\mobile
npx eas-cli build --platform android --profile campo-producao  --non-interactive --no-wait
npx eas-cli build --platform android --profile gestao-producao --non-interactive --no-wait
```

- Cada build gera um APK assinado e uma página de instalação (`distribution: internal`). O link vai por recado ao gerente.
- O versionCode sobe sozinho (`autoIncrement`). O APK de produção instala por cima do de preview, porque o pacote é o mesmo (`br.com.macuxi.campo`/`br.com.macuxi.gestao`). A sessão e a base local são por usuário, então os dados da demo não se misturam.

**Conferência no aparelho:**
- o login não tem campo Servidor;
- entra no tenant de teste com um usuário **vendedor ou promotor** (Campo) e **supervisor ou gerente** (Gestão). O admin do tenant só usa o BKO. Se o `tenant:criar` só cria o admin, é preciso criar esses usuários antes;
- sincroniza e mostra o Início.

**Se o build falhar** na fase de bundle: corrija, refaça o bundle local e só então refaça o build.

## Pronto quando
- O §5 item 6 do `docs/desenho/T-0086.md` tem os comandos acima.
- Ou você me responde se prefere outro texto ou outros nomes de perfil.
