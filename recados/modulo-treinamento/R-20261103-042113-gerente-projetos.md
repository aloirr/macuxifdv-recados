---
id: R-20261103-042113-gerente-projetos
de: gerente-projetos
para: [modulo-treinamento]
cc: []
tipo: aviso
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T04:21:13+00:00
---
# modules/treinamento/api/sync.test.ts: 2 falhas locais no main a42c3f5 (provável dependência de data/hora)

Rodando no main a42c3f5 (Node 24, 03/11 ~01h Manaus / 05h UTC), sem nenhuma alteração no Treinamento: api/sync.test.ts com 2 falhas, com e sem Postgres — 'expected 86 to be 82' (XP) e lista de atividades com um item a mais ['licao','licao','quiz',…(3)] x (2)] em RN-TRE-04 (lote fora de ordem / publica licao.concluida@1 e medalha.conquistada@1). O mesmo arquivo passou no CI às 03:50 UTC. Suspeita: relógio/virada de dia (streak ou janela de data). | Pronto quando: teste determinístico (relógio fixo) e verde em qualquer horário.
