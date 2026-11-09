---
id: R-20261105-002906-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0024
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T00:29:06-04:00
---
# T-0024: credito/historico do aprovacao_solicitada@1 no formato do Gestor (aditivo) e troca das cópias de integracao.* depois do Hub

## Contexto
T-0024 (prioridade para fechar a Sprint 2, R-20261104-224712 item j): cada dono publica no próprio `contracts` a definição dos seus eventos e os consumidores importam de lá com leitura tolerante, sem cópia. Padrão e ordem em `docs/desenho/T-0024.md`; situação por evento na coluna "Schema em" de `.coord/contratos/eventos.md`. Helpers novos no platform-sdk: `tolerante`, `eventoTolerante`, `lerPayloadTolerante`, `conferirEventosPublicados` (`packages/platform-sdk/src/tolerante.ts`).

## O que preciso
Onda A (publicador), já:
1. `vendedor.pedido.aprovacao_solicitada@1` (`AprovacaoSolicitadaEvento`, `contracts/eventos.ts`): `credito: z.null()` → `CreditoClienteEvento.nullable()` e `historico: z.null()` → `HistoricoClienteEvento.nullable()`, no formato que o Gestor já lê: crédito `{ limite_cents inteiro ≥ 0, saldo_aberto_cents inteiro ≥ 0, disponivel_cents inteiro (pode ser negativo, RN-VEN-12) }`; histórico `{ ultima_compra_em ISO UTC | null, pedidos_90d inteiro ≥ 0, ticket_medio_cents inteiro ≥ 0 | null }`. Continua publicando `null` na fatia (T-0029 §14). Fica `@1`: os únicos consumidores (gestor e core) já aceitam objeto ou null.
2. Teste `conferirEventosPublicados(manifest, contracts)` = `[]`. Hoje ele acusa `contracts/pre-venda.ts` exportando `EVENTO_RETORNO_ERP_CONSUMIDO` (definição de evento da integração) — sai no item 4.
Onda B (consumidor), DEPOIS da entrega do modulo-integracao (eu aviso):
3. `api/eventos-consumidos.ts` (`NotaAtualizadaLida`, `EVENTO_NOTA_ATUALIZADA`) → `eventoTolerante(<definição da nota>)` de `../../integracao/contracts`.
4. `contracts/pre-venda.ts` (`RetornoErpConsumido`, `EVENTO_RETORNO_ERP_CONSUMIDO`) → `eventoTolerante(EVENTO_PEDIDO_RETORNO_ERP)` do contracts da integração, com o import em `api/` (a integração importa o seu contracts em `api/`; ciclo se ambos ficarem em contracts). Se o domain usa o tipo, `z.infer` do schema do dono.
5. `promotor.ruptura.registrada@1` ainda não tem consumidor; quando tiver, mesmo padrão (`eventoTolerante(EVENTO_RUPTURA_REGISTRADA)`).

## Padrão (vale para todos; desenho `docs/desenho/T-0024.md` §2)
- Dono: `export const EVENTO_<ENTIDADE>_<FATO> = definirEvento('<dono>.<entidade>.<fato>@N', Schema)` em `contracts/eventos.ts`, exportado pelo `contracts/index.ts`; publica com essa definição (`tx.publicar(EVENTO_X, …)`). Saída `.strict()` recomendada. Campo novo opcional = continua `@N`; o resto = `@N+1` + ADR.
- Teste do dono no contracts: `expect(conferirEventosPublicados(manifest, contracts)).toEqual([])` (`import * as contracts from './index'`, `conferirEventosPublicados` do `@macuxi/platform-sdk`) + um exemplo válido por evento.
- Consumidor: `import { EVENTO_X } from '../../<dono>/contracts'` (relativo, em `api/`; sem pôr o pacote do dono no package.json — o grafo teria ciclo; os `inputs` do turbo para os pares de hoje já estão no `turbo.json`) e `definirConsumidor({ evento: eventoTolerante(EVENTO_X), executar })`. Fora do despachante: `lerPayloadTolerante(EVENTO_X, payload)` ou `tolerante(Schema)` (`.extend` para juntar campos do envelope). Nada de cópia do payload; campo que falta = recado ao dono pedindo o campo opcional.
- Catraca: `apps/api/test/eventos-contratos.test.ts` reprova problema NOVO; o que você resolver aparece como "pendente resolvido" e eu tiro a linha na revisão (você não edita esse arquivo).
- `modules/{promotor,pesquisa,treinamento,core}/app/**` estão travados pela nuvem: nada desta tarefa toca `app/`.

## Pronto quando
Itens 1–2 agora (recado de entrega, para eu avisar o Gestor); 3–4 depois da integração. Lint/typecheck/test verdes.
