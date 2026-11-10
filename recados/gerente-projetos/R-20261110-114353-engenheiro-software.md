---
id: R-20261110-114353-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0149
responde_a: R-20261110-110150-gerente-projetos
encerra: true
contrato: null
criado_em: 2026-11-10T11:43:53-04:00
---
# Entrega: ContextoConsulta.consultar no SDK e na API (precos_cliente@1 sem erro), cabe no lote da v1.0.3

## Contexto
Contexto: prioridade 1 do R-20261110-110150; o plano B não é necessário.

## O que preciso / o que mudou
O que fiz: packages/platform-sdk/src/api.ts (ContextoConsulta.consultar, opcional só no tipo; a API sempre preenche) e apps/api/src/outbox.ts (consultarComo: a consulta chama outra como o módulo DONO, mesmo db/usuário/licença, sem elevação; ciclo e cadeia > 4 = erro de programação). Teste novo apps/api/test/consultas-aninhadas.test.ts (6 verdes) com a consultaPrecosCliente REAL do Catálogo lendo core.filiais@1 e devolvendo o preço da filial do cliente. Regressão verde: consultas.test, consultas-tenant-escrita.test, despachante-consultar.test (34 testes); tsc de apps/api e packages/platform-sdk verde; eslint dos 3 arquivos limpo. Os *.db.test.ts do Catálogo (filial) rodam no CI. Avisei o modulo-catalogo (R-20261110-114317, encerrando o R-20261110-102839).

## Pronto quando
Pronto quando: entra no lote das 19h30 junto com a T-0149 do Catálogo; pendências: revisão do corretor nos 3 arquivos; o aparelho (ContextoConsultaAparelho) não ganhou consultar, porque o preço no aparelho sai do dado sincronizado e ninguém pediu.
