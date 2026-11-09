---
id: R-20261102-095308-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [modulo-core, banco-dados, modulo-vendedor, testes]
tipo: revisao
prioridade: normal
tarefa: T-0042
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T09:53:08-04:00
---
# Revisão final T-0042: 0🔴, 2🟡 (Core ainda lê plataforma.tenant na carteira; SDK já passa fuso/relógio), 3🟢 — aprovada para fechar

## Contexto
Revisão final da T-0042 ("hoje" no fuso do tenant e testes sem hora fixa) no main (a4972d9): bd733a7 (banco-dados), 0a9bb79 (modulo-core), 13550ad (modulo-vendedor). Entregas: R-20261101-194949-modulo-core, R-20261101-203935-banco-dados, R-20261101-211348-modulo-vendedor. Rodei `node tests/scripts/varrer-relogio.mjs` (saída 0, sem achados novos). Não rodei os db.test (o gerente roda no fechamento).

## Resultado: 0 🔴, 2 🟡, 3 🟢 — aprovada para fechar

### Pontos conferidos
- C6 corrigido sem `current_date` UTC no Core: carteira.ts:11-12 (`VIGENTE` com `$2::date` = hoje do tenant), rotas.ts (rotaDoDia, lista de rotas, visitas e carteira do usuário com `ctx.fuso()`), metas.ts (`calcularIndicadores` recebe o fuso), visita-push.ts (`ctx.fuso()`), clientes.ts (`hojeDoTenant(ctx)`), sync.ts:34-41 (placeholder `{{hoje}}` nas 9 janelas; `sqlDoPull` falha alto se a janela pede hoje e não recebeu). BKO com `useHojeDoTenant` (queries.ts:66).
- hoje-fuso.db.test.ts cobre 21:00 e 23:59 de Manaus, tenant em São Paulo e virada de mês (RN-CORE-04, RN-CORE-20), com dia de referência relativo ao relógio real — atende o critério 1.
- Banco: relógio único `agoraDaFixture()`/`hojeDaFixture()` (db/testes/estado.ts:39-51) lido uma vez no global-setup; fixture da T-0032 relativa a hoje − 2 com o `alterado_em` do ERP fixo e justificado; seed-demo com `somarDias(hojeCarga, 200)`. Migração 0012 (pg_temp por último no search_path das 4 SECURITY DEFINER) correta e com down.
- Vendedor: pedido.db.test.ts com AGORA = `now()` do banco no beforeAll, chave exata da fixture e o caso 23:59/00:01 Manaus × São Paulo.

### Achados
1. 🟡 modules/core/api/carteira.ts:35 — o Core lê `plataforma.tenant.fuso` (schema da plataforma) para a vigência porque o serviço do SDK não passava fuso/relógio. **Já resolvi o meu lado agora** (pedido R-20261101-194946): `ServicosCore.carteira(usuario, banco, opcoes?: OpcoesServicoCarteira)` em packages/platform-sdk/src/api.ts e apps/api/src/app.ts passa `{ agora: relogio, fuso }` da requisição (teste em apps/api/test/app.test.ts, "T-0042: o serviço de carteira recebe o relógio e o fuso"). Falta o Core: modules/core/api/index.ts:66 repassar o 3º argumento (`carteira: (usuario, banco, opcoes) => carteiraDoUsuario(usuario, banco, opcoes)`) e tirar a consulta da linha 35 (sem opcoes = relógio real e padrão America/Manaus, ou manter a consulta só como reserva). Hoje a carteira usa o relógio real mesmo quando a API tem relógio injetado.
2. 🟡 modules/core/api/carteira.ts:35 (mesma linha) — além do schema alheio, é uma consulta a mais por requisição que use a carteira. Some com o item 1.
3. 🟢 modules/core/api/sync.ts:39-41 — `comHoje` interpola `date 'AAAA-MM-DD'` no SQL. É seguro (regex e a data nunca vem do usuário), mas um bind (`$6::date`) evita SQL montado por texto e deixa o plano reaproveitável. Opcional.
4. 🟢 modules/core/web/lib/queries.ts:66 — `useHojeDoTenant` depende de `useMe().data.tenant.timezone`; se o /me ainda não chegou, confira que o hook não estoura (o shell só monta a página depois do /v1/me/modulos, então deve estar ok).
5. 🟢 db/testes/estado.ts:39 — `agoraDaFixture()` lança com mensagem clara sem o globalSetup: bom. Vale citar em docs/banco/README.md a regra "instante comparado com created_at = `select now()`; dia/mês da fixture = `hojeDaFixture(fuso)`" (já está no comentário; só para quem não abre o arquivo).

## Pronto quando
T-0042 pode fechar com o 🟡 1/2 numa passada curta do modulo-core (recado separado com o critério) ou no backlog; a varredura de relógio do testes já está sem achados novos.
