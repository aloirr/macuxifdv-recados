---
id: R-20261101-175940-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0038
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T17:59:40-04:00
---
# T-0038 (apps): endereço fixo por perfil EAS, login sem campo Servidor fora do dev, BKO atrás do bko-demo

## Contexto
T-0038 (domínio fixo da demo), parte do engenheiro-apps (apps/mobile, apps/web). Sem build EAS: os builds campo-preview e gestao-preview saem depois, com o main verde e a sua ordem.

## O que foi feito
1. **Perfis EAS** (`apps/mobile/eas.json`): cada perfil leva `EXPO_PUBLIC_API_URL` e a flag nova `EXPO_PUBLIC_PERFIL_BUILD`.
   - `campo` e `gestao` (dev): `https://api-demo.macuxifdv.com.br/v1`, flag `desenvolvimento`.
   - `campo-preview` e `gestao-preview`: o mesmo endereço, flag `preview`.
   - Produção: os perfis `campo-producao` e `gestao-producao` já existiam (AAB, autoIncrement). Ganharam `https://api.macuxifdv.com.br/v1` e a flag `producao`. Não criei um perfil `producao` à parte, para não duplicar.
2. **Login sem o campo Servidor nos builds preview e producao** (`apps/mobile/src/lib/endereco-do-build.ts`, puro e testado; `state/plataforma.tsx`; `app/login.tsx`; `app/profile.tsx`):
   - A decisão vem só da flag do build. Sem a flag, o bundle `__DEV__` conta como desenvolvimento e o de release como endereço fixo.
   - Endereço fixo: o endereço salvo por versão antiga do app é ignorado na carga, e `setApiUrl` não grava nada.
   - A verificação de `/v1/saude` continua. Se ela falhar, ou se a conexão cair no meio do login, a tela mostra "Servidor indisponível — tente mais tarde" (banner `login.servidor-indisponivel`). A mensagem não cita endereço nem /v1.
   - Desenvolvimento: o link "Avançado" (`login.avancado`, alvo de 48 dp) abre o cartão Servidor de antes. O rótulo avisa quando há endereço personalizado.
   - No Perfil: o endereço aparece só para leitura nos builds fixos (`profile-server-fixo`); no dev, o editor continua.
   - A tela do Core (`tela-login.tsx`) não mudou; o tratamento está todo no shell.
3. **BKO** (`apps/web/next.config.ts`): `allowedDevOrigins` e `experimental.serverActions.allowedOrigins` aceitam `bko-demo.macuxifdv.com.br` e o host de `MACUXI_BKO_ORIGEM` (`hostsDoBko`).
   - Combinado com o engenheiro-software (R-20261101-173453 → R-20261101-173817): BKO na 127.0.0.1:3100 com `next build` + `next start`, e `NEXT_PUBLIC_API_URL=http://127.0.0.1:8100/v1` no build e no start.
   - **Diferença em relação ao pedido:** no modo v1 o navegador só chama o próprio BKO (`/api-proxy`), e é o servidor Next, no notebook, que repassa à API. Esse repasse vai pelo loopback, e não por `https://api-demo.macuxifdv.com.br/v1`. Motivos: evita a volta pela Cloudflare e evita que todos os usuários do BKO dividam o mesmo limite de login por IP. A API não precisa de CORS.
4. **Revisão da T-0034** (R-20261101-161003): `abas.test.ts` ganhou o `it.fails` "promotor com o Vendedor efetivo". A resposta foi ao engenheiro-software.

## Testes
- mobile: 58 testes (14 novos em `src/lib/endereco-do-build.test.ts`), cobrindo:
  - o build preview sem o campo e o dev com "Avançado";
  - o endereço salvo antigo ignorado;
  - "Servidor indisponível" sem endereço;
  - o eas.json conferido perfil a perfil.
- web: 19 testes, 3 novos (`lib/hosts-bko.test.ts` novo).
- Lint e typecheck verdes no mobile e no web.
- Bundle Android verde nas 2 variantes, com a flag preview e o endereço api-demo.
- `verificar engenheiro-apps` sem violações.

## Pendências
- Builds campo-preview e gestao-preview (no máximo 2, `--non-interactive --no-wait`): aguardam a sua ordem com o main verde.
- O teste no aparelho fica com o testes, com a demo no ar: APK sem campo e API fora do ar mostrando a mensagem.
- No dev client, o JS vem do Metro do PC: o endereço do eas.json só vale se o `expo start` rodar com as mesmas variáveis. O campo em "Avançado" cobre a rede local.
- 🟢 da T-0034 (primeiro sync sem /me/modulos): fica para uma tarefa futura do shell.
