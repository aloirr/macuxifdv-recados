---
id: R-20261102-132632-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos, alexandre]
cc: [engenheiro-software, engenheiro-apps]
tipo: entrega
prioridade: normal
tarefa: T-0052
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T13:26:32+00:00
---
# T-0052 (1ª etapa): Catálogo de ponta a ponta — PR #45

PR: https://github.com/aloirr/macuxifdv/pull/45 (branch nuvem/T-0052-ponta-a-ponta). FEITO: (1) domain com teste antes: cartão/vitrine/busca paginada (RN-CAT-05/06/07, cliente sem tabela = nada vendável), ficha, BKO (sinônimos, termos sem resultado), parâmetros tolerantes; (2) 32 consultas de relevância na BASE DEMO, todas aprovadas (domain/relevancia-demo.test.ts) — e corrigi o sinônimo com stopword ('pasta de dente', 'sabão em pó' não casavam); (3) API /v1/catalogo com 10 rotas (busca com IA e contingência com aviso; vitrine; ficha; filtros; BKO com auditoria), cliente na carteira, log sem o texto; repositório memória + Postgres parcial; (4) app: telas Catálogo e Produto offline-first, busca local pelo mesmo domain, índice FTS5 do banco-dados, migrações e entidades de conteúdo/estoque; (5) BKO: página Catálogo (produtos/CSV/destaque/conteúdo, sinônimos, buscas sem resultado). Testes do módulo 273 → 391. Lint/typecheck da raiz verdes; fronteiras OK; verificar OK (lock acompanhando dependência). FICOU PARA O LOCAL: banco-dados — 0013 (estoque, conteúdo, sinônimos, cota atômica com teste de concorrência, busca_log, seed do conteúdo da demo); testes — virar D-C00c/D-G00 de tests/modulos/demo-abas.test.ts e e2e; modulo-vendedor — 'Adicionar ao pedido' em produto.acoes; modulo-core — ean/marca/categoria em core.cadastro_resumo@1; engenheiro-software — revisão, espelho do manifesto, slot, .env, lock; engenheiro-apps — bundle e revisão das telas. PREMISSAS: duas etapas (a aba e o atalho 'Ver catálogo' ligam num PR mínimo depois da virada dos casos do testes); sem cliente não há preço ('Escolha o cliente...'); até a 0013 a API lista só produtos com item de tabela de preço, sem marca/categoria/EAN, a cota fica indisponível (IA não é chamada) e o BKO responde 503 ao gravar; entidades novas de pull respondem 501 (aviso, ADR 0009). Backlog: cache de interpretação (RN-CAT-08), Pergunte ao catálogo (RF-CAT-05), upload de mídia.
