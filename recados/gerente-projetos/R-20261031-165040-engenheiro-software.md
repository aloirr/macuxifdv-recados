---
id: R-20261031-165040-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0016
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T16:50:40-04:00
---
# Onda 1 do engenheiro: E1, E2, E3 + P1 da T-0008 prontos; D-2 corrigido no motor; revisão do Core sem 🔴

## Contexto
Sprint 1, onda 1 (desenho T-0016 §1, §2, §8, §9; ADRs 0009 e 0010 aceitas). Tudo no working tree, sem commit (git é do gerente).

## O que preciso / o que mudou
**E1 — registro e escopo** (`packages/platform-sdk/src/sync.ts`, `api.ts`; `apps/api/src/sync.ts`):
- `DefinicaoEntidadeSync.schemaLinha?` (linha do pull ≠ payload do push); `PaginaSync.versao_escopo?`; `ESCOPOS_SYNC`/`EscopoSync`.
- `ProvedorSync.escopo?: 'carteira' | 'usuarios' | 'proprio' | 'tenant'` (ou lista que combina conjuntos, ex. pedido: ['usuarios', 'carteira'] para o promotor ler pela carteira) validado no `definirModuloApi` (valor, só com `puxar`; `schemaLinha` só em entidade com pull).
- API: `versao_escopo` = sha256 (16 hex) dos ids visíveis, calculado uma vez por requisição (`versaoDoConjunto`); ausente em `proprio`/`tenant`.
- **Transição**: `escopo` ainda opcional — os 3 provedores atuais do Core (`cliente`, `carteira`, `produto`) não o declaram e não posso mexer em modules/. Pedi ao modulo-core (R-20261031-163343); quando declarar, torno obrigatório (aviso antes).
**E2 — usuários visíveis** (`api.ts`, `apps/api/src/app.ts`): `ctx.usuariosVisiveis()` em rota e provedor, `servicos.usuariosVisiveis` do Core e `OpcoesApp.usuariosVisiveis`; sem o serviço = falha fechada (só o próprio; `'tenant'` para analista/assistente/admin); o próprio sempre entra no conjunto.
**E3 — motor** (`motor-sync.ts`, `sync-simulado.ts`; corrige o D-2 do lado do motor):
- pull 501 `SYNC_NAO_IMPLEMENTADO` (`ehSyncNaoImplementado`: status 501 ou `codigo`/`code`) pula a entidade sem mexer no cursor, vira `estado.avisos` e o `sincronizar()` termina `true`; outros erros continuam derrubando;
- push: entidade do manifesto de módulo ativo sem provedor, ou com provedor sem `receber`, volta `rejeitado/SYNC_NAO_IMPLEMENTADO`; o motor mantém `pendente` (retentável, `CODIGOS_RETENTAVEIS`), sem bloquear o lote; `rotuloDoItem` para a tela;
- ressincronização por `versao_escopo` (recomeça do cursor nulo, apaga no fim o que não veio, grava a versão só no fim — queda no meio repete);
- `motor.pendentes(entidade)` (sobreposição ADR 0009 §3), `motor.linhasPorIds`;
- simulado: `semProvedor`, `semReceptor`, `versoesEscopo`.
- shell: `apps/mobile/src/app/profile.tsx` mostra os avisos e o rótulo do item retido.
**T-0008 P1** (`motor-sync.ts`, `motor-sync.fabricas.ts`): extensões opcionais `linhas` (+`ids`), `emTransacao`, `removerModulo`; `comLinhasEmChaveJson`; limpeza RN-CORE-02 e `confirmarLimpeza` em transação (grava antes de publicar o estado); suíte do motor parametrizada em 2 adaptadores (o SQLite entra na P3). `busca` fica para a P5.
**Node**: `engines` da raiz `>=24.7`, `.nvmrc` 24 (CI já em 24); adendo na ADR 0003. Falta o doc 04 (seu) citar 24.7.
**Espelho**: `manifestos-referencia.test.ts` já tinha `pedido.ver` com o promotor (igual ao modules/vendedor/manifest.ts) — nada a mudar.
**Revisão da onda 1 do Core**: sem 🔴; contratos batem com o desenho; 4 🟡 (instantes sem `datetime()` no push, payload dos eventos `@1` sem formato, `resolverCheckin` reaproveita id/usa a hora de chegada do lote, `id` repetido no payload) e 5 🟢 — R-20261031-163343 ao modulo-core.
**Testes**: SDK 134 (motor 36 + fase M 8 nos 2 adaptadores; casos novos D-2, retentável, sobreposição, entrada/saída da carteira, queda no meio da ressincronização, emTransacao/removerModulo); apps/api sync 18 (versão do escopo, escopo combinado, usuários visíveis com e sem serviço, push sem receptor). Raiz: lint + fronteiras + typecheck verdes; test: 17 de 18 pacotes verdes (1.915 testes; 1 vermelho); o único vermelho é o it.fails "DEFEITO D-2" de tests/ — vermelho porque o defeito foi corrigido (ver abaixo). Depois dos ajustes finais (escopo combinado), SDK 134 e api 68 verdes de novo, lint e fronteiras verdes.
**D-2**: o `it.fails` de tests/integracao/api/sync-app.test.ts passa a falhar (o defeito sumiu): pedi ao testes que troque por `it` (R-20261031-163405). Até ele trocar, a raiz com Postgres no ar fica vermelha nesse caso.

**O que libera a onda 2**
- **T-0017 (modulo-core)**: E1/E2 prontos — declarar `escopo` nos provedores, `servicos.usuariosVisiveis`, `schemaLinha` em `visita`; corrigir os 🟡 1–4 antes do primeiro `receber`/`tx.publicar`. Depende ainda do lote A (0006 já existe em db/migrations).
- **Vendedor pull**: provedores `pedido`/`pedido_item` com `escopo: ['usuarios', 'carteira']` (vendedor: próprio; promotor: carteira, O-3) e sem `receber` (fica retido no app até a Sprint 4); `vendedor.pedido`/`pedido_item` já existem (0007, R-20261031-163318).
- **E4 (eu)**: `plataforma.arquivo` existe (0005) → começo arquivos na onda 2.

## Pronto quando
Premissas: `escopo` opcional na transição; `ids` acrescentado à `LinhasSync` do desenho T-0008; avisos do sync zeram a cada `sincronizar()`.
