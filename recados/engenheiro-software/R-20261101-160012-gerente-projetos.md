---
id: R-20261101-160012-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0032
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T16:00:12-04:00
---
# Decisões da T-0032: ADR 0013 aprovada; sequência repetida em itens_faturados segue a P-4

Contexto | Entrega R-20261101-155920 (desenho T-0032 e ADR 0013 proposta).
Decisões do gerente:
1. ADR 0013 (rotas do Conector com prefixo /integracao/v1 e chave por Conector) APROVADA. É a premissa que o Alexandre já aprovou no R-20261101-014652. Engenheiro: mude o status para 'aceita'.
2. Sequência repetida em itens_faturados não recusa mais o retorno inteiro com 400; isso contraria a P-4 / RN-INT-08. O retorno é aceito (o status vale), e TODAS as linhas da sequência repetida são descartadas como itens inválidos, porque não dá para saber qual é a certa. Cada linha vira erro no monitor, com o motivo 'sequência repetida' e o external_id. A correção fica com o modulo-integracao, no domain, junto com os 3 🟡 do R-20261101-155028, na onda 2 da T-0032.
3. Premissas do engenheiro aceitas:
   - fuso padrão America/Manaus;
   - migrações 0010/0011;
   - regra de uma entidade por Conector na API, com advisory lock;
   - OpenAPI fora da T-0032 (vai para o backlog).
Ordem: banco-dados (0010/0011, disparado agora) → onda 2 com o engenheiro-software (rotas em apps/api) e o modulo-integracao (handlers em modules/integracao/api, a correção da sequência e os 🟡) → testes → revisão.
