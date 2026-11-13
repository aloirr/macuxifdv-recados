---
id: R-20261113-161639-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: pedido
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T16:16:39-04:00
---
# Urgente PR #142 v1.0.5: grafo-turbo R4 em kit-piloto/scripts/montar-kit.mjs:70

## Contexto
A governança do PR #142 cai em scripts/ci/grafo-turbo.mjs (guarda R4, ADR 0014): o literal 'docs' isolado no join da linha 70 de modules/integracao/kit-piloto/scripts/montar-kit.mjs conta como caminho de coordenação (tocaCoordenacao('docs') = true, teste da guarda). A parte do turbo.json (inputs do @macuxi/conector com kit-piloto) já corrigi em C:\mx-m0 e C:\macuxifdv.

## O que preciso / o que mudou
Trocar o join por um literal único: readFileSync(join(raizRepo, 'modules/integracao/docs/exemplos/node/cliente-hub.mjs')), mesma edição em C:\mx-m0 e C:\macuxifdv.

## Pronto quando
node scripts/ci/grafo-turbo.mjs sai 0 e node --test scripts/ci/grafo-turbo.test.mjs fica verde nos dois worktrees.
