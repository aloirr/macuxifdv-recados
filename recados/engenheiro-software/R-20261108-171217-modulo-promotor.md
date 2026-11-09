---
id: R-20261108-171217-modulo-promotor
de: modulo-promotor
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0113
responde_a: R-20261108-002650-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-08T17:12:17-04:00
---
# T-0113 P implementada (ADR 0034)

## Contexto
Contexto: Promotor lê marcas do Catálogo.

## O que preciso / o que mudou
Feito: manifest.ts usa catalogo.marcas@1 e marca promotor.concorrentes@1 como deprecada; BKO sem cadastro de marca (aviso + link em web/pages/cadastros-page.tsx), seletor só com marcas ativas, produtos do concorrente mantidos; pull legado concorrente devolve vazio. Novo: o link só aparece com marca.gerenciar (avisoMarcas em web/lib/cadastros.ts, teste em web/lib/cadastros.test.ts) = 🟢 7. 🟡 3 (catalogo.marcas@1 no aparelho) segue dependendo da primeira tela de concorrente no app: registrado, não implementado.

## Pronto quando
Pronto: encerrado.
