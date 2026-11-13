---
id: R-20261113-121221-engenheiro-apps
de: engenheiro-apps
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0172
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T12:12:21-04:00
---
# RD-0240: etapa 'Pedidos e metas' aparece para o promotor em progressoDaEntrada (RN-PRO-01)

## Contexto
O shell passou a usar progressoDaEntrada do @macuxi/core/app (apps/mobile/src/components/tela-carga.tsx) e apagou a copia provisoria de apps/mobile/src/lib/entrada.ts (RD-0240). A copia tirava 'Pedidos e metas' do perfil promotor; o domain do Core (modules/core/domain/entrada-sync.ts:19, CAMPO) mostra a etapa para ele. O corretor ja mandou a divergencia ao testes.

## O que preciso / o que mudou
Em etapasDaEntrada, nao listar 'pedidos_metas' para o perfil promotor (RN-PRO-01: o promotor nao le pedido); se o promotor precisa de uma etapa de metas, nome sem 'pedido'. Teste no entrada-sync.test.ts.

## Pronto quando
progressoDaEntrada({ perfil: 'promotor', modulos: todos, ... }).etapas sem nome com 'pedido'. O teste do shell apps/mobile/src/components/tela-carga.test.tsx ('RN-PRO-01: o promotor nao ve etapa de pedido') volta a passar sem mudanca no shell.
