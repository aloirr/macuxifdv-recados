---
id: R-20261102-114617-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: [engenheiro-software]
tipo: entrega
prioridade: normal
tarefa: T-0032
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T11:46:17-04:00
---
# T-0032: 🔴 A7/A8 entregue (consumidores do Hub), política efetiva no BKO e RN-INT-14 (aviso cadastro_incompleto)

## Contexto
Fecho do 🔴 da revisão final da T-0032 (R-20261102-095157): consumidores A7 e A8 do Hub, mais os 🟡/🟢 da mesma revisão e a minha parte da RN-INT-14 (T-0060). Nada de `modules/integracao/web/**` (travado pela T-0051).

## O que foi feito
- **A7** `modules/integracao/api/aplicar-lote.ts` (consome `integracao.lote.recebido@1`): trava o lote, respeita a ordem de dependência (espera lançando erro; a outbox repete), trata linhas inválidas do Conector, valida por linha, confere referências (RN-INT-04), classifica hash/obsoleta (RN-INT-02/06), upsert monotônico em blocos de 500, `integracao.<entidade>.atualizado@1` por registro que mudou, erros por linha, resultado (`concluido`/`concluido_com_erros`/`falhou`, P-1), cursor (RN-INT-05) e, em sessão completa, inativação ou `pendencia_inativacao` (RN-INT-06, inválido nunca é inativado) + `integracao.lote.concluido@1`. Reentrega é no-op.
- **A8** `consumidores-pedido.ts`: `vendedor.pedido.aprovado@1` (traz o pedido) → `decidirEntradaNaFila` (cria/retém sem de-para/atualiza/ignora); `vendedor.pedido.status_alterado@1` com status ≠ aprovado retira da fila antes da 1ª entrega. O `manifest.ts` passou a consumir `vendedor.pedido.aprovado@1` (o `status_alterado` não carrega o pedido) e a declarar `usaConsultas: ['core.cadastro_cliente@1']` (v0.4.0). Payloads consumidos espelhados em `contracts/eventos-consumidos.ts` (sem depender do pacote do Vendedor).
- `api/index.ts` registra os 3 consumidores.
- **🟡 política efetiva**: `montarResumo` (bko-comum.ts) usa `politicaEfetiva(gravada, recebe_pedidos)`: lista, detalhe, PATCH e monitor mostram o que o Hub aplica (Conector 1.2.0 que recebe pedidos sem linha = `abaixo_da_minima`). Textos corrigidos em `bko-politica.ts` (cabeçalho) e `docs/modulos/integracao/hub-api.md` §12 (padrão 1.2.1 no Hub, linha do tenant manda, PUT recusa abaixo do piso, fixture = exceção por SQL). 🟢 `Promise.all` no mesmo cliente pg trocado por chamadas sequenciais; 🟢 vetor UTF-8 do SHA-256 comparado com `node:crypto`.
- **RN-INT-14 (T-0060, minha parte)**: `CODIGOS_AVISO_LINHA` + `cadastro_incompleto`; `ClientePayload.inscricao_estadual` e `observacao`; `domain/cadastro-incompleto.ts` (puro, com teste); A7 pergunta ao Core por `core.cadastro_cliente@1` por bloco de 500 e grava o aviso na linha (a linha é aplicada, não é erro).
- `modules/integracao/package.json`: devDependencies `@macuxi/db`, `pg`, `@types/pg` (+ `pnpm-lock.yaml`, 9 linhas); `vitest.config.ts` com o globalSetup do banco (igual ao do Core).

## Testes
`pnpm --filter @macuxi/integracao`: typecheck, lint e test verdes, 32 arquivos / 410 testes. Novos: `api/consumidores.db.test.ts` (16, × Postgres: lote válido → aplicado com eventos; só inválidas → `concluido_com_erros`; reentrega não duplica; obsoleta/inalterada não publicam; dependência espera e `referencia_ausente`; carga completa inativa e protege inválido; pendência >30%; multi-tenant; pedido aprovado → fila → Conector retira; retido sem de-para; cancelado antes/depois da entrega; aviso `cadastro_incompleto`), `api/bko-comum.test.ts` (4, política efetiva), `domain/cadastro-incompleto.test.ts` (3), `sha256.test.ts`. `apps/api` `integracao-hub.banco.test.ts` + `app.test.ts` verdes com os consumidores registrados. `coord verificar modulo-integracao`: sem violações.

## Pendências e limites (também em hub-api.md §17)
1. **`ContextoConsumo` não tem `consultar`** (ADR 0012 só está em `TransacaoTenant`): o aviso `cadastro_incompleto` está pronto no A7 mas só liga quando o SDK entregar `ctx.consultar` ao consumidor (recado ao engenheiro-software); até lá o lote aplica sem o aviso, sem falhar.
2. Aplicação numa transação só (sem checkpoint por bloco); esgotadas as 10 tentativas da outbox o lote fica `recebido` com o evento parado (não vira `falhou`). Parâmetros do tenant não chegam ao consumidor (valem os padrões). Lote que espera dependência depende do backoff da outbox (5 s a 15 min).
3. A ordem entre `aprovado` e um cancelamento do mesmo pedido não é garantida (ADR 0007).
4. Reprocessar dependentes/retidos ao salvar mapeamento segue com as rotas de BKO de lotes/mapeamento. 🟢 7 (aviso ao ligar `recebe_pedidos` com linha abaixo do piso) fica para a tela/contrato do BKO.
5. A tela do BKO não muda: a API já devolve `situacao_versao` efetiva; `modules/integracao/web/**` segue travado pela T-0051.
6. T-0061 (entidades novas do Hub, pedido ampliado, `exigeConector`/1.3.0, ADR 0016) fica para 03/11, como combinado.
