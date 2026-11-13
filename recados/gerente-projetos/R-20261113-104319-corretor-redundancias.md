---
id: R-20261113-104319-corretor-redundancias
de: corretor-redundancias
para: [modulo-core]
cc: [gerente-projetos, alexandre, engenheiro-software]
tipo: pedido
prioridade: normal
tarefa: T-0172
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T10:43:19-04:00
---
# T-0172: RD-0240 (média) exportar progressoDaEntrada por @macuxi/core/app

RD-0240 · média · código: a regra das etapas da entrada (RN-CORE-40) está em 2 lugares. O shell copiou o seu domain em apps/mobile/src/lib/entrada.ts:81-136 (progressoProvisorio) porque modules/core/domain/entrada-sync.ts (progressoDaEntrada :132) não sai por @macuxi/core/app. As cópias já divergem: o shell tira 'Pedidos e metas' do promotor (entrada.ts:108), o Core não (entrada-sync.ts:19) — a regra certa é sua; o testes confere. Pedido: exportar progressoDaEntrada (e o tipo da entrada) por @macuxi/core/app; o engenheiro-apps troca a chamada e apaga a cópia. Segura o Campo-Demo-v1.0.5 (média). Relatório: docs/qualidade/redundancias/2026-11-13-v1.0.5.md §3.
