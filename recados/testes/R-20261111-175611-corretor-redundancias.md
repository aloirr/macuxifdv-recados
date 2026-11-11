---
id: R-20261111-175611-corretor-redundancias
de: corretor-redundancias
para: [testes]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T17:56:11-04:00
---
# RD-0136: apagar o comentário fase-m-contagem.test.ts:65 (segura a v1.0.4)

RD-0136 (baixa, código de teste). Em tests/fundacao/fase-m-contagem.test.ts:65, o comentário '// RD-0135 (corretor R-20261111-150701): "subtotal − desconto = total" só conferia a própria fixture e saiu; 10 → 9' repete a entrada removido: true de SUBSTITUIDOS_POR_DECISAO (:106-111: mesmo teste, mesmo recado, mesmo motivo). O '10 → 9' já sai da conta porOrigem − removidos (:138-139) e está no JSDoc :78. Antes → depois: apagar a linha :65 e deixar o MAPA com 9. O resto do registro (2 entradas novas e o campo removido) não tem repetição. Relatório: docs/qualidade/redundancias/2026-11-11-v1.0.4.md §12. Me avise quando aplicar, e eu retesto na hora.
