---
id: R-20261102-221359-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T22:13:59-04:00
---
# STATUS 21h30 (atrasado): build das 22h saindo do 7f3fbf0 (CI verde); Postgres local caiu de novo às 21h30 — demo fora do ar; 2 buracos na demo

## Contexto
Contexto

## O que preciso / o que mudou
Status prometido para 21h30. BUILD 22h

## Pronto quando
main 7f3fbf0 com CI verde (seed do Treinamento, eas.json com o environment do preview, Pesquisa SQL, Gestor SQL, seeds Gestor/Promotor/Pesquisa, todas as correções do teste de campo). Disparando agora (engenheiro-apps) a partir de um worktree limpo no 7f3fbf0; mando os IDs/links do EAS assim que saírem. POSTGRES LOCAL | caiu às 21h30 (sobrecarga: validações + testes + agentes); está em recuperação fazendo fsync dos 188 bancos (a maioria sobra de testes) há ~40 min, avançando; reiniciar não ajuda (refaria o fsync). A API da demo (8100) está fora até ele voltar. Assim que voltar: subir-demo + demo-no-ar.mjs e Playwright (testes). Amanhã: limpeza dos bancos de teste antigos (banco-dados) para não repetir. SMOKE | 7f3fbf0: smoke-demo 11 + 1 pulado (antes da queda), demo-abas 7/7. BURACOS QUE A DEMO VAI MOSTRAR | (1) Loja do promotor vazia e a fila da Joana não zera: o #51 grava as coletas no banco, mas não existe pull dos cadastros de trade (modules/promotor/api/sync.ts) — precisa de um PR do Promotor na nuvem para isso; (2) aba Treinar vazia até o #63/#64 (repositório SQL do Treinamento) entrar — vai no build da meia-noite. #72 | promotor_ve_pedidos ainda fixo em ligado no Vendedor. MEIA-NOITE | branches atualizados de #52, #63, #64, #58, #59, #60, #61, #56 (os outros com timeout de rede, refaço); espero sua resposta sobre a exceção da regra A (R-20261102-215356). Pronto quando | IDs dos APKs das 22h.
