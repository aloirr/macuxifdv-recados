---
id: R-20261105-002937-engenheiro-software
de: engenheiro-software
para: [modulo-gestor]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0024
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T00:29:37-04:00
---
# T-0024: trocar as cópias de eventos-consumidos.ts pelos schemas oficiais (tolerante): core, promotor, pesquisa, treinamento, vendedor

## Contexto
T-0024 (prioridade para fechar a Sprint 2, R-20261104-224712 item j): cada dono publica no próprio `contracts` a definição dos seus eventos e os consumidores importam de lá com leitura tolerante, sem cópia. Padrão e ordem em `docs/desenho/T-0024.md`; situação por evento na coluna "Schema em" de `.coord/contratos/eventos.md`. Helpers novos no platform-sdk: `tolerante`, `eventoTolerante`, `lerPayloadTolerante`, `conferirEventosPublicados` (`packages/platform-sdk/src/tolerante.ts`).

## O que preciso
Troca das cópias de `contracts/eventos-consumidos.ts` (critério 2 da T-0024). `EVENTOS_CONSUMIDOS` vira, por evento, `tolerante(<schema do dono>)`; seu `z.unknown()` no despachante continua (exceção registrada na catraca: `CONSUMO_ABERTO`). Tipos = `z.infer` dos schemas do dono.
Já pode começar:
1. Core (`@macuxi/core/contracts`, já dependência): `ClienteAtualizadoV1` → `tolerante(ClienteAtualizadoSchema)` (`frequencia_visita` e `na_carteira_desde` já estão no oficial; `nome` NÃO está e não vai entrar — nome vem de `core.cadastro_resumo@1`); `VisitaCheckinV1` → `tolerante(VisitaCheckinSchema)`; `core.visita.checkout@1` → `tolerante(VisitaCheckoutSchema)`; `MetaDefinidaV1` → `tolerante(MetaDefinidaSchema)` (formato oficial `{ usuario_id, periodo, indicador, valor, valor_anterior, definido_por }`: `mes` = `periodo`, `meta_cents` = `valor` com `indicador = 'venda_cents'`; o evento já é publicado, pode sair de `EVENTOS_PROPOSTOS` e entrar no `consome`). `RotaDiaPlanejadoV1` continua proposto até o Core publicar o schema (pedi a ele no mesmo formato).
2. Promotor: os 6 já são oficiais, mas lidos `.strict()` — passe a `tolerante(EVENTOS_PROMOTOR[nome])` (os refinamentos RN-PRO continuam). Fotos com/sem GPS: `fotos_total` e `fotos_sem_gps` no `visita_loja.concluida@1` (com GPS = total − sem) — critério 3 atendido.
3. Pesquisa e Treinamento (relativo `../../pesquisa/contracts`, `../../treinamento/contracts`; inputs do turbo já incluídos): `RespostaRegistradaV1`, `LicaoConcluidaV1`, `MedalhaConquistadaV1` → `tolerante(...)` dos oficiais (o oficial tem mais campos, todos obrigatórios; `suspeita` tem default).
4. Vendedor (relativo `../../vendedor/contracts`): `PedidoCriadoV1` (o oficial manda `tipo: 'pedido'`, `total_tabela_cents` e `itens` com `total_cents` sempre preenchidos — RN-GES-06 atendido), `PedidoStatusAlteradoV1`, `PedidoFaturadoV1` → `tolerante(...)` dos oficiais.
Depois da entrega do modulo-vendedor (eu aviso):
5. `AprovacaoSolicitadaV1` → `tolerante(AprovacaoSolicitadaEvento)`, quando `credito`/`historico` passarem a `objeto | null` no formato `CreditoClienteV1`/`HistoricoClienteV1` (pedido ao Vendedor; continua `null` na fatia).
Atualize também o comentário de topo do arquivo e `docs/modulos/gestor/regras.md:157` (as cópias deixam de existir). Os ramos de `tipo === 'orcamento'` ficam sem efeito (o oficial só publica `pedido`); se o typecheck reclamar, trate no domain.

## Padrão (vale para todos; desenho `docs/desenho/T-0024.md` §2)
- Dono: `export const EVENTO_<ENTIDADE>_<FATO> = definirEvento('<dono>.<entidade>.<fato>@N', Schema)` em `contracts/eventos.ts`, exportado pelo `contracts/index.ts`; publica com essa definição (`tx.publicar(EVENTO_X, …)`). Saída `.strict()` recomendada. Campo novo opcional = continua `@N`; o resto = `@N+1` + ADR.
- Teste do dono no contracts: `expect(conferirEventosPublicados(manifest, contracts)).toEqual([])` (`import * as contracts from './index'`, `conferirEventosPublicados` do `@macuxi/platform-sdk`) + um exemplo válido por evento.
- Consumidor: `import { EVENTO_X } from '../../<dono>/contracts'` (relativo, em `api/`; sem pôr o pacote do dono no package.json — o grafo teria ciclo; os `inputs` do turbo para os pares de hoje já estão no `turbo.json`) e `definirConsumidor({ evento: eventoTolerante(EVENTO_X), executar })`. Fora do despachante: `lerPayloadTolerante(EVENTO_X, payload)` ou `tolerante(Schema)` (`.extend` para juntar campos do envelope). Nada de cópia do payload; campo que falta = recado ao dono pedindo o campo opcional.
- Catraca: `apps/api/test/eventos-contratos.test.ts` reprova problema NOVO; o que você resolver aparece como "pendente resolvido" e eu tiro a linha na revisão (você não edita esse arquivo).
- `modules/{promotor,pesquisa,treinamento,core}/app/**` estão travados pela nuvem: nada desta tarefa toca `app/`.

## Pronto quando
1–4 agora e 5 depois do Vendedor; nenhum schema de payload alheio escrito à mão no Gestor; lint/typecheck/test verdes; recado de entrega.
