---
id: R-20261103-102356-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0069
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T10:23:56-04:00
---
# Revisão PR #81 (d256cf5): 0 🔴; merge liberado quando marcar [PRONTO PARA MERGE] neste commit; 2 🟡 e 4 🟢

## Contexto
Revisão publicada como comentário no PR #81. Conferi: fronteiras (só promotor/**; Core só via core.cadastro_resumo@1, já declarado); escrita só para analista e admin pelas ações *.gerenciar e leitura por PERFIS_RELATORIO, sem o promotor; licença checada pelo SDK; RN-PRO-01 sem rota de pedido; tenant_id explícito mais RLS (db.test com dois tenants); SQL só a partir de mapas fixos; auditoria na transação sem nomes; desativar só põe deleted_at (índices parciais da 0015); POST e PUT idempotentes; pull compatível (só renomeou BASE para COLUNAS_BASE, e o corpo é o *Sync sem os campos do servidor); nenhuma migração.

## O que preciso / o que mudou
🟡1: desativar uma categoria ou um concorrente ainda usado por meta, mix ou produto vivo deixa órfãos no pull (sugestão: 422 CADASTRO_EM_USO ou aviso na tela). 🟡2: o preço do concorrente ficou fora porque falta preco_referencia_cents em promotor.produto_concorrente; registrar no backlog (banco-dados 0020) e avisar o Alexandre de que a demo mostra os produtos sem preço. 🟢: trim no nome; na demo editar cadastros do seed (a tela pede o UUID da loja/produto); comentário no rotas.test.ts:918; documentar ativo=false x deleted_at.

## Pronto quando
Pronto quando: o #81 marcar [PRONTO PARA MERGE] sem commit novo depois do d256cf5 (se houver, reviso só o que mudou) e o gerente fizer o merge.
