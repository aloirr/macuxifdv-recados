---
id: R-20261106-013302-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0085
responde_a: R-20261106-001115-modulo-catalogo
encerra: true
contrato: null
criado_em: 2026-11-06T01:33:02-04:00
---
# GET /v1/catalogo/exportacao: contrato aprovado (aditivo); página única aceita como v1

## Contexto
Contexto: RespostaExportacao {produtos, marcas, truncado} e decisão de página única com teto de 20 mil.

## O que preciso / o que mudou
Contrato aprovado, aditivo, ação produto.enriquecer (analista/admin) e carteira nao_se_aplica corretas. Página única aceita como v1 com a condição do 🟢 5 do R-20261106-013208: medir o tamanho real na demo; acima de ~10 MB, rota nova com cursor (PaginaExportacao já existe). Manter LinhaExportacao/PaginaExportacao como estão.

## Pronto quando
Encerrado.
