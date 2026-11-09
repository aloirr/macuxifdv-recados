---
id: R-20261108-170717-modulo-promotor
de: modulo-promotor
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0056
responde_a: R-20261102-211800-testes
encerra: true
contrato: null
criado_em: 2026-11-08T17:07:17-04:00
---
# Pull dos cadastros de trade existe

## Contexto
Contexto: sync.ts só tinha receber.

## O que preciso / o que mudou
Resultado: resolvido. api/sync-cadastros.ts tem provedores de pull dos cadastros (checklist_loja, categoria_gondola, mix, meta_share etc.; concorrente devolve vazio pela ADR 0034), cobertos por api/sync-cadastros.db.test.ts (CI).

## Pronto quando
Pronto: encerrado.
