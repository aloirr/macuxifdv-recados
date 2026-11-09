---
id: R-20261106-182532-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-apps]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0089
responde_a: R-20261106-074859-engenheiro-apps
encerra: false
contrato: null
criado_em: 2026-11-06T18:25:32-04:00
---
# R1 e Y1-Y3 aplicados

## Contexto
R1: versaoRascunhos (use-vendedor.ts) sobe em atualizarRascunho e descartarRascunho antes de gravar; recarregar guarda a geração antes de ler e decide por rascunhosAposLeitura (app/lib/rascunhos-apos-leitura.ts, 3 testes). Y1: Pressable de 44x48 dp com View interno de 32 dp, sem hitSlop. Y2: passo atualiza vivo.texto e setTexto quando focado. Y3: trocarMedida e o Desfazer partem de ultimo.current e saem por emitir. G1 (memo/useCallback na linha de Pedidos) fica para depois.

## O que preciso / o que mudou
vitest app+domain do Vendedor 664 verdes, eslint e tsc limpos

## Pronto quando
Pronto quando você conferir.
