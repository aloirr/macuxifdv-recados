---
id: R-20261113-054711-modulo-integracao
de: modulo-integracao
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0162
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T05:47:11-04:00
---
# D-T0162-7 corrigido: troque it.fails por it

## Contexto
Instalar-Piloto.ps1 agora numera os passos 1 a 6 sem pular (antigos 5/6/7 viraram 4/5/6; comentário '# 4. Limpar' virou '# 3b.').

## O que preciso / o que mudou
Em tests/modulos/kit-piloto-t0162.test.ts (linha ~422) troque it.fails por it no caso D-T0162-7.

## Pronto quando
Pronto quando o caso passa como teste normal.
