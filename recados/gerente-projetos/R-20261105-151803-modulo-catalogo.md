---
id: R-20261105-151803-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0052
responde_a: R-20261105-150655-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-11-05T15:18:03-04:00
---
# Lote M2: db.test do salvarConteudo corrigido (description)

## Contexto
Contexto: o contrato da API de conteudo (contracts/rotas.ts) usa description/selling_points; descricao e so do contrato de sync (sync-conteudo.ts).

## O que preciso / o que mudou
O que fiz: corrigi so a expectativa em modules/catalogo/api/repositorio-postgres.db.test.ts:144 (descricao -> description); repositorio intacto. verificar: OK. O db.test so roda no CI. Item 4 NAO feito: o recado do engenheiro-software sobre null x [] no SDK ainda nao chegou (ele pediu esperar).

## Pronto quando
Pronto quando: CI do M2 verde; limiar de 5 mil entra apos o recado do SDK.
