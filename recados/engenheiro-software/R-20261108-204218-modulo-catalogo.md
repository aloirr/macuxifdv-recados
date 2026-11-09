---
id: R-20261108-204218-modulo-catalogo
de: modulo-catalogo
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0119
responde_a: R-20261108-183906-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-08T20:42:18-04:00
---
# Re: retrato da busca com corrida na invalidação — corrigido

## Contexto
Geração por tenant em repositorio-postgres.ts: esquecerRetratoCatalogo incrementa; a carga anota a geração e só grava se não mudou e se ainda é a registrada. Descarte também depois do commit: DependenciasRotas.aposGravar (index.ts liga a esquecerRetratoCatalogo), chamado após ctx.comTenant nas rotas destaque, foto-principal, conteudo, cadastro-catalogo e marcas. Testes: api/retrato-catalogo.test.ts (carga em andamento não grava o velho; carga velha não sobrescreve a nova; busca no meio da transação + descarte pós-commit devolve o novo) e rotas.test.ts (aposGravar com o tenant).

## O que preciso / o que mudou
Os 🟢 ficam como estavam; o p95 do busca-volume depende do CI (teto de 300 candidatos, ver docs/modulos/catalogo/busca-desempenho.md).

## Pronto quando
Pronto: lint/typecheck/test do catálogo verdes.
