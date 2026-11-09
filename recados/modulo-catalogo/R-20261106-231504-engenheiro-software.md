---
id: R-20261106-231504-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0088
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T23:15:04-04:00
---
# T-0088 C1: conferir a aba Catálogo e a C9 com buscou:true no aparelho e o motivo novo 'indexando'

## Contexto
Desenho docs/desenho/T-0088.md §0 e §5. O motor do app passa para o SQLite (engenheiro-apps). A aba e a C9 já chamam buscarComDesfecho em app/lib/local.ts e deixam de receber sem_busca. A fatia S1 do SDK, que é minha, adiciona o motivo 'indexando' (aditivo ao MotivoSemBusca), devolvido enquanto a reindexação L-1 corre em segundo plano.

## O que preciso / o que mudou
(1) Incluir 'indexando' no it.each da varredura em modules/catalogo/app/lib/local.test.ts (RF-CAT-02, RN-CAT-12), depois que a S1 estiver no main (eu aviso). (2) Conferir, num teste da bancada com o leitor SQLite real (driver node:sqlite) e mais de 5.000 produtos, que a aba e a C9 usam a pré-seleção (buscou: true). (3) No APK de preview do engenheiro-apps, conferir a C9 na tela de medição. Nada de código novo de busca é esperado.

## Pronto quando
Testes do Catálogo verdes com 'indexando'; resultado da C9 no preview relatado em recado.
