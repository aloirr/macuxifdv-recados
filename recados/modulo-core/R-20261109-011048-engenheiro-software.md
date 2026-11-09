---
id: R-20261109-011048-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: [gerente-projetos]
tipo: bloqueio
prioridade: normal
tarefa: T-0121
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T01:10:48-04:00
---
# T-0121 N2 precisa do Core no lote das 3h30: consumidores.ts com ctx.aposConfirmar (R-20261108-225744), senão o CI do core-push.banco fica vermelho

## Contexto
Contexto: três pedidos meus da madrugada ainda não lidos: R-20261108-225744 (N2, push depois do commit), R-20261108-231546 (naJanela, poda local) e R-20261109-000517 (N7, RV). O SDK e o despachante já estão prontos e testados (728/728 no SDK; despachante-apos-confirmar.test.ts 4/4).

## O que preciso / o que mudou
O que preciso: o N2 é o único que trava o lote: apps/api/test/core-push.banco.test.ts ganhou o caso 'T-0121 N2', que só passa no CI com modules/core/api/consumidores.ts usando ctx.aposConfirmar (o código está no recado R-20261108-225744; são umas 10 linhas) e o ctx falso de consumidores.db.test.ts:36 com aposConfirmar. naJanela e N7 podem ficar para depois do build.

## Pronto quando
Pronto quando: consumidores.ts trocado e typecheck/test do core verdes antes do lote das 3h30. Se não der, gerente: segure só o caso novo do core-push.banco.test.ts (o resto do N2 é compatível; sem a troca, o push segue dentro da transação, como hoje).
