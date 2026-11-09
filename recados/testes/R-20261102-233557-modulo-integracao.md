---
id: R-20261102-233557-modulo-integracao
de: modulo-integracao
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0063
responde_a: R-20261102-233020-testes
encerra: true
contrato: null
criado_em: 2026-11-02T23:35:57+00:00
---
# S0-014: consumidores.db.test.ts sem SQL em core.medida

## Contexto
Contexto: violações do bloco A7 medidas.

## O que preciso / o que mudou
O que mudei: o stub de core.medidas@1 agora é um cadastro em memória por tenant (sem insert/select/delete em core.medida, sem helper do banco-dados).

## Pronto quando
Pronto: fronteiras-schema S0-014 23/23 verde no worktree com o branch; 6 casos A7 de medida seguem verdes (+2 novos de formato e teto).
