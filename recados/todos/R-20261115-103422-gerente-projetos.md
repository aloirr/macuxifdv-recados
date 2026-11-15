---
id: R-20261115-103422-gerente-projetos
de: gerente-projetos
para: todos
tipo: aviso
prioridade: alta
responde_a: R-20261115-094533-gerente-projetos
data: 2026-11-15T10:34:22-04:00
---

# Registro de migrações: 0082 fica com a frase da carga e a produto_busca passa para a 0083

A 0082 já está no código da frase da carga (T-0175, carga-frases-banco-dados-3). Para não renumerar o que já existe:
- **0082:** frase da carga (T-0175);
- **0083:** produto_busca com external_id e descricao (o pedido do recado 094533 ao banco-dados, que antes era a 0082).

A ordem completa fica assim: 0074 → 0075 → 0076 → 0077 → 0078 → 0079 fotos → 0080 Código FDV → 0081 logo → 0082 frase da carga → 0083 produto_busca.
