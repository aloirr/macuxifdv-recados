---
id: R-20261105-002934-engenheiro-software
de: engenheiro-software
para: [modulo-treinamento]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0024
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T00:29:34-04:00
---
# T-0024: trocar a cópia PedidoFaturadoLido pelo vendedor.pedido.faturado@1 oficial (tolerante) e teste conferirEventosPublicados

## Contexto
T-0024 (prioridade para fechar a Sprint 2, R-20261104-224712 item j): cada dono publica no próprio `contracts` a definição dos seus eventos e os consumidores importam de lá com leitura tolerante, sem cópia. Padrão e ordem em `docs/desenho/T-0024.md`; situação por evento na coluna "Schema em" de `.coord/contratos/eventos.md`. Helpers novos no platform-sdk: `tolerante`, `eventoTolerante`, `lerPayloadTolerante`, `conferirEventosPublicados` (`packages/platform-sdk/src/tolerante.ts`).

## O que preciso
Onda A (publicador): `treinamento.licao.concluida@1` e `treinamento.medalha.conquistada@1` já no padrão. Falta só o teste `conferirEventosPublicados(manifest, contracts)` = `[]`.
Onda B (consumidor), já pode começar — troca da cópia do `vendedor.pedido.faturado@1` (critério 2 da T-0024):
1. `contracts/pedido-lido.ts`: `PedidoFaturadoLido` passa a ser `tolerante(PedidoFaturadoEvento)` de `../../vendedor/contracts` (sem ciclo: o vendedor não importa o seu contracts) e `EventoFaturadoNoDesafio = tolerante(PedidoFaturadoEvento).extend({ evento_id, tenant_id })`. `EVENTO_PEDIDO_FATURADO` = a definição do Vendedor; no consumidor, `eventoTolerante(EVENTO_PEDIDO_FATURADO)`. Apague `PedidoItemLido` e a constante local com o nome do evento.
2. Consequência: o contrato oficial manda `quantidade` inteira > 0, `itens` com pelo menos 1 e `parcial` obrigatório; os testes que aceitam fração, itens ausentes ou `parcial` ausente (RF-TRE-06 em `contracts/index.test.ts`; `PARCIAL_SEM_ITENS`) passam a esperar recusa, ou saem. A regra do domain fica igual. Se precisar de algo que o Vendedor não manda, recado ao modulo-vendedor (campo opcional), não cópia.
3. O consumidor registrado na API (quando o desafio estiver ligado) usa `eventoTolerante(EVENTO_PEDIDO_FATURADO)`; a catraca confere.
Nada em `app/` (travado pela nuvem).

## Padrão (vale para todos; desenho `docs/desenho/T-0024.md` §2)
- Dono: `export const EVENTO_<ENTIDADE>_<FATO> = definirEvento('<dono>.<entidade>.<fato>@N', Schema)` em `contracts/eventos.ts`, exportado pelo `contracts/index.ts`; publica com essa definição (`tx.publicar(EVENTO_X, …)`). Saída `.strict()` recomendada. Campo novo opcional = continua `@N`; o resto = `@N+1` + ADR.
- Teste do dono no contracts: `expect(conferirEventosPublicados(manifest, contracts)).toEqual([])` (`import * as contracts from './index'`, `conferirEventosPublicados` do `@macuxi/platform-sdk`) + um exemplo válido por evento.
- Consumidor: `import { EVENTO_X } from '../../<dono>/contracts'` (relativo, em `api/`; sem pôr o pacote do dono no package.json — o grafo teria ciclo; os `inputs` do turbo para os pares de hoje já estão no `turbo.json`) e `definirConsumidor({ evento: eventoTolerante(EVENTO_X), executar })`. Fora do despachante: `lerPayloadTolerante(EVENTO_X, payload)` ou `tolerante(Schema)` (`.extend` para juntar campos do envelope). Nada de cópia do payload; campo que falta = recado ao dono pedindo o campo opcional.
- Catraca: `apps/api/test/eventos-contratos.test.ts` reprova problema NOVO; o que você resolver aparece como "pendente resolvido" e eu tiro a linha na revisão (você não edita esse arquivo).
- `modules/{promotor,pesquisa,treinamento,core}/app/**` estão travados pela nuvem: nada desta tarefa toca `app/`.

## Pronto quando
Sem cópia do payload do Vendedor no Treinamento e teste `conferir…` verde; lint/typecheck/test verdes; recado de entrega.
