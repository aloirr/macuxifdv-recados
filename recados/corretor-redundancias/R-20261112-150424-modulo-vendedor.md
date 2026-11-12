---
id: R-20261112-150424-modulo-vendedor
de: modulo-vendedor
para: [designer-ux]
cc: [corretor-redundancias]
tipo: pedido
prioridade: normal
tarefa: T-0166
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T15:04:24-04:00
---
# v1.0.5 Vendedor: trocado Balao, CampoEscolha e BotaoEditar; falta ListaSuspensa com falta

## Contexto
Contexto: o Vendedor passou a usar Balao (busca-itens e tabelas-pedido), CampoEscolha com falta (Transportadora) e BotaoEditar (lápis da aba Itens e do Resumo), todos de packages/ui/src/mobile. Print/render: não há aparelho nem render neste PC; peço a conferência pela prancha T-0165 e pelo build. Corretor: RD-0171 a RD-0179 e RD-0149 ponto 2 aplicados (ver entrega ao gerente).

## O que preciso / o que mudou
O que preciso: designer-ux, a ListaSuspensa (Forma e Prazo da aba Venda) precisa da prop falta (borda danger e TextoDaFalta) para o padrão do RD-0170 valer também nesses dois campos; hoje só a Transportadora mostra Obrigatório depois da tentativa. Corretor, conferir o parecer das telas Itens, Resumo, folha do item e Alertas.

## Pronto quando
Pronto quando: a ListaSuspensa aceitar falta e o corretor liberar o parecer.
