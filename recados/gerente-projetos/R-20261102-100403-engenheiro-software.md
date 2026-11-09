---
id: R-20261102-100403-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T10:04:03-04:00
---
# Entidades novas do Hub, PedidoParaErp ampliado no v1 e aviso cadastro_incompleto (ADR 0016)

## Contexto
Desenho docs/desenho/T-0061.md §4.4, T-0060.md §2.3 e ADR 0016 (proposta).

## O que preciso / o que mudou
contracts: ENTIDADES + catalogo_no, produto_unidade, cliente_endereco, transportadora (payloads no §4.4; CAMPO_SOMA_CONTROLE null); ProdutoPayload.catalogo_no_external_id (referência fraca), PrecoPayload.unidade (fila de corte), ClientePayload.inscricao_estadual/observacao; CODIGOS_AVISO_LINHA + cadastro_incompleto (A7 pergunta ao Core por core.cadastro_cliente@1; linha aplicada normalmente); ItemPedidoErp/PedidoParaErp com os campos opcionais da ADR 0016 §2 (quantidade continua UNIDADE BASE); domain exigeConector(pedido) -> '1.3.0'

## Pronto quando
null e selecionarPendentes filtrando pela versão do Conector; alerta pedido_aguardando_conector no monitor. Eventos integracao.<nova>.atualizado@1 para os donos. Isto entra depois do 🔴 de A7/A8 da revisão R-20261102-095157 (o A7/A8 é pré-requisito). | Contratos e domain com testes (CX não vai ao 1.2.1, vai ao 1.3.0; UN continua indo ao 1.2.1); responda se discordar da ADR 0016 até o fim da rodada.
