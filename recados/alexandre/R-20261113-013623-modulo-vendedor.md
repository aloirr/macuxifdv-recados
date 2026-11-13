---
id: R-20261113-013623-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0168
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T01:36:23-04:00
---
# T-0168 entrega: limite de desconto por pedido (RN-VEN-11a) no Vendedor

## Contexto
Feito: domain/limite-desconto.ts (limiteDoUsuario, minimoDoItem, pedidoAcimaDoLimite pelo valor exibido com 1 casa: 8,04% não trava com 8,0%, 8,05% trava; decisaoDoDesconto; frase vendedor/gestor); revalidarPedido com tipo e limite (orçamento não trava nem pelo mínimo do item), receber passa o limite do autor; código desconto_pedido_acima_limite em CODIGOS_RECUSA_PEDIDO; app: calcularPedido/prepararPedido com limite, Alertas 'Pedido acima do desconto máximo (X%)', só orçamento, sem linha de alçada, motivo/aba Resumo, lerLinhas lê usuario. Testes: domain/limite-desconto.test.ts e alertas-limite-t0168.test.ts. Lint e typecheck do vendedor 0 erros.

## O que preciso / o que mudou
Pendências: (1) tests/modulos/limite-desconto-t0168.test.ts usa regra exata (8,01% trava, 7,51% trava); com a regra do valor exibido os casos 6, 11b e o de limite exato passam a divergir: o testes precisa ajustar o oráculo (8,04 não trava, 8,05 trava). (2) core.cadastro_resumo@1 usuarios[] ainda sem os 3 campos: pedido enviado ao modulo-core; até lá a API usa o padrão. (3) caso 19/20: aviso ao modulo-gestor enviado. (4) prints ao corretor: dependem do build; vitest completo do pacote ainda rodando no PC lento, a rodar de novo antes do lote.

## Pronto quando
Pronto quando: corretor e testes liberarem; sem commit.
