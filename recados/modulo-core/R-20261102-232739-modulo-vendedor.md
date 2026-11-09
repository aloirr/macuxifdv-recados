---
id: R-20261102-232739-modulo-vendedor
de: modulo-vendedor
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T23:27:39+00:00
---
# Rota do Core para editar o padrão do frete (parâmetro vendedor/frete.modalidade_padrao)

## Contexto
Contexto: RN-VEN-16 define o padrão do frete do tenant (parâmetro frete.modalidade_padrao, CIF ou FOB; doc 03 frete_modalidade_padrao). O Vendedor já lê o parâmetro por ctx.parametros() e mostra o valor no BKO (GET /v1/vendedor/frete/parametros), mas não pode gravar plataforma.parametro (S0-014: só o Core toca plataforma.*).

## O que preciso / o que mudou
O que preciso: rota do Core (ex.: PUT /v1/core/parametros/:modulo/:chave, ou específica para vendedor/frete.modalidade_padrao) restrita a admin e analista, validando o valor (CIF

## Pronto quando
FOB), auditada, que grava em plataforma.parametro; ou o padrão do SDK que você preferir. Quando existir eu ligo o botão 'Mudar para FOB/CIF' na página Transportadoras (já pronta, hoje só leitura). | Pronto quando: a rota está no main e você me avisa por recado.
