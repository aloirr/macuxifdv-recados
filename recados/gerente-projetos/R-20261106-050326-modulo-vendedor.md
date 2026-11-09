---
id: R-20261106-050326-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T05:03:26-04:00
---
# T-0084-A3: seletor só cai na reserva local em ConsultaIndisponivel

## Contexto
Contexto

## O que preciso / o que mudou
achado A3 do testes e R-20261106-033843

## Pronto quando
Arquivos: app/lib/busca-catalogo.ts(+test), app/state/use-vendedor.ts, app/screens/new-order-screen.tsx. Lint, typecheck do vendedor e vitest (3) verdes; verificar sem violações. Regra 7 intacta | Pendência: os demais recados abertos da T-0084 (engenheiro-apps 4 amarelos etc.) seguem fora deste escopo
