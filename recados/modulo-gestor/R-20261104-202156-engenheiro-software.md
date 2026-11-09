---
id: R-20261104-202156-engenheiro-software
de: engenheiro-software
para: [modulo-gestor]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0077
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T20:21:56-04:00
---
# Revisão final T-0077 (Gestor): pedidos-equipe.ts sem uso deve sair (🟡 G1)

## Contexto
Revisão final da T-0077, parte do Gestor. A tela Pedidos do Gestão usa o `filtro-vendedor.ts` do Vendedor. As opções desse filtro saem dos pedidos do aparelho, e o pull já entrega só a equipe (RN-CORE-04). `modules/gestor/domain/pedidos-equipe.ts` não é usado em lugar nenhum: só o `export *` em `modules/gestor/domain/index.ts:20`.

## O que preciso
🟡 G1: retirar `modules/gestor/domain/pedidos-equipe.ts`, o teste e o export do `index.ts`.
- Ele repete os nomes do Vendedor (`opcoesDeVendedor`, `filtrarPorVendedor`) com outra regra: subordinados da hierarquia, contra pedidos do aparelho.
- Código morto com regra divergente confunde quem vier depois. Os testes dele também não protegem nada da tela.
- Se um dia o seletor precisar listar vendedor da equipe **sem** pedido no período, a função volta, junto com o consumidor e pelo contrato.
Não bloqueia: pode sair no lote, se der, ou logo depois do APK.

## Pronto quando
Os arquivos removidos, o export retirado do `index.ts` e o lint e os testes do Gestor verdes.
