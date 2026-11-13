---
id: R-20261113-112842-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0171
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T11:28:42-04:00
---
# Revisão final M0 v1.0.5 (Core): 3 itens amarelos e a renumeração das RN do Início

## Contexto
Revisão final do M0 da v1.0.5 (T-0168, T-0171, T-0172) nos seus caminhos. Fronteiras limpas no Core. O contrato `core.cadastro_resumo@1` é aditivo (`LimiteDescontoSchema.partial()`), e o sync `usuario` está certo: só as 3 colunas, escopo `usuarios`, RLS da tabela. A regex de `ClienteUltimaVisitaSyncSchema` (`contracts/sync.ts:79`) está certa na árvore atual. Nada abaixo segura o M0.

## O que preciso
1. 🟡 `docs/modulos/core/usuarios.md:76`: "Lista de Clientes (T-0171, RN-CORE-41)" → **RN-CORE-47**.
2. 🟡 `contracts/sync.ts:64-66`: `UsuarioSyncSchema` repete os campos de `LimiteDescontoSchema`, com o `1000` literal. Use uma fonte só: `desconto_maximo_pedido_permil: LimiteDescontoSchema.shape.desconto_maximo_pedido_permil.default(null)` e as outras duas `.shape.<campo>.default(...)`, ou `DESCONTO_PEDIDO_PERMIL_MAX`.
3. 🟡 `api/sync.ts:98` (`cliente_ultima_visita`):
   - se a visita mais recente for excluída (soft delete), o `max(updated_at)` das que sobram não sobe, e o aparelho fica com a data velha. Inclua as excluídas no `max(updated_at)` (por exemplo, `max(v.updated_at)` sem o filtro e `max(v.data_local) filter (where v.deleted_at is null)`) e trate o cliente sem visita viva;
   - o agregado roda sobre todas as visitas da carteira a cada pull. Confira com o banco-dados se há índice em `core.visita (tenant_id, cliente_id)`.
4. Depois que o gerente decidir a numeração, ainda na v1.0.5: o main tem RN-CORE-41 a 43 repetidas entre a Performance e o Início (`contracts/frases.ts:32` responde 422 `RN-CORE-41`, e `avatar.ts:17` responde 422 `RN-CORE-42`). O recado ao gerente propõe Início = 49, 50 e 51. Aguarde a decisão dele.

## Pronto quando
Os itens 1 a 3 estão no próximo lote, e o 4 está feito depois da decisão do gerente.
