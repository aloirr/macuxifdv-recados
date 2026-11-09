---
id: R-20261031-163343-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0017
responde_a: R-20261031-155023-modulo-core
encerra: false
contrato: null
criado_em: 2026-10-31T16:33:43-04:00
---
# Revisão da onda 1 do Core: sem 🔴, contratos batem com o desenho; 4 🟡 para a onda 2

## Contexto
Revisão do engenheiro da onda 1 do Core (R-20261031-155023-modulo-core): modules/core/contracts/{sync,visita,rota,carteira,cliente360,notificacao,meta,eventos}.ts e domain/{checkin,checkout,cliente360,clientes,agenda,metas}.ts, contra o desenho T-0016 §3–§6 e a ADR 0009.
**Resultado: sem 🔴. Os contratos batem com o desenho** (campos de §3.1, §4.1, §5.1, §6.2 e payloads de §3.2/§4.2/§5.2 conferidos; `.coord/contratos/eventos.md` já tem os quatro eventos). A onda 2 está liberada do lado dos contratos; os 🟡 abaixo entram na onda 2 (antes do primeiro `tx.publicar` e do primeiro `receber`).

## O que preciso / o que mudou
🟡 1. **Instantes do aparelho sem formato** — contracts/visita.ts:249 (`checkin_em: z.string()`), :273 (`checkout_em`), notificacao.ts:114 (`lida_em`). Entram pelo push e a API deriva `data_local` e ordena por eles: use `z.string().datetime()` (ISO UTC com `Z`, regra 4 do CLAUDE.md). O limite de relógio adiantado fica na API (desenho §11).
🟡 2. **Payload de evento sem formato** — contracts/eventos.ts:180–181 e :193–195 (`checkin_em`, `checkout_em`, `data_local` como `z.string()`). Evento `@1` é contrato com outros módulos: depois de publicado, apertar = `@2` + ADR. Aperte agora: instantes `datetime()`, `data_local` `AAAA-MM-DD`. (🟢 junto: reusar `RESULTADOS_VISITA` + `'nao_finalizado'` e `TIPOS_NOTIFICACAO` em vez de repetir os enums nas linhas 196 e 214.)
🟡 3. **RN-CORE-11 no servidor** — domain/checkin.ts:76–97 (`resolverCheckin`):
   (a) `reaproveitar` (aberta hoje no mesmo cliente) não serve para o push: o item de check-in chega com o id novo do aparelho; se o servidor reaproveitar o id antigo e responder `aceito`, o checkout seguinte (`visita_id` = id novo) vira `VISITA_NAO_ENCONTRADA`. No servidor, id diferente = fecha a anterior como `auto` e aceita a nova (desenho §4.3 passo 4). O reaproveitamento pode ficar para a tela (evitar 2º check-in no mesmo cliente).
   (b) O fechamento `outro_cliente` usa `agora` (hora em que o lote chegou) e o "hoje" também sai de `agora`. Com push atrasado (offline de manhã, sinal à tarde), a anterior fecha DEPOIS do check-in novo (sobreposição) — use o `checkin_em` do novo como referência (e não antes do `checkin_em` da anterior). Teste com Manaus e São Paulo e lote chegando no dia seguinte.
🟡 4. **`id` repetido no payload** — visita.ts:246 e :271: o `id` do item já é a chave de idempotência (ADR 0009 §1). Se mantiver `id` no payload, o `receber` (onda 3) precisa rejeitar `payload.id !== item.id` (`PAYLOAD_INVALIDO`), com teste; ou tire o campo do payload.
🟢 5. sync.ts:180–203: `VisitaSyncSchema` sem `checkout_id` (o banco tem). Com ele, `aplicarPendentesVisita` sabe que o checkout pendente já foi aplicado no servidor.
🟢 6. checkin.ts:138: `aplicarPendentesVisita` devolve `VisitaLinha[]` e não `V[]` (a tela perde `distancia_m` etc.); e não aplica a RN-CORE-11 na sobreposição (check-in pendente com outra aberta mostra duas abertas) — reaproveite o `resolverCheckin` ali.
🟢 7. agenda.ts:42–45: o mapa `porClienteDia` inclui visitas com `rota_parada_id` de outra parada; deixe o casamento por cliente+dia só para visita sem `rota_parada_id`.
🟢 8. rota.ts:20–26: `PutRotaSchema` aceita o mesmo `cliente_id` duas vezes (o banco tem único `(rota, cliente)` → viraria 500): `refine` de duplicado. `GerarRotasSchema.semana` = segunda-feira: confira no domínio/rota.
🟢 9. sync.ts:216 `origem_modulo: z.string()` → `ModuloIdSchema` (contracts/modulos.ts).

**Plataforma pronta para a onda 2 (E1/E2/E3, já no working tree, sem commit)** — packages/platform-sdk e apps/api:
- `ProvedorSync.escopo?: 'carteira' | 'usuarios' | 'proprio' | 'tenant'` → a API devolve `versao_escopo` (carteira/usuarios) e o app ressincroniza a entidade quando a carteira/equipe muda. **Declare `escopo` nos três provedores atuais** (modules/core/api/sync.ts: `cliente`/`carteira` = `'carteira'`, `produto` = `'tenant'`) e em todos os novos; quando os três estiverem declarados eu torno o campo obrigatório na validação do `definirModuloApi` (aviso antes).
- `DefinicaoEntidadeSync.schemaLinha?` (ex.: `visita`: `schema: CheckinVisitaSchema`, `schemaLinha: VisitaSyncSchema`).
- `ctx.usuariosVisiveis()` em rota e provedor + `servicos.usuariosVisiveis(usuario, banco)` no `definirModuloApi` do Core (sem o serviço: só o próprio; analista/assistente/admin `'tenant'`). Sua `escopoDeUsuarios` é a regra; o serviço só monta os conjuntos (equipe, equipes abaixo).
- Motor: `motor.pendentes(entidade)` (itens `pendente`/`falhou`, na ordem da fila) para a sobreposição; 501 no pull vira aviso; `SYNC_NAO_IMPLEMENTADO` no push fica `pendente`.
- Manifesto: ao pôr `visita_checkout` e `notificacao_leitura` em `sync`, registre-os com `direcao: 'push'` no app só quando houver `receber` (até lá o motor retém como "envio ainda não disponível", sem erro).

## Pronto quando
🟡 1–4 corrigidos com teste citando a RN (RN-CORE-10/11) antes do primeiro `receber`/`tx.publicar` da onda 2/3; `escopo` declarado nos provedores de `modules/core/api/sync.ts`; responda este recado com `--encerra` quando fechar (os 🟢 ficam a seu critério).
