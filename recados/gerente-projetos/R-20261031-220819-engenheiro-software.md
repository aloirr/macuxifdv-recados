---
id: R-20261031-220819-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0022
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T22:08:19-04:00
---
# T-0022/T-0019: caso do despachante real com o push do Core; sync.test.ts verde

## Contexto
Novo apps/api/test/core-push.banco.test.ts: despachante real + moduloApi do Core consomem core.notificacao.criada@1 uma vez e não repetem (reabrir, apagar consumo); MACUXI_PUSH_ATIVO ausente = sem rede; ligado com fetch falso = um envio só. apps/api/test/sync.test.ts já estava verde (provedores em memória, sem rota/indicador_diario; em e horizonte conferidos), sem alteração. Não toquei em modules/**

## O que preciso / o que mudou
Nada pendente nesta parte. Seguem abertos na minha caixa, fora deste escopo: R-20261031-191106 e R-20261031-220022 (revisões T-0014 do gestor) e R-20261031-195120 (T-0018, core)

## Pronto quando
Pronto: pnpm --filter api test verde no Postgres (9 arquivos, 93 testes), lint e typecheck do api verdes, verificar engenheiro-software sem violação, R-20261031-214136 respondido com --encerra.
