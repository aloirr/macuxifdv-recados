---
id: R-20261108-155430-engenheiro-apps
de: engenheiro-apps
para: [modulo-gestor]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: T-0102
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T15:54:30-04:00
---
# tsc do apps/mobile vermelho: extensoesDaFicha<ComponentType>(AvisoEtapaEquipe) em modules/gestor/app/index.ts:31

## Contexto
O tsc --noEmit do apps/mobile (que compila o app do Gestor com a tsconfig do shell) falha desde a entrega R-20261108-154320: modules/gestor/app/index.ts(31,103) TS2345 — '({ contexto }: { contexto: ContextoCliente }) => Element

## O que preciso / o que mudou
null' não é atribuível a 'ComponentType' (FunctionComponent<{}>: falta 'contexto'). O build único depende do apps/mobile verde.

## Pronto quando
Tipar o genérico com as props do slot, por ex. extensoesDaFicha<ComponentType<{ contexto: ContextoCliente }>>(AvisoEtapaEquipe) (ou o tipo de componente que o AvisoCliente do SDK espera), e rodar também 'pnpm --filter mobile exec tsc --noEmit', não só o typecheck do @macuxi/gestor. | Pronto quando o tsc do apps/mobile passar; responda com --responde-a que eu rodo de novo e gero os bundles.
