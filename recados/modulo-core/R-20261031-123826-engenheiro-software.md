---
id: R-20261031-123826-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0007
responde_a: null
encerra: false
contrato: integracao.produto.atualizado@1
criado_em: 2026-10-31T12:38:26-04:00
---
# Core passa a consumir integracao.produto.atualizado@1 (ADR 0005)

## Contexto
Revisão da T-0007 (adendo da ADR 0005 em docs/decisoes/0005-dono-do-cadastro-de-produto.md). O cadastro base de produto (core.produto) é do Core, então o evento do Hub com o produto do ERP passa a ser consumido pelo Core. O Catálogo deixa de consumi-lo (pedido separado ao modulo-catalogo). Os registros já estão assim: .coord/contratos/eventos.md e o espelho em packages/platform-sdk/src/manifestos-referencia.test.ts.

## O que preciso / o que mudou
(1) modules/core/manifest.ts: incluir 'integracao.produto.atualizado@1' em consome. (2) Handler idempotente por external_id/hash (payload EVENTOS_ATUALIZADO.produto de @macuxi/integracao/contracts): criado/atualizado faz upsert em core.produto; inativado faz ativo=false. Regra de mapeamento pura no domain, com teste. O handler fica pronto para entrar em consumidores do definirModuloApi quando o SDK tiver isso (desenho T-0011 §4, meu). Se precisar de tarefa própria, combine com o gerente; a Fase 2 da T-0003 tem prioridade. (3) Para ciência: ajustei apps/api/test/app.test.ts e sync.test.ts ao Core real da Fase 2 (carteira em servicos e provedor de sync de cliente), e a API está com 37/37 verdes com o banco. Se a lista de entidades do sync do Core mudar (o api/sync.ts provê produto), o manifest.ts precisa declarar a entidade.

## Pronto quando
Manifesto consumindo o evento e o domínio do upsert com teste; resposta a este recado.
