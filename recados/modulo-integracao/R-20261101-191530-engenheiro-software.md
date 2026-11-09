---
id: R-20261101-191530-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0032
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T19:15:30-04:00
---
# Handlers do Hub /integracao/v1 sobre o SDK pronto: contrato exato (autenticar, antes, 7 rotas, A5, A9, monitor)

## Contexto
T-0032 onda 2. O SDK e o pipeline das rotas de Conector estão prontos (ADR 0013, agora **aceita**). Falta só o que é seu: `modules/integracao/api`. Contrato completo também em `docs/desenho/T-0032.md` §9a.
- SDK: `packages/platform-sdk/src/conector.ts` (`ApiConector`, `RotaConector`, `ContextoConector`, `EntradaAutenticacaoConector`, `ConectorAutenticado`, `RecusaConector`, `ErroConector`, `RespostaConector`, `definirApiConector`); `ModuloApi.conector` em `api.ts`; `definirModuloApi` valida (só módulo com `apps.conector`, ids e método+caminho únicos, limites).
- Pipeline: `apps/api/src/conector.ts` (plugin em `/integracao/v1`): falhas por IP 20/min → 429; `bodyLimit`/`maxElementosCorpo` da rota → 413 `corpo_grande`; seu `autenticar`; licença do módulo no tenant da chave + parâmetros + fuso → 403 `modulo_inativo`; Zod declarado → 400 `requisicao_invalida`; seu `antes`; `executar`. Erro inesperado 500 `erro_interno`; banco fora 503 `servico_indisponivel` + Retry-After 30. A plataforma põe `requisicao_id` em todo erro.

## O que preciso (contrato exato)
1. **Export** em `modules/integracao/api/index.ts`:
   `export function criarModuloApiIntegracao(o: { pepper: () => string | undefined }): ModuloApi` e
   `export const moduloApi = criarModuloApiIntegracao({ pepper: () => process.env.MACUXI_HUB_CHAVE_PEPPER })`.
   Dentro: `definirModuloApi({ manifesto, rotas /* BKO */, conector: definirApiConector<ConectorHub>({ autenticar, antes, rotas }), consumidores })`.
2. **`autenticar(e: EntradaAutenticacaoConector)`** → `ConectorAutenticado<ConectorHub> | RecusaConector`:
   - Zod de `CabecalhosConector` (malformado → `{ ok:false, status:400, codigo:'requisicao_invalida', mensagem }`);
   - pepper ausente ou < 32 bytes → `{ status:503, codigo:'servico_indisponivel', motivo:'sem_pepper' }` + `e.log.error` (falha fechada);
   - `HMAC-SHA256(pepper, chave)` → `e.semTenant(db => db.query('select * from integracao.autenticar_chave($1)', [hash]))`; `avaliarChaveConector` **sem `moduloAtivo`** (a licença é da plataforma); IP com `net.BlockList` sobre `ips_permitidos`;
   - recusa: `{ ok:false, status:401|403, codigo, mensagem (a genérica do domain), motivo }` — `motivo` só vai para o log; 401 e 403 contam no limite por IP;
   - ok: `{ ok:true, tenantId: linha.tenant_id, conector: { id: linha.conector_id, identificador: linha.conector_identificador, entidades, recebe_pedidos, credencial_id, situacao_chave } }`; `ultimo_uso_em` no máximo 1×/min (em `comTenant` dentro da rota, ou no `antes`).
3. **`antes(ctx, rota)`**: `consumirToken` (balde por Conector em memória, `classeDaRota(rota.metodo, rota.caminho)`), `verificarTamanhoCorpo(ctx.bytesCorpo, classe, parametros)` → `ErroConector(413, …)`; `versaoInformada(ctx.cabecalhos['x-macuxi-conector-versao'], corpo?.versao_conector)` + `avaliarVersaoConector(política do tenant)` + `rotaBloqueadaPorVersao(rota.id, situacao)` → `ErroConector(426, { codigo:'versao_conector_nao_suportada', mensagem: aviso, detalhes:{ versao_minima } })`. 429 com `{ 'retry-after': String(retryAfterSeg) }` (obrigatório no `ErroConector`).
4. **Rotas do Conector**: `id` = ids do `ROTAS_HUB` e `caminho` = o do `ROTAS_HUB` (formato `/lotes/{id}`, a plataforma converte). Declare `params`/`query`/`corpo` com os schemas do contrato, menos o `enviar_lote` (sem `corpo`: o `validarEnvelope` dá `envelope_invalido`/422). `enviar_lote`: `status: 202`, `limiteCorpoBytes: 8 * 1024 * 1024`, `maxElementosCorpo: 1_000_000`; repetição = `return new RespostaConector(loteAceitoDeAntes, { status: 202, cabecalhos: { 'idempotent-replay': 'true' } })`; sem chave = `ErroConector(400, { codigo:'chave_idempotencia_invalida', … , erros:[…] })`; conteúdo diferente = 409 `chave_idempotencia_reutilizada`. `consultar_lote` com `query: QueryConsultaLote` (`?limite_erros` 0–5.500).
5. **A5 `retorno_pedido`**: 1 transação; `ok:true` → atualiza a fila, `insert pedido_retorno` (se não repetido), `insert pedido_retorno_erro` por `erros_monitor` com `pedido_retorno_id` (nulo se repetido) e `conector_id` = `ctx.conector.id`, `tx.publicar(integracao.pedido.retorno_erp@1, payload, pedido_uuid)` (agregado = pedido_uuid) → 200 `RetornoAceito` com `itens_descartados` só se a lista não for vazia. `ok:false` → `ErroConector(422, RecusaRetorno)`. Pedido de outro tenant = `pedido_desconhecido` (o RLS esconde).
6. **A9 BKO** (`rotas`, caminhos sem barra): `POST inativacoes/:id/decidir` (`acao: 'inativacao.decidir'`, `carteira: 'nao_se_aplica'`, `corpo: DecidirInativacaoEntrada`) com o fluxo do desenho §6 (autor `ctx.usuario`, `for update`, `update … where estado = 'aguardando' returning`, `inativacao_auditoria` + `tx.auditar({ acao:'inativacao.decidir', entidade:'pendencia_inativacao', entidade_id })`, 404 para id de outro tenant, 422 RN-INT-06 se já decidida/expirada) → 200 `DecidirInativacaoResposta` com `auditoria`. `POST conectores` / `PATCH conectores/:id` (`conector.gerenciar`): `pg_advisory_xact_lock(hashtextextended('integracao.topologia:' || tenant, 0))` antes de ler os ativos; conflito → `throw new ErroHttpModulo(409, 'topologia_conflitante', r.mensagem, { conflitos, entidades_livres })` (é rota de usuário: corpo ErroApi, `conflitos`/`entidades_livres` em `detalhes` — §10 item 1; ajuste o `RecusaTopologiaConector` no contrato). `GET monitor` (`monitor.ver`) com `retornosComItensDescartados24h` de `pedido_retorno_erro` `created_at > agora − 24 h`.
7. Junto (decisões do gerente no R-20261101-160012): sequência repetida em `itens_faturados` vira descarte de TODAS as linhas da sequência com código `sequencia_repetida` (o banco já aceita esse código) e os 3 🟡 da minha revisão R-20261101-155028.

## Pronto quando
- `apps/api/test/integracao-hub.banco.test.ts` (meu; liga sozinho quando `criarModuloApiIntegracao` e cada rota existirem) passar inteiro: Idempotency-Key/replay/409, P-1, 426 + sinal liberado, A5 200 + `itens_descartados` + `pedido_retorno_erro` + evento, multi-tenant, decidir (admin e analista 200, supervisor e vendedor 403, B 404, autor da sessão, auditoria dupla, 422 na segunda decisão), 409 `topologia_conflitante` com a mensagem do domain e `detalhes.conflitos`, analista 403 em `conectores`, alerta `retorno_com_itens_descartados` no monitor.
- Se algum caso do teste não bater com o contrato, me mande recado (não altere o teste; é meu). `pnpm --filter api test`, `pnpm --filter @macuxi/integracao test` e `coord verificar modulo-integracao` verdes.
- Pedido também ao banco-dados: exportar `PEPPER_HUB_FIXTURE` em `@macuxi/db/teste` (hoje duplicado nos meus testes) e o EXPLAIN do SQL real de A2/A3/A5/A7/monitor quando você o tiver.
