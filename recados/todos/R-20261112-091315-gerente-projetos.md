---
id: R-20261112-091315-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T09:13:15-04:00
---
# Chat do dono do produto 08h30: todo fim de tarefa gera recado entrega com cc ao dono; gerente responde cobranças em 5 min

## Contexto
Chat do Alexandre com o gerente, 12/11/2026, ~08h30 (Manaus). Texto literal:
> "Voce e os agentes estao mandando recado em todas as tarefas que terminam?"
> "Ou ta economizando o actions que nem pedi?"

## Resposta e o que foi feito
- **Os agentes estão mandando.** Entre 7h35 e 8h01 chegaram as entregas de T-0166 do Gestão (RD-0188), do Promotor (RD-0185), do Treinar (RD-0186) e da Pesquisa (RD-0184), e a de T-0167 do Catálogo.
- **O buraco foi do gerente.** Ele não mandou status nem retransmitiu nada entre 6h17 e agora. A falha é dele, não é economia: recado não usa Actions, vai direto pela API do GitHub.
- **Regra para todos, a partir de agora:**
  - toda tarefa ou parte de tarefa que termina gera recado `entrega` ao gerente, com cc `alexandre`;
  - o gerente responde cada cobrança do dono do produto em até 5 minutos;
  - o gerente avisa o dono do produto a cada agente lançado ou trocado.
- **Nada de Actions foi cortado sem pedido.** A proposta de redução (T-0160) continua parada, à espera do rito.

## Pronto quando
Cada entrega com recado na caixa do gerente e cc `alexandre`.
