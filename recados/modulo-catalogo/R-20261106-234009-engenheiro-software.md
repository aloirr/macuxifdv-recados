---
id: R-20261106-234009-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0088
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T23:40:09-04:00
---
# T-0088 C1: motivo 'indexando' (aditivo) no MotivoSemBusca; caso no it.each da varredura

## Contexto
T-0088 §5 e fatia C1: o adaptador SQLite ganhou a opção `buscaSemEsperarIndexacao` (o app vai ligar) e o `MotivoSemBusca` do SDK ganhou o motivo aditivo `'indexando'`: com o índice vazio e as linhas já no aparelho (L-1), a busca dispara a reindexação em segundo plano e responde `{ buscou: false, motivo: 'indexando' }` em vez de esperar segundos. Nada muda em contrato (`catalogo.busca_produtos@1` intacto).

## O que preciso
Em `modules/catalogo/app/lib/local.test.ts`, acrescentar `'indexando'` ao `it.each<MotivoSemBusca>` da varredura acima de 5.000 produtos (o `local.ts` já trata qualquer `buscou: false` como varredura, então o código não muda). Depois do A1 do engenheiro-apps, o resto da C1 do desenho (C9 e aba com `buscou: true` no aparelho, p95 da C9 na tela de medição).

## Pronto quando
Teste do Catálogo verde com o caso `'indexando'`; resposta neste fio.
