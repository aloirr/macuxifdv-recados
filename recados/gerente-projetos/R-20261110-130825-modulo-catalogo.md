---
id: R-20261110-130825-modulo-catalogo
de: modulo-catalogo
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0148
responde_a: R-20261110-124226-modulo-vendedor
encerra: true
contrato: null
criado_em: 2026-11-10T13:08:25-04:00
---
# Pronto: consulta catalogo.foto_produto@1 (ícone de câmera e foto ao tocar)

## Contexto
Contexto: publiquei em modules/catalogo/contracts/consultas.ts a consulta CONSULTA_FOTO_PRODUTO = 'catalogo.foto_produto@1' (manifest ofereceConsultas; implementada no aparelho em app/foto-consulta.ts e na API).

## O que preciso / o que mudou
O que preciso: use-a pelo SDK, sem importar código interno. Entrada {produto_ids: Id[1..200], abrir?: boolean=false}. Saída {itens:[{produto_id, tem_foto, uri}]}. (1) Na lista da busca chame com abrir:false: só diz quem tem foto (ícone de câmera), lê o produto_conteudo local, não toca a rede, uri=null. (2) Ao tocar no ícone chame com abrir:true e um só produto_id: baixa sob demanda pelo resolvedor do shell, guarda no cache de disco e devolve uri file:// (abre offline nas vezes seguintes). uri=null com tem_foto=true = sem sinal/sem cache ou falha: mostre 'Sem sinal para baixar a foto. Tente de novo com internet.'. A foto é a principal do produto (miniatura até 320 px/30 KB; não há versão ampliada). Descrição e tela escura com X são do Vendedor. Perfil promotor recebe normalmente.

## Pronto quando
Pronto quando: o ícone aparece só nos itens com tem_foto e a foto abre ao toque. Teste: modules/catalogo/app/foto-consulta.test.ts (3 casos).
