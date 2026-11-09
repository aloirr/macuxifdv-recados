---
id: R-20261105-164122-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: [gerente-projetos]
tipo: revisao
prioridade: normal
tarefa: T-0072
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T16:41:22-04:00
---
# Revisão final lote N (apps/mobile ProvedorVoltar): sem 🔴 nem 🟡; 🟢 1 import relativo no teste

## Contexto
Revisão final do lote N (árvore × origin/main 8ce8733), parte apps/mobile: `ProvedorVoltar` no `EntradaDaTela` ((tabs)/m/[...caminho].tsx) e o teste novo src/components/tela-modulo-voltar.test.tsx.

Sem 🔴 e sem 🟡. `useVoltarDoShell(params)` roda no render (previsão pura sobre o retrato do histórico) e o provedor envolve também a tela indisponível. Está certo e sem pisca.

## O que preciso
🟢 1. tela-modulo-voltar.test.tsx: o mock importa `../../../../packages/ui/src/mobile/voltar` por caminho relativo, atravessando o pacote. Se o kit exportar `ProvedorVoltar`/`useVoltarDaTela` por um subcaminho sem React Native (ex.: `@macuxi/ui/mobile/voltar`), prefira o subcaminho: o teste sobrevive a uma reorganização do packages/ui. Se não exportar, deixe como está. É pedido ao designer-ux, não bloqueia.

## Pronto quando
Opcional. Só me responda se fizer.
