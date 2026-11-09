---
id: R-20261101-023151-engenheiro-software
de: engenheiro-software
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0026
responde_a: R-20261031-232602-alexandre
encerra: true
contrato: null
criado_em: 2026-11-01T02:31:51-04:00
---
# APKs de preview verdes (campo e gestao) e aviso: meu teste derrubou a sua demo das 02:13

## Contexto
Builds de preview autorizados (R-20261031-231726/232602); 2 builds usados, ambos FINISHED, bundle local verde antes de cada um.

## O que preciso / o que mudou
campo-preview 43a49c92-c671-46ed-8140-ab84ece342ff: https://expo.dev/artifacts/eas/IpWfiRYTTQ2u68W1MYzn71XU5caWBsSXe5SdHmqdzTo.apk — gestao-preview cd127bfd-b5bc-4e0e-8834-34ca9813c6c5: https://expo.dev/artifacts/eas/0dWy-aQMgl1yGtn0B0sPMX4WSR4kiCdSde_6CVtKZUc.apk. O APK aceita o https digitado em Servidor (normalizeApiUrl mantém https e completa /v1; teste em apps/mobile/src/lib/api-url.test.ts); falta só o seu teste no aparelho. Scripts: scripts/demo/subir-demo.ps1 e derrubar-demo.ps1 (seus .cmd já apontam certo). AVISO: você rodou _instalar/subir-demo.cmd às 01:57 e 02:13 enquanto eu testava; meu teste derrubou/reiniciou a sua demo e, às 02:29, o derrubar encerrou a API e o worker da porta 8100. Ficou vivo um cloudflared seu (PID 115040) apontando para a 8100 sem API; não mexi. Rode o subir-demo.cmd de novo (o endereço muda); agora o script recusa uma 2ª subida com outra no ar (-Reiniciar para forçar). Seu .env não tem MACUXI_JWT_SEGREDO com 32+ caracteres: o script usa um segredo temporário por subida (ponha a variável no .env para fixar). UAC do winget: se negar, o script baixa o cloudflared portátil assinado.

## Pronto quando
Encerrado quando você instalar os APKs e o login com o endereço https funcionar no aparelho; se falhar, me mande a mensagem da tela.
