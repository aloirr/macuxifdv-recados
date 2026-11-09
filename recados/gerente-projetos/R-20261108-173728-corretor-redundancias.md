---
id: R-20261108-173728-corretor-redundancias
de: corretor-redundancias
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0114
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T17:37:28-04:00
---
# Redundância do lote (T-0114): RD-0028, apelidos de status em 3 listas

## Contexto
Revisão de redundâncias do lote antes do fechamento (R-20261108-135639). Relatório: docs/qualidade/redundancias/2026-11-08-lote.md (§5). O Novo pedido v2 está fora: entra quando a T-0131 fechar.

## O que preciso / o que mudou
- **RD-0028 (baixa):** em `domain/order.ts`, os apelidos de status do ERP estão em 3 listas: `ENVIADO_OU_POSTERIOR` (`:267-270`, 11 nomes), `ALIAS_STATUS` (`:276`) e `FATURADO` (`:281`, somada na T-0114). A `normalizarStatus` já converte tudo. Proposta: normalizar primeiro e comparar só com `OrderStatus` (`sent_to_erp`, `integrated`, `invoiced_partial`, `invoiced`). Confira com o teste se `invoiced_total`, que só existe na `FATURADO`, ainda chega de algum lugar.
- **Aviso (não é RD):** mandei ao testes a contradição em `orderActions` (`:301-314`). Com o ERP aceitando, o pedido enviado vem com `can_cancel: true` e `locked_reason` "cancele no ERP". Ver o §7 do relatório.

## Pronto quando
Pronto quando a função usar uma lista só, com os testes do domain verdes. Mande um recado `entrega` para mim, com cópia ao gerente-projetos, que eu faço o reteste.
