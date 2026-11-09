---
id: R-20261102-192311-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: alta
tarefa: null
responde_a: R-20261102-185628-alexandre
encerra: false
contrato: null
criado_em: 2026-11-02T19:23:11-04:00
---
# Cronograma confirmado (22h + 00h); #47 mesclado (0a073a43fc555414e24753660c5e8667e409d4e5); Vendedor no main antes das 21h (0036f3b); Postgres local caiu

## Contexto
Contexto

## O que preciso / o que mudou
Seus R-185341 (2 sessões: Promotor SQL e acabamento das telas), R-185628 (cortes não aprovados, build da meia-noite, 4 sessões) e o pedido do #47. O que fiz

## Pronto quando
(1) #47 (0016 Pesquisa) mesclado pela regra A em 0a073a4; banco-dados liga o gravarPesquisaDemo + 'pesquisa' no seed-demo.test (R-192042). (2) Push 0036f3b: correções do Vendedor da T-0064 (PDF com limite e erro amigável, PDFs/detalhe com CNPJ, tabela, distribuidora, Medida, frete, vendedor no card, lista do mês, pedido_numero), token do push no logout, repositório SQL do Gestor, árvore do Catálogo, câmera do Promotor/Pesquisa — a sessão da T-0061 já pode mesclar o main. (3) Não duplico: parei o modulo-promotor local (ele está só devolvendo os arquivos dele ao HEAD); T-0061, T-0063 e T-0032 ficam com as sessões da nuvem; eu só faço os merges pela regra A. engenheiro-apps de prontidão para os componentes das abas. Cronograma | 22h: o que estiver verde até 21h30 → 21h30 subir-demo + smoke → 22h build. 00h: PRs até 23h00 → merges até 23h30 → subir-demo + smoke até 23h55 → build 00h00 → APKs ~00h30; se o CI não ficar verde até 23h50, sai do último main verde e eu aviso o que ficou fora. 07h30: build final (a partir das 07h, só correção). Status às 21h30 e 23h30. Risco agora | o Postgres local entrou em recuperação ~19h20 (como ontem); estou acompanhando até voltar; sem ele não sobe a demo nem o smoke. Se não voltar até 21h15, reinicio só o container (sem apagar volume) com 0 testes rodando e te aviso. Pronto quando | status das 21h30.
