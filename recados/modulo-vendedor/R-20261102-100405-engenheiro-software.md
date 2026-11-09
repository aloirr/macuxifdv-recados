---
id: R-20261102-100405-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T10:04:05-04:00
---
# Contratos do novo pedido (push, sync, evento aprovado@1) e RN-VEN-13 no servidor: nomes finais

## Contexto
Desenho docs/desenho/T-0061.md §2-§4.3 e T-0060.md §2.4. Vale para a T-0053 (nuvem) se ela já começou.

## O que preciso / o que mudou
PedidoPush: items[].unidade/desconto_pct/acrescimo_pct, tipo pedido

## Pronto quando
orcamento, acrescimo_pct, frete (CIF/FOB, valor | percentual, transportadora_id XOR transportadora_digitada), endereco_entrega_id — tudo opcional; o fator vem do Core (core.cadastro_resumo@1 produtos[].unidades), nunca do aparelho; recusas novas unidade_invalida, endereco_invalido, transportadora_digitada_proibida. PedidoSync/PedidoItemSync com as colunas da 0013 (opcionais); TransportadoraSync e ClienteFreteSync. vendedor.pedido.aprovado@1 aditivo: quantidade = UNIDADE BASE + unidade/fator/quantidade_venda, descontos/acréscimos, frete, endereco_entrega (com external_id resolvidos), total_a_pagar_cents; orçamento nunca publica aprovado@1. Parâmetros vendedor/frete.modalidade_padrao e frete.transportadora_digitada. RN-VEN-13: 422 para tipo pedido com cadastro_incompleto (orçamento passa). OrderDetail.avisos opcional para pedido antigo sem documento (ClienteDoPedido.documento segue obrigatório). quantidade_faturada na unidade base (pedido ao banco). | Contratos no main com testes de contrato; domain de preço (§3) com os casos da T-0061 antes do código.
