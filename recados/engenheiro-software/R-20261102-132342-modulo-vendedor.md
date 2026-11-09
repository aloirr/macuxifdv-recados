---
id: R-20261102-132342-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos, alexandre]
cc: [engenheiro-software, engenheiro-apps]
tipo: entrega
prioridade: normal
tarefa: T-0054
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T13:23:42+00:00
---
# Entrega T-0054: retorno do ERP, faturado no app e no BKO e devolução (PR 44), ligado após a migração do banco

## Contexto
T-0054 (nuvem, Sprint 5, prazo 04/11): retorno do ERP no pedido, faturado visível no app e no BKO, e devolução. PR: https://github.com/aloirr/macuxifdv/pull/44 (branch `nuvem/T-0054-faturado-devolucao`).

## O que foi feito
1. **Domínio** (`domain/retorno-erp.ts`, teste antes):
   - status pelo retorno (RN-INT-08/RN-VEN-30): só avança; o que chega atrasado é ignorado; `cancelado` do ERP vale de aprovado em diante e é final;
   - itens faturados por sequência, limitados ao saldo;
   - `vendedor.pedido.faturado@1` (RN-TRE-08);
   - devolução pela nota do ERP (RN-VEN-37, proposta).
2. **API** (`api/retorno-erp.ts`):
   - consumidores de `integracao.pedido.retorno_erp@1` e `integracao.nota.atualizado@1`, que publicam `status_alterado@1` e `faturado@1`;
   - repositório Postgres e em memória;
   - pull, lista e detalhe com o faturamento;
   - tudo atrás de `FATURAMENTO_LIGADO`, que fica `false` até a migração.
3. **App Campo e Gestão** (offline): chip "Faturados", resumo "Faturado R$ … (NF …) · Devolvido R$ …", cartão Faturamento e "Faturado X de Y" por item.
4. **BKO**: resumo do faturamento na lista, seção "Faturamento e devolução" na gaveta, coluna Faturado nos itens e CSV com Nº ERP, faturado, devolvido e última NF.
5. **Testes do Vendedor**: 253 → 308, dos quais 46 com Postgres real (RLS de dois tenants, idempotência, saldo, devolução e pull). Lint, typecheck, fronteiras e `verificar --base origin/main` verdes.

## Como testar em 5 passos (depois da migração e com `FATURAMENTO_LIGADO = true`)
1. No Campo, faça um pedido e aprove, ou deixe dentro da alçada.
2. Pelo Conector simulado, mande o retorno `integrado` e depois `faturado_parcial` com `itens_faturados`.
3. Sincronize o Campo e ligue o modo avião: o chip Faturados e o cartão Faturamento mostram a NF e o "Faturado X de Y".
4. No BKO, abra o pedido: as notas aparecem na gaveta e o CSV traz o faturado.
5. Mande `faturado_total` sem itens e depois uma nota de devolução com o `pedido_uuid`: o pedido fica Faturado e aparece "Devolvido R$ … (parcial)".

## Fica para o local
- **banco-dados**: migração e seed da demo (R-20261102-132023-modulo-vendedor). É o que liga o ponta a ponta na demo.
- **engenheiro-software**: inputs do turbo, registro de eventos e revisão (R-20261102-132046-modulo-vendedor).
- **modulo-integracao**: publicar um evento por registro de nota (R-20261102-132111-2-modulo-vendedor).
- **testes**: e2e (R-20261102-132111-3-modulo-vendedor).
- **engenheiro-apps**: nada no shell.
- **Doc 03**: RN-VEN-37 e o complemento da RN-VEN-30 (R-20261102-132123-modulo-vendedor).

## Critérios de aceite
- **Não feito**: ponta a ponta na demo, porque depende da migração e do seed.
- **Feitos**: offline, multi-tenant e permissões em teste, sem hora fixa; regra só no domain; checks verdes; este recado.

## Premissas
- A devolução é a nota de devolução do ERP: conta pelo total, não muda o status e não tem estorno.
- A T-0053 ainda não está no `main`. Esta PR não toca o envio ao ERP. O consumidor de `retorno_erp@1` fica aqui, porque só pode haver um por evento e módulo, e a T-0053 deve reaproveitá-lo.
- O contrato da Integração entra por import relativo, sem mudança no lockfile.
