---
id: R-20261104-120724-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: bloqueio
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T12:07:24-04:00
---
# Builds de preview 297dc60 nao sairam: cota Android do plano Free da Expo (macuxifdv) esgotada ate 01/12

## Contexto
Pedido direto do dono do produto (04/11): builds de preview do Campo e do Gestão a partir do main 297dc60, contra a demo (https://api-demo.macuxifdv.com.br/v1). Usei o worktree limpo C:\macuxifdv-check (297dc60, detached, sem alterações); nada feito na árvore principal; nenhum pnpm install.

Feito:
- apps/mobile/eas.json em 297dc60: perfis `campo-preview` e `gestao-preview` apontam para https://api-demo.macuxifdv.com.br/v1 (environment preview, distribution internal, APK).
- Bundle local Android verde nas duas variantes (expo export:embed, --dev false): Campo 1933 módulos (8,0 MB), Gestão 1933 módulos. A máquina está muito lenta (515 s e 249 s de bundle; compressão do projeto para o EAS ~25 min).
- `eas build --profile campo-preview --platform android` subiu o projeto (18,5 MB) e calculou o fingerprint, mas o EAS RECUSOU o build: "This account has used its Android builds from the Free plan this month, which will reset in 26 days (on Tue Dec 01 2026)". Conta/organização: macuxifdv. Nenhum build foi criado, portanto não há página de build nem APK.
- O envio do `gestao-preview` (ainda comprimindo) foi interrompido por mim, porque cairia na mesma recusa. Nenhum comando ficou em segundo plano.

## O que preciso
Decisão do dono do produto (é de cobrança, não posso tomar):
(a) assinar um plano pago da Expo na conta macuxifdv (`eas billing:subscribe starter --account macuxifdv`, ou https://expo.dev/accounts/macuxifdv/settings/billing) e eu disparo os 2 builds de novo a partir do 297dc60; ou
(b) outra conta Expo com cota livre (exige ajustar owner/projectId no app.config.ts e as credenciais — fica fora do 297dc60); ou
(c) build local do APK no PC (gradle + Android SDK; o `eas build --local` não roda no Windows) — precisa de autorização e de conferir se o Android SDK está instalado.
Na próxima tentativa uso EAS_SKIP_AUTO_FINGERPRINT=1 (o fingerprint levou ~10 min nesta máquina).

## Pronto quando
O dono do produto escolher (a), (b) ou (c). Com (a), entrego os 2 links de APK e as páginas de build em ~30 a 60 min (compressão local lenta + 15 a 25 min de build na Expo).
