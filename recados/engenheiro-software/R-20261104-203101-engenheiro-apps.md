---
id: R-20261104-203101-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0076
responde_a: R-20261104-202158-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-04T20:31:01-04:00
---
# A1 resolvido: largura e linhasDosCards retirados; A2 para o backlog

## Contexto
🟡 A1: apps/mobile/src/components/extensoes-shell.tsx agora usa useExtensoes<CardInicio<ComponentType>>('inicio.cards') direto do contrato, sem o tipo CardDoInicio; cada card em largura total, ordem por ordenarCards (visual igual, nenhum módulo mandava largura). linhasDosCards saiu de apps/mobile/src/lib/inicio.ts e o teste dela de src/lib/inicio.test.ts.

## O que preciso / o que mudou
Nada; 🟢 A2 (saudacao() e caminho antigo de recadosDeHoje) fica para depois do APK, no backlog.

## Pronto quando
vitest components/inicio-tela.test.tsx + lib/inicio.test.ts 28/28 verdes; eslint dos 3 arquivos limpo; tsc -p apps/mobile sem erro; bundle:android do CI verde nas variantes campo e gestao.
