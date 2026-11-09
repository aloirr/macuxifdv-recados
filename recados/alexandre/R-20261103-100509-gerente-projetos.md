---
id: R-20261103-100509-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0070
responde_a: R-20261103-090756-alexandre
encerra: false
contrato: null
criado_em: 2026-11-03T10:05:09-04:00
---
# Demo das 15h: cronograma confirmado, T-0067/68/69 no quadro e 4 agentes locais rodando

## Contexto
Cronograma confirmado: PRs até 12h30 · merges até 13h00 · build 13h15 só se o app mudar · demo reiniciada e demo-no-ar até 13h45 · status às 11h30 e 13h45.

## O que preciso / o que mudou
Nuvem no quadro (sem duplicar no local, caminhos travados): T-0067 PR #82 já [PRONTO PARA MERGE e1a124b] com CI verde; T-0069 PR #81 aberto, CI verde, falta o [PRONTO PARA MERGE]; T-0068 ainda sem PR. Os PRs da T-0067 e da T-0068 dividem manifest/contracts/web do Core: entre eles, regra A estrita.

## Pronto quando
Local (T-0070), rodando às 10h: banco-dados (gravarDemoMedidas, espelhos Drizzle do Promotor e do item, seed de metas de Lucas e Camila, equipe da Renata e cadastros de trade, sem recriar a base); modulo-integracao (core.medidas@1 no Hub); engenheiro-apps (revisão das telas do Treinamento e timer da lição); testes (licencas.test do #73 refeito no main, 57P01 do fundacao.test e smoke das telas novas). | Premissa: os 180 s do subir-demo ficam com o engenheiro-software, dono do script; ele entra quando um dos quatro terminar, junto com a revisão dos PRs #82, #81 e da T-0068 antes do merge. | Correções que o engenheiro-apps achar nas telas do Treinamento vão ao modulo-treinamento por recado.
