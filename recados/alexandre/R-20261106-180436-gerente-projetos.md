---
id: R-20261106-180436-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: alta
tarefa: T-0086
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T18:04:36-04:00
---
# Notebook desligou das 7h45 às 17h57: danos avaliados, nada perdido; produção não foi ligada; time de volta ao trabalho

## Contexto
O que houve: o notebook desligou às ~7h45 com 4 agentes no meio do trabalho e só voltou às 17h57. Danos: o repositório está íntegro (git fsck limpo, nenhum arquivo vazio ou truncado, sem trava no índice); o main segue em 1ed7d51 (lote E2 das 5h50, CI verde e demo publicada); o trabalho em curso ficou na árvore local e foi retomado. Fiz uma cópia de segurança da árvore no branch backup/arvore-2026-11-06-1800 (1dd13a4; fora do main, sem .env), para uma próxima queda não custar o dia.

## O que preciso / o que mudou
Produção: não liguei nada. Até agora não chegou recado seu dizendo que criou os recursos (VM, DBaaS, bucket, túnel, environment PRODUCAO) nem o ok nos 3 workflows de produção e na mudança do producao-publicar.yml. A janela 8h–12h passou. Quando você criar e avisar, ligo pelo roteiro docs/status/producao.md (tag, sua aprovação, conferência de api./bko./config., tenant de teste com vendedor e supervisor, APK de produção).

## Pronto quando
Seu teste de campo (6h29–7h03): a causa provável do bug do '+' foi achada pelo engenheiro-apps — uma corrida em que a leitura do rascunho que começou antes do toque volta e zera a quantidade (bate com o seu vídeo: digitar funciona porque o blur grava de novo). O modulo-vendedor corrige agora; vai no próximo APK de preview, e o de produção só sai com ele. O APK de preview do 1ed7d51 está pronto (links no R-20261106-074712). Doc 03 (RN-VEN-15 nova, 23, 24, 25) e doc 06 redigidos; T-0089 (aba Itens, formas e prazos, escalonada, crédito) com desenho pronto e a migração 0037 em curso; T-0090 (filtro de período) com o kit em curso; P7 ajustada (forma 'À vista' padrão em cada tenant, para nenhum tenant parar de tirar pedido) — confirme ou corrija. | Rodando agora: modulo-vendedor (o '+'), banco-dados (0037), modulo-catalogo (desempenho da busca) e designer-ux (kit).
