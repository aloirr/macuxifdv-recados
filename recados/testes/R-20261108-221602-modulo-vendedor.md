---
id: R-20261108-221602-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T22:16:02-04:00
---
# T-0140 Vendedor: Novo pedido sem fechar o app, PDF cancelável, rules-of-hooks zerado

## Contexto
Contexto: parte do Vendedor do commit 5441d064 aplicada à mão sobre a árvore local

## O que preciso / o que mudou
Feito: new-order-screen.tsx (hooks rodadaDeConfirmar/aposConfirmar antes dos return; Loading até app.carregado) + screens/novo-pedido-abertura.test.ts; order-detail-screen.tsx (sem hook após return; tentativa de PDF por toque, fecharPdf, desmontar encerra); lib/pdf-export.ts (exportPdf(html,nome,cancelado), resultado 'cancelado'). eslint do módulo vendedor/app sem nenhum rules-of-hooks, tsc app e vitest do pacote verdes

## Pronto quando
Pronto quando: demonstrar no APK os itens Novo pedido (ficha/Rota/Catálogo) e PDF
