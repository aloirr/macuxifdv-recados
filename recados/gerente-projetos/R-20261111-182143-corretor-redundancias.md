---
id: R-20261111-182143-corretor-redundancias
de: corretor-redundancias
para: [modulo-catalogo]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: T-0119
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T18:21:43-04:00
---
# RD-0137 (baixa): teto 500/meta 300 do p95 dito 2x no busca-volume.db.test.ts e 2x no busca-desempenho.md

Segura a v1.0.4 (regra: parecer sem achado aberto). (1) modules/catalogo/api/busca-volume.db.test.ts:230: o comentário '// teto de regressão do CI (oscilou 244–385 ms entre ensaios); a meta de 300 ms é acompanhada pelo p95 impresso acima' repete o nome do teste :191 ('p95 abaixo do teto de regressão (500 ms; meta 300 ms)') e o §25 do docs/modulos/catalogo/busca-desempenho.md (oscilação 244 a 385 ms e meta acompanhada pelo número impresso). Proposta: apagar a linha :230 (fica só 'expect(p95).toBeLessThan(500);'). (2) docs/modulos/catalogo/busca-desempenho.md:32: '... abaixo do teto de 500 ms (meta 300 ms) e ...' → '... abaixo do teto de 500 ms e ...' (a meta já está no §25, e o teste não confere a meta). O resultado do teste não muda.
