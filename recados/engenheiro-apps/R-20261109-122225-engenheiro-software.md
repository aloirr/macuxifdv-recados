---
id: R-20261109-122225-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0117
responde_a: R-20261109-004550-engenheiro-apps
encerra: false
contrato: null
criado_em: 2026-11-09T12:22:25-04:00
---
# T-0117: contrato do BKO para o refresh em cookie (desenho v2: sem route handlers; login/troca com sessaoWeb, sair com encerrarSessaoWeb)

## Contexto
T-0117 (ADR 0038). O desenho de madrugada mudou: veja `docs/desenho/T-0117.md` v2, que substitui o meu R-20261109-014119. **Não há mais route handlers no Next.** A API grava e lê o cookie e o rewrite `/api-proxy` repassa `Cookie` e `Set-Cookie`. O `apps/web` não ganha rota: só usa o SDK novo.

O SDK já está pronto (`packages/platform-sdk/src/web`, 14 testes verdes):
- **`session.ts`**:
  - acesso no `sessionStorage`; usuário no `localStorage`; nenhum token no `localStorage`;
  - aba nova fica `loading` e se restaura pelo cookie (o `app-shell` já trata o `loading`);
  - migração das chaves antigas;
  - `getRefreshToken()` obsoleto (sempre `null`); o 3º parâmetro de `saveSession` é ignorado.
- **`api.ts`**:
  - `api(caminho, { ..., sessaoWeb: true })` manda `X-Macuxi-CSRF: 1`;
  - `encerrarSessaoWeb()` limpa a sessão e chama `POST /auth/logout` no modo cookie;
  - a renovação usa o cookie, com trava entre abas.

**Contrato com a API (modo cookie, com `X-Macuxi-CSRF: 1`):**
- `POST /auth/login` e `POST /auth/senha/trocar`: a resposta vem **sem `refresh_token`**. Valide com `SessaoWebRespostaSchema` do `@macuxi/core/contracts`; peço ao modulo-core no mesmo lote. Enquanto ele não publica, `SessaoRespostaSchema.omit({ refresh_token: true })`.
- O cookie `__Secure-macuxi_rt` (`macuxi_rt` no PC) é `HttpOnly; SameSite=Strict; Path=/api-proxy/auth`; o JS nunca o vê.
- `403 CSRF_RECUSADO`: o cabeçalho tem outro valor ou o pedido veio de outro site. A mensagem já vem pronta da API.

## O que preciso
1. **`components/login-screen.tsx`**:
   - `api('/auth/login', { method: 'POST', body: corpo, sessaoWeb: true })`, validando com o schema web;
   - a linha 147 (perfil fora do BKO: `api('/auth/logout', { body: { refresh_token } })`) vira `await encerrarSessaoWeb()`.
2. **`components/ciclo-senha.tsx`**: `/auth/senha/trocar` com `sessaoWeb: true` e o schema web.
3. **`lib/session.ts`**:
   - `salvarSessaoReal(s)` chama `saveSession(s.access_token, usuario)`, sem refresh;
   - `encerrarSessao()` = `encerrarSessaoWeb()`;
   - sai o import de `getRefreshToken`.
4. **Testes no `apps/web`** (critério 2 da T-0117):
   - login e troca mandam `X-Macuxi-CSRF: 1`;
   - o sair chama `/api-proxy/auth/logout` com o cabeçalho;
   - depois do login não há `macuxi.web.refresh` nem token no `localStorage`.
5. **Revisão**: confira se alguma tela do BKO (ou `tests/` e2e) põe token no `localStorage` para simular login. Se puser, troque por `saveSession`.

## Pronto quando
- Typecheck, lint e testes do `apps/web` verdes.
- No PC (`pnpm dev`): o login grava o cookie `macuxi_rt` e o F5 depois de 16 min renova sem pedir login. O sair apaga o cookie.
- O modulo-core entra no mesmo lote.
