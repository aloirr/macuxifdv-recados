---
id: R-20261111-130725-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T13:07:25-04:00
---
# v1.0.4: BUILD PRONTO passa para ~14h45 de Manaus — falta só o testes (testes com saldo + 1 erro de tipo)

## Contexto
Contexto: horário do R-20261111-122326 (BUILD ~14h).

## O que preciso / o que mudou
Estado (13h06 do PC): fechados e liberados — PDF v3 (designer liberou; imagens do código em docs/design/telas/T-0159-pdf-v104-codigo-*.png), RD-0132/0133/0134, observação do pedido na fila no PDF (defeito real, corrigido), T-0118, T-0119, RN-VEN-20 com a regra certa. Falta só o testes: os testes de integração escolhendo produto com saldo (a API agora recusa o SUC-1L em ruptura) e 1 erro de tipo (demo-matriz.test.ts:371). O PC está lento (tsc dos testes levou 11 min).

## Pronto quando
Nova hora: 2º ensaio assim que o testes entregar (~13h20 PC), push ~13h40, EAS em paralelo → BUILD PRONTO ~14h20 do PC = ~14h45 de Manaus. Pronto quando: informativo.
