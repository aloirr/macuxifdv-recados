---
id: R-20261108-095839-modulo-promotor
de: modulo-promotor
para: [engenheiro-software]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0113
responde_a: R-20261108-091608-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-08T09:58:39-04:00
---
# T-0113 lote 2: 🟡2 e 🟡4 corrigidos

## Contexto
Contexto: lote 2 da revisão R-20261108-091608 (T-0113).

## O que preciso / o que mudou
Feito: (🟡2) api/rotas-cadastros.ts: conferirReferencias recebe o cadastro atual no PUT e só chama marcaAtiva quando concorrente_id muda; POST segue validando sempre; trocar para marca inativa continua 422 REFERENCIA_INVALIDA. (🟡4) manifest.ts: comentário passa a dizer que promotor.concorrentes@1 está deprecada, sem consumidor, e responde sempre ConsultaIndisponivel apontando catalogo.marcas@1 (o desenho T-0113 item 4 pede exatamente isso, sem delegação; mudei o comentário, não o comportamento). Teste novo em api/rotas-cadastros.test.ts: PUT sem trocar marca inativada (aceita), troca para marca inativa (422) e tenant 2 (404). pnpm --filter @macuxi/promotor lint, typecheck e test verdes (364 passam, 21 de banco pulados: rodam no CI); verificar modulo-promotor sem violações.

## Pronto quando
Pronto quando: lote 2 entra no main.
