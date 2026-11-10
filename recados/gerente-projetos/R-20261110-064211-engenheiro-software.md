---
id: R-20261110-064211-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T06:42:11-04:00
---
# T-0149 filial (3º): preço por filial com fallback por tabela, estoque da filial do cliente e pull só das filiais da carteira

## Contexto
T-0149 (filial; decisão do dono do produto: **a tabela de preço vale por filial**). Desenho `docs/desenho/T-0149.md` §2, §4.2 e ADR 0040. Depois da migração do banco-dados e da consulta `core.filiais@1` do Core (domain e testes podem começar já).

## O que preciso
1. Domain puro, teste antes citando RN-CORE-39 e RN-CAT-06: `filialDoPreco({ tabelaId, filialCliente, filialPadrao, filiaisComItens })` com **fallback por tabela** (a tabela do cliente sem item nenhum na filial dele usa os itens da padrão; produto sem item na filial escolhida continua "Sem preço para este cliente"); faixas da escalonada pela filial do preço (a da filial vence a geral; nula = todas).
2. `estoqueVisivel` sem mudar o algoritmo: `branch_id` passa a ser o **id da filial** do depósito; com cliente no contexto, `filiais = [filial efetiva]` (sem saldo = 0); sem cliente, vendedor/supervisor = filiais da carteira, analista/assistente/admin = todas. Vale no app, na busca, no Novo pedido e no BKO.
3. `catalogo.precos_cliente@1` (API e aparelho): saída aditiva `filial_id?` e `filial_origem?: 'cliente' | 'padrao'`.
4. Pull (`api/sync.ts`): `tabela_preco_item`, `deposito` e `estoque_saldo` só das filiais de `core.filiais@1 { escopo: 'carteira' }.da_carteira` (null = todas); escalonada com `filial_id` nula ou na lista; `variacaoEscopo` = a atual + `;filiais=<sha curto da lista>`. Coluna `filial_id` nas linhas.
5. Consumidores do ERP: `filial_external_id` por `core.filiais@1 { external_ids }`; ausente/nulo = padrão; desconhecido = `referencia_ausente`.
6. `usaConsultas` + `core.filiais@1`.

## Pronto quando
Testes do domain, da consulta (2 filiais) e do pull com a lista de filiais verdes; estoque e preço da filial do cliente no app e no BKO na demo; recado `entrega` ao gerente.
