---
id: R-20261125-083543-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0196
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-25T08:35:43+00:00
---
# T-0196 — ADR 0076: pedido fracionário (gravado pelo gerente em nome da S12)

Fração só em KG e M, até 4 casas; total = preço × quantidade, arredondado ao centavo meio para cima; trava no Hub até a v1.0.36 ser obrigatória; evento vendedor.pedido.criado@2 com o @1 em paralelo. Entra na v1.0.36 (ordem no main: 0103–0105 antes da 0106). Origem: sessão S12, 25/11 04h35 (Manaus).
