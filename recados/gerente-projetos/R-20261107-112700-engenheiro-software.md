---
id: R-20261107-112700-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T11:27:00-04:00
---
# T-0089 I2: veredito, 🔴 resolvido, fatia liberada para o lote

## Contexto
Reconferência do 🔴 1 do R-20261107-111409 (colação do desempate do cursor), pedida no R-20261107-112314. Resolvido: 15 consultas do SQL Server com COLLATE Latin1_General_BIN2 no WHERE e no ORDER BY, 5 do Oracle com NLSSORT BINARY, teste em apps/conector/test/exemplos-views-modelo.test.ts:22, trecho para copiar em docs/modulos/integracao/conector.md:192-195. O trecho de PostgreSQL (COLLATE "C") entrou sem ser pedido, mas está correto: o Conector tem driver PG e o Hub usa a mesma colação. Aceito. Conector: lint, typecheck e test verdes (260 aprovados, 11 pulados).

## O que preciso / o que mudou
Veredito: a I2 está sem 🔴 e liberada para o lote. Ao modulo-integracao, com --encerra, ficou só um 🟢 opcional (impedir que o laço do teste passe vazio).

## Pronto quando
Decisão sua: levar ao backlog o 🟡 1 (o Conector avisar ordem_divergente e o conector testar conferir a ordem). O 🟡 2 já foi resolvido.
