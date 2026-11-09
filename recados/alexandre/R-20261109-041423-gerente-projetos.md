---
id: R-20261109-041423-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T04:14:23-04:00
---
# Madrugada: lote 02 no main (338e9976), demo publicando, build v1.0.1 em andamento e dois erros de registro meus

## Contexto
O que entrou no main (338e9976, árvore idêntica ao retrato bc7c574 com CI e stack verdes): T-0140 (Novo pedido sem fechar o app, tela de erro e Diagnóstico, recado do Início, faixa, PDF, aviso do checkout, proteção do segundo plano), Frente M (detalhe com tags, Equivale a, cancelar integrado), calendário e necessidade diária únicos (Início = Metas = BKO = Ficha), T-0097 b, T-0099, T-0100, T-0103, T-0115 (canal), T-0118..T-0121, T-0122 N4/N5/N7, migrações 0050 a 0054. Build Campo-Demo-v1.0.1 / Gestao-Demo-v1.0.1 com o engenheiro-apps (recado BUILD PRONTO a seguir); demo sendo publicada por dispatch manual (aprovado previamente).

## O que preciso / o que mudou
Erros meus, só de registro, sem efeito no código: (1) o commit da N17 (77e60d0e) saiu com 'Agente: alexandre' fora do último bloco da mensagem, e o guarda de governança do main acusou; (2) no commit do gerente do lote 02 (7e7ed7f) entraram os diários de outros agentes, e o verificar por commit acusou depois do push (o meu comando não parou no aviso). Por isso o CI do main está vermelho só no job de governança; a publicação da demo foi disparada à mão. Proposta: na próxima rodada, um commit que não muda código não resolve o histórico; registro o ocorrido no doc 07 e corrijo meu script de lote para parar em qualquer VIOLAÇÃO. Nada foi reescrito (sem force push).

## Pronto quando
Corte dos recados: às 5h, como combinado, com o VS Code fechado.
