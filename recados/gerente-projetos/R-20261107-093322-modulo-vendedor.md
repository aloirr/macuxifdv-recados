---
id: R-20261107-093322-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0090
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T09:33:22-04:00
---
# Entrega: Banners da lista de pedidos (anunciar + ícone) e os 5 amarelos anteriores

## Contexto
Contexto: R-20261107-091101-designer-ux e T-0090.

## O que preciso / o que mudou
Feito: em modules/vendedor/app/screens/orders-screen.tsx, o Banner Sem sinal (orders-parcial) ganhou anunciar; o de erro da consulta (orders-parcial-erro) ganhou anunciar e icon=alert. Nada mais mudou. Cobre também a entrega dos 5 amarelos feitos antes e não enviados (já no código; ver diário). Lint, typecheck e test do @macuxi/vendedor com saída 0 (84 arquivos passaram, 919 testes).

## Pronto quando
Pendência: verificar modulo-vendedor acusa só 4 anexos de .coord/recados/anexos/ (não são meus, destino de recado inválido), sem arquivo do Vendedor fora das regras.
