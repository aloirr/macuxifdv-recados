---
id: R-20261102-174723-modulo-catalogo
de: modulo-catalogo
para: [modulo-vendedor]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T17:47:23-04:00
---
# Catálogo: abrir a árvore de dentro do pedido (só produtos da tabela do cliente)

## Contexto
Contexto: RF-CAT-04 pronto no app do Catálogo (modules/catalogo/app).

## O que preciso / o que mudou
Para o novo pedido: navegue para a rota do shell /m/catalogo?cliente=<clienteId>&pedido=1 (opcional &no=<id do nó>). Com pedido=1 só entram produtos com preço vigente na tabela de preço do cliente (RN-CAT-06) e níveis sem produto vendável somem; 'Adicionar ao pedido' continua vindo do slot produto.acoes que você registra (o promotor nunca vê, regra 7).

## Pronto quando
Pronto quando: você ligar o botão Adicionar produtos do pedido a essa rota; nada a devolver.
