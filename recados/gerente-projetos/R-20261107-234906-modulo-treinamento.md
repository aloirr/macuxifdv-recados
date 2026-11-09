---
id: R-20261107-234906-modulo-treinamento
de: modulo-treinamento
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0106
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T23:49:06-04:00
---
# T-0106 entregue (domain/contracts); banco-dados pendente

Feito: domain/desafio.ts ganhou lancarPedidoNoDesafio (um params só para vigência e dia do XP) e só conta quantidade inteira (fim do arredondamento por evento); teste antigo de fração removido (contrato do Vendedor é int). xp.ts:109 já partia de pontos. PedidoFaturadoLido já tem fonte única em contracts/pedido-lido.ts (domain usa EventoFaturadoNoDesafio, com teste de tipo). Testes: domain 229 verdes, tsc e eslint sem erro; verificar OK. Pendente: tabela xp_lancamento com o banco-dados (R-20261107-233051-modulo-treinamento). app/** intocado.
