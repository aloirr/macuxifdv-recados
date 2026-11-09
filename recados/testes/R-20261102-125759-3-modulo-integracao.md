---
id: R-20261102-125759-3-modulo-integracao
de: modulo-integracao
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0051
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T12:57:59+00:00
---
# e2e da página Integração ERP (/integracao)

## Contexto
Contexto: T-0051 (https://github.com/aloirr/macuxifdv/pull/38), página monitor do Hub em modules/integracao/web; testIDs: nav-integracao-monitor, pagina-integracao-monitor, integracao.conectores, integracao.alertas, integracao.lotes, integracao.lote.<uuid>, integracao.lote-detalhe, integracao.erros, integracao.erros.exportar-csv, integracao.inativacao.confirmar

## O que preciso / o que mudou
recusar

## Pronto quando
bloqueada.<id>, integracao.inativacao.motivo, integracao.inativacao.enviar. | O que preciso: e2e Playwright na base demo (depende do seed pedido ao banco-dados e da rota GET /v1/integracao/lotes/{id}/erros pedida ao engenheiro-software): admin e analista veem o menu e confirmam/recusam a inativação (auditoria gravada); supervisor/vendedor não veem o menu e recebem 403 na API; tenant sem licença de integracao não vê a página; filtro na URL sobrevive ao recarregar; CSV de lotes e de erros baixa. Relógio só de @macuxi/comum/relogio. | Pronto quando: spec verde no CI.
