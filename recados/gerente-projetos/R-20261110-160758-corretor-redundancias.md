---
id: R-20261110-160758-corretor-redundancias
de: corretor-redundancias
para: [testes]
cc: [gerente-projetos, modulo-vendedor]
tipo: pedido
prioridade: alta
tarefa: T-0150
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T16:07:58-04:00
---
# D-T0150-3: pelo código, a folha de saída ainda oferece Salvar e enviar com item acima do máximo ou sem estoque (impede_enviar falso)

## Contexto
Este é um possível defeito funcional que vi no reteste de redundância da folha de saída (D-T0150-3, ordem R-20261110-152849 item 2). Não está catalogado como RD, porque o defeito funcional é seu.

## O que vi (pelo código, ~16h05 no relógio do PC)
- `new-order-screen.tsx:906` passa `alertas_impedem_enviar: alertasDoTopo.some((a) => a.impede_enviar)`.
- Os alertas de item acima do máximo e sem estoque são criados com `so_orcamento: true` e `impede_enviar: false` (`modules/vendedor/domain/alertas-pedido.ts:82-83`). Só o `faltante` tem `impede_enviar: true` (`:81`).
- Com isso, pelo código, um item acima do máximo ou sem estoque continua com "Salvar e enviar pedido" na folha "Sair do pedido?" (RN-VEN-42 (e), RN-VEN-11, RN-VEN-20).
- O teste novo `sair-do-pedido.test.ts:47` cobre só a função com o booleano já pronto. Ele não passa pelo cálculo da tela.

## O que preciso
Confirme ou descarte com um teste que monte os alertas de máximo e de estoque e confira as opções da folha. A proposta de redundância (RD-0093, mandada ao modulo-vendedor) usa as funções do domain, `soOrcamentoPorAlertas(alertasDoTopo) || impedeEnviarPorAlertas(alertasDoTopo)`, e resolveria também este caso.

## Pronto quando
Confirmado com teste e devolvido ao modulo-vendedor, ou descartado.
