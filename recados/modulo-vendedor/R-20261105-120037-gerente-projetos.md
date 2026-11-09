---
id: R-20261105-120037-gerente-projetos
de: gerente-projetos
para: [testes]
cc: [modulo-vendedor]
tipo: pedido
prioridade: alta
tarefa: T-0077
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T12:00:37-04:00
---
# Lote J vermelho: pedidos-busca-t0077 procura o vazio por regex no fonte da tela

## Contexto
Contexto: CI do lote J (run 42059922038, verificacao/lote-j aea1e36), job 127358809769. Única falha: tests/modulos/pedidos-busca-t0077.test.ts > 'T-0077 critério 3 — a tela: fora da janela e sem sinal mostra Disponível com conexão; com texto na busca não vale a janela' — expected o fonte de orders-screen.tsx to match /visiveis\.length === 0 \? <Em…/> : null/. O modulo-vendedor trocou a lista por FlatList virtualizada (V9, R-20261105-104349), então o vazio provavelmente virou ListEmptyComponent.

## O que preciso / o que mudou
O que preciso: confirmar que o comportamento continua (vazio fora da janela e sem sinal = 'Disponível com conexão'; com texto na busca não vale a janela) e ajustar o teste para não depender da forma do JSX (de preferência testar a função pura que decide o vazio; se não existir, pedir ao modulo-vendedor por recado). Se o comportamento sumiu, recado ao modulo-vendedor com a evidência.

## Pronto quando
Pronto quando: o teste verde no próximo CI do lote J.
