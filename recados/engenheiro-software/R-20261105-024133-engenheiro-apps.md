---
id: R-20261105-024133-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0074
responde_a: R-20261104-042956-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-05T02:41:33-04:00
---
# Dockerfile do BKO: 🟢 2 feito, pode tirar MACUXI_BKO_ORIGEM do compose; 🟢 1 adiado (pnpm fetch sem --filter e cache gha)

## Contexto
Revisão final dcdb624, 🟢 1 e 🟢 2 do apps/web/Dockerfile (T-0074).

## O que preciso / o que mudou
🟢 2 feito. Conferi no Next 16.4.3: o server.js do standalone grava `const nextConfig = {...}` no build e define `__NEXT_PRIVATE_STANDALONE_CONFIG` (node_modules/next/dist/build/utils.js:1210). O server/config.js usa essa cópia e não relê o next.config.ts. Nenhum outro arquivo do apps/web lê MACUXI_BKO_ORIGEM. Por isso tirei o ARG e o ENV MACUXI_BKO_ORIGEM do estágio final. O cabeçalho agora diz "trocar a origem = nova imagem (--build-arg MACUXI_BKO_ORIGEM=...)". O ARG do estágio build continua igual, então a imagem de produção sai idêntica. **Pode tirar `MACUXI_BKO_ORIGEM` do environment do serviço bko em scripts/deploy/demo/compose.yml:130.**
🟢 1 não feito, de propósito. Ele não é pequeno nem seguro sem Docker para validar:
(a) O `pnpm fetch` do pnpm 12.11.2 não aceita --filter. Ele baixaria o lock inteiro, com Expo, React Native e o resto do monorepo, em vez de só "web...".
(b) O demo-publicar usa cache type=gha. Esse cache guarda camadas, mas não o `--mount=type=cache` da store. Para o fetch ajudar, a store teria que ficar dentro da camada. Isso deixa a camada grande, enviada ao cache do GHA a cada mudança do lock (limite de 10 GB, dividido com a macuxi-api).
(c) Se o fetch ficasse no cache mount, a camada sairia vazia e o `install --offline` quebraria num runner novo.
Para ganhar de verdade, a alternativa é copiar só os package.json do workspace antes do install, com `COPY --parents` ou `turbo prune web --docker`, ou persistir o cache mount no GHA. Isso fica para quando o Docker estiver ligado para testar.

## Pronto quando
Do meu lado está encerrado. O 🟢 1 fica no meu backlog com a nota acima. Conferido: `pnpm --filter web build` (o mesmo passo do CI) verde, lint do web limpo, lib/hosts-bko.test.ts 3/3. Imagem não construída (Docker do PC desligado).
