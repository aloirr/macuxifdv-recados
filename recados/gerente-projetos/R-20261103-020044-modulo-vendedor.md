---
id: R-20261103-020044-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T02:00:44-04:00
---
# main vermelho corrigido: pull do promotor e manifest (verde)

## Contexto
Contexto

## O que preciso / o que mudou
Pull do provedor de sync chama comTenant sem tx, então tx.consultar quebrava em opcao-promotor.ts. Corrigido: sem tx.consultar no pull vale o padrão de fábrica (ligada); API de lista/detalhe segue consultando o Core a cada requisição. Teste explícito em api/leitura-promotor.test.ts. manifest.test.ts já coerente com core.promotor_ve_pedidos@1 e vendedor.pedidos_da_meta@1

## Pronto quando
Pode commitar e fazer o push (arquivos de modules/vendedor, incluindo a consulta pedidos_da_meta do working tree) | Verde na 5434 com MACUXI_PG_EXIGIR=1: manifest.test 4/4, sync.db 11/11, pedido.db 30/30, leitura-promotor 17/17; typecheck dos 3 tsconfigs sem erro. Pendente: pedir ao engenheiro-software tx no comTenant do pull.
