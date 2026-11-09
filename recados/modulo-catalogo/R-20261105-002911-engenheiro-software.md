---
id: R-20261105-002911-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0024
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T00:29:11-04:00
---
# T-0024: catalogo.produto.visualizado@1 e busca.realizada@1 sem schema; troca das cópias de integracao.* depois do Hub

## Contexto
T-0024 (prioridade para fechar a Sprint 2, R-20261104-224712 item j): cada dono publica no próprio `contracts` a definição dos seus eventos e os consumidores importam de lá com leitura tolerante, sem cópia. Padrão e ordem em `docs/desenho/T-0024.md`; situação por evento na coluna "Schema em" de `.coord/contratos/eventos.md`. Helpers novos no platform-sdk: `tolerante`, `eventoTolerante`, `lerPayloadTolerante`, `conferirEventosPublicados` (`packages/platform-sdk/src/tolerante.ts`).

## O que preciso
Onda A (publicador): `catalogo.produto.visualizado@1` e `catalogo.busca.realizada@1` estão no `publica` do manifesto sem schema nem definição (o Catálogo não tem `contracts/eventos.ts`). Escolha uma:
(a) criar `contracts/eventos.ts` com schema `.strict()` + `definirEvento` dos dois (só ids, termo normalizado sem dado pessoal, contagens e instantes UTC) e exportar pelo index; ou
(b) tirar os dois do `publica` (e o `busca.realizada@1` do `consome`) até o Catálogo publicar de fato, e me avisar para marcar "planejado" no registro.
Teste `conferirEventosPublicados(manifest, contracts)` = `[]`.
Onda B (consumidor), DEPOIS da entrega do modulo-integracao (eu aviso): `api/consumidores-erp.ts` (`envelope()` e os `Registro*` locais de preço, estoque, catalogo_no e produto) → `eventoTolerante(<definição da entidade>)` de `../../integracao/contracts`.

## Padrão (vale para todos; desenho `docs/desenho/T-0024.md` §2)
- Dono: `export const EVENTO_<ENTIDADE>_<FATO> = definirEvento('<dono>.<entidade>.<fato>@N', Schema)` em `contracts/eventos.ts`, exportado pelo `contracts/index.ts`; publica com essa definição (`tx.publicar(EVENTO_X, …)`). Saída `.strict()` recomendada. Campo novo opcional = continua `@N`; o resto = `@N+1` + ADR.
- Teste do dono no contracts: `expect(conferirEventosPublicados(manifest, contracts)).toEqual([])` (`import * as contracts from './index'`, `conferirEventosPublicados` do `@macuxi/platform-sdk`) + um exemplo válido por evento.
- Consumidor: `import { EVENTO_X } from '../../<dono>/contracts'` (relativo, em `api/`; sem pôr o pacote do dono no package.json — o grafo teria ciclo; os `inputs` do turbo para os pares de hoje já estão no `turbo.json`) e `definirConsumidor({ evento: eventoTolerante(EVENTO_X), executar })`. Fora do despachante: `lerPayloadTolerante(EVENTO_X, payload)` ou `tolerante(Schema)` (`.extend` para juntar campos do envelope). Nada de cópia do payload; campo que falta = recado ao dono pedindo o campo opcional.
- Catraca: `apps/api/test/eventos-contratos.test.ts` reprova problema NOVO; o que você resolver aparece como "pendente resolvido" e eu tiro a linha na revisão (você não edita esse arquivo).
- `modules/{promotor,pesquisa,treinamento,core}/app/**` estão travados pela nuvem: nada desta tarefa toca `app/`.

## Pronto quando
Onda A agora; B depois da integração. Lint/typecheck/test verdes; recado de entrega.
