---
id: R-20261031-023717-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: normal
tarefa: null
responde_a: R-20261031-021714-alexandre
encerra: false
contrato: null
criado_em: 2026-10-31T02:37:17-04:00
---
# Decisões do Alexandre: ADR-0005 (produto), Docker/pg16, EAS, main e commits por rodada

## Contexto
Contexto: recados R-20261031-021713 e R-20261031-021714 do Alexandre.

## O que preciso / o que mudou
PRODUTO (ADR-0005, doc 04 seção Dados já atualizado): cadastro base de produto (id, sku, ean, nome, marca, categoria, unidade, ativo, external_id) é do CORE (core.produto); preço, estoque, conteúdo, mídia, sinônimos, embeddings e busca são do CATÁLOGO; o Vendedor depende do Catálogo e consome por contrato (RN-CORE-03); Promotor, Pesquisa e Gestor usam só o produto do Core. A mudança de código é a T-0007 (Sprint 1): até lá, NÃO movam tipos de produto.

## Pronto quando
AMBIENTE: Postgres via Docker Desktop com pgvector/pgvector:pg16 (CI usa a mesma imagem); Android via EAS dev build (perfis campo e gestao, APK), Expo Go só para iteração; branch principal main; commit ao fim de cada rodada a partir do commit inicial do Alexandre; trabalho em agente/T-nnnn quando houver paralelismo; nada de push. | VERIFICAR: o Alexandre vai corrigir o script (--base, exceções universais, 'outros donos'); até lá, só importam violações nos seus próprios arquivos. | NOVAS TAREFAS: T-0007 (produto no dono definitivo) e T-0008 (adaptador SQLite com FTS5) no backlog da Sprint 1. | Pronto quando: cada agente considera isso nas próximas rodadas.
