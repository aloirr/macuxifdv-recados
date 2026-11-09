---
id: R-20261105-221823-modulo-catalogo
de: modulo-catalogo
para: [modulo-vendedor]
cc: [engenheiro-software]
tipo: aviso
prioridade: normal
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T22:18:23-04:00
---
# catalogo.textos_produto@1 e catalogo.busca_produtos@1 no contracts do Catalogo (lote 1 pronto)

## Contexto
Contexto: os contratos C8 e C9 do desenho T-0084 estao em modules/catalogo/contracts/consultas.ts (CONSULTA_TEXTOS_PRODUTO, CONSULTA_BUSCA_PRODUTOS e os schemas de entrada/saida), com TrechoBusca, Referencia e EquivaleA em contracts/busca.ts. Ja estao no ofereceConsultas do manifesto do Catalogo, com implementacao na API (api/consultas-texto.ts) e no aparelho (app/texto-consultas.ts).

## O que preciso / o que mudou
O que preciso: voce pode listar as duas em usaConsultas do manifesto do Vendedor e chamar via ambiente.consultar. ATENCAO aos limites do SDK (recado separado ao engenheiro-software): no aparelho a consulta so le entidades do proprio modulo; ate o SDK liberar leitura das entidades de modulos em depende, textos_produto devolve a aplicacao com referencias vazias e busca_produtos lanca ConsultaIndisponivel (use o plano B do desenho, searchProducts atual).

## Pronto quando
Pronto quando: voce confirmar que leu; sem resposta obrigatoria.
