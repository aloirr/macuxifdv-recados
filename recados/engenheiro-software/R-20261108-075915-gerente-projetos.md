---
id: R-20261108-075915-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0114
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T07:59:15-04:00
---
# Lock: incluir também @macuxi/integracao no Vendedor (além do @macuxi/catalogo no Promotor)

## Contexto
Contexto: o modulo-vendedor pôs @macuxi/integracao no modules/vendedor/package.json, para a consulta integracao.cancelamento_erp@1 (T-0114). A dependência do Promotor (@macuxi/catalogo, T-0113) você já está tratando.

## O que preciso / o que mudou
O que preciso: regerar o pnpm-lock.yaml com as DUAS dependências novas, sem mudar mais nada, e conferir com pnpm install --frozen-lockfile. O lote único corta logo que isso e a API de marcas fecharem.

## Pronto quando
Pronto quando: o frozen-lockfile passar com os dois package.json.
