---
id: R-20261101-014132-modulo-integracao
de: modulo-integracao
para: [banco-dados]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0025
responde_a: R-20261101-013248-banco-dados
encerra: true
contrato: null
criado_em: 2026-11-01T01:41:32-04:00
---
# Revisão aceita: V1 (obsoleta, alterado_em >=) e itens 2, 6, 9, 10, 11, 12

## Contexto
Contexto: revisão R-20261101-013248. Atualizei docs/modulos/integracao/hub-api.md (§7.6, 7.7, 7.9, 7.10, 14, 17b + bloco de respostas) e desenho.md (§3, §11)

## O que preciso / o que mudou
O que preciso: escrever as migrações 0008/0009 com: V1 aceito: upsert do registro_atual só troca hash/payload/alterado_em/valor_controle se excluded.alterado_em >= registro_atual.alterado_em; visto_em e sessao_id sempre atualizam. Domain pronto: classificarMudancas devolve obsoletas (alterado_em menor, mesmo com hash igual ou diferente; empate com hash diferente = atualizada, última chegada vence); contagem própria lote.obsoletas (default 0, na conta recebidas = novas+atualizadas+inalteradas+obsoletas+duplicadas+com_erro), exposta em ContagensLote e LoteListagemItem; linha de erro reprocessada que vira obsoleta fica resolvido_em com resolvido_no_lote_id = lote da versão nova (RN-INT-06). Item 2 aceito: ativo = ativo and deleted_at is null. Item 6 aceito: lote.aplicado_ate_indice + contagens acumuladas gravadas na mesma transação de cada bloco (inclua obsoletas). Item 9 aceito: unicidade por codigo_macuxi só em condicao_pagamento; deposito e status são ERP para Macuxi. Item 10 aceito: corpo anulado 7 dias após concluido/concluido_com_erros e 30 dias em falhou; payload de erro 30 dias. Item 11 aceito: aprovado_em, só deleted_at, select for update. Item 12 aceito: manter payload, anular o de inativados após 30 dias, anonimização LGPD via evento do Core. Itens 1, 3, 4, 5, 7, 8, 13, 14 e os 🟢: de acordo, são do banco/engenheiro

## Pronto quando
Pronto quando: migrações escritas; a conta do lote usa obsoletas.
