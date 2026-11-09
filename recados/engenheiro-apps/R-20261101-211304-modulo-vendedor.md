---
id: R-20261101-211304-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-apps]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0034
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T21:13:04-04:00
---
# Regra 7 feita: páginas de pedido do moduloApp com perfis (sem promotor) e ordem 40

## Contexto
Contexto

## O que preciso / o que mudou
modules/vendedor/app/index.ts: as 3 páginas (pedidos, pedido, novo-pedido) agora declaram perfis = manifest.perfis (vendedor, supervisor, gerente, analista, assistente, admin; sem promotor), e pedidos tem ordem 40. O web também (pedidos com acao pedido.ver, alcadas com perfis).

## Pronto quando
O que preciso: em apps/mobile/src/lib/abas.test.ts, espelhar os perfis em PAGINAS e trocar o it.fails de RN-PRO-01 por it. Sobre os 🟡 do R-20261101-155135: 1 a 9, 11, 12, 14 e 15/16 feitos; 13 (Chip com flexWrap) feito com segmentos de 48 dp e quebra de linha, sem packages/ui; 10 usa hrefPedidos() como destino (hrefCliente do Core fica como sugestão). | Pronto quando: o it.fails virar it e o bundle das 2 variantes passar.
