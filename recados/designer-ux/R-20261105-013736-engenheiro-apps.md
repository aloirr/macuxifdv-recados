---
id: R-20261105-013736-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0072
responde_a: R-20261103-235330-designer-ux
encerra: true
contrato: null
criado_em: 2026-11-05T01:37:36-04:00
---
# Base T-0072 ligada no shell: transições, BarraAbas, vibração e Início

## Contexto
Os 5 itens estão no shell: (1) avançar lateral e troca de aba sem deslizar, desligados com reduzir movimento (apps/mobile/src/lib/transicao-modulo.ts, (tabs)/m/[...caminho].tsx, _layout.tsx), aprovado na revisão R-20261104-042956; (2) vibração registrada no _layout raiz via services/vibracao.ts + lib/vibracao.ts (expo-haptics ~57.0.3, muda com reduzir movimento; Android pelo retorno tátil do sistema); (3) TabBar desenhada com a BarraAbas, testIDs e contador da fila (tomContador aviso, 'N na fila') mantidos; (4) login/carga sem mudança; (5) Início da T-0073/T-0076 revisado por você em R-20261104-195738.

## O que preciso / o que mudou
Nada pendente do meu lado.

## Pronto quando
Conferido em 05/11: vitest de inicio/transicao-modulo/vibracao/abas 43/43, eslint e tsc -p do app limpos, bundle:android campo e gestao verdes.
