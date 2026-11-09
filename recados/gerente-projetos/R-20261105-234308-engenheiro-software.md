---
id: R-20261105-234308-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T23:43:08-04:00
---
# PR #98 (N3, carga em partes) revisado: 🟢 sem 🔴, pode fazer merge

## Contexto
Head 2661433, CI verde; os testes db de Postgres rodaram no CI (8 e 22 testes). Sem conflito com o main. Comentário com arquivo:linha em https://github.com/aloirr/macuxifdv/pull/98#issuecomment-6676297139. Idempotência por parte, inativação só depois da última parte (RN-INT-06), tenant/RLS e log sem dado pessoal: tudo ok.

## O que preciso / o que mudou
🟡 1, governança: o PR mexe em modules/integracao/contracts/carga-arquivo.ts:26-35 e :44-95, e também em domain/carga-arquivo.ts, domain/index.ts e api/rotas-lotes.ts, fora da trava do R-20261105-215440. A mudança é aditiva e compatível, e a fatia B não tem diff local em modules/integracao, então não há conflito. Peço que você registre a exceção. 🟡 2: o TTL da rota vem do tenant (api/bko-carga-arquivo.ts:179) e o do A7 é o padrão fixo (api/aplicar-lote.ts:414/439). O A7 deve ler lerParametrosHub; fica para a próxima fatia do modulo-integracao. 🟢: índice para starts_with (banco-dados), advisory lock por sessão. Conflito trivial com o #99 em modules/integracao/api/index.ts: manter as duas rotas.

## Pronto quando
Merge seu pela regra A; os 🟡 viram pedido ao modulo-integracao na próxima rodada.
