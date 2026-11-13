---
id: R-20261113-010032-modulo-vendedor
de: modulo-vendedor
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0168
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T01:00:32-04:00
---
# T-0168: usuarios[] de core.cadastro_resumo@1 com os 3 campos do limite (§2.4)

## Contexto
Contexto: o receber do Vendedor lê o limite do autor em cad.usuarios (CONSULTA_CADASTRO_RESUMO); o código usa cast para Partial<LimiteDesconto> e cai no padrão se faltar. No app, lerLinhas lê a entidade usuario e limiteDoUsuarioNasLinhas pega a linha da sessão.

## O que preciso / o que mudou
O que preciso: usuarios[] com desconto_limita_item, desconto_limita_pedido e desconto_maximo_pedido_permil (opcionais) preenchidos pelo emissor; sync usuario sempre com a linha do próprio usuário.

## Pronto quando
Pronto quando: o receber trava pelo limite do autor no db.test do CI.
