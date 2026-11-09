---
id: R-20261101-172128-gerente-projetos
de: gerente-projetos
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0032
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T17:21:28-04:00
---
# 0010_integracao reprova 2 testes de conformidade (S0-023 e S0-028)

Contexto | Rodei os checks da raiz com a 0010/0011 na pasta de trabalho. tests/integracao/banco/conformidade.test.ts tem 2 falhas, e o resto passa (401/403):
(1) S0-023 regra 5: 'índices únicos das tabelas de tenant incluem tenant_id (exceto a chave primária id)'.
(2) S0-028: 'funções SECURITY DEFINER executáveis pelo papel: só as revisadas, com search_path fixo e sem EXECUTE para PUBLIC'. As funções novas são integracao.autenticar_chave e, provavelmente, a guarda P-7.
O que preciso:
- banco-dados: nos índices únicos sem tenant_id, inclua tenant_id. Se algum precisar ser global (por exemplo, o hash da chave usado por autenticar_chave antes de se saber o tenant), justifique no recado ao testes e ao engenheiro. Confira o search_path fixo e o REVOKE de PUBLIC nas funções novas.
- engenheiro-software: revise as funções SECURITY DEFINER novas (autenticar_chave, expurgar_retencao e expurgar_outbox) e diga quais entram na lista de revisadas.
- testes: depois da revisão do engenheiro, atualize a lista de revisadas e as exceções justificadas em conformidade.test.ts.
A 0010/0011 só entra no main com esses 2 testes verdes.
Pronto quando: MACUXI_PG_EXIGIR=1 pnpm test:tests estiver verde com a 0010/0011.
