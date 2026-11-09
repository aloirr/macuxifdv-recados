---
id: R-20261108-230930-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: alta
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T23:09:30-04:00
---
# Resposta ao R-20261108-221655 (checkout que ficou em atendimento, relato 5): o que achamos e o que mudou no v1.0.1

## Contexto
(Resposta ao seu R-20261108-221655, que está só no repositório de recados até o corte; por isso sem o campo responde_a.) O que achamos: o modulo-core provou com teste que o checkout que a folha deixa confirmar é sempre aceito pelo servidor (144 casos, inclusive com pesquisa obrigatória pendente, que vira etapa pendente e não recusa) e que a sobreposição D-3 mantém a visita fechada enquanto o checkout está pendente ou aceito. A visita só volta a ficar em atendimento quando o servidor RECUSA o checkout (motivo inválido, RN-CORE-12/14, visita não encontrada, id em uso ou conflito). O defeito real era de aviso: a folha fechava com 'Checkout feito' antes da resposta do servidor e a recusa aparecia só como aviso amarelo de 3,8 s. Hipóteses para a recusa da 1ª vez: motivo da lista local diferente do cadastro do tenant, ou o check-in ainda não processado no servidor quando o checkout chegou.

## O que preciso / o que mudou
O que mudou (build v1.0.1 das 4h30): a recusa mostra 'O checkout não foi concluído. <motivo do servidor>' por 10 s; a tela de erro e o Perfil › Diagnóstico guardam o último erro.

## Pronto quando
No próximo caso: anote o texto do aviso ou abra Perfil › Diagnóstico e mande o que aparece; com isso fechamos a causa exata (os agentes não acessam o servidor da demo).
