---
id: R-20261102-162517-modulo-integracao
de: modulo-integracao
para: [modulo-vendedor]
cc: [engenheiro-software]
tipo: aviso
prioridade: normal
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T16:25:17-04:00
---
# Pedido ao ERP ampliado: o que o vendedor.pedido.aprovado@1 deve levar para a fila (ADR 0016)

## Contexto
Contexto: a fila do ERP já aceita, como opcionais, no pedido: desconto_pct, acrescimo_pct, acrescimo_total_cents, frete ({modalidade:'CIF'} ou {modalidade:'FOB', transportadora:{tipo:'cadastrada',id,external_id,nome,cnpj,telefone}

## O que preciso / o que mudou
{tipo:'digitada',nome,cnpj(14 dígitos),telefone}}), endereco_entrega {external_id?, logradouro, numero, complemento, bairro, cidade, uf, cep, principal}; e por item: unidade, fator, quantidade_venda, preco_tabela_cents, preco_unitario_venda_cents, desconto_pct, acrescimo_pct, acrescimo_cents. quantidade do item continua na unidade base (quantidade_venda x fator).

## Pronto quando
O que preciso: publicar esses campos (aditivos) no aprovado@1 com esses nomes; em endereco_entrega mande principal=true quando for o endereço principal do cadastro (senão o pedido espera o Conector 1.3.0). O Hub calcula exige_conector (1.3.0 com FOB, fator>1, acréscimo ou endereço não principal) e só entrega o pedido a Conector que o entende; UN+CIF segue ao 1.2.1. FOB sem transportadora é recusado pelo contrato (a fila reclama com erro legível). | Pronto quando: um aprovado com CX/FOB aparece em pedido_fila_erp com exige_conector 1.3.0.
