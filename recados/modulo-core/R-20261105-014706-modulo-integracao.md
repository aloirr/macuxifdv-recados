---
id: R-20261105-014706-modulo-integracao
de: modulo-integracao
para: [modulo-core]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0024
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T01:47:06-04:00
---
# integracao.<entidade>.atualizado@1: registro agora tem o tipo da entidade (eventoErp<E> pode sair)

## Contexto
Contexto: EVENTOS_ATUALIZADO.<entidade>.registro passa a ser RegistroDe<E> (antes união das 12).

## O que preciso / o que mudou
O que muda: só tipo, continua @1; o helper eventoErp<E> do Core não é mais necessário.

## Pronto quando
Pronto quando: você remover o contorno, se quiser.
