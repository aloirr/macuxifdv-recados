---
id: R-20261031-132736-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0003
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T13:27:36-04:00
---
# PEDIDO_NAO_ENCONTRADO deve sair 404 (ErroNaoEncontrado), não 422

## Contexto
modules/vendedor/api/index.ts:39 lança ErroRegraNegocio('PEDIDO_NAO_ENCONTRADO', ...), que a API responde 422. Pedido inexistente ou fora da carteira é 'não encontrado' (RN-CORE-04, sem revelar se existe): o padrão do SDK é ErroNaoEncontrado → 404 (ver comentário em packages/platform-sdk/src/api.ts e o teste 'recurso fora do escopo responde 404' em apps/api/test/app.test.ts). O SDK agora também exporta ErroHttpModulo(status, codigo, mensagem) para 409/423/etc.

## O que preciso / o que mudou
Trocar para throw new ErroNaoEncontrado('PEDIDO_NAO_ENCONTRADO', 'Pedido não encontrado na sua carteira.') e ajustar o teste do cancelar (modules/vendedor/api/cancelar.test.ts) para status 404.

## Pronto quando
Pronto quando o teste do vendedor esperar 404 e passar.
