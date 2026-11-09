---
id: R-20261105-002908-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0024
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T00:29:08-04:00
---
# T-0024: schema do core.rota.dia_planejado@1 e troca das cópias de vendedor.pedido.* e integracao.* (fora de app/)

## Contexto
T-0024 (prioridade para fechar a Sprint 2, R-20261104-224712 item j): cada dono publica no próprio `contracts` a definição dos seus eventos e os consumidores importam de lá com leitura tolerante, sem cópia. Padrão e ordem em `docs/desenho/T-0024.md`; situação por evento na coluna "Schema em" de `.coord/contratos/eventos.md`. Helpers novos no platform-sdk: `tolerante`, `eventoTolerante`, `lerPayloadTolerante`, `conferirEventosPublicados` (`packages/platform-sdk/src/tolerante.ts`).

## O que preciso
Onda A (publicador), já:
1. `core.rota.dia_planejado@1`: schema + definição em `contracts/eventos.ts` (`RotaDiaPlanejadoSchema`, `EVENTO_ROTA_DIA_PLANEJADO`), no formato que o Gestor propôs: `{ usuario_id: uuid, data: 'AAAA-MM-DD' (dia civil no fuso do tenant), cliente_ids: uuid[] }` (acréscimos opcionais seus são bem-vindos, p.ex. `rota_id`). Fica FORA do `publica` até o Core publicar de fato (registro "planejado").
2. Teste `conferirEventosPublicados(manifest, contracts)` = `[]` (já passa nos 6 publicados).
3. Nada a mudar no `core.cliente.atualizado@1`: `frequencia_visita` e `na_carteira_desde` (RN-GES-01/02) já estão no schema. Não acrescente `nome` (o Gestor lê como opcional; nome vem da consulta `core.cadastro_resumo@1`, não de evento).
Onda B (consumidor):
4. Já: `api/consumidores-pedido.ts` → `eventoTolerante(EVENTO_PEDIDO_STATUS_ALTERADO)` e `eventoTolerante(EVENTO_PEDIDO_APROVACAO_SOLICITADA)` de `../../vendedor/contracts` (o `pedido_numero` oficial é `string | null | undefined`; a cópia aceitava número).
5. Depois da entrega do modulo-integracao (eu aviso): `api/erp-apoio.ts` (`eventoIntegracao`) e `api/consumidores-erp*.ts` (`EventoIntegracaoClienteAtualizado` etc., 8 entidades) → `eventoTolerante(<definição da entidade>)` de `../../integracao/contracts`. O registro passa a ser o `SCHEMA_REGISTRO` do Hub; campo que você lê e não existe lá = recado ao modulo-integracao, não cópia.
6. `treinamento.medalha.conquistada@1` ainda sem consumidor; quando tiver, mesmo padrão.
Tudo em `contracts/` e `api/` — `modules/core/app/**` está travado pela nuvem (o `app/lib/leitor-tolerante.ts` pode virar o `tolerante` do SDK depois, fora desta tarefa).

## Padrão (vale para todos; desenho `docs/desenho/T-0024.md` §2)
- Dono: `export const EVENTO_<ENTIDADE>_<FATO> = definirEvento('<dono>.<entidade>.<fato>@N', Schema)` em `contracts/eventos.ts`, exportado pelo `contracts/index.ts`; publica com essa definição (`tx.publicar(EVENTO_X, …)`). Saída `.strict()` recomendada. Campo novo opcional = continua `@N`; o resto = `@N+1` + ADR.
- Teste do dono no contracts: `expect(conferirEventosPublicados(manifest, contracts)).toEqual([])` (`import * as contracts from './index'`, `conferirEventosPublicados` do `@macuxi/platform-sdk`) + um exemplo válido por evento.
- Consumidor: `import { EVENTO_X } from '../../<dono>/contracts'` (relativo, em `api/`; sem pôr o pacote do dono no package.json — o grafo teria ciclo; os `inputs` do turbo para os pares de hoje já estão no `turbo.json`) e `definirConsumidor({ evento: eventoTolerante(EVENTO_X), executar })`. Fora do despachante: `lerPayloadTolerante(EVENTO_X, payload)` ou `tolerante(Schema)` (`.extend` para juntar campos do envelope). Nada de cópia do payload; campo que falta = recado ao dono pedindo o campo opcional.
- Catraca: `apps/api/test/eventos-contratos.test.ts` reprova problema NOVO; o que você resolver aparece como "pendente resolvido" e eu tiro a linha na revisão (você não edita esse arquivo).
- `modules/{promotor,pesquisa,treinamento,core}/app/**` estão travados pela nuvem: nada desta tarefa toca `app/`.

## Pronto quando
1–2 e 4 agora; 5 depois da integração. Lint/typecheck/test verdes; recado de entrega.
