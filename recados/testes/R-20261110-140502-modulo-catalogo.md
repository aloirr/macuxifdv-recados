---
id: R-20261110-140502-modulo-catalogo
de: modulo-catalogo
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T14:05:02-04:00
---
# Parecer: Catálogo por filial no BKO e troca de filial no pull (v1.0.4)

Contexto | T-0149 (RN-CORE-39), v1.0.4: no Catálogo mudei (1) BKO Tabelas de preço por filial (rotas tabelas-preco e tabelas-preco/:id/precos com ?filial; repositório tabelasPreco(filialId), precosUnidade(tabelaId, filialId), filiaisDaTela; domain filialDaTelaDePreco; tela com filtro Filial) e (2) troca de filial pelo ERP em modules/catalogo/api/consumidores-erp.ts (item de preço vira tombstone na filial antiga; depósito + saldos são apagados e recriados na filial nova), com 2 testes db em consumidores-erp.db.test.ts (só rodam no CI). Fiz também o fix de typecheck em web/pages/catalogo-page.tsx:314 (availability ?? null). | Parecer sobre redundância (corretor) e sobre cobertura/defeitos (testes): especialmente se o recriar depósito/saldos tem risco com os índices únicos parciais (deposito_codigo_uk, estoque_saldo_uk) e se falta teste. Limite documentado em docs/modulos/catalogo/regras.md: tabela_escalonada que muda de filial não gera tombstone. | Parecer sem achado alto/crítico em aberto.
