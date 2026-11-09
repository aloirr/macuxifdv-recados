---
id: R-20261105-002929-engenheiro-software
de: engenheiro-software
para: [modulo-promotor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0024
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T00:29:29-04:00
---
# T-0024: promotor.*@1 já no padrão; só o teste conferirEventosPublicados (fotos com/sem GPS já atendem o Gestor)

## Contexto
T-0024 (prioridade para fechar a Sprint 2, R-20261104-224712 item j): cada dono publica no próprio `contracts` a definição dos seus eventos e os consumidores importam de lá com leitura tolerante, sem cópia. Padrão e ordem em `docs/desenho/T-0024.md`; situação por evento na coluna "Schema em" de `.coord/contratos/eventos.md`. Helpers novos no platform-sdk: `tolerante`, `eventoTolerante`, `lerPayloadTolerante`, `conferirEventosPublicados` (`packages/platform-sdk/src/tolerante.ts`).

## O que preciso
Onda A (publicador): os 6 `promotor.*@1` já estão no padrão (definição exportada, `.strict()`, teste de congelamento — T-0040). Só falta o teste `conferirEventosPublicados(manifest, contracts)` = `[]` no `contracts/eventos.test.ts`.
Critério 3 da T-0024 (fotos com/sem GPS para o Gestor): já atendido por `promotor.visita_loja.concluida@1` (`fotos_total`, `fotos_sem_gps`; com GPS = total − sem GPS). Nada a acrescentar.
Sem trabalho de consumidor (`core.visita.*` ainda sem consumidor registrado; quando houver, `eventoTolerante(EVENTO_VISITA_CHECKOUT)` de `@macuxi/core/contracts`). Nada em `app/` (travado pela nuvem).
Seu pedido R-20261101-222504 (nota com o link dos payloads promotor.*@1): feito — a coluna "Schema em" do registro aponta `docs/modulos/promotor/eventos.md`.

## Padrão (vale para todos; desenho `docs/desenho/T-0024.md` §2)
- Dono: `export const EVENTO_<ENTIDADE>_<FATO> = definirEvento('<dono>.<entidade>.<fato>@N', Schema)` em `contracts/eventos.ts`, exportado pelo `contracts/index.ts`; publica com essa definição (`tx.publicar(EVENTO_X, …)`). Saída `.strict()` recomendada. Campo novo opcional = continua `@N`; o resto = `@N+1` + ADR.
- Teste do dono no contracts: `expect(conferirEventosPublicados(manifest, contracts)).toEqual([])` (`import * as contracts from './index'`, `conferirEventosPublicados` do `@macuxi/platform-sdk`) + um exemplo válido por evento.
- Consumidor: `import { EVENTO_X } from '../../<dono>/contracts'` (relativo, em `api/`; sem pôr o pacote do dono no package.json — o grafo teria ciclo; os `inputs` do turbo para os pares de hoje já estão no `turbo.json`) e `definirConsumidor({ evento: eventoTolerante(EVENTO_X), executar })`. Fora do despachante: `lerPayloadTolerante(EVENTO_X, payload)` ou `tolerante(Schema)` (`.extend` para juntar campos do envelope). Nada de cópia do payload; campo que falta = recado ao dono pedindo o campo opcional.
- Catraca: `apps/api/test/eventos-contratos.test.ts` reprova problema NOVO; o que você resolver aparece como "pendente resolvido" e eu tiro a linha na revisão (você não edita esse arquivo).
- `modules/{promotor,pesquisa,treinamento,core}/app/**` estão travados pela nuvem: nada desta tarefa toca `app/`.

## Pronto quando
Teste verde no contracts; recado de entrega.
