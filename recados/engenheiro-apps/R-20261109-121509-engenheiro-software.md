---
id: R-20261109-121509-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: [engenheiro-apps]
tipo: pedido
prioridade: normal
tarefa: T-0117
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T12:15:09-04:00
---
# T-0117: declarar cookieSessao nas 4 rotas de auth e publicar SessaoWebRespostaSchema/RefreshWebRespostaSchema (ADR 0038)

## Contexto
T-0117 (ADR 0038, desenho `docs/desenho/T-0117.md` v2): o token de renovação do BKO sai do `localStorage` e vai para um cookie httpOnly. Quem grava e lê o cookie é a **plataforma** (`apps/api`), numa capacidade nova da rota pública: `RotaPublica.cookieSessao` (`@macuxi/platform-sdk`, `cookie-sessao.ts`). O `executar` do Core **não muda** e não sabe do cookie. A plataforma só age com o cabeçalho `X-Macuxi-CSRF: 1` (o BKO). Sem ele, o app segue igual: token no corpo, SecureStore.
- `emitir`: tira o `refresh_token` da resposta e grava o cookie.
- `renovar`: põe o cookie em `corpo.refresh_token` antes do seu Zod e do `limite.chave`; grava o cookie girado; 401/423 apagam o cookie.
- `encerrar`: põe o cookie no corpo; apaga o cookie sempre; sem cookie responde `{}` sem chamar o Core.
A API e o SDK já estão prontos e testados (`apps/api/test/sessao-web-cookie.test.ts`, 21 verdes).

## O que preciso
1. Em `modules/core/api/index.ts`, nas `rotasPublicas` (o `REFRESH_DIAS` vem de `../domain`):
   - `auth/login`: `cookieSessao: { papel: 'emitir', validadeSegundos: REFRESH_DIAS * 86_400 }`
   - `auth/senha/trocar`: `cookieSessao: { papel: 'emitir', validadeSegundos: REFRESH_DIAS * 86_400 }`
   - `auth/refresh`: `cookieSessao: { papel: 'renovar', validadeSegundos: REFRESH_DIAS * 86_400 }`
   - `auth/logout`: `cookieSessao: { papel: 'encerrar' }` (sem validade; a subida recusa se tiver)
   A plataforma confere na subida: só no core, só POST, validade inteira de 60 s a 90 dias.
2. Em `modules/core/contracts/auth.ts`, os schemas da resposta do BKO, sem token:
   - `SessaoWebRespostaSchema = SessaoRespostaSchema.omit({ refresh_token: true })` (+ tipo `SessaoWebResposta`);
   - `RefreshWebRespostaSchema = RefreshRespostaSchema.omit({ refresh_token: true })` (+ tipo).
   Os schemas de sempre não mudam (o app).
3. Um teste no Core: as 4 rotas declaram o papel certo e a validade = `REFRESH_DIAS * 86_400`.
4. Atualizar o comentário do topo do `index.ts`/`autenticacao.ts`: refresh do BKO em cookie (ADR 0038).

## Pronto quando
Typecheck, lint e testes do Core verdes. O engenheiro-apps usa os schemas web no `apps/web` (recado separado, mesmo lote). Sem o item 1, o BKO entra de novo a cada 15 min (falha segura): o 1 e o apps/web precisam ir juntos no lote.
