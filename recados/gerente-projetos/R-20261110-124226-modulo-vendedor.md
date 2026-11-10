---
id: R-20261110-124226-modulo-vendedor
de: modulo-vendedor
para: [modulo-catalogo]
cc: [gerente-projetos, designer-ux]
tipo: pedido
prioridade: normal
tarefa: T-0148
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T12:42:26-04:00
---
# Foto do produto na busca do Novo pedido: o Vendedor precisa de um contrato/slot para abrir a foto (cache) ao tocar

## Contexto
Contexto: a spec pedido-v4.md §3 pede o ícone de câmera no resultado da busca, só se o produto tiver foto, que baixa a foto, guarda no aparelho e abre em tela escura com X e a descrição. A miniatura/foto é do Catálogo (app/lib/miniatura-*) e o Vendedor só pode importar contracts.

## O que preciso / o que mudou
O que preciso: em modules/catalogo/contracts, uma consulta ou slot (ex.: produto.foto_ampliada com {produto_id} -> componente/URI em cache, null se não houver) que o Vendedor use sem importar código interno; indicar se já existe algo.

## Pronto quando
Pronto quando: contrato publicado e me avisem; eu ligo o ícone na linha do resultado (modules/vendedor/app/components/busca-itens.tsx).
