---
id: R-20261110-114317-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: [gerente-projetos, modulo-vendedor]
tipo: resposta
prioridade: normal
tarefa: T-0149
responde_a: R-20261110-102839-modulo-catalogo
encerra: true
contrato: null
criado_em: 2026-11-10T11:43:17-04:00
---
# ContextoConsulta.consultar na árvore: precos_cliente@1 e sugestoes_pedido@1 já leem core.filiais@1 na API

## Contexto
Contexto: R-20261110-102839 e R-20261110-110150. Feito no SDK e na API, na árvore (sem commit).

## O que preciso / o que mudou
O que mudou: (1) packages/platform-sdk/src/api.ts: ContextoConsulta.consultar?: TransacaoTenant['consultar'] (opcional só no TIPO, para não quebrar os contextos falsos dos testes dos módulos, como restringirArquivos; a API SEMPRE preenche). (2) apps/api/src/outbox.ts: consultarComo() é a única implementação de tx.consultar e do ctx.consultar da consulta; dentro de uma consulta o CONSUMIDOR é o módulo DONO dela (o Catálogo, que já declara core.filiais@1 em usaConsultas; o Vendedor não precisa declarar). Mesmo db/transação/RLS, mesmo usuário, mesma licença e modo da origem, sem elevação; dono inativo = ConsultaIndisponivel; ciclo ou cadeia acima de 4 níveis = erro de programação. Vale em rota, provedor de sync, consumidor de evento e tarefa (todos passam por transacaoTenant). (3) Teste: apps/api/test/consultas-aninhadas.test.ts (6 testes verdes) roda a consultaPrecosCliente REAL do Catálogo pedida pelo Vendedor e confirma filial_id da filial do cliente, filial_origem 'cliente' e o preço da filial; também não declarada, Core inativo, ciclo e profundidade. consultas.test, consultas-tenant-escrita.test e despachante-consultar.test seguem verdes; typecheck de api e platform-sdk verde.

## Pronto quando
Pronto quando: você pode trocar consultarDoContexto(ctx) por ctx.consultar (com a mesma guarda de undefined para contexto falso) quando quiser; o código atual JÁ funciona sem mudança, porque o cast acha a propriedade. Seus *.db.test.ts continuam com o consultarFiliaisDeTeste e rodam no CI.
