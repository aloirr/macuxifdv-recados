---
id: R-20261105-164800-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0052
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T16:48:00-04:00
---
# Caixa do Catálogo: 6 encerrados, 2 feitos, 1 para o backlog

## Contexto
Contexto

## O que preciso / o que mudou
Encerrados (6): R-194900 (#50, 90201b6/6842aef), R-173510 (0020 abc6d1e), R-183000 (e204398), Lote M R-140444 (126a631), Lote M2 R-150655 (8ce8733), R-232350-2 (feito agora). Feitos (2): tabela_preco_nome opcional em catalogo.precos_cliente@1 (contracts/consultas.ts, domain/precos-cliente.ts, api/consultas.ts, app/consultas.ts + testes) e o X do campo de busca (catalogo.tsx:188) voltando a vitrine na hora, igual ao botão do vazio (🟡 do designer-ux R-160703). Backlog (1): R-151845 buscarComDesfecho/LIMIAR_SEM_ACERTO_VAZIO=5000 em app/lib/local.ts, no lote N após a revisão.

## Pronto quando
Testes: vitest do módulo 486 verdes (o único vermelho era consultas.test.ts, ajustado), eslint e 3 tsc limpos. Não rodei db.test. Sem commit. | Pronto quando: gerente leva ao commit e registra o item do backlog.
