---
id: R-20261031-211430-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0022
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T21:14:30-04:00
---
# T-0022 entregue: despachante da outbox (macuxi_worker, licença, idempotência, retentativa) + processo worker; push do Core pedido ao modulo-core

## Contexto
T-0022 — despachante da outbox (ADR 0007, migração 0003, RN-CORE-05).

## O que foi feito
- `apps/api/src/despachante.ts`: lê `plataforma.evento` como `macuxi_worker` (sem BYPASSRLS; `verificarPapelWorker` recusa outro papel), lote em ordem `(ocorrido_em, id)` com `for no key update skip locked` (vários processos sem duplicar; "no key" evita o impasse com a FK de `evento_consumo`). Só lê eventos com consumidor instalado (os outros ficam pendentes e um consumidor novo recebe o histórico). Licença: só módulos ativos no tenant (`plataforma.tenant_modulo` + dependências, RN-CORE-02/03). O handler roda como `macuxi_app` em `comTenant(tenant do envelope)` e grava `plataforma.evento_consumo` na MESMA transação do efeito (`on conflict do nothing`): a reentrega não repete, e se o handler falha os dois desfazem. Falha: `tentativas + 1`, `ultimo_erro` (`<modulo>: <erro>`, sem payload), espera 5 s, 10 s… até 15 min, para em 10; o evento em espera sai do lote e os outros tenants seguem.
- `apps/api/src/worker.ts`: processo SEPARADO (`pnpm --filter api worker` / `dev:worker`), dois pools (worker e app), log pino com tenant_id/modulo/evento_id/request_id. `pino` virou dependência direta da API (já vinha com o Fastify, sem download novo; lockfile +3 linhas).
- SDK (`packages/platform-sdk/src/api.ts`): `ModuloApi.consumidores`, `ConsumidorEvento`, `ContextoConsumo` (`db`, `publicar`, `agora`, `log`, `envelope`) e `definirConsumidor`; `definirModuloApi` recusa evento fora de `consome` e consumidor repetido. `apps/api/src/outbox.ts`: `publicadorTenant` (o mesmo `tx.publicar` para rota e consumidor; usuário/request podem ser nulos).
- ADR 0007, seção "Implementação (T-0022)": pg-boss dispensado (a outbox é a fila), regras de licença/retentativa/ordem e **como rodar localmente**. Registro `.coord/contratos/eventos.md` (nota de entrega + `core.notificacao.criada@1`), andamento no desenho T-0016 §1.

## Testes
- `apps/api/test/despachante.banco.test.ts` (Postgres, dois tenants, 6 casos verdes): papel do worker; entrega única a cada consumidor ativo; Promotor sem licença em B não recebe; handler como macuxi_app no tenant do envelope sem ver o outro tenant (outbox e tabela de efeito com RLS); reentrega (evento reaberto e dois despachantes em paralelo) sem efeito duplicado; falha desfaz efeito+registro, retenta com espera crescente e não segura B; tentativas esgotadas param o evento.
- `packages/platform-sdk/src/api.test.ts` +2 casos (consumidores). Raiz: **lint e typecheck verdes** (fronteiras sem violação). **test**: api (90), platform-sdk e db verdes; dois vermelhos FORA do meu escopo: `@macuxi/core` `domain/metas.test.ts` (6, `realizadoDosDiarios is not a function` — trabalho em andamento do modulo-core na T-0020, arquivos mudando durante a rodada) e `tests/carga/fundacao.test.ts` S0-110 (vazão "expected 50 > 50" com p50 de 7–10 s: máquina saturada por agentes em paralelo). Repita o `pnpm test` quando o modulo-core fechar a T-0020. `verificar engenheiro-software` OK.

## Pendências
1. **Push do Core**: `modules/**` não é meu; pedi ao modulo-core (R-20261031-205114) `consome: ['core.notificacao.criada@1']` no manifesto e o handler `consumidorPushNotificacao` (código sugerido no recado; com timeout no fetch). Até lá o worker não tem consumidor real e os eventos ficam na outbox (sem perda).
2. Doc 04 (`docs/produto/04-arquitetura-e-dados.md`, linhas 13 e 89) ainda diz "pg-boss entrega": trocar por "o despachante (processo `worker`, ADR 0007) entrega" — é seu.
3. Backlog: espera da retentativa só na memória do processo (reinício tenta logo uma vez; vários workers não compartilham). Se precisar, coluna `proxima_tentativa_em` (banco-dados). E: ligar o worker no deploy quando houver nuvem.
4. Recebi do banco-dados a revisão P2 da T-0008 com 🔴 L-1 (índice de busca vazio ao recriar objetos do Catálogo, `packages/platform-sdk/src/sqlite`): respondi que entra como 1º item da minha próxima rodada (R-20261031-205536). Ponha na fila.
5. DEFEITO D-3 do testes (R-20261031-210639: item aceito sai da fila antes do pull; visita e leitura somem do aparelho): correção no motor-sync, respondida para a próxima rodada (R-resposta enviada). Priorize junto com o L-1.
6. Continuam abertos na minha caixa: revisão do Gestor (T-0014) e o transporte fase-m (já respondido).
