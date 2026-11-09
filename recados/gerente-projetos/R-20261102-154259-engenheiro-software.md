---
id: R-20261102-154259-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0065
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T15:42:59-04:00
---
# T-0065 (A): novidades + sincronizarNovidades, sync_auto_min, push combinado, varredura de timers no CI, ADR 0018

## Contexto
T-0065 (A), RN-CORE-23. Itens 1 a 6 do seu pedido, na ordem. Itens 2 e 3 verdes bem antes das 19h.

## O que fiz
1. **Lockfile**: expo-notifications 57.0.24 (aviso R-20261102-143854; resposta R-20261102-153024). Install com --frozen-lockfile OK; typecheck de apps/mobile verde.
2. **`GET /v1/sync/novidades?desde=<cursor>`** (apps/api/src/sync.ts): devolve `{ entidades, cursor, horizonte, modulos_mudaram, modulos? }`.
   - As entidades elegíveis são as que o pull serviria: módulo efetivo, provedor com puxar, RN-PRO-01/O-3. Cada provedor responde com `limite: 1` desde o horizonte do cursor, então o escopo de carteira é o do próprio provedor.
   - Cursor `n1|horizonte|versao_licencas|versao_escopo`. Licença ou carteira mudada, ou cursor ilegível, devolve todas as entidades (nunca 400). Os módulos novos vêm na própria resposta.
   - Contrato `NovidadesRespostaSchema` em packages/platform-sdk/src/novidades.ts. `motor.sincronizarNovidades({ entidades? })` está em motor-sync.ts com a assinatura que o engenheiro-apps já usa.
   - O cursor só avança depois dos pulls. A sincronização completa grava o cursor-base.
   - Com o push (`opcoes.entidades`), o motor puxa só essas entidades.
   - Sem `transporte.novidades`, cai na completa.
   - Testes: packages/platform-sdk/src/motor-sync.novidades.test.ts (22 casos nos 3 armazenamentos; o critério "1 requisição sem mudança, 2 com 1 entidade" passou) e apps/api/test/sync.test.ts (6 casos novos).
3. **`core.sync_auto_min`**: sempre presente em `/v1/me/modulos` e na resposta das novidades (padrão 30, mínimo 15, teto 1440). Código: apps/api/src/me-modulos.ts e `syncAutoMinEfetivo` no SDK. Não precisa de migração: `plataforma.parametro` aceita o valor do tenant.
4. **Push**: formato combinado com o modulo-core (R-20261102-152219): `data.entidades` (lista) e `data.link`. O silencioso vai sem title/body e com prioridade high. O modulo-core já está implementando.
5. **Varredura no CI**: scripts/ci/timers-sync.mjs (+ teste), `pnpm timers` e um passo novo no job lint do ci.yml. Exceções levam o comentário `timer-permitido:`.
   - Hoje reprova 7 pontos, com recados aos donos: vendedor 5 (R-20261102-152739), core 1 (R-20261102-152742), engenheiro-apps 1 (R-20261102-152745).
   - **Até eles corrigirem, esse passo fica vermelho no CI.** Não pus o script no `pnpm lint` da raiz, para não travar o seu push local.
6. **ADR 0018**: docs/decisoes/0018-modelo-de-sincronizacao.md, que inclui a retomada da ADR 0017 (a tarefa em segundo plano passa a usar sincronizarNovidades, pedido R-20261102-152950).
- Extra: apps/api/test/core-push.banco.test.ts com `data.entidades` (R-20261102-153550).

## Arquivos
packages/platform-sdk/src/{novidades.ts (novo), motor-sync.ts, sync-simulado.ts, index.ts, motor-sync.novidades.test.ts (novo)}; apps/api/src/{sync.ts, me-modulos.ts (novo), app.ts}; apps/api/test/{sync.test.ts, app.test.ts, core-push.banco.test.ts}; scripts/ci/timers-sync.mjs e timers-sync.test.mjs (novos); .github/workflows/ci.yml; package.json (script timers); pnpm-lock.yaml; docs/decisoes/0018-modelo-de-sincronizacao.md.

## Testes
- SDK: motor-sync* + sync, 148/148 verdes.
- API: sync.test + app.test, 64/64 verdes.
- node --test timers-sync: 4/4 verdes.
- tsc do SDK verde. tsc da API verde às 15h20; na última rodada, só erros em modules/core/api/produtos.ts (WIP do modulo-core, contracts ainda sem ProdutoPrecoPutSchema etc.), nenhum nos meus arquivos. eslint dos arquivos tocados verde.
- `verificar engenheiro-software` sem violação.
- O core-push.banco.test.ts não rodou com Postgres aqui: o WIP do modulo-core quebra a montagem da API (core.meta.definida@1 fora do `consome`).

## Pendências (de outros)
- engenheiro-apps: `transporteV1.novidades` (1 método; sem ele o app segue na completa), `timer-permitido` na tela de carga e segundo-plano.ts com sincronizarNovidades.
- modulo-vendedor: tirar os timers. modulo-core: marcar o TICK.
- Depois da demo: teste de carga (p95 < 300 ms).
