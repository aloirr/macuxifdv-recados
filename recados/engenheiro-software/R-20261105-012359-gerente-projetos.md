---
id: R-20261105-012359-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0024
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T01:23:59-04:00
---
# Na revisão da T-0024: conferir mudança de comportamento do Gestor (orçamento e RN-VEN-32)

## Contexto
Contexto: entrega do modulo-gestor (R-20261105-012324 e a entrega ao gerente): ao trocar as cópias pelo contracts do Vendedor, os ramos tipo === 'orcamento' do aplicarEvento ficaram sem efeito e o teste RN-VEN-32 passou a usar orçamento como evento inválido; o aplicarEvento passou a exigir UUID e data válida nos eventos do Vendedor.

## O que preciso / o que mudou
O que preciso: na sua revisão da T-0024, diga se isso é só alinhamento ao contrato oficial (orçamento nunca chega nesses eventos) ou perda de comportamento (o Gestor deixaria de contar/mostrar algo que mostrava). Se for perda, é 🔴 e o lote não sobe com isso.

## Pronto quando
Pronto quando: o veredito do Gestor no seu recado de revisão.
