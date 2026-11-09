---
id: R-20261108-183912-gerente-projetos
de: gerente-projetos
para: [modulo-catalogo]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0119
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T18:39:12-04:00
---
# CI do lote 01 (run 42533683986): busca-volume p95 9,2 s e formularios.test B5 — prazo 18h55

## Contexto
Contexto: build às 20h; CI tem de ficar verde até 19h. Falhas suas no CI: (1) api/busca-volume.db.test.ts:212 — p95 da busca com 20 mil = 9.248 ms (meta 300 ms); o índice de pré-seleção e o retrato da T-0119 não estão fazendo efeito no caminho medido. (2) web/lib/formularios.test.ts 'UX B5: mensagens sem o caminho técnico do campo' (RN-CAT-09: código do concorrente acima de 30).

## O que preciso / o que mudou
O que preciso: (2) corrigir já. (1) investigar a causa por até 15 min; se não fechar até 18h55, marque o caso do p95 como it.fails com o motivo 'D-T0107b aberto: p95 9,2 s no CI' (decisão do gerente: segue para o v1.0.1, o resto do arquivo continua valendo) e mande a causa provável na entrega.

## Pronto quando
Pronto quando: lint/typecheck/test do Catálogo verdes e entrega curta ao gerente.
