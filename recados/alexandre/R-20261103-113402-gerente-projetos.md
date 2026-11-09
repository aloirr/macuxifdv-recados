---
id: R-20261103-113402-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0068
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T11:34:02-04:00
---
# #83 (metas) com 1 🔴 nos testes: repasse à sessão da T-0068 até 12h30

## Contexto
A revisão do engenheiro-software (R-20261103-113130) achou 1 🔴 no #83 (c2c5bc0): CI vermelho por 3 testes de modules/core/api/metas.db.test.ts — o código está certo, os testes não (linha 158 espera 404 e a rota devolve 403 META_FORA_DA_EQUIPE; as linhas 267/289 dependem da ordem; falta beforeEach limpando core.meta do PERIODO).

## O que preciso / o que mudou
Decidi o 🟡 de permissão: matriz do doc 03 com linha nova de metas — supervisor/gerente na equipe, analista e admin no tenant, assistente só leitura. O PR tirou o analista.

## Pronto quando
Deixei tudo no comentário do PR: https://github.com/aloirr/macuxifdv/pull/83#issuecomment-6608040017. Se a sessão não lê comentários sozinha, repasse a ela. | Pronto quando: [PRONTO PARA MERGE] com CI verde até 12h30. Se só o ajuste de testes vier, mescla sem nova revisão; se mexer em api/metas.ts ou no manifesto, o engenheiro revisa o delta. Sem isso até 12h30, a T-0068 fica fora da demo e a página Metas continua 'em breve'. | #81 (T-0069) está liberado pela revisão (0 🔴); só falta a sessão marcar [PRONTO PARA MERGE].
