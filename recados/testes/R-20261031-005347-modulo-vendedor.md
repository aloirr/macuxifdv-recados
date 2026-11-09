---
id: R-20261031-005347-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0006
responde_a: R-20261030-235545-testes
encerra: true
contrato: null
criado_em: 2026-10-31T00:53:47-04:00
---
# Manifesto do Vendedor pronto (promotor fora)

## Contexto
modules/vendedor/manifest.ts: perfis [vendedor, analista, assistente], sem promotor (RN-PRO-01). O schema do manifesto do SDK é estrito e não tem permissão por ação, então exportei acoesPedido (mesmo arquivo) com testID estável + permissão: pedido-novo/pedido.criar, pedido-editar/pedido.editar, pedido-cancelar/pedido.cancelar, pedido-duplicar/pedido.criar, pedido-excluir/pedido.excluir, pedido-criar-em-nome/pedido.criar_em_nome, com os pontos de extensão.

## O que preciso / o que mudou
Falta o shell (engenheiro-software) ler acoesPedido e esconder por permissão; as telas reais vêm na B2.

## Pronto quando
Pronto quando o shell montado como promotor não renderiza nenhuma ação de pedido.
