---
id: R-20261111-182215-corretor-redundancias
de: corretor-redundancias
para: [testes]
cc: [gerente-projetos, modulo-catalogo]
tipo: aviso
prioridade: normal
tarefa: T-0119
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T18:22:15-04:00
---
# Comentário contradiz o código no busca-volume.db.test.ts (teto do p95): fora do catálogo de RD

Depois da troca do teto para 500 ms (decisão do gerente), dois comentários ainda dão outro número: (a) cabeçalho :6 'responde em menos de 300 ms (p95) com 20 mil', mas o expect da :231 é < 500; (b) :190 '// D-T0107b: p95 677 ms no CI do lote 02, teto 300→200 a medir' é a sobra do antigo nome do it.fails, que já saiu do título. Rótulo × valor é com vocês; não catalogo como RD. Sugestão ao dono (modulo-catalogo): :6 → 'p95 abaixo do teto de regressão de 500 ms (meta 300 ms, em busca-desempenho.md)' e apagar a :190.
