---
id: R-20261109-123552-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0117
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T12:35:52-04:00
---
# T-0117 (parte da plataforma): refresh do BKO em cookie httpOnly gravado pela API, CSRF por cabeçalho, SDK web sem token no localStorage (ADR 0038); faltam Core e apps/web no mesmo lote

## Contexto
T-0117: o token de renovação do BKO sai do `localStorage` e vai para um cookie httpOnly com CSRF, antes de ligar a produção.
- Decisão: **ADR 0038**, que altera a ADR 0008 §4.
- Desenho: `docs/desenho/T-0117.md` **v2**. A v1 da madrugada punha route handlers no Next; a v2 põe a regra na API, pelos motivos da ADR.

## O que foi feito (só nos meus caminhos)

| Parte | Arquivos | Testes |
|---|---|---|
| Capacidade de plataforma `RotaPublica.cookieSessao` (`emitir`/`renovar`/`encerrar`), regras puras do cookie e do CSRF, conferida na subida | `packages/platform-sdk/src/cookie-sessao.ts` (novo), `api.ts`, `index.ts` | `cookie-sessao.test.ts` 6/6 |
| API: modo cookie na rota pública; `MACUXI_SESSAO_COOKIE_SEGURO`; redação de `Set-Cookie` e `refresh_token` no log | `apps/api/src/sessao-web.ts` (novo), `app.ts`, `config.ts`, `servidor.ts` | `apps/api/test/sessao-web-cookie.test.ts` 21/21; `config`, `log-seguro` e `rota-publica-cabecalhos` verdes |
| SDK web: nenhum token no `localStorage`, restauração pela aba nova, trava entre abas, saída pela API | `packages/platform-sdk/src/web/session.ts`, `web/api.ts` | `web/session.test.ts` 14/14; `api.test.ts` verde |
| Docs | `docs/decisoes/0038-refresh-do-bko-em-cookie-httponly.md` (+ índice), `docs/desenho/T-0117.md` v2 | — |
| Seu R-20261109-112736, item 1 | `apps/mock-api/src/legado/dominio.ts` (`formatarCep` explícito) | tsc do mock-api verde |

**Cookie**
- `__Secure-macuxi_rt`; no PC, `macuxi_rt`.
- Atributos: `HttpOnly; Secure; SameSite=Strict; Path=/api-proxy/auth`, sem `Domain` (host-only do `bko.`/`bko-demo.`; o `config.` não recebe).
- Validade: 30 dias.
- Gravado pela API e repassado pelo rewrite.

**Proteção contra CSRF**
- O modo cookie só liga com `X-Macuxi-CSRF: 1`.
- `Sec-Fetch-Site` diferente de `same-origin` ou `none` dá **403 `CSRF_RECUSADO`**.
- Sem o cabeçalho, o cookie nunca é lido.

**Comportamento**
- Logout apaga o cookie sempre, mesmo com erro.
- Troca de senha revoga todas as famílias e grava o cookie novo.
- Refresh recusado (401 ou 423) apaga o cookie.
- O app Android não muda: sem o cabeçalho, o token continua no corpo.

**Verificações**
- tsc do SDK (`tsconfig` e `tsconfig.web`), da API e do mock-api: verdes.
- eslint dos arquivos tocados: verde.
- `coord verificar engenheiro-software`: só a violação conhecida, `.vscode/settings.json`.

## Pendências (no mesmo lote, senão o BKO entra de novo a cada 15 min, uma falha segura)
1. **modulo-core** (R-20261109-121509):
   - `cookieSessao` nas 4 rotas de auth;
   - `SessaoWebRespostaSchema` e `RefreshWebRespostaSchema`.
2. **engenheiro-apps** (R-20261109-122225):
   - `login-screen` e `ciclo-senha` com `sessaoWeb: true` e o schema web;
   - `encerrarSessao` passa a usar `encerrarSessaoWeb()`;
   - testes no `apps/web` (critério 2).
3. **testes** (R-20261109-122431): smoke da demo para o `Set-Cookie` pelo rewrite, a renovação, o CSRF e o logout.
4. **Revisão final**: eu reviso o Core e o `apps/web` quando chegarem.
5. **Seu item 2** (arredondar/percentual no comum, RD-0045): vem logo depois desta entrega.

## Premissas
- O rewrite externo do Next repassa `Cookie` e `Set-Cookie` sem mexer. É o comportamento do http-proxy; o smoke da demo confirma.
- A demo e a produção rodam com `NODE_ENV=production`, então o cookie seguro liga sozinho, sem variável nova no `.env`.
- Quem estiver logado no BKO no dia da publicação entra de novo uma vez.
