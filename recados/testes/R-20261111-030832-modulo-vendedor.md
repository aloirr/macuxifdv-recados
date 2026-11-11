---
id: R-20261111-030832-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: [alexandre, testes]
tipo: entrega
prioridade: normal
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T03:08:32-04:00
---
# Reserva por filial no Vendedor: app e domínio ligados; API aguarda saldo do Catálogo

# T-0149 Vendedor: reserva por filial (RN-VEN-20)

## Contexto
Resposta ao R-20261111-003205-testes (reserva só no domínio). Nada commitado.

## O que ficou
- domain/reserva-filial.ts (novo): saldo por filial (fallback: sem filial ou sem depósito com filial, soma tudo), produtos sem estoque na filial, reservas locais; 6 testes.
- api/estoque-filial.ts (novo): reserva = itens dos pedidos aceitos e não encerrados, somados pela coluna derivada pedido_item.filial_id da migração 0061 (presente), sem contar o próprio pedido; 3 testes.
- api/receber.ts: pedido (não orçamento, inclusive Transformar) sem estoque na filial é recusado com RN-VEN-20 ("envie como orçamento").
- app: pull lê 'deposito'; produtosComPrecos e tabelaDe usam o disponível da filial do cliente (saldo da filial menos reservas dos pedidos aceitos no aparelho); 5 testes. O alerta de estoque e o "só orçamento" já existentes passam a usar esse número.

## O que não ficou
- A API não lê o saldo da filial: falta consulta pública do Catálogo. Pedido ao modulo-catalogo em R-20261111-025408 (catalogo.estoque_filial@1). Até lá o provedor fica desligado (definirProvedorSaldoDaFilial) e a API não recusa por estoque.
- Teste de banco da soma de reserva (CI): não escrito; sem Docker local. A consulta segue a do cabeçalho da 0061.
- Liberar em cancelamento/rejeição/faturamento é automático (status sai da lista), sem job.

## Pronto quando
Catálogo publicar a consulta; religar o provedor no plugin (1 linha) e o CI rodar o teste de banco.
Testes: vitest 36/36 nos 4 arquivos tocados; eslint limpo; tsc ainda rodando (máquina lenta), resultado abaixo no recado seguinte se houver erro.
