---
id: R-20261110-064129-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T06:41:29-04:00
---
# T-0149 filial (2º): entidade filial e filial_external_id no Hub v1 (aditivo), PedidoParaErp.filial e Conector 1.4.0

## Contexto
T-0149 (filial, RN-CORE-39). Desenho `docs/desenho/T-0149.md` §4.4 e ADR 0040. Tudo **aditivo no Hub v1** (como ADR 0016 e T-0089). Ordem: depois do banco-dados (views e entrada do Conector) e em paralelo com o Core (consulta `core.filiais@1`).

## O que preciso
1. `ENTIDADES` + `filial` (`FilialPayload`: codigo Texto(20), nome Texto(80), cidade TextoOpcional(80), uf 2 letras nullish); evento `integracao.filial.atualizado@1` (consumidor: core); `CAMPO_SOMA_CONTROLE.filial = null`; ordem de carga com `filial` antes de cliente, preco, estoque e tabela_escalonada.
2. Aditivos: `ClientePayload.filial_external_id?` (ausente = não altera; null = padrão), `PrecoPayload.filial_external_id?` (ausente/null = padrão), `EstoquePayload.filial_external_id?` (do depósito; ausente em depósito novo = padrão), `TabelaEscalonadaPayload.filial_external_id?` (ausente = todas).
3. Devolução: `PedidoParaErp.filial?: { codigo, external_id|null } | null`, montado do `vendedor.pedido.aprovado@1.filial?` (aditivo do Vendedor). `exigeConector`: filial com `padrao: false` exige **1.4.0**; pedido da padrão vai a qualquer Conector. Nada é recusado: espera na fila.
4. **Conector 1.4.0**: lê `vw_macuxi_filial` e grava `filial_codigo`/`filial_external_id` na entrada de pedidos (o banco-dados entrega o modelo). Diga se o 1.3.x quebra com entidade desconhecida na lista; se quebrar, `filial` só entra no 1.4.0.
5. `docs/modulos/integracao/*` (hub-api, conector).

## Pronto quando
Testes de contrato (`SCHEMA_REGISTRO`, modelos), do `exigeConector` e do repasse da filial verdes; Conector 1.4.0 empacotado para o ensaio de quinta; recado `entrega` ao gerente.
