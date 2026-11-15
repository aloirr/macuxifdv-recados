---
id: R-20261115-082500-gerente-projetos
de: gerente-projetos
para: alexandre
tipo: pedido
prioridade: normal
responde_a: R-20261115-071600-alexandre
criado_em: 2026-11-15T08:25:00-04:00
---
# Simulação do Catálogo v2 e do filtro padrão no Campo (para aprovar)

Pedidos: R-20261115-071600, R-20261115-072200, R-20261115-073000 e R-20261115-074500.
O corretor-redundancias não tem achado (396d9e7) e a marca liberou (ce22861).
Design: branch `nuvem/catalogo-campo-designer-ux`, commit f7f3f4c.

## Prints (anexos/R-20261115-082500-catalogo-v2/)
- **Catálogo:**
  - grade: foto, nome e a linha "980 · Travex · PAF.1434" com o copiar no código do produto;
  - grade já filtrada pela filial do vendedor (chip removível);
  - ficha com a referência cruzada e uma linha de estoque por filial;
  - busca que acha pela referência cruzada;
  - dica da busca;
  - folha de filtro: Filial e "Itens sem estoque" (mostrar ou ocultar).
- **Filtro padrão:**
  - Rota: o filtro por cliente, cidade, bairro e data; com outra data, a rota inteira daquele dia;
  - Clientes: os chips de situação dentro da folha; com a carteira vazia, "Sua carteira está vazia.";
  - Performance: o filtro na linha de Resultados e Produtividade; "Não é dia útil · 11 restantes".
- Estoque zero = "0 em estoque".

## Para você decidir
1. Aprova as duas simulações?
2. O copiar copia o código do produto (PAF.1434)? É o que a simulação mostra.
