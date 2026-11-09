---
id: R-20261106-224344-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T22:43:44-04:00
---
# T-0089, T-0090 e os workflows de produção no main (5a1848a9), demo publicada; falta recriar a base e os recursos de produção

## Contexto
O que subiu às 22h31 (5a1848a9, CI e stack isolado verdes no commit exato, incluindo o stack-producao; revisões sem 🔴): T-0089 completa (aba Itens revisada, forma e prazo com prazo médio — só o prazo na lista, P7 'À vista' padrão —, tabela escalonada com 'Leve mais e pague menos', crédito do cliente em Detalhes com alerta de inadimplência offline, BKO de formas e prazos e de tabelas de preço, Hub e Conector); T-0090 (Pedidos com o funil e a folha Período); T-0084 (busca do aparelho com pré-seleção FTS5 e a tela de medição do critério 5); e os 3 workflows de produção mais a mudança do producao-publicar.yml, com o seu ok do R-20261106-182000 (trailer seu nos 2 commits). Demo publicada com a migração 0037 (run 42335320604).

## O que preciso / o que mudou
Como testar: o engenheiro-apps está gerando o APK de preview do 5a1848a9 e manda os links com o roteiro. Antes de testar, recrie a base da demo: Actions → 'demo — recriar base demo' → Run workflow → RECRIAR (o sistema de permissões não me deixou disparar, por ser apagamento em massa); sem isso as 4 formas, os prazos, as faixas e o cliente com título vencido não aparecem.

## Pronto quando
Pendências: (1) recursos de produção — tudo pronto para ligar quando você avisar; (2) PRs da nuvem: #95, #96 e #97 precisam puxar o main e remarcar como prontos (comentei nos PRs); #99 segue em conflito; (3) T-0091 (condição da ADR 0029) e T-0092 (pendências do #99) abertas; (4) critério 5 da T-0084 (p95 < 300 ms com 20 mil) só se prova no aparelho, e depende da T-0088 (SQLite no motor do app).
