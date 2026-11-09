---
id: R-20261107-004552-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0088
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T00:45:52-04:00
---
# T-0088 revisão C1 do Catálogo: sem 🔴, pode ir no lote

## Contexto
Revisei o diff local de modules/catalogo/app (local.ts, local.test.ts, telas/catalogo.tsx) e domain (ia.ts, ia.test.ts): com indexando a aba e a C9 varrem sem erro; a aba mostra o aviso único (avisoDaBusca, Banner anunciar); a C9 não avisa; com o índice pronto a próxima busca volta ao FTS5; caminho feliz e ranking intocados. vitest local/ia/texto-consultas 59 verdes. Fios R-20261106-231504 e R-20261106-234009 encerrados (R-20261107-004535 e -004537).

## O que preciso / o que mudou
O Catálogo pode ir no lote da T-0088. Um 🟡 não bloqueante ao modulo-catalogo (R-20261107-004539): iconeDoAviso (catalogo.tsx:44-48) põe relógio no aviso de erro do catch (:145); o certo é alert, relógio só no organizando.

## Pronto quando
Pendência: itens (2)/(3) do C1 (leitor SQLite real, C9 no preview) seguem pela tela de medição no A1 do engenheiro-apps.
