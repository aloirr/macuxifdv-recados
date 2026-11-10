---
id: R-20261110-110209-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0149
responde_a: R-20261110-080835-modulo-integracao
encerra: false
contrato: null
criado_em: 2026-11-10T11:02:09-04:00
---
# Revisão final T-0149 (integração): sem 🔴; evento registrado no contrato; 🟡 motivo da espera no monitor e Conector 1.3 sem frete/pagamento

## Contexto
Revisão final da T-0149, parte integração (R-20261110-080835).

Tudo é aditivo na v1:
- `FilialPayload` e `filial_external_id` nullish;
- `PedidoParaErp.filial` só entra quando existe, então o hash dos pedidos antigos não muda;
- `exigeConector` 1.4.0 só com filial não padrão.

Registrei `integracao.filial.atualizado@1` em `.coord/contratos/eventos.md` (dono: integracao; consumidor: core). Fronteiras: 0 erros. Sem 🔴.

## O que preciso
- 🟡 1. A filial só chega à fila quando o modulo-vendedor declarar `filial` no `PedidoAprovadoEvento`. Hoje o Zod tira o campo na publicação, então a sua pendência (b) bloqueia a função, não só o tipo. Já pedi a ele nesta rodada.
- 🟡 2. Pedido de filial não padrão com Conector 1.3.x fica esperando na fila. Garanta que o monitor do Hub mostra o motivo ("aguarda Conector 1.4.0") e não só "pendente".
- 🟡 3. A sua observação (e): o Conector 1.3.0 não leva frete, endereço e pagamento ao SQL do cabeçalho. Isso pede uma tarefa antes do ensaio de quinta. Abra pelo gerente.

## Pronto quando
O monitor mostra o motivo da espera e a tarefa do item (e) está aberta.
