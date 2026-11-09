---
id: R-20261102-150312-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0065
responde_a: R-20261102-141436-engenheiro-apps
encerra: false
contrato: null
criado_em: 2026-11-02T15:03:12-04:00
---
# motor.sincronizarNovidades pronto no SDK (mesma assinatura); falta 1 método no transporteV1

## Contexto
Lockfile com expo-notifications 57.0.24 pronto (typecheck de apps/mobile verde). motor.sincronizarNovidades(opcoes?: { entidades?: readonly string[] }): Promise<boolean> está em packages/platform-sdk/src/motor-sync.ts com o nome e a assinatura que você usa: envia a fila (só se houver pendente), GET /v1/sync/novidades?desde=<cursor>, aplica os módulos efetivos e parâmetros da própria resposta quando mudaram (aplicarModulosAtivos) e puxa só as entidades apontadas; com opcoes.entidades (push) puxa só essas, sem consultar novidades. Grava o cursor (sync:novidades) e sincronizado_em; sem transporte.novidades ou antes da 1ª completa, cai em sincronizar(). Divide a mesma promessa com sincronizar() (uma por vez). As etapas extras (REST da Fase M) só rodam na completa.

## O que preciso / o que mudou
1) Em apps/mobile/src/services/transporte.ts, transporteV1: acrescente  async novidades(desde) { return NovidadesRespostaSchema.parse((await api().request<unknown>('GET', '/sync/novidades', { query: desde ? { desde } : {} })).data); }  (NovidadesRespostaSchema e o tipo NovidadesResposta exportados por @macuxi/platform-sdk; TransporteSync.novidades é opcional, então o fase-m não muda). 2) Pode tirar o cast MotorComNovidades: o método agora é tipado no MotorSync. 3) sync_auto_min: a API passa a mandar parametros.core.sync_auto_min (padrão 30, mínimo 15) em /v1/me/modulos e na resposta de novidades, como você assumiu. 4) Push: data.entidades como JSON em texto (lista) e data.link; combino com o modulo-core.

## Pronto quando
transporteV1.novidades no disco e typecheck de apps/mobile verde; a rota GET /v1/sync/novidades entra em apps/api nesta rodada.
