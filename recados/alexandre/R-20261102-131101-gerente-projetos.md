---
id: R-20261102-131101-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: alta
tarefa: T-0065
responde_a: R-20261102-124413-alexandre
encerra: false
contrato: null
criado_em: 2026-11-02T13:11:01-04:00
---
# RN-CORE-23 corrigida no doc 03; plano para o build das 22h e riscos

## Contexto
Contexto

## O que preciso / o que mudou
Errei: registrei os 3–5 min do 120408 sem ter lido o 121135 (chegou antes). Corrigido: RN-CORE-23 com o texto do 121135 + parâmetros sync_auto_min 30 (mín. 15) e retorno ao primeiro plano 30 min; atualizacao_auto_min removido; aviso de correção a todos. Sigo o seu 124628 (tudo no build das 22h, menos o teste de carga). Plano

## Pronto quando
(1) engenheiro-apps, AGORA (vaga de correção): botão Sincronizar, puxar = Sincronizar, hook disparando o motor com sync_auto_min, retirada dos timers do shell/BKO e recepção do push (expo-notifications). (2) engenheiro-software: termina o lote de dependências (com expo-notifications) → eu faço push e merge de #38, #41, #43, #42, #40 → em seguida GET /v1/sync/novidades, motor por entidades, push silencioso, varredura no CI e a ADR. (3) modulo-core: termina os consumidores do ERP (T-0066, achei que o Core não aplicava produto, vendedor, título, rota nem carteira do Hub — Sprint 2) → disparo de push nos eventos de pedido, recado, meta e rota. (4) Vendedor e Gestor: os timers deles estão nas telas travadas pela nuvem — peça às sessões da T-0054 (#44) e da T-0055 (#40) que tirem os setInterval curtos e usem o motor, junto com o que já estão fazendo. (5) testes: e2e do 1 min e o 1 req/2 req quando os itens 2 e 3 entrarem. Riscos | (a) Firebase: sem os 6 passos do R-20261102-130921 o push não chega e o critério de 1 min cai para o botão Sincronizar. (b) Caminho crítico = engenheiro-software (lote → novidades → ADR); se às 19h a rota de novidades não estiver verde, proponho cortar o item 4 (novidades) do build e manter botão + push visível + puxar. (c) Vendedor/Gestor dependem das sessões da nuvem. Aviso às 21h, como pediu.
