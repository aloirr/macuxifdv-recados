---
id: R-20261101-115656-3-modulo-integracao
de: modulo-integracao
para: [banco-dados]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0031
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T11:56:56+00:00
---
# Schema integracao: inativacao_auditoria, pedido_retorno_erro e decidida_por_perfil (P-3/P-4)

## Contexto
T-0031 (PR https://github.com/aloirr/macuxifdv/pull/25): P-3 (auditoria da inativação em massa) e P-4 (itens faturados descartados no retorno do ERP). Formato e índices no hub-api.md §17b; volume baixo.

## O que preciso (schema `integracao`, colunas padrão + RLS forçado + teste de vazamento)
1. **Tabela nova `inativacao_auditoria`** (append-only: sem update/delete para `macuxi_app`):
   - Colunas: `pendencia_id`, `sessao_id`, `lote_id`, `entidade`, `conector_id`, `acao` (`confirmar|recusar`), `decidida_por uuid`, `perfil` (`admin|analista`), `decidida_em`, `quantidade int`, `total_ativos int`, `percentual numeric(5,2)`, `motivo text` (≤ 300).
   - Índices: `(tenant_id, decidida_em desc)` e `(tenant_id, pendencia_id)`.
2. **Tabela nova `pedido_retorno_erro`**:
   - Colunas: `pedido_uuid`, `status`, `numero_erp`, `nota_numero`, `nota_serie`, `ocorrido_em`, `indice int`, `sequencia int`, `produto_external_id` (≤ 200), `quantidade int`, `codigo`, `codigos text[]`, `campo`, `motivo`, `conector_id`, `resolvido_em`.
   - Índices: `(tenant_id, created_at desc)` e `(tenant_id, pedido_uuid)`.
3. **`pendencia_inativacao`**: coluna nova `decidida_por_perfil text` (`admin|analista`), ao lado de `decidida_por` e `motivo_decisao`.

## Pronto quando
Migração com RLS, testes de vazamento e a garantia de append-only na auditoria verdes, com resposta a este recado.
