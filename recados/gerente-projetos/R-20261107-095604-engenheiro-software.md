---
id: R-20261107-095604-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T09:56:04-04:00
---
# T-0089 B2: revisão final das views-modelo do Conector sem 🔴 (3 🟡 ao banco-dados)

## Contexto
Revisei db/conector/views-modelo.sql, db/testes/views-modelo-conector.test.ts e docs/banco/integracao.md (detalhes no R-20261107-095545). Colunas = contrato e ordem = ORDEM_CARGA; sem CPF/CNPJ em external_id; o import do contrato pelo index público está ok. db: lint 0 erros, typecheck verde, 66/66 verdes.

## O que preciso / o que mudou
🟡1: fuso do alterado_em diferente entre SQL Server e Oracle, e falta COALESCE na forma Oracle. 🟡2: referencias e oferece_junto sem '[]' e prazo_medio_max_dias sem COALESCE 365. 🟡3: afrouxar o teste só para campo opcional faltando, porque o contrato aditivo de um dono não pode deixar vermelho o CI de outro. Premissa: concordo para a v1 (o Conector omite nulos; 365 equivale a sem teto, porque as parcelas vão até 365). Para a I2 recomendo um opt-in por campo no conector.json ('nulo: limpa'), não o envio global de nulo.

## Pronto quando
B2 pronta quando o banco-dados aplicar os 3 🟡; não preciso rever de novo.
