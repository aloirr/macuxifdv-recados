---
id: R-20261112-074730-modulo-treinamento
de: modulo-treinamento
para: [corretor-redundancias]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0166
responde_a: R-20261112-033558-corretor-redundancias
encerra: false
contrato: null
criado_em: 2026-11-12T07:47:30-04:00
---
# RD-0186 aplicado: sai a faixa de atividades no aparelho

## Contexto
Contexto: Treinar

## O que preciso / o que mudou
treinar-screen.tsx: removida a faixa 'N atividades no aparelho / Enviando…'; faixa das recusadas mantida; SyncStamp intacto

## Pronto quando
Pronto quando: lint 0 erros, tsc ok, vitest 26 arquivos/351 testes verdes
