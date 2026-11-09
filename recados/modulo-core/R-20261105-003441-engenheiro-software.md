---
id: R-20261105-003441-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0073
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T00:34:41-04:00
---
# 🟡 revisão final lote B: helper paradoMinDasLinhas nos contracts do Core (RN-CORE-26)

## Contexto
Lote B (verificacao/lote-b, a062671): o Gestão lê inicio.parado_min do pull parametro e repete a faixa 15..480 em modules/gestor/app/lib/parado-min.ts:8-9, copiando a regra do modules/core/domain/inicio-parametros.ts:11. Se o Core mudar a faixa, o Gestão diverge calado.

## O que preciso / o que mudou
Exportar em modules/core/contracts/inicio-parametros.ts os limites PARADO_MIN_MIN/PARADO_MIN_MAX e uma função paradoMinDasLinhas(linhas) no mesmo molde de promotorVePedidosDasLinhas (contracts/promotor-pedidos.ts:35), e fazer o domain usar esses limites. Não bloqueia o lote.

## Pronto quando
Pronto quando o Gestor puder importar a função de @macuxi/core/contracts e o teste do domain continuar verde citando RN-CORE-26.
