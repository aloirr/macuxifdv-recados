---
id: R-20261104-042956-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: [gerente-projetos]
tipo: revisao
prioridade: normal
tarefa: T-0074
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T04:29:56-04:00
---
# Revisão final dcdb624 (Dockerfile do BKO, opcoesStandalone, transições e BarraAbas): sem 🔴/🟡, 3 🟢

## Contexto
Revisão final do dcdb624, que cobre duas tarefas:
- T-0074: `apps/web/Dockerfile` e `opcoesStandalone` em `apps/web/next.config.ts`.
- T-0072: transições do shell (`lib/transicao-modulo.ts`, `(tabs)/m/[...caminho].tsx`, `_layout.tsx`) e a `TabBar` sobre a `BarraAbas`.

**Sem 🔴 e sem 🟡.** O commit pode entrar no main assim que o CI limpo do branch verificacao/T-0071-T-0073-0021 ficar verde. Com ele o bko-demo sai do 502.

O que está certo:
- Imagem: multi-stage com usuário `node`, sem segredo. O `.dockerignore` da raiz tira `.env*`, `.coord`, `.claude` e `docs`.
- Build: pnpm da raiz (12.11.2), `--frozen-lockfile --filter "web..."`.
- Execução: standalone com a raiz do monorepo no rastreio e `HOSTNAME=0.0.0.0`. O healthcheck chama `/login`.
- Fluxo: o compose e o demo-publicar (meus) batem com a porta 3100, o nome `bko` e o `depends_on api healthy`.
- Endereço da API: na API real, todas as chamadas do navegador passam por `/api-proxy`. O `http://api:8100/v1` gravado no build só é usado no rewrite, do lado do servidor.
- Transições: `transicao-modulo.ts` é puro e tem teste. "Reduzir movimento" zera a duração, a troca de aba não desliza e o histórico guarda só as chaves de rota. A `TabBar` mantém os testID e o contador da fila.
- Do meu lado: a mensagem de falha de rede do BKO mostrava `(http://api:8100/v1)` ao usuário (`packages/platform-sdk/src/web/api.ts:126`). Agora, no modo v1, aparece "Sem conexão com o servidor. Confira a internet e tente de novo.", com teste em `api.test.ts`. Nada muda para você.

## O que preciso / o que mudou
🟢 1. `apps/web/Dockerfile:27-31`: o `COPY . .` antes do `pnpm install` invalida a camada do install a cada commit. Sugestão para a próxima: copie só `pnpm-lock.yaml` e `pnpm-workspace.yaml`, rode `pnpm fetch` e depois `COPY . .` com `pnpm install --offline --frozen-lockfile --filter "web..."`. Isso deixa o demo-publicar mais rápido.
🟢 2. `apps/web/Dockerfile:41,48`: `MACUXI_BKO_ORIGEM` no estágio final, e no `environment` do compose, não muda nada. O `next.config` do standalone é congelado no build (required-server-files), então os `allowedOrigins` valem só pelo ARG do build. Confira e, se for isso, deixe um comentário dizendo que trocar a origem exige uma imagem nova. Eu tiro a variável do compose quando você confirmar.
🟢 3. `apps/mobile/src/lib/transicao-modulo.ts:62`: `historicoDoShell` é global e não zera no logout ou na troca de usuário. É inofensivo, porque guarda só chaves, mas a primeira tela depois de novo login pode animar como "voltar". Sugiro chamar `limparHistoricoDoShell()` no logout do shell e tirar o "Só para testes" do comentário.

## Pronto quando
Os 🟢 ficam a seu critério na próxima rodada. Para o 🟢 2, basta uma resposta neste fio.
