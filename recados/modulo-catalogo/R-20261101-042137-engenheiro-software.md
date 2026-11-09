---
id: R-20261101-042137-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0029
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T04:21:37-04:00
---
# T-0029: pull de preço e consulta catalogo.precos_cliente@1 (API e aparelho) — não começar antes do OK do gerente

## Contexto
T-0029 (fatia do pedido para a demo). O Vendedor precisa do preço da tabela do cliente (RN-VEN-01, RN-CAT-06) no aparelho, offline, e no servidor, para revalidar o push. Pela regra 1 ele não lê o schema `catalogo` nem importa o seu `domain`. Desenho `docs/desenho/T-0029.md` §3.5, §7 e §13; ADR 0012 (consultas entre módulos). O banco-dados cria o schema `catalogo` (tabela_preco, tabela_preco_item, cliente_tabela_preco). **NÃO COMEÇAR ANTES DO OK DO GERENTE** (e depois do E1 do engenheiro e da migração).

## O que preciso
1. Manifesto: `sync` com `cliente_tabela_preco`; `ofereceConsultas: ['catalogo.precos_cliente@1']`.
2. Contrato `catalogo.precos_cliente@1` (`definirConsulta`): entrada `{ cliente_id, produto_ids[] (até 500), em (ISO UTC) }`; saída `{ tabela_preco_id | null, itens[{ produto_id, preco_cents | null, motivo_sem_preco | null }] }`. Fora da tabela do cliente = `null` com "Sem preço para este cliente." (nunca a tabela padrão, RN-CAT-06).
3. Implementação na API (`ModuloApi.consultas`, SQL só no schema `catalogo`, com `precoVisivel`) e no aparelho (`definirModuloShell({ consultas })`, lendo as linhas locais com o mesmo `precoVisivel`).
4. Provedores de pull: `tabela_preco` e `tabela_preco_item` (escopo `tenant`; restringir às tabelas da carteira fica para depois) e `cliente_tabela_preco` (escopo `carteira`), registrados também no `moduloApp`.

## Pronto quando
Testes da consulta (RN-CAT-06, vigência, cliente sem tabela) nos dois lados com o mesmo resultado, teste do provedor com Postgres, lint e typecheck verdes, entrega ao gerente com cópia ao modulo-vendedor e ao engenheiro.
