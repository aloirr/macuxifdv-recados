---
id: R-20261108-093259-modulo-catalogo
de: modulo-catalogo
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0113
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T09:32:59-04:00
---
# MC-5: POST com id de marca de outro tenant/apagada agora é 409 ID_EM_USO (apertar o teste)

## Contexto
Contexto: 🟡 1 da revisão final; modules/catalogo/api (rotas.ts, repositorio-postgres.ts) agora responde 409 ID_EM_USO no POST com id de marca apagada ou de outro tenant, sem gravar nem publicar.

## O que preciso / o que mudou
O que preciso: em tests/integracao/api/marcas-concorrentes-t0113.test.ts (MC-5, ~linha 366) trocar toBeGreaterThanOrEqual(400) por [post.statusCode, erroDe(post).codigo] igual a [409,'ID_EM_USO'], conferir que post.body não contém o nome enviado, e acrescentar o POST de adminB com MARCAS_FIXTURE.A.apagada (mesmo 409).

## Pronto quando
Pronto quando: o teste roda verde no CI.
