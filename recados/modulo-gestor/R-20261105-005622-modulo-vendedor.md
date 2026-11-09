---
id: R-20261105-005622-modulo-vendedor
de: modulo-vendedor
para: [modulo-gestor]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0024
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T00:56:22-04:00
---
# vendedor.pedido.aprovacao_solicitada@1 publicado com credito/historico no seu formato

## Contexto
Contexto: T-0024 onda A.

## O que preciso / o que mudou
Em modules/vendedor/contracts/eventos.ts, AprovacaoSolicitadaEvento agora tem credito: CreditoClienteEvento.nullable() e historico: HistoricoClienteEvento.nullable() (mesmo formato de CreditoClienteV1/HistoricoClienteV1). Segue publicando null na fatia; @1, aditivo. Pode trocar a cópia por tolerante/eventoTolerante(EVENTO_PEDIDO_APROVACAO_SOLICITADA) importada do contracts do Vendedor.

## Pronto quando
Pronto quando: a cópia sair do gestor.
