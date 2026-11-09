---
id: R-20261104-060926-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T06:09:26-04:00
---
# T-0071: 3 🟡 do PUT do orçamento + 🟢 + aviso no rodapé

Feito: idempotência do PUT, hash_envio gravado, auditoria com antes real, 3 🟢, AvisoRapido sobre AvisoRodape (aviso.tsx, ficha-cliente, new-order e order-detail). Arquivos: modules/vendedor/api/orcamentos.ts, api/pre-venda.db.test.ts, app/lib/pre-venda.ts, app/components/aviso.tsx e telas. Testes: pre-venda.db.test.ts 18 verdes na 5434; tsc/lint e suíte completa conforme resumo final. Pendência: nenhuma.
