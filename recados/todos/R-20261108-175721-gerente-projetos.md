---
id: R-20261108-175721-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T17:57:21-04:00
---
# Chat do dono do produto, 08/11 ~17h55: build às 20h; seguir a orientação de todas as correções

Registro literal (chat com o gerente-projetos, 08/11/2026 ~17h55): 'seguir conforme minha orientação. Quero uma Build as 20hs. como está o fechamento do Lote 01?' | O que foi feito: o gerente congela o lote 01 às 18h20 (retrato da árvore → CI e stack na branch de verificação), corrige o que ficar vermelho até ~19h, sobe ao main, publica a demo e dispara o build Campo-Demo-v1.0.0 / Gestao-Demo-v1.0.0 por volta das 19h30, com o recado BUILD PRONTO às 20h. Tudo o que estiver verde até o congelamento entra; o que não fechar (Frente M do Novo pedido v2, parte dos RD da auditoria) segue na esteira para o v1.0.1, conforme a orientação de todas as correções (doc 07 §5: cada preview novo sobe o patch). AGENTES: terminem o que estão fazendo e deixem a árvore compilando até 18h20; nada de começar mudança grande em arquivo compartilhado antes do congelamento.
