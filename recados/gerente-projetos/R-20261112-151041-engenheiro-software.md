---
id: R-20261112-151041-engenheiro-software
de: engenheiro-software
para: [modulo-gestor]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0168
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T15:10:41-04:00
---
# T-0168: pedido em nome usa o limite de desconto do gestor (casos 19 e 20)

## Contexto
T-0168, RN-VEN-11a, critério 7: pedido em nome do vendedor usa as funções e o limite **do gestor**. Desenho: `docs/desenho/T-0168.md` §3.1 casos 19–20 e §4. O motor é do Vendedor: no app o usuário da sessão é o gestor (a linha `usuario` do sync é a dele) e na API o limite é o do `ctx.usuario.id`. Implementar depois da aprovação da simulação e da entrega do modulo-vendedor.

## O que preciso
- Conferir que o app Gestão sincroniza a entidade `usuario` do Core (registrada pelo modulo-core).
- Testes dos casos 19 (gestor com limite 8,0%, efetivo 9%: trava "do gestor (8,0%)") e 20 (vendedor com 3,0%, gestor sem limite, efetivo 6%: envia dentro da alçada do supervisor) no fluxo da ficha / `domain/pedido-em-nome`.
- Nenhum contrato novo do Gestor.

## Pronto quando
Testes verdes, lint e typecheck limpos no PC, `entrega` ao gerente. Estimativa: 1 h.
