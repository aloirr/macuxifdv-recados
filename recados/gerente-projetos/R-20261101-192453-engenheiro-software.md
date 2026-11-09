---
id: R-20261101-192453-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0032
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T19:24:53-04:00
---
# T-0032 onda 2 (engenheiro): SDK e pipeline do Hub /integracao/v1, testes de rota e contrato dos handlers ao modulo-integracao

## Contexto
T-0032 onda 2, parte do engenheiro-software (desenho §1 passo 2, ADR 0013). Base: entrega do banco-dados R-20261101-171314/171316 (0010/0011 no main desde o 52bbdd1) e as decisões do R-20261101-160012.

## O que foi feito
- **SDK** `packages/platform-sdk/src/conector.ts` (novo, exportado no index): `ApiConector`, `RotaConector` (caminho no formato do `ROTAS_HUB`, `/lotes/{id}`), `ContextoConector`, `EntradaAutenticacaoConector`, `ConectorAutenticado`, `RecusaConector`, `ErroConector` (status do Hub; 429/503 exigem `retry-after`), `RespostaConector` (status e cabeçalhos da repetição do lote), `definirApiConector`, `problemasApiConector`. `ModuloApi.conector` em `api.ts`; `definirModuloApi` e `createApp` recusam rotas de Conector em módulo sem `apps.conector`, id ou método+caminho repetido e limites fora da faixa.
- **API** `apps/api/src/conector.ts` (novo): plugin em `/integracao/v1` com o pipeline da ADR 0013 §3: falhas de autenticação por IP 20/min → 429 `limite_de_taxa`; `bodyLimit` e `maxElementosCorpo` da rota → 413 `corpo_grande` (o lote aceita 8 MiB e 1 milhão de elementos; o teto global de 50 mil não vale aqui); `autenticar` do módulo (só `semTenant`); licença do módulo no tenant da chave + parâmetros + fuso (`licencasDoTenantNoBanco`, nova em `licencas.ts`) → 403 `modulo_inativo`; Zod → 400 `requisicao_invalida`; `antes` (onde entram o 426 e a pausa, RN-INT-11) e `executar`. Erro com `requisicao_id`; 404 do Hub; erro inesperado → 500 `erro_interno`; banco fora → 503 com Retry-After 30; só JSON.
- `outbox.ts`: `usuarioId` nulo nas rotas de Conector (evento e auditoria sem autor); `registrarArquivo` recusa a rota sem usuário. `corpo.ts` (novo) guarda `excedeElementos`, que `app.ts` reexporta. `config.ts` `opcoesLogger`: redação de `Authorization`, `Cookie` e `X-Macuxi-*`, usada em `servidor.ts`. `limitador.ts` `criarContadorFalhas`.
- ADR 0013 com status **aceita**; desenho T-0032 com o §9a (contrato dos handlers).
- **Contrato dos handlers** enviado ao modulo-integracao (R-20261101-191530): `criarModuloApiIntegracao({ pepper })`, `autenticar`/`antes`, os 7 ids do `ROTAS_HUB`, Idempotency-Key e replay, A5 com 200 + `itens_descartados` + `pedido_retorno_erro`, A9 decidir para admin e analista com autor da sessão e auditoria dupla, 409 `topologia_conflitante` com advisory lock e `conflitos` em `detalhes`, e o monitor com `retornosComItensDescartados24h`. Também pedi a sequência repetida (P-4) e os 3 🟡. Encerrei os pedidos dele R-20261101-044224 e R-20261101-115656-2.

## Testes
- `apps/api/test/conector.test.ts`: 15 casos sem banco, com um módulo de fixture. Cobre tenant só da chave, 401 genérico, 400/403/503, 429 por IP com janela, `modulo_inativo`, Zod e `?limite_erros` acima de 5.500, 426 com sinal liberado, 202 com replay, 409 com `erros[]`, 413 por bytes e por elementos, JSON inválido, 404, 500, 503, auditoria com `usuario_id` nulo e chave fora do log.
- `apps/api/test/conector.banco.test.ts`: 4 casos no Postgres real, via `integracao.autenticar_chave`. Cobre multi-tenant pelo RLS e pelo fuso do tenant da chave, 401 genérico com a chave de A e o identificador de B, licença lida do banco (403) e `tx.auditar` gravado.
- `apps/api/test/integracao-hub.banco.test.ts`: o aceite da T-0032 sobre os handlers reais. Cobre Idempotency-Key, P-1, 426, A5 parcial, multi-tenant, decidir com admin/analista 200 e supervisor/vendedor 403, 409 com a mensagem nova e o monitor. **Pula até o modulo-integracao entregar** e liga sozinho, rota por rota.
- Verdes: `pnpm --filter api test` (15 arquivos, 140 testes; o aceite pulado); `pnpm --filter @macuxi/platform-sdk typecheck lint test` (307); typecheck e lint de `api`; `coord verificar engenheiro-software` sem violação. Nenhuma data fixa contra o now() do banco.

## Pendências e premissas
1. Os critérios de aceite da T-0032 sobre lote, inativação, retorno e topologia só ficam provados quando o modulo-integracao entregar os handlers. Depois vem a minha revisão final e a validação do testes.
2. `.env.example`: a linha `MACUXI_HUB_CHAVE_PEPPER=` ficou de fora, porque a permissão negou a leitura do arquivo. Gerente, acrescente com o comentário "≥ 32 bytes; sem ela /integracao/v1 responde 503", ou me autorize.
3. A licença `integracao` não está no `tenant_modulo` da fixture. Os testes injetam a licença em cima da leitura real e o 403 é testado com o banco.
4. Pedi ao banco-dados que exporte `PEPPER_HUB_FIXTURE` em `@macuxi/db/teste` (R-20261101-191533). Por enquanto o valor está duplicado nos meus testes, com conferência contra o hash gravado.
5. Fora do escopo desta tarefa e travado pela nuvem (`scripts/**`): o bloqueio do Alexandre R-20261101-190405 (T-0038, `tunel.ps1` com `deleted_at` zero). Fica para depois do pós-merge do PR #26, ou para a nuvem, conforme a sua decisão.
6. Premissas: os limites em memória valem para uma instância (ADR 0013); 401 e 403 do `autenticar` contam no limite por IP; `ErroHttpModulo` em rota de Conector vira 500 e o erro vai para o log.
