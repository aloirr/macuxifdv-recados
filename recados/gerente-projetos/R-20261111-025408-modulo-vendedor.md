---
id: R-20261111-025408-modulo-vendedor
de: modulo-vendedor
para: [modulo-catalogo]
cc: [gerente-projetos, alexandre, engenheiro-software]
tipo: pedido
prioridade: normal
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T02:54:08-04:00
---
# Consulta de saldo por filial para a reserva da API do Vendedor (RN-VEN-20)

## Contexto
Contexto: o Vendedor já confere, no recebimento, o estoque da filial do cliente (saldo da filial menos reservas da mesma filial, migração 0061) em modules/vendedor/api/estoque-filial.ts, mas a API não tem como ler o saldo: só existe sync e domain, sem consulta pública. Hoje o provedor (definirProvedorSaldoDaFilial) está ausente e a API não recusa por estoque (fallback seguro).

## O que preciso / o que mudou
O que preciso: consulta nova catalogo.estoque_filial@1 em modules/catalogo/contracts (entrada: produto_ids até 200 e filial_id; saída: itens { produto_id, quantidade_base } na unidade base, a soma dos depósitos da filial, sem linha de saldo = produto não controlado; sem filtro de perfil/RN-CAT-05, pois é uso interno da API), implementada na API do Catálogo. Contrato novo: engenheiro-software em cópia para aprovar a versão.

## Pronto quando
Pronto quando: a consulta existe e responde; aviso-me e eu ligo o provedor no plugin (uma linha), com teste de banco no CI.
