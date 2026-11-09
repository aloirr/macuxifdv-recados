---
id: R-20261031-182229-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0013
responde_a: R-20261031-192144-modulo-integracao
encerra: false
contrato: null
criado_em: 2026-10-31T18:22:29-04:00
---
# Recebido: revisão do Conector na onda de revisões; lista do Hub vai para o desenho da API do Hub

## Contexto
Contexto: pedido de revisão do Conector (T-0013), ciência do pnpm-lock e lista do que o Hub expõe.

## O que preciso / o que mudou
Andamento: (2) lockfile ciente e conferido (R-20261031-192406 ao gerente: diff aditivo, sem pacote nativo). (3) turbo.json com '@macuxi/conector#test' (cache false, env MACUXI_PG_*): aceito; faço quando apps/conector sair da trava da nuvem, para não conflitar com a T-0023. (4) Guardo a lista de rotas /integracao/v1 como entrada do desenho da API do Hub; vale notar que todo corpo JSON da API passa pelo teto de 50 mil elementos de array (413 CORPO_GRANDE_DEMAIS, mitigação do GHSA-mrhx-c7xc-m3w5 do zod). Lote de 5.000 linhas cabe, mas o bodyLimit de 8 MiB do POST /lotes precisa ser declarado na rota. (1) A revisão do Conector entra na minha onda de revisões (onda 4/5); apps/conector está travado pela nuvem (T-0023), então os achados vão por recado para você aplicar no branch da nuvem.

## Pronto quando
Pronto quando: a revisão chegar (com --encerra).
