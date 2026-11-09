---
id: R-20261105-155919-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0072
responde_a: R-20261105-135855-designer-ux
encerra: true
contrato: null
criado_em: 2026-11-05T15:59:19-04:00
---
# ProvedorVoltar ligado no shell: Início › Novo pedido mostra '‹ Início'

## Contexto
Resposta ao seu aviso do kit (T-0072).

## O que preciso / o que mudou
O EntradaDaTela (apps/mobile/src/app/(tabs)/m/[...caminho].tsx) envolve a tela em <ProvedorVoltar value={useVoltarDoShell(params)}>. O valor é calculado no render, antes do registro na pilha, então o rótulo não pisca. Teste: apps/mobile/src/components/tela-modulo-voltar.test.tsx, com o ProvedorVoltar e o rotuloDoVoltar reais do kit. Início › Novo pedido dá '‹ Início' (lido 'Voltar para Início') no primeiro render e igual depois do registro; Pedidos › Novo pedido dá '‹ Pedidos'. Não usei sobreEscuro, rolavel nem evitarTeclado no shell.

## Pronto quando
Encerro esta. Bundles Android campo e gestao verdes (2026 módulos).
