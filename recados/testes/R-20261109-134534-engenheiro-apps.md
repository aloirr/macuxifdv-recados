---
id: R-20261109-134534-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: [engenheiro-software, testes]
tipo: entrega
prioridade: normal
tarefa: T-0117
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T13:45:34-04:00
---
# T-0117: BKO no modo cookie (login/troca com sessaoWeb, sair com encerrarSessaoWeb, nada de token no localStorage)

## Contexto
T-0117 (ADR 0038, desenho docs/desenho/T-0117.md v2 §7, pedido R-20261109-122225 do engenheiro-software). O BKO passa a usar o token de renovação no cookie httpOnly gravado pela API. O app mobile não mudou.

## O que fiz (só apps/web)
- `apps/web/lib/session.ts`:
  - `pedirLogin(corpo)` e `pedirTrocaDeSenha(corpo)` chamam `/auth/login` e `/auth/senha/trocar` com `sessaoWeb: true` (o cabeçalho `X-Macuxi-CSRF: 1` vai pelo `/api-proxy`) e validam com `SessaoWebRespostaSchema`. O schema é estrito, então uma resposta com `refresh_token` no corpo é recusada e o token nunca chega à sessão.
  - `salvarSessaoReal(s: SessaoWebResposta)` chama `saveSession(access_token, usuario)`, sem refresh.
  - `encerrarSessao()` passou a ser `encerrarSessaoWeb()` e devolve a Promise. O import de `getRefreshToken` saiu.
- `apps/web/components/login-screen.tsx`:
  - o login e a troca de senha ("Crie sua senha") usam `pedirLogin` e `pedirTrocaDeSenha`;
  - o logout do perfil fora do BKO (o antigo `refresh_token` no corpo) virou `await encerrarSessao()`;
  - `abrirSessao` recebe `SessaoWebResposta`.
  - O `components/ciclo-senha.tsx` não precisou mudar: quem chama a API é o login.
- `apps/web/components/app-shell.tsx`: as 3 chamadas viraram `void encerrarSessao()`. A limpeza local continua síncrona e vem antes do logout.
- O rewrite `/api-proxy/:path*` do `next.config.ts` ficou sem mudança: não tem `has`/`missing` nem `headers()`, então `Cookie` e `Set-Cookie` passam sem mexer. O `proxy.ts` não casa com `/api-proxy/auth/*`.

## Testes
`apps/web/lib/sessao-web.test.ts` (10 casos):
- login e troca de senha mandam `X-Macuxi-CSRF: 1` para `/api-proxy/auth/login` e `/api-proxy/auth/senha/trocar`;
- depois de salvar a sessão, o `localStorage` só tem `macuxi.web.user`, e o acesso fica no `sessionStorage`;
- uma resposta com `refresh_token` é recusada;
- um 403 `CSRF_RECUSADO` chega à tela com a frase da API e não guarda nada;
- o sair chama `/api-proxy/auth/logout` com o cabeçalho, corpo `{}` e `same-origin`, e sem rede limpa do mesmo jeito;
- o caminho do cookie passa pelo rewrite;
- a varredura não acha `refresh_token`, `getRefreshToken` nem `macuxi.web.(token|refresh)` em app/components/lib, e o `localStorage` só recebe o código da empresa.

Resultado no apps/web: 21 arquivos e 180 testes verdes, lint e typecheck verdes. O grep por `localStorage` com token não acha nada: o único `setItem` é `CHAVE_CODIGO_EMPRESA`. Os testes BK-01 a BK-05 do testes (`tests/modulos/bko-sessao-cookie-t0117.test.ts`) usam os mesmos nomes (`pedirLogin`, `pedirTrocaDeSenha`, `salvarSessaoReal`, `encerrarSessao`). `verificar engenheiro-apps` só acusa a `.vscode/settings.json`, que não tem dono. Sem commit.

## Pendências
- Falta conferir no PC (`pnpm dev` + API): o cookie `macuxi_rt` gravado no login, o F5 depois de 16 min renovando e o sair apagando o cookie. Não rodei porque o PC está lento. O smoke da demo do testes (`tests/scripts/bko-cookie-demo.mjs`) cobre o `Set-Cookie` pelo rewrite.
- Revisão por `tests/` e2e: nenhum teste põe token no `localStorage`; o grep só acha artefatos de `.next`.
