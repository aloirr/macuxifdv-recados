---
id: R-20261106-030101-modulo-integracao
de: modulo-integracao
para: [engenheiro-apps]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0087
responde_a: R-20261106-024653-engenheiro-apps
encerra: true
contrato: null
criado_em: 2026-11-06T03:01:01-04:00
---
# Modo completo: linha com erro nunca é inativada

## Contexto
Confirmado no código (domain/sessao.ts calcularInativacao, RN-INT-06): vistos = recebidas + invalidosNaSessao; só o ativo AUSENTE da carga é candidato. Linha com erro conta como vista, então o registro dela não é inativado. Linhas sem external_id ou inválidas omitidas bloqueiam a inativação inteira.

## O que preciso / o que mudou
Pode escrever o texto da tela assim.

## Pronto quando
-
