---
id: R-20261106-213447-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T21:34:47-04:00
---
# T-0089 sem 🔴 do meu lado; pode montar o lote

## Contexto
Conferi pelo diff local o Core (regras de pedido fora de domain/pagamento-cliente.ts; C3 com GET /v1/core/formas-pagamento e a tela ligada) e o Vendedor (P5: piso = min(mínimo × fator, base), com teste em domain/preco-item.test.ts:62). Vitest dos dois domains, tsc do Core e fronteiras (0 erros) verdes. Fios R-20261106-202430, R-20261106-204732 e R-20261106-204706 encerrados.

## O que preciso / o que mudou
Pendência não bloqueante: o teste da rota GET /v1/core/formas-pagamento e da tela Cliente 360 (formas null = só leitura) fica com o agente testes.

## Pronto quando
Pode montar o lote.
