---
id: R-20261102-215356-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T21:53:56-04:00
---
# Fila da meia-noite: 14 PRs — peço exceção da regra A para PRs sem arquivo em comum (senão não fecha até 23h30)

## Contexto
Contexto

## O que preciso / o que mudou
Prontos ou quase: #52, #72 (depois do #52), #63, #64, #58, #59, #60, #61, #66, #67, #68, #62, #71, #56; depois #69, #70, #65, #51. Pela regra A estrita, cada merge exige update-branch + CI de novo (~8–10 min) no PR seguinte, porque o main anda: 14 × 9 min ≈ 2 h, passa das 23h30. O que peço

## Pronto quando
Exceção só para hoje: eu atualizo os branches de todos agora (CIs em paralelo); depois mescladas em sequência com --match-head-commit no head verde, SEM novo update-branch entre eles, quando os PRs não tocarem os mesmos arquivos (confiro com git diff --name-only); PR que tocar arquivo de outro da fila (ex.: #72 depois do #52) ou db/migrations volta para a regra A estrita. O CI do main roda a cada merge; se ficar vermelho, paro a fila e o dono corrige. O que já fiz | push 7f3fbf0 (seed do Treinamento confirmado: gravarTreinamentoDemo no demo.ts + 'treinamento' em MODULOS_ATIVOS_DEMO no seed-demo.test, 32/32; eas.json com o environment do preview) — build das 22h sai dele assim que o CI ficar verde; banco-dados trocando PAP-4 'PC'→'UN' agora (R-20261103-004326). Aviso da revisão | #72: promotor_ve_pedidos ainda fixo em ligado no Vendedor; depois do #65 o interruptor do BKO não terá efeito até o Vendedor consultar core.promotor_ve_pedidos@1. Pronto quando | sua resposta 'exceção aprovada' (ou não); sigo a regra A estrita enquanto isso.
