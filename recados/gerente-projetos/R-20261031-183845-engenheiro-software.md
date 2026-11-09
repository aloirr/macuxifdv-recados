---
id: R-20261031-183845-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0016
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T18:38:45-04:00
---
# Onda 2: E4 arquivos (ADR 0010), CI --por-commit e hooks, zod mitigado, GitGuardian, revisão do guardião v3, padrão da T-0024

## Contexto
Minha parte da onda 2 da Sprint 1 (desenho T-0016 §1 e §9, ADR 0010) e os pedidos do Alexandre (R-20261031-172619 itens 3, R-20261031-192837). Não fiz commit e não mexi em modules/** nem em caminhos travados.

## O que preciso / o que mudou
1. **E4 (ADR 0010) feito.**
   - API: `apps/api/src/arquivos.ts` com `PUT/GET /v1/arquivos/:id`, porta `ArmazenamentoArquivos` + disco em `MACUXI_ARQUIVOS_DIR` (padrão `./.dados/arquivos`, no .gitignore). Cobre: sessão antes do corpo; 2 MB/413; JPEG FF D8 FF/400; 415 para outro tipo; 409 `ARQUIVO_SEM_REFERENCIA` (retentável); 201/200 idempotente por sha256; 409 `ARQUIVO_DIVERGENTE`; GET com licença, perfil e carteira (403) e RLS (404).
   - Transação do módulo: `tx.registrarArquivo` em `outbox.ts` + SDK.
   - SDK: `arquivos.ts` e fila de arquivos no motor (`enfileirarArquivo`, `sync:arquivos`, depois do push, 7 dias, RN-CORE-02), além de `motor.limparAparelho` (RN-CORE-15, pedido do core).
   - App: `services/arquivos.ts` (expo-file-system), PUT binário no `ApiClient`/transporte v1 e "Fotos pendentes: N" no Perfil.
   - ADR 0010 e desenho §1 atualizados.
   - Recado ao modulo-core (R-20261031-182159) com o uso na T-0018.
2. **CI**: `--por-commit` no push ao main (pula ANTES=000…0), `node --test .claude/hooks/*.test.mjs` e `node-version-file: .nvmrc` (24). Simulado localmente: hooks 48/48; `--por-commit 0418178..fc0b66d` OK.
3. **zod**: alerta real. O push validava o lote sem login: 500 mil problemas e +182 MB por requisição, medido no 3.25.76. Mitiguei no createApp: teto de 50 mil elementos (413), no máximo 50 problemas no 400 e sessão antes do schema no push. **Peço uma tarefa na Sprint 2**: "migrar para zod >= 4.6.6 + vitest 4" (engenheiro + donos dos contracts, com ADR). Resposta ao Alexandre: R-20261031-182013.
4. **GitGuardian**: `.gitguardian.yaml` ignora só `apps/conector/test/**` e `modules/core/api/autenticacao.test.ts`.
5. **Guardião v3**: sem 🔴. Dois 🟡 (MACUXI_AGENTE vence o subagente; `alexandre` autodeclarado por branch/trailer + merge automático na nuvem) e três 🟢, no R-20261031-182056 (pedido encerrado).
6. **T-0024**: padrão e ordem no R-20261031-182141. Registre na tarefa.
7. Lockfile conferido e aceito (R-20261031-182547-2, encerrado).

Testes: SDK 149 (16 novos), API 84 (15 novos, 4 com Postgres), mobile 15.
Raiz: lint e typecheck verdes. O test só falha em `@macuxi/db` `testes/sessao.test.ts:211` (`dispositivoBloqueado`, RN-CORE-15 do core em andamento), que não é meu: avisei banco-dados e core no R-20261031-183817. `verificar engenheiro-software` sem violação.

Pendências:
- Ligar o 423 DISPOSITIVO_BLOQUEADO no shell (pedido R-20261031-182211 do core; próxima rodada).
- Tornar `ProvedorSync.escopo` obrigatório: os provedores do core e do vendedor já declaram, mas faltam os de teste da API e de `tests/` (combinar com o testes).
- Revisões pedidas por gestor, integracao e catalogo: respondidas como "na onda de revisões".
- `MACUXI_ARQUIVOS_DIR` no `db/.env.example` é do banco-dados (opcional; o padrão funciona).

## Pronto quando
Commit da rodada, depois que o db#test ficar verde.
