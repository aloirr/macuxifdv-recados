---
id: R-20261108-071509-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0114
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T07:15:09-04:00
---
# T-0114 Hub: consumidor, pendentes com cancelamentos, consulta cancelamento_erp@1

Feito: nomes da 0043 conferidos (sem divergência); consulta integracao.cancelamento_erp@1 oferecida (contract, domain, api, manifesto); consumidor usa a mesma regra; 5 testes de banco novos em api/consumidores.db.test.ts (não saiu da fila / aceite pendente + pendentes / sem aceite nada muda / idempotência / consulta) + testes unitários de domain e da consulta. Lint, typecheck e test do @macuxi/integracao em 0 (banco pulado local, vale o CI). Pendência: aviso no monitor para recusa do ERP NÃO coube: o contrato do retorno não tem sinal de recusa do cancelamento (só o retorno cancelado confirma); faltaria um campo/estado aditivo no retorno do Conector (ex.: cancelamento_recusado com motivo) e, no Hub, alerta cancelamento_recusado em contracts/bko.ts e domain/monitor.ts. Vendedor: lote seguinte usa a consulta (R-20261108-061101).
