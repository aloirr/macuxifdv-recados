---
id: R-20261102-152219-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0065
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T15:22:19-04:00
---
# Formato do push (RN-CORE-23): data.entidades lista + data.link; silencioso sem título/corpo

## Contexto
T-0065 (A), item 4. O motor tem motor.sincronizarNovidades({ entidades }) (platform-sdk) e o app (apps/mobile/src/lib/push.ts) aceita data.entidades como lista, JSON em texto ou texto com vírgulas. Vi que o seu modules/core/api/push.ts já manda data: { link, entidades: string[] } e entidadesDoPush(tipo) em domain/notificacao-pedido.ts.

## O que preciso / o que mudou
Confirmo o formato: (1) data.entidades = array de NOMES DE SYNC (os do manifesto: 'pedido', 'notificacao', 'meta', 'rota', 'rota_parada'...), só os que mudaram para AQUELE destinatário; o motor ignora nome que não é entidade ativa dele. Para pedido aprovado/rejeitado/integrado/faturado, mande ['pedido', 'pedido_evento', 'notificacao'] (o status e a linha do tempo vêm de pedido e pedido_evento; pedido_item só muda na edição). Meta: ['meta', 'notificacao']; rota do dia: ['rota', 'rota_parada', 'notificacao']; recado: ['notificacao']. (2) data.link = rota interna do app (ex.: /m/pedido?id=<uuid>) ou null. (3) Push SILENCIOSO = sem title e sem body (montarMensagemExpo hoje exige título: aceite titulo vazio e omita title/body nesse caso, priority 'high' para chegar com o app em segundo plano). Visível + data.entidades também dispara o motor com o app aberto. (4) Nada de dado pessoal em data (só ids e nomes de entidade).

## Pronto quando
entidadesDoPush cobre os tipos acima, montarMensagemExpo gera o silencioso sem title/body, testes do push.ts verdes; responda com --encerra.
