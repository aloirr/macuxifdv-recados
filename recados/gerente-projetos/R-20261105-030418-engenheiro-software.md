---
id: R-20261105-030418-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0039
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T03:04:18-04:00
---
# Revisão final lote C (condição 4): 0026 🟢, parte pura 🟡1, D-T0080a 🟢, regra do Descartar no desenho

## Contexto
Revisão só de leitura do working tree (sem rodar suítes).

## O que preciso / o que mudou
1) 0026 (banco-dados) 🟢 entra: bate com o desenho T-0039 §2.2 (situacao com 'pendente', rotulo/pendente_desde/resolvida_em/alertada_em com CHECKs de coerência, etapas_pendentes >= 0, 2 índices parciais), aditiva, idempotente, RLS/grants e FK inalterados, down simétrico. NÃO muda comportamento: o pull da visita (modules/core/api/sync.ts:139-143) e a lista do BKO (rotas.ts:385) usam lista de colunas explícita, o upsert do checkout (visita-push.ts:229) não toca as colunas novas, o CHECK só alarga e o padrão é 0. Condição: a parte com banco de db/testes/visita-etapa-pendente.test.ts só roda no CI — tem de estar verde lá. 🟢 opcional: add constraint ... not valid + validate. 2) Parte pura (modulo-core) 🟡: regra, baixa com reconsulta, alerta e textos por destinatário corretos e iguais a docs/design/checkout-pendencia.md §1.3/§2.1; 🟡1 tipos/constante duplicados de contracts em checkout-tolerancia.ts:8, :14, :43, :77-78, :82 (recado R-20261105-030356 ao modulo-core). Não bloqueia o lote se você aceitar corrigir antes do commit; é troca mecânica. Notas para a ligação no mesmo recado (upsert que rebaixaria 'concluida', etapas_pendentes no pull/VisitaSyncSchema, parâmetro no schema). 3) D-T0080a (inicio.ts) 🟢 entregue: integracaoNoTenant lido de plataforma.tenant_modulo (RLS force + isolamento_tenant da 0001; mesmo critério de licencas.ts:25), notas só com Vendedor desligado, nunca soma com o read-model; testes novos em inicio.test.ts (perfil sem 'integracao' liga a fonte). 🟢: a consulta da licença roda em todo /inicio mesmo com o Vendedor ligado — barata pelo único; pode ficar. O testes troca o it.fails do P-03 quando confirmar. 4) Descartar: proposta em docs/desenho/T-0039.md §2.5a — dispensa manual no BKO (supervisor da equipe/admin, justificativa, ação visita.dispensar_etapa, auditoria, sem migração nova: os CHECKs da 0026 já aceitam), o alerta é o gatilho, e confirmação genérica no Descartar do shell. Precisa de você aprovar e de complemento da RN-CORE-12 no doc 03 na ligação.

## Pronto quando
Pronto quando: você decide se o 🟡1 entra antes do commit do lote C (recomendo sim) e aprova o §2.5a para a ligação.
