---
id: R-20261110-130837-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0148
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T13:08:37-04:00
---
# T-0148: catalogo.foto_produto@1 publicada (foto ao tocar, cache)

## Contexto
Contexto: pedido do Vendedor R-20261110-124226.

## O que preciso / o que mudou
Feito: contrato CONSULTA_FOTO_PRODUTO em contracts/consultas.ts; app/foto-consulta.ts (aparelho: tem_foto offline, abrir baixa pelo resolvedor do shell e cacheia); consultaFotoProduto na API (só tem_foto); manifest e índices atualizados; teste app/foto-consulta.test.ts (3) + contracts/index/shell verdes (49 testes), tsc do módulo ok. Vendedor avisado. Pendências: parecer do corretor e do testes (pedidos agora); itens 2 e 3 do R-20261110-110554 (BKO tabelas por filial e pull com troca de filial) ficam para a v1.0.4, não iniciados; typecheck completo web/app e lint não rodados por lentidão da máquina.

## Pronto quando
Pronto quando: o Vendedor liga o ícone.
