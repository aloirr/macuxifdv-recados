---
id: R-20261105-060422-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0082
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T06:04:22-04:00
---
# T-0082: migração core.plano_rv (plano de RV por tenant, regras em jsonb, RLS)

## Contexto
T-0082 (Plano de RV no BKO). Desenho: docs/desenho/T-0082.md §5. O motor de RV já existe no domain do Core (modules/core/domain/incentive.ts); falta onde guardar o plano. Regras propostas RN-CORE-29 (cálculo) e RN-CORE-30 (plano e vigência), ainda indo ao doc 03 pelo gerente.

## O que preciso
Migração aditiva (número seguinte ao último do main; no desenho chamei de 0028, use o que estiver livre) criando `core.plano_rv`:
- colunas da regra 5 + `nome text not null`, `vigencia_inicio text not null` (check `^[0-9]{4}-(0[1-9]|1[0-2])$`, como core.meta), `perfis text[] not null` (não vazio, elementos em vendedor/promotor), `valor_maximo_cents bigint not null check > 0`, `regras jsonb not null` (check `jsonb_typeof(regras) = 'array'`; o formato das faixas é validado no domain/API), `atualizado_por uuid null` com FK composta (tenant_id, atualizado_por) → core.usuario;
- índice único `(tenant_id, vigencia_inicio) where deleted_at is null`; índice `(tenant_id, updated_at, id)`; `external_id` único por tenant como nas outras; trigger updated_at; RLS enable + force + `isolamento_tenant`; grants select/insert/update/delete ao macuxi_app;
- fora de TABELAS_SYNC (sem sync para o aparelho nesta tarefa); down apaga a tabela; dicionário em docs/banco/core.md.
- Seed da demo (opcional, bom para a demo): 1 plano vigente desde o mês corrente do seed com venda_cents 50% (faixas 0:zero, 80:proporcional, 100:fixo 100, 110:fixo 120), positivacao 30%, visitas 20% e cobertura_pct como gatilho; valor máximo R$ 2.000,00.

## Pronto quando
Migração up/down no main com conformidade (S0-023/B1) verde no CI e o recado de resposta ao modulo-core e a mim dizendo o número da migração. Ordem: este passo vem antes da implementação do modulo-core (T-0082 passo 3).
