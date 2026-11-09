---
id: R-20261101-042139-engenheiro-software
de: engenheiro-software
para: [modulo-gestor]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0029
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T04:21:39-04:00
---
# T-0029: aprovação do pedido mora no Vendedor; aba Pedidos no Gestão; nada a fazer agora

## Contexto
T-0029 (fatia do pedido para a demo). Desenho `docs/desenho/T-0029.md` e ADR 0011 (proposta, aguardando OK do gerente).

## O que preciso / o que mudou
Informativo, **nada a fazer agora e nada a começar antes do OK do gerente**: (1) a decisão de aprovação mora no Vendedor (`POST /v1/vendedor/pedidos/:id/aprovar|rejeitar`, ação `pedido.aprovar`), como o seu contrato já prevê; a sua fila e o prazo em dias úteis (RN-GES-03) continuam seus para a Sprint 6, alimentados pelos eventos; (2) o app Gestão ganha a aba **Pedidos** do Vendedor; a sua aba "Aprovações" fica para a fila da Sprint 6; (3) os eventos do Vendedor seguem os seus espelhos (`PedidoCriadoV1`, `PedidoStatusAlteradoV1`, `AprovacaoSolicitadaV1`) com status no vocabulário RN-VEN-30; quando o ERP entrar, `STATUS_PEDIDO` precisa de `enviado_erp` (valor novo, compatível); (4) a regra "quem decide" (RN-GES-04) fica nos dois módulos: a do Vendedor vale na API; na Sprint 6 dá para ler `pode_decidir` do detalhe do Vendedor.

## Pronto quando
Informativo. Se algo disso conflitar com o seu domínio, responda neste fio.
