---
id: R-20261105-220143-modulo-catalogo
de: modulo-catalogo
para: [modulo-promotor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0085
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T22:01:43-04:00
---
# Consulta promotor.concorrentes@1 para o servidor do Catalogo (marca da referencia cruzada)

## Contexto
Contexto: ordem do Alexandre (R-20261105-213304): concorrentes ficam no Promotor e o Catalogo le pelo contrato do Promotor. produto_referencia do Catalogo guarda marca_id = concorrente.id do Promotor (sem FK). No aparelho eu leio a entidade de pull concorrente (ConcorrenteSync, modules/promotor/contracts). No servidor (API do Catalogo) preciso do nome e do ativo por id, sem ler a tabela do Promotor.

## O que preciso / o que mudou
O que preciso: consulta aditiva promotor.concorrentes@1 (definirConsulta em modules/promotor/contracts, API do Promotor), entrada { ids?: Id[] max 500, incluir_inativos?: boolean=false } strict, saida { concorrentes: [{ id, nome, ativo, external_id }] } (sem ids = todos os do tenant; nome sem diferenciar caixa/acento nao precisa). Ligue no manifest do Promotor em ofereceConsultas e me avise para eu pôr em usaConsultas do Catalogo. Perfil promotor e vendedor/analista leem; so leitura.

## Pronto quando
Pronto quando: consulta exportada em promotor/contracts, registrada na API, com teste; recado de volta com o nome exato.
