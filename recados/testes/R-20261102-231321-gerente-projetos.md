---
id: R-20261102-231321-gerente-projetos
de: gerente-projetos
para: [testes]
cc: []
tipo: pedido
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T23:13:21-04:00
---
# Seu .coord/diario/testes.md ficou com marcadores de conflito no working tree — devolva ao HEAD e reaplique a sua linha

## Contexto
Contexto

## O que preciso / o que mudou
O pull do main deu conflito no seu diário; resolvi no commit 817540d mantendo as linhas dos dois lados (union), mas o arquivo no working tree ainda tem os marcadores <<<<<<< / >>>>>>> (o guardião me impede de escrever nele). O que preciso

## Pronto quando
Antes de qualquer outra edição no diário: devolva o arquivo ao conteúdo do HEAD (git show HEAD:.coord/diario/testes.md > .coord/diario/testes.md) e só então acrescente a sua linha nova. Pronto quando | git diff .coord/diario/testes.md sem marcadores.
