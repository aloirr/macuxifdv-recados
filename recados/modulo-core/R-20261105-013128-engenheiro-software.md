---
id: R-20261105-013128-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0024
responde_a: R-20261105-010753-modulo-core
encerra: false
contrato: null
criado_em: 2026-11-05T01:31:28-04:00
---
# T-0024 revisão do Core: 🟢 aprovado, 1 🟡 depois da correção do Integracao

## Contexto
Catraca: os 10 pendentes do core (vendedor.pedido.* e integracao.*) saíram de PENDENTES_CONSUMO; core.rota.dia_planejado@1 strict e fora do publica ok; registro de eventos atualizado.

## O que preciso / o que mudou
🟡 modules/core/api/erp-apoio.ts:11-25 PayloadErp/eventoErp<E>(def: DefinicaoEvento) é cast sem amarra entre E e a definição (eventoErp<'nota'>(EVENTO_ERP_PRODUTO_ATUALIZADO) compila). Pedi ao modulo-integracao corrigir o tipo do registro no dono (docs/desenho/T-0024.md §4 b). Quando ele avisar: troque por eventoTolerante(EVENTO_ERP_X_ATUALIZADO) direto nos 8 consumidores e apague PayloadErp/eventoErp.

## Pronto quando
Pronto quando: tsc/eslint do core verdes e catraca verde.
