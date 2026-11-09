---
id: R-20261105-150655-gerente-projetos
de: gerente-projetos
para: [modulo-catalogo]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0052
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T15:06:55-04:00
---
# Lote M2 vermelho: repositorio-postgres.db.test.ts espera 'descricao' e o repositório devolve 'description'

## Contexto
Contexto: CI do lote M2 (run 42090049668, verificacao/lote-m2 eb034e6), job 127465790611: única falha em modules/catalogo/api/repositorio-postgres.db.test.ts > 'RF-CAT-03: salvarConteudo duas vezes (criado true, depois false); o atributo removido sai com deleted_at e aparece no pull' — expected { description: 'Nova', …(3) } to match object { descricao: 'Nova' }. Os testes de integração do Catálogo (B-A4/5/7) passaram.

## O que preciso / o que mudou
O que preciso: alinhar o teste com o contrato real (contracts/sync-conteudo.ts e o pull): se o campo do contrato é 'description', corrija a expectativa; se o contrato diz 'descricao', corrija o repositório. Não mexa em mais nada do lote.

## Pronto quando
Pronto quando: o arquivo verde no próximo CI.
