---
id: R-20261106-205058-modulo-catalogo
de: modulo-catalogo
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T20:50:58-04:00
---
# Revisão T-0084 (🟡) e T-0089 K1-K3: tabela escalonada no Catálogo, faixas em precos_cliente@1, BKO Tabelas de preço

Contexto: T-0084 (🟡 do R-20261106-200150) e T-0089 K1-K3 (R-20261106-073344 e R-20261106-184446). Pedido de revisão do que está em modules/catalogo (sem git).

O que preciso / o que mudou:
1. T-0084 🟡: app/desempenho-busca.test.ts sem appendFileSync (marcas só em memória, impressas por onTestFailed); comentário de domain/ranking.ts:132 virou "800 entradas (2 × 400 candidatos)"; app/lib/local.ts guarda em memória as aplicações lidas por comAplicacao (teto 800 LRU, válidas enquanto a versão de produto_conteudo não muda, esquecerMemoriaLocal zera). O `casar` de domain/serve-em.ts foi conferido: 'palio' x 'pali' é prefixo (nivelDaPalavra), o ano só casa por faixa e a primeira palavra que casa leva a marca; não mudei nada nele.
2. T-0089 K1: contracts/sync.ts (TabelaEscalonadaSyncSchema), contracts/entidades.ts (entidadeTabelaEscalonada dentro de ENTIDADES_PRECO), contracts/consultas.ts (FaixaEscalonadaSchema e faixas? aditivo; embalagens segue opcional, sem ser preenchido), contracts/rotas.ts (tabelas-preco, escalonada). Manifesto: sync += tabela_escalonada; consome += integracao.tabela_escalonada.atualizado@1; ação nova tabela_preco.gerenciar (analista e admin); web.menus += 'Tabelas de preço'. Por favor atualize o espelho (manifestos-referencia.test.ts e .coord/contratos/modulos.md).
3. K2: domain/escalonada.ts (puro, com teste antes: vigência fechada em data civil no fuso, tabela do cliente vence a geral, validarFaixa, conflito, P4), domain/precos-cliente.ts (faixas só com preço visível e item vendável; embalagens removido), api/consultas.ts e app/consultas.ts (faixas na API e no aparelho), api/sync.ts (provedor), api/consumidores-erp.ts + domain/erp.ts (consumidor da escalonada: produto por core.cadastro_resumo@1, tabela por external_id, adoção da faixa manual, referencia_ausente; preço do ERP com unidade diferente da base vira aviso de log e desativa a linha, sem recusar).
4. K3: rotas GET tabelas-preco, GET tabelas-preco/:id/precos, GET escalonada, PUT/DELETE escalonada/:id (api/rotas.ts, repositorio.ts e repositorio-postgres.ts) e a página web/pages/tabelas-preco-page.tsx (abas Preço da UN e Escalonada, filtros na URL, CSV; faixa do ERP é só leitura). Ponto de decisão: usei a ação nova tabela_preco.gerenciar com os perfis de conteúdo; diga se o gerente também deve gerenciar.
5. Testes: vitest do módulo 689 verdes (37 pulados de banco e desempenho), tsc dos 3 projetos e eslint sem erro. NÃO rodados (só no CI): SQL de api/consultas.ts (faixas), do repositório Postgres novo e do consumidor da escalonada; falta *.db.test.ts desses três caminhos. A tela só tem teste das funções puras (web/lib/tabelas-preco.test.ts) e das rotas; não há teste de renderização.

Pronto quando: revisão sem 🔴; os 🟡 viram tarefa no próximo lote.
