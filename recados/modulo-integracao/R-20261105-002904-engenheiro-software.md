---
id: R-20261105-002904-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0024
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T00:29:04-04:00
---
# T-0024: definições dos 16 eventos integracao.* no contracts (desbloqueia core, catalogo, vendedor) e troca das cópias do vendedor.pedido.*

## Contexto
T-0024 (prioridade para fechar a Sprint 2, R-20261104-224712 item j): cada dono publica no próprio `contracts` a definição dos seus eventos e os consumidores importam de lá com leitura tolerante, sem cópia. Padrão e ordem em `docs/desenho/T-0024.md`; situação por evento na coluna "Schema em" de `.coord/contratos/eventos.md`. Helpers novos no platform-sdk: `tolerante`, `eventoTolerante`, `lerPayloadTolerante`, `conferirEventosPublicados` (`packages/platform-sdk/src/tolerante.ts`).

Você é o maior desbloqueio da onda A: core, catalogo e vendedor consomem `integracao.*` e só trocam as cópias depois da sua parte.

## O que preciso
Onda A (publicador), primeiro:
1. Mover as 16 definições de `modules/integracao/api/eventos.ts` (`EVENTO_LOTE_RECEBIDO`, `EVENTO_LOTE_CONCLUIDO`, `EVENTO_PEDIDO_RETORNO_ERP`, `EVENTO_RECONCILIACAO_DIVERGENTE` e o mapa por entidade de `integracao.<entidade>.atualizado@1`) para `modules/integracao/contracts/eventos.ts`, exportadas pelo index. Cada entidade precisa de uma constante própria exportada no topo (a catraca procura `DefinicaoEvento` entre os exports do contracts; um mapa só não basta), para as 12 entidades (cliente, produto, preco, estoque, vendedor, titulo, nota, rota, catalogo_no, produto_unidade, cliente_endereco, transportadora); nome à sua escolha (ex.: `EVENTO_ERP_CLIENTE_ATUALIZADO`). `api/eventos.ts` pode reexportar para não mexer nas rotas.
2. Teste `conferirEventosPublicados(manifest, contracts)` = `[]` no contracts.
Onda B (consumidor), já pode começar:
3. `contracts/eventos-consumidos.ts` (`PedidoAprovadoConsumido`, `PedidoStatusAlteradoConsumido`) e `api/consumidores-pedido.ts`: trocar por `eventoTolerante(EVENTO_PEDIDO_APROVADO)` e `eventoTolerante(EVENTO_PEDIDO_STATUS_ALTERADO)` de `../../vendedor/contracts`, com o import em `api/` (o vendedor vai importar o seu contracts; os dois contracts se importando formariam ciclo). Apague o espelho.
4. `integracao <- integracao.lote.recebido@1`: o consumidor próprio passa a usar a MESMA definição exportada pelo contracts (resolve-se com o item 1).

## Padrão (vale para todos; desenho `docs/desenho/T-0024.md` §2)
- Dono: `export const EVENTO_<ENTIDADE>_<FATO> = definirEvento('<dono>.<entidade>.<fato>@N', Schema)` em `contracts/eventos.ts`, exportado pelo `contracts/index.ts`; publica com essa definição (`tx.publicar(EVENTO_X, …)`). Saída `.strict()` recomendada. Campo novo opcional = continua `@N`; o resto = `@N+1` + ADR.
- Teste do dono no contracts: `expect(conferirEventosPublicados(manifest, contracts)).toEqual([])` (`import * as contracts from './index'`, `conferirEventosPublicados` do `@macuxi/platform-sdk`) + um exemplo válido por evento.
- Consumidor: `import { EVENTO_X } from '../../<dono>/contracts'` (relativo, em `api/`; sem pôr o pacote do dono no package.json — o grafo teria ciclo; os `inputs` do turbo para os pares de hoje já estão no `turbo.json`) e `definirConsumidor({ evento: eventoTolerante(EVENTO_X), executar })`. Fora do despachante: `lerPayloadTolerante(EVENTO_X, payload)` ou `tolerante(Schema)` (`.extend` para juntar campos do envelope). Nada de cópia do payload; campo que falta = recado ao dono pedindo o campo opcional.
- Catraca: `apps/api/test/eventos-contratos.test.ts` reprova problema NOVO; o que você resolver aparece como "pendente resolvido" e eu tiro a linha na revisão (você não edita esse arquivo).
- `modules/{promotor,pesquisa,treinamento,core}/app/**` estão travados pela nuvem: nada desta tarefa toca `app/`.

## Pronto quando
Itens 1–4 com lint/typecheck/test verdes; a catraca mostra resolvidos os pendentes "integracao.* sem DefinicaoEvento" e "integracao <- vendedor.*"; recado de entrega a mim, que aviso core, catalogo e vendedor.
