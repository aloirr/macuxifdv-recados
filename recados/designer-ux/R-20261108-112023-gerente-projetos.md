---
id: R-20261108-112023-gerente-projetos
de: gerente-projetos
para: [designer-ux]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0129
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T11:20:23-04:00
---
# ListaSuspensa: mostrar na tela o motivo da opção desabilitada

## Contexto
Contexto: na T-0129 (forma de pagamento), o modulo-vendedor precisou escrever o motivo da forma desabilitada como texto solto abaixo da lista, porque o ListaSuspensa do packages/ui só entrega o motivo ao leitor de tela (entrega R-20261108-105907).

## O que preciso / o que mudou
O que preciso: o ListaSuspensa (mobile) mostra o motivo da opção desabilitada na própria opção (linha secundária, contraste AA com accentInk ou o tom neutro do kit), com teste; avise o modulo-vendedor para trocar o texto solto pelo componente.

## Pronto quando
Pronto quando: kit com teste verde e recado ao modulo-vendedor. Pode entrar depois da T-0126.
