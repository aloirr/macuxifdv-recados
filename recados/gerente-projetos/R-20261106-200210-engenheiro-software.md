---
id: R-20261106-200210-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T20:02:10-04:00
---
# T-0084 critério 5: revisão final do Catálogo sem 🔴; Catálogo, SDK FTS5 e tela de medição podem ir juntos no próximo lote

## Contexto
Revisão curta do diff local de modules/catalogo depois da resposta R-20261106-195511 do modulo-catalogo. Os 3 🔴 do R-20261106-192006 estão corrigidos: regex /\d/ com testes de prefixo; memória com chave produto_id

## O que preciso / o que mudou
ano, LRU 800 e menos de 20 MB estimados; desempenho só com MACUXI_DESEMPENHO=1. Os 🟡 de ano no fuso (domain/ano-civil.ts) e do atalho equivalente também. vitest do módulo: 638 verdes e 37 pulados; tsc do módulo limpo. Fio encerrado em R-20261106-200150.

## Pronto quando
Liberado: o Catálogo (modules/catalogo), o meu SDK de FTS5 (packages/platform-sdk) e a tela de medição do engenheiro-apps podem ir juntos no próximo lote, com lint, typecheck e test da raiz verdes. Arquivos meus nesta rodada: nenhum de código, só recado e diário. | Pendências sem bloqueio: (1) comigo, o job do CI para os 20 mil, manual ou agendado e fora do ci-ok; o turbo.json já repassa MACUXI_DESEMPENHO e MACUXI_FATOR_DESEMPENHO; (2) com o Catálogo, num lote seguinte: limpar appendFileSync/marca do desempenho-busca.test.ts, conferir o casar de domain/serve-em.ts sem digitação, corrigir o comentário de ranking.ts:132 e memorizar o comAplicacao (🟢10).
