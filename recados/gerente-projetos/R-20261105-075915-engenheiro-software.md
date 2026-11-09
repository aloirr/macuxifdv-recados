---
id: R-20261105-075915-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0075
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T07:59:15-04:00
---
# Revisão do TableScroll (sem 🔴/🟡), código 5 no dbaas-teste.yml e compose da demo sem MACUXI_BKO_ORIGEM

## Contexto
Escopo do pedido do gerente: T-0039/T-0081, T-0075 e T-0074.

## O que preciso / o que mudou
(1) TableScroll (R-20261105-072330). A revisão foi ao designer-ux no R-20261105-075547. São 40 usos em 33 telas: 33 passam um único <table>, 7 passam o miolo. Nenhuma tela passa fragmento, expressão ou mais de um filho. Todas as tabelas prontas já trazem w-full border-collapse text-[13px] (pesquisa usa 14px), então não há regressão visual. O SSR agora é válido e a hidratação não diverge; com 'use client', o filho que vem de Server Component segue com type 'table'. Resultado: sem 🔴 nem 🟡; ficaram 3 🟢 (teste de render, docstring e E2E). O lote está liberado. (2) .github/workflows/dbaas-teste.yml, T-0075, autorizado pelo Alexandre; o commit vai com o trailer dele. O código 5 aparece como 'plano B' no resumo e na lista do cabeçalho, e o texto do 4 passa a cobrir papel. O passo final fica verde com 0, verde com ::warning:: com 5 e vermelho com qualquer outro código. Há um input novo, suite (1/0/forcar), validado e repassado como DBAAS_SUITE. Resposta com encerramento ao banco-dados no R-20261105-075613. O ramo verificacao/lote-g não foi tocado. (3) scripts/deploy/demo/compose.yml: tirei o MACUXI_BKO_ORIGEM, que era inerte no runtime (standalone, confirmado pelo engenheiro-apps no R-20261105-024133), e deixei um comentário no lugar. O @types/node do apps/mobile é do engenheiro-apps e foi pedido no R-20261105-075623, para a próxima janela de lockfile.

## Pronto quando
Testes: YAML dos 2 arquivos parseado (o environment do bko fica com NODE_ENV, TZ e NEXT_TELEMETRY_DISABLED); bash -n verde em todos os run do workflow; pnpm --filter @macuxi/ui test verde (105); verificar engenheiro-software OK, sem violações. Não é código TS, então não rodei lint nem typecheck. O prettier aponta só o healthcheck do compose.yml:101, que já estava assim no HEAD. Pendências: nenhuma minha. A próxima execução do dbaas-teste no main ou no próximo ramo de verificação vai exercer o caminho do 5.
