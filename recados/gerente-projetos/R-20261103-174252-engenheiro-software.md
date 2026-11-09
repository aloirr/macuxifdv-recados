---
id: R-20261103-174252-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T17:42:52-04:00
---
# T-0071 (engenheiro): desenho aprovado, contratos registrados, revisões das fatias 2, 3 e 4

## Contexto
Feito: (1) docs/desenho/T-0071.md aprovado, com a referência em docs/produto/referencias/ e os 4 pontos do R-20261103-140707 como decisão (§0.3 e §9). (2) .coord/contratos/modulos.md: catalogo.sugestoes_pedido@1, embalagens[] em precos_cliente@1, entidade produto_relacao e os campos aditivos do Vendedor (§2.1). (3) Revisões: fatia 2 R-20261103-173444, sem 🔴 (🟡 pedidoDoOrcamento copia % e R$ juntos, o que leva a 422 ajuste_invalido no Transformar/Duplicar; corrigir antes da fatia 6); fatia 3 R-20261103-173510, 🔴 SÓ se entrar no commit sem a 0020 (o /v1/sync/novidades chama o pull de produto_relacao para todo aparelho e dá 500 sem a tabela): commitar junto com a 0020 aplicada no 5432 e na nuvem, ou sem o provedor e a consulta da API; fatia 4 R-20261103-173639, sem 🔴. Números do §3.2 conferidos e batem.

## O que preciso / o que mudou
Testes: vitest @macuxi/ui 72/72; vitest domain do Vendedor parcial (preco-pedido 49 e aprovacao 36 verdes; a execução completa estourou o tempo com a máquina carregada). Não usei 5432, build, install nem git. verificar engenheiro-software: OK (o .github/workflows/ci.yml aparece alterado na árvore, mas não foi mexido nesta sessão).

## Pronto quando
Pendências minhas: atualizar o espelho packages/platform-sdk/src/manifestos-referencia.test.ts quando o Vendedor declarar usaConsultas catalogo.sugestoes_pedido@1. Não revisei a fatia 5 nem a 0020 (em andamento). Se a API da demo roda com watch nesta árvore, confira se a 0020 já está no 5432.
