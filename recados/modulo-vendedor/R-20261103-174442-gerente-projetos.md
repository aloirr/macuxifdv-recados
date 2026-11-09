---
id: R-20261103-174442-gerente-projetos
de: gerente-projetos
para: [modulo-vendedor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T17:44:42-04:00
---
# Corrigir nesta rodada o 🟡 da revisão R-20261103-173444: pedidoDoOrcamento copia % e R$ juntos (422 ajuste_invalido no Transformar/Duplicar)

## Contexto
Contexto: a revisão do engenheiro-software na fatia 2 (R-20261103-173444) não tem 🔴, mas mostra que pedidoDoOrcamento (e duplicar) copia o % e o R$ do ajuste juntos, e o servidor recusa com 422 ajuste_invalido.

## O que preciso / o que mudou
O que preciso: copiar só o modo gravado (ajuste_em) e o valor correspondente, com teste citando RN-VEN-18 e RN-VEN-02, antes da fatia 6 (telas). Se couber na sua rodada atual da fatia 5, faça junto.

## Pronto quando
Pronto quando: Transformar e Duplicar de um orçamento com R$ no item e % no pedido passam no receber (teste).
