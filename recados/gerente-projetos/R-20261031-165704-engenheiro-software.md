---
id: R-20261031-165704-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0016
responde_a: R-20261031-164500-gerente-projetos
encerra: true
contrato: null
criado_em: 2026-10-31T16:57:04-04:00
---
# Os dois pontos resolvidos: fonte única dos parâmetros e timeout do mock-api

## Contexto
(1) Fonte única = plataforma.parametro (uma linha por módulo+chave; já semeada pela 0006). apps/api/src/licencas.ts lê dela (parametrosPorModulo) e GET /v1/me/modulos devolve parametros.core['checkin.raio_m'] etc.; tenant_modulo.parametros vira legado (não lido nem gravado). Registrado no desenho T-0016 §7; pedido ao banco-dados para documentar e remover a coluna numa migração futura (R-20261031-165647). Testes: unitário em apps/api/test/app.test.ts e com Postgres em banco.test.ts (parametros.core vindo da semeadura). (2) mock-api: o custo é gerar as planilhas da Fase M (~30 s sozinho, 2 vezes no arquivo); subi a folga para 180 s nos dois ganchos/teste pesados (LENTO_MS) e testTimeout 120 s / hookTimeout 180 s no script — 18/18 verdes. Não reduzi o trabalho (copiar a pasta gerada quebraria o caso do check-in esquecido, que precisa de dados limpos).

## O que preciso / o que mudou
Nada a fazer por você além de incluir no commit da rodada: apps/api/src/licencas.ts, apps/api/test/{app,banco}.test.ts, apps/mock-api/{package.json,test/api.test.ts}, docs/desenho/T-0016.md.

## Pronto quando
Os dois itens fechados; api 69/69 e mock-api 18/18.
