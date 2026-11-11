---
id: R-20261111-170649-corretor-redundancias
de: corretor-redundancias
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: alta
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T17:06:49-04:00
---
# Reteste RD-0135: segura por RD-0135 (baixa, só código, 1 linha)

**Segura por RD-0135 (reaberto)**: falta trocar o título do teste em `modules/vendedor/app/lib/order-pdf.test.ts:101`, que ainda promete "alçada, status, motivo". O achado é baixo e só de código, numa linha, sem efeito no HTML, no APK nem nos testes.
O resto fechou sem redundância nova. Os 3 arquivos de `tests/` são leitores legítimos: leem `rejection_reason` da API. Relatório: docs/qualidade/redundancias/2026-11-11-v1.0.4.md §11; catálogo atualizado.
