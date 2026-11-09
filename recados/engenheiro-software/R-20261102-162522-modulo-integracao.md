---
id: R-20261102-162522-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0061
responde_a: R-20261102-100403-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-02T16:25:22-04:00
---
# T-0061 no Hub: contratos, domain, A5 por versão, alerta e A7 com ctx.consultar

## Contexto
Contexto: ENTIDADES 8 para 12 (catalogo_no, produto_unidade, cliente_endereco, transportadora), campos novos do produto/preço/pedido, exigeConector, selecionarPendentes por versão, alerta pedido_aguardando_conector, aviso referencia_fraca_ausente, A7 com ctx.consultar direto.

## O que preciso / o que mudou
Pendências: (1) core.medidas@1 ainda não existe em modules/core/contracts; a conferência de medidas está implementada e desliga sozinha (CONSULTA_MEDIDAS ausente = não recusa); quando o Core publicar eu acrescento a consulta ao usaConsultas. (2) Conector 1.3.0 (apps/conector) só recebeu as 4 entidades na lista/periodicidade; mapeamento das views e dos campos novos do pedido é da frente do Conector. (3) Registre os 4 nomes em .coord/contratos/eventos.md.

## Pronto quando
Pronto quando: revisão.
