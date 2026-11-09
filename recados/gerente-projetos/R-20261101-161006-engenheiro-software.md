---
id: R-20261101-161006-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0034
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T16:10:06-04:00
---
# Revisão final T-0034 e T-0035: 0 🔴, 2 🟡 (abas.test regra 7; pedido.db.test fixture/fuso), resto 🟢

## Contexto
Revisão final de arquitetura (somente leitura) da T-0034 (engenheiro-apps, entrega R-20261101-155929) e da T-0035 (modulo-vendedor, entrega R-20261101-155709). Base: git diff/status do working tree em 2026-11-01 16:08. Rodei vitest de `apps/mobile/src/lib/abas.test.ts` (7 verdes) e `modules/vendedor/api/leitura.test.ts` (7 verdes). Não rodei o typecheck do web para não regenerar arquivo nesta passada.

**Veredito: 0 🔴 · 2 itens 🟡 (1 por tarefa) · 🟢 no resto. Nenhum bloqueio de commit.**

### T-0034 (engenheiro-apps)
- 🟢 `apps/web/.gitignore:5` + `apps/web/package.json:12` (`next typegen && tsc --noEmit`, next 16.4.3): correto. O CI (`.github/workflows/ci.yml`) continua funcionando sem o arquivo versionado: o `lint` do web (`eslint app components lib`) não é type-aware e não precisa do next-env; o passo `typecheck` gera o next-env antes do `tsc`; o `next build` gera o dele; `typecheck:tests` usa `tests/tsconfig.json` (só `tests/**`) e não depende do next-env; turbo `typecheck: {}` sem outputs, e o arquivo ignorado fica fora do hash. A exclusão staged (`D apps/web/next-env.d.ts`) precisa ir no mesmo commit do `.gitignore`.
- 🟢 `apps/mobile/src/lib/abas.ts:54-58`: puro, testado, limite de 5 com "Mais" sem mudar os testIDs atuais (Campo 5, Gestão 3). `abaAtiva` cobre as telas dentro do "Mais". `(tabs)/mais.tsx` só lista o que o shell já montou (sem regra, funciona offline). `_layout.tsx:29` registra a rota. Ícone `menu` em `packages/ui/src/mobile/icon.tsx:38,189` ok.
- 🟢 `apps/mobile/src/lib/efetivos-locais.ts:13-14` + `state/plataforma.tsx:186,243`: fecha o furo de licença (sem `/v1/me/modulos` guardado, a API real monta só o Core; o 404 só cai no padrão do perfil no modo demo). **O offline não quebra**: a última resposta fica no estado do motor (`modulosAtivos`) e é lida no `carregar()`. **O primeiro login não regride**: o estado do motor já começava vazio (não puxava dados de módulo sem `/me/modulos`); só a barra mudou de "todas as abas vazias" para "só Início" até o sync.
- 🟡 `apps/mobile/src/lib/abas.test.ts:67-76` (regra 7): o teste só cobre o promotor SEM o Vendedor nos efetivos. Falta o caso do doc 03 ("RN-PRO-01 vale pelo perfil, não pelo módulo"): promotor com o Vendedor efetivo. Hoje esse caso mostraria Pedidos, porque `modulosEfetivos` não filtra por `manifesto.perfis` e a página `pedidos` (`modules/vendedor/app/index.ts:24`) não tem `perfis` (o engenheiro-apps já pediu isso no item 1 da R-20261101-155135). Recado enviado ao engenheiro-apps.
- 🟢 `state/plataforma.tsx:252-256`: no primeiro sync (nada guardado), se `/me/modulos` falhar e o pull passar, o usuário entra só com o Core até o próximo sync. Sugestão: nesse caso, falhar o sync e deixar o usuário na tela /sync com "tentar de novo".

### T-0035 (modulo-vendedor)
- 🟢 `modules/vendedor/api/pedidos.ts:161-165`: `/alcadas` por `perfis` [vendedor, supervisor, gerente, analista, assistente, admin] = `manifest.perfis` (`modules/vendedor/manifest.ts:16`). Bate com a matriz do doc 03 §2: quem cria/edita pedido (vendedor, sup/ger, analista, assistente), quem aprova (sup/ger/analista) e o admin (parâmetros, RN-AUD-01); o promotor fica fora (RN-PRO-01). A API checa com `verificarAcesso(u, { modulo, perfis: rota.perfis ?? manifesto.perfis })` (`apps/api/src/app.ts:310`), e o `definirModuloApi` impede promotor em `perfis`. Sugestão: omitir `perfis` (o padrão já é `manifesto.perfis`) ou derivar do manifesto, para não duplicar a lista.
- 🟢 `pedidos.ts:112`: `ctx.fuso()` no lugar de `plataforma.tenant`. O fallback passa de São Paulo para `America/Manaus` (`FUSO_PADRAO_TENANT` = `DEFAULT_TZ` de `@macuxi/comum`), o que é coerente. Restam só chamadas a `plataforma.tenant_atual()` (função de RLS, permitida no S0-014).
- 🟢 `leitura.test.ts:17-24`: 403 `PERFIL_SEM_ACESSO` do promotor pela mesma função que a API usa; o ponta a ponta via `createApp` fica com o testes (`tests/integracao/api/promotor-pedido.test.ts`).
- 🟡 `pedido.db.test.ts:37`: a busca da tabela da fixture por `k.endsWith('.cliente') && k.startsWith('co')` é frágil (casa com qualquer schema que comece por "co"); use a chave exata (`'core.cliente'` etc.). E `:73` fixa `fuso: () => 'America/Manaus'`: o teste de período "fuso do tenant" (`:436`) não prova a virada do dia. Recado enviado ao modulo-vendedor.
- 🟢 `pedido.db.test.ts:495`: janela do pull com `Date.now()` está certa (`updated_at` vem do relógio do banco).

### Pendências minhas
- `docs/desenho/T-0001.md:284` diz que `next-env.d.ts` é versionado: corrijo na próxima passada (não alterei nada nesta).
- O `ctx.fuso()` (SDK + API) é meu e está no mesmo working tree (`packages/platform-sdk/src/fuso.ts`, `fuso.test.ts`, `api.ts`, `index.ts`, `apps/api/src/app.ts:233-262`, `licencas.ts:54-62`, testes em `apps/api/test/`): vai no commit da T-0035.
- Exceções do S0-014 em `tests/fundacao/fronteiras-schema.test.ts`: com o testes (em andamento).

## O que preciso
Fechar T-0034 e T-0035 do ponto de vista de arquitetura (sem 🔴). Os 2 🟡 podem entrar como continuação nas próprias tarefas ou no backlog, a seu critério.

## Pronto quando
O commit da rodada leva a exclusão staged do next-env junto do `.gitignore` e os arquivos do `ctx.fuso()`.
