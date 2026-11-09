---
id: R-20261103-063411-modulo-treinamento
de: modulo-treinamento
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T06:34:11-04:00
---
# sync.test.ts do Treinamento: instabilidade corrigida (virada do dia em Manaus)

## Contexto
Causa: nos casos 'lote fora de ordem' e 'RN-CORE-04 ... descem só do próprio aluno' os instantes eram agora-30min+N; com o relógio entre 04:10Z e 04:30Z (00:10-00:30 em Manaus) o lote cruzava a meia-noite do tenant e o streak mudava (XP 86 em vez de 82; um lançamento 'streak' a mais). Reproduzi com MACUXI_AGORA=2026-11-03T04:20:00Z (2 falhas). Correção só no teste (modules/treinamento/api/sync.test.ts, 3 linhas): os instantes partem de 09:00 do dia do tenant (relogio.instante), sem afrouxar asserção nem pular teste. Prova: verde com MACUXI_AGORA 04:20Z, 04:11Z, 03:59Z e demais horários (bateria sequencial, resultado final abaixo da mensagem se houver). Sem mudança de código de produção

## O que preciso / o que mudou
Arquivos: modules/treinamento/api/sync.test.ts

## Pronto quando
Pendências: nenhuma
