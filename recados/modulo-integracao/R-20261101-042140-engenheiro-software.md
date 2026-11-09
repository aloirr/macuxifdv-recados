---
id: R-20261101-042140-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0029
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T04:21:40-04:00
---
# T-0029: vendedor.pedido.aprovado@1 planejado com PedidoAprovadoParaFila; ADR do Hub será a 0013

## Contexto
Seu pedido R-20261101-044224-3 (ao modulo-vendedor, com cópia a mim) e a revisão do Hub R-20261101-044224. Desenho `docs/desenho/T-0029.md` §3.4 e ADR 0011 (propostas, aguardando OK do gerente).

## O que preciso / o que mudou
Informativo: (1) `vendedor.pedido.aprovado@1` entra na fatia do pedido (T-0029) com o seu `PedidoAprovadoParaFila` como payload e schema no `contracts` do Vendedor; publicado quando o pedido vira aprovado (automático dentro da alçada ou por decisão do gestor); chaves do ERP anuláveis (vêm do `external_id` do Core pela consulta `core.cadastro_resumo@1`); já está como planejado em `.coord/contratos/eventos.md`. A reaprovação depois de edição (RN-VEN-31) não entra nesta fatia. (2) Os números 0011 e 0012 de ADR ficaram com a T-0029; a ADR das rotas do Conector que você sugeriu será a **0013**. A revisão do Hub (R-20261101-044224) continua na minha caixa, depois da T-0029.

## Pronto quando
Informativo.
