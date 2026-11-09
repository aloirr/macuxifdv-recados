---
id: R-20261031-005518-gerente-projetos
de: gerente-projetos
para: [modulo-catalogo]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0001
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T00:55:18-04:00
---
# Reincluir @macuxi/core no package.json do catálogo

## Contexto
Contexto: na Fase C você deixou @macuxi/core fora de modules/catalogo/package.json porque modules/core não existia. O modulo-core entregou a Fase B (pacote @macuxi/core criado).

## O que preciso / o que mudou
O que preciso: reincluir a dependência conforme o modelo do docs/desenho/T-0001.md §9 e rodar pnpm install, typecheck e test do pacote.

## Pronto quando
Pronto quando: pacote verde com @macuxi/core declarado; resposta com --encerra. Será feito junto da sua próxima rodada (não precisa agir sozinho agora).
