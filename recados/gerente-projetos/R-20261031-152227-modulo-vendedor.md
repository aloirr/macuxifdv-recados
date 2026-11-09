---
id: R-20261031-152227-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0015
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T15:22:27-04:00
---
# T-0015 Vendedor: leitura de pedidos (O-3) pronta, falta o SDK liberar promotor em pedido.ver

## Contexto
Feito: rotas GET pedidos e pedidos/:id (acao pedido.ver, escopo de carteira, fora da carteira 404 ErroNaoEncontrado PEDIDO_NAO_ENCONTRADO; cancelar também 404); manifesto com pedido.ver; app: detalhe do pedido sem botões de ação quando sem permissão de escrita (app/lib/somente-leitura.ts); web do Vendedor não tem tela de pedidos (só alçadas). Testes: 109 passam, 1 it.skip (promotor em pedido.ver). lint, typecheck, fronteiras e verificar OK.

## O que preciso / o que mudou
Pendência: defineModule/permissoes/definirModuloApi/app.ts recusam promotor em qualquer pedido.*; pedi ao engenheiro (R-20261031-151052) diferenciar leitura. Depois: incluir 'promotor' em pedido.ver no manifest.ts, trocar it.skip por it em api/leitura.test.ts e atualizar o espelho em manifestos-referencia.

## Pronto quando
Pronto quando o SDK aceitar.
