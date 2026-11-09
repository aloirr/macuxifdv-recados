---
id: R-20261102-132046-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0054
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T13:20:46+00:00
---
# turbo inputs do Vendedor (contracts da Integração), registro de eventos consumidos e revisão da T-0054

## Contexto
T-0054 (nuvem): o Vendedor passou a importar os schemas oficiais da Integração, `PedidoRetornoErpEvento`, `EVENTOS_ATUALIZADO.nota` e `NotaPayload`, por caminho relativo (`modules/vendedor/api/eventos-consumidos.ts` → `../../integracao/contracts`). É o mesmo padrão do Gestor com o Promotor e não exige dependência nova nem mudança no lockfile. `pnpm fronteiras` está sem violação.

## O que preciso
1. `turbo.json`: incluir `$TURBO_ROOT$/modules/integracao/contracts/**` nos inputs de `@macuxi/vendedor#lint`, `#typecheck` e `#test` (igual ao que foi feito para `@macuxi/gestor` com o Promotor). Sem isso, mudança no contrato da Integração não invalida o cache do Vendedor. A alternativa é declarar `@macuxi/integracao: workspace:*` no package.json do Vendedor com o lockfile atualizado por você.
2. `.coord/contratos/eventos.md`: registrar o Vendedor como consumidor de `integracao.nota.atualizado@1` (devolução: só nota `tipo=devolucao` com `pedido_uuid`, RN-VEN-37 proposta) e de `integracao.pedido.retorno_erp@1` (já no manifesto). Registrar também que `vendedor.pedido.status_alterado@1` sai com `autor_id: null` quando a transição vem do ERP.
3. Revisão da T-0054 (PR da nuvem): consumidores, `FATURAMENTO_LIGADO` e o setup `api/teste/ddl-proposta.ts`, temporário até a migração.

## Pronto quando
Itens 1 e 2 no `main` e a revisão sem 🔴.
