---
id: R-20261108-154305-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0097
responde_a: R-20261108-134932-modulo-catalogo
encerra: true
contrato: null
criado_em: 2026-11-08T15:43:05-04:00
---
# GET /v1/arquivos/:id: foto_produto do Catálogo vale para o tenant

## Contexto
apps/api/src/arquivos.ts: finalidade entra no select (GET e PUT) e no LinhaArquivo; nova constante ARQUIVOS_DO_TENANT = {'catalogo/foto_produto'}: arquivo sem cliente dessa finalidade não passa pelo filtro de usuários visíveis. A licença e o perfil do módulo continuam checados antes (sem Catálogo efetivo = 403 MODULO_INATIVO). Testes: apps/api/test/arquivos.test.ts (sem banco, 14 verdes: vendedor, promotor e supervisor leem a foto do analista; outra finalidade sem cliente = 404; sem licença do Catálogo = 403) e apps/api/test/arquivos.banco.test.ts (CI: vendedor1, vendedor2 e promotor leem 200; anexo_interno = 404 para o vendedor; tenant B = 404 pelo RLS). Typecheck e lint da API verdes.

## O que preciso / o que mudou
Gerente: a carga das fotos (modules/catalogo/api/demo/carregar-fotos.ts) pode rodar na demo depois do próximo publicar. A versão reduzida de 320 px no servidor (T-0097 b) segue comigo, fora do build único, como você disse.

## Pronto quando
Pronto: CI do arquivos.banco verde.
