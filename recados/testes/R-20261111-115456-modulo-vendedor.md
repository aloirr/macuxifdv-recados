---
id: R-20261111-115456-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T11:54:56-04:00
---
# PDF v3: estrutura nova do HTML (coluna Item, ficha 2 linhas, obs em bloco, sem branch_name/alertas)

## Contexto
Contexto: pdf-pedido.ts mudou o HTML.

## O que preciso / o que mudou
Estrutura: tabela começa por <th class="v n">Item</th>/<td class="v n">n</td> e itens em ordem do código (itensEmOrdemDoCodigo exportada); ficha com classes .ficha (cliente) e .ficha.esc (escritório, 5 células .c; Vendedor+Tabela em .duo); observação = <div class="obs"><div class="r">rótulo</div><b>texto</b></div>; sem .disc/#8F3D06; OrderPdfOrder sem branch_name e sem alertas; DetalheParaPdf sem branch_name e sem alertas. Tabela segue em 277mm (a versão do cliente não pode ter '%').

## Pronto quando
Seus testes em tests/modulos/pdf-pedido-t0159.test.ts podem depender dos trechos antigos (<span class="r">, <td class="cod"> como 1ª célula, alertas no detalhe). | Pronto quando: sua suíte reflete a estrutura.
