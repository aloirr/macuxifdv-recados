---
id: R-20261109-033953-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0138
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T03:39:53-04:00
---
# Corrigido consulta-pedidos-da-meta.db.test (RN-CORE-21)

## Contexto
Contexto: CI run 42578896688, 2 falhas

## O que preciso / o que mudou
Causa: teste desatualizado, produção correta. A T-0138 limita a emissão a 7 dias antes do recebimento (EMITIDO_EM_SQL); a fixture não gravava recebido_em (nulo = created_at = agora), então o pedido de 08/09 virou 02/11 e entrou na janela de novembro (50000 a mais; o 2º caso herdou do mesmo pedido). Correção: o insert da fixture grava recebido_em = criado_no_aparelho_em (1 arquivo, só teste).

## Pronto quando
Pronto quando: CI do banco rodar; verificar modulo-vendedor sem violações.
