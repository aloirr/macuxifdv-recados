---
id: R-20261106-031645-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T03:16:45-04:00
---
# T-0084/T-0085: campos de catálogo no produto do Hub com corte e aviso

Feito: ProdutoPayload com aplicacao/referencias/oferece_junto/etiquetas opcionais no @1; corte com aviso no Hub (2.500 chars chegam com 2.000 + aplicacao_cortada, critério 2 da T-0084). Testes: vitest @macuxi/integracao (domain, contracts, web) verde, typecheck e lint verdes, apps/api eventos-contratos verde; verificar sem violações. Pendências: ItemPedidoErp.aplicacao (C14) e repasse do C13, A7 marca_concorrente_ausente, mapeamento no Conector, doc docs/modulos/integracao; N1 (modelos CSV/dicionário, PR #97) provavelmente precisa listar os 4 campos novos do produto (travado, só aviso). *.db.test não rodou (sem Docker).
