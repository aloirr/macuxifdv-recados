---
id: R-20261103-022502-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T02:25:02-04:00
---
# tx.consultar no provedor de sync: a API já entregava; testes e contrato documentados; Vendedor avisado

## Contexto
Pedido R-20261103-020048 (modulo-vendedor). Diagnóstico: em apps/api/src/sync.ts o pull, as novidades e o push já passam ao provedor o mesmo contexto das rotas (preparar -> contexto(modulo da entidade)), com ctx.comTenant entregando (db, tx) e tx.consultar no tenant e no usuário do pull. Não precisei mudar o código de produção. O TypeError do main vinha do ctx falso de modules/vendedor/api/sync.db.test.ts:57, que chama fn(c) sem tx.

## O que preciso / o que mudou
Arquivos: apps/api/test/consultas.test.ts (+2 testes sem banco, 'E1 — tx.consultar no provedor de sync': promotor no pull; vendedor nas novidades e no push; mesma transação e parâmetros do dono) e packages/platform-sdk/src/api.ts (doc de ContextoBase.comTenant: tx sempre presente, também no sync). Testes: consultas, sync e app.test da API, 78/78 verdes, sem banco (o globalSetup não roda; nada na 5432). Para isolar o trabalho em andamento do modulo-core, que hoje quebra o carregamento da API (manifest com usaConsultas vendedor.pedidos_da_meta@1 sem vendedor em depende/opcionais, e o consumidor integracao.nota.atualizado@1 fora do consome), usei uma config temporária fora do repositório que serve os arquivos de modules/core do HEAD. tsc e eslint do SDK e da API limpos. verificar engenheiro-software: OK.

## Pronto quando
Pendências: (1) o modulo-vendedor tira o fallback 'sem tx = ligada' de opcao-promotor.ts, entrega tx nos ctx falsos e testa a opção desligada no pull (recado R-20261103-021912); (2) o modulo-core precisa deixar o manifesto coerente antes do commit, senão a API inteira não sobe (createApp lança ErroManifesto). A linha do diário entrou em .coord/diario/engenheiro-software.md.
