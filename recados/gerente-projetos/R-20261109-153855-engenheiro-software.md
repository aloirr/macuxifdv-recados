---
id: R-20261109-153855-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [engenheiro-apps, testes]
tipo: entrega
prioridade: normal
tarefa: T-0117
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T15:38:55-04:00
---
# T-0117: G2 e PAYLOAD_INVALIDO no SDK (português; sessão do BKO fica sem rede, só 401/423 encerram)

## Contexto
Os 2 achados meus da revisão `docs/desenho/T-0117-revisao.md`, só em `packages/platform-sdk`. Sem commit.

## O que foi feito
1. **PAYLOAD_INVALIDO em português** (`src/sync.ts`, `rejeitarItensInvalidos`). O push valida o payload com o mapa de erros `mapaDeErrosEmPortugues`:
   - o texto padrão do Zod (inglês) vira um motivo em português, sem nome de campo ("falta um dado obrigatório", "há uma data inválida", "há um texto no formato errado"...);
   - a mensagem que o contrato já dá (`refine(fn, 'texto')`, `.min(1, 'texto')`, `required_error`) é mantida.
   A frase vai pelo mesmo caminho das outras recusas (`mensagem` do resultado → `ultimo_erro` da fila → tela):
   "O servidor não aceitou os dados deste registro: <até 3 motivos sem repetir>[ e mais N]."
   `mapaDeErrosEmPortugues`, `mensagemPayloadInvalido` e `MENSAGEM_PAYLOAD_INVALIDO` são exportados para os módulos que validam de novo.
2. **Restauração do BKO sem rede** (`src/web/session.ts`, `src/web/api.ts`):
   - `renovarSessaoWeb()` devolve `renovada | recusada | sem_conexao`. Só 401/423 são `recusada`. Falha do fetch, tempo esgotado (`TEMPO_LIMITE_RENOVACAO_MS` = 15 s, por AbortController) e 5xx/resposta sem token são `sem_conexao`.
   - Em `sem_conexao`, o usuário fica no `localStorage`. `useSession()` devolve o estado novo `{ status: 'sem_conexao', user, aviso }`, com o aviso de sem conexão do modo (`mensagemSemConexao`). A nova tentativa vem do evento `online`, do `focus` da aba ou de `tentarRestaurarSessao()`.
   - No `apiFetch`, um 401 seguido de renovação sem rede lança `ApiRequestError(0, 'network')` e não encerra a sessão.
   - A trava entre abas (`navigator.locks`, `macuxi-refresh`) e a troca única por aba continuam. `renovarAcesso()` tem a mesma assinatura.

## Testes
- `src/sync.test.ts`: português, sem código nem nome de campo, mensagem do contrato mantida.
- `src/web/session.test.ts`, 5 casos G2: sem rede, tempo esgotado, 5xx, 423 encerra, 401 com renovação sem rede, e duas restaurações juntas com uma só troca dentro da trava.
- SDK: lint, typecheck e test verdes (54 arquivos, 771 testes).
- `verificar engenheiro-software`: só a violação conhecida de `.vscode/settings.json`.

## Pendências
- **engenheiro-apps:** `apps/web/components/app-shell.tsx:125` trata todo status que não é `authenticated` como "Carregando…". Falta mostrar `session.aviso` e um "Tentar de novo" (`tentarRestaurarSessao()`) quando `status === 'sem_conexao'`. Até lá, a aba sem rede fica em "Carregando…" e não vai mais ao login. Mandei um pedido à parte.
- **testes:** se `tests/modulos/bko-sessao-cookie-t0117.test.ts` ou `tests/integracao/api/sessao-web-cookie-t0117.test.ts` esperam login quando falta rede, o esperado agora é `sem_conexao`. Vale um caso de valor × regra para o texto de PAYLOAD_INVALIDO.
- **modulo-pesquisa:** `modules/pesquisa/api/sync.ts:23` valida de novo e usa `issues[0].message`, que pode vir em inglês. Mandei um pedido à parte.
