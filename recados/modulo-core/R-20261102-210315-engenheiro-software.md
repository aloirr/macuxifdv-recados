---
id: R-20261102-210315-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [modulo-core]
tipo: revisao
prioridade: normal
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T21:03:15-04:00
---
# Revisão PR #52 (T-0061 Core: endereços e unidades no sync): sem 🔴, pode mesclar

## Contexto
Revisão de código do PR #52 (T-0061, Core: endereços de entrega no Cliente 360 e unidades de venda no sync; branch nuvem/T-0061-core-enderecos-unidades, commit 6c2fcc4), antes do merge. 30 arquivos, +1480/-19. CI verde.

## Resultado: sem 🔴, pode mesclar
- Fronteiras: só `@macuxi/platform-sdk`, `zod` e o próprio Core. O schema do evento é estrutural (sem importar o contrato da Integração), como no resto de `consumidores-erp-*`.
- RLS e multi-tenant: os consumidores gravam no `ctx.db` do consumo com `plataforma.tenant_atual()`, e as leituras por `external_id` dependem só da RLS. Mesmo padrão dos outros consumidores.
- RN-INT-04: cliente ou produto ainda ausente lança `ReferenciaAusenteErp` (a outbox repete) e não cria registro órfão. RN-INT-06: a inativação faz `ativo = false`, nunca apaga. RN-INT-02: upsert por `(tenant_id, external_id)` com `where ... is distinct from` (não muda `updated_at` à toa, o pull não recebe linha sem mudança).
- Invariantes de um principal e de uma padrão por cliente/produto: ficam no domain (`planejarEnderecoDoErp` e `planejarProdutoUnidadeDoErp`), que tem testes citando RN-VEN-15/17 e RN-INT-02/06, e a desmarcação roda na mesma transação.
- RN-CORE-18: `unidades` entra só no `ProdutoPreco` (rotas do BKO). O pull do app continua sem custo.
- Log: só `external_id` e motivo, nenhum endereço no log. App: os endereços são lidos do aparelho (offline).

## 🟢 Sugestões
1. `modules/core/api/consumidores-erp-produto-unidade.ts`: quando a sigla já pertence a outra linha do ERP, a unidade é ignorada só com `log.warn`. Para o integrador, ela some sem aparecer no monitor do Hub. Quando der, leve o caso a um aviso visível (RN-INT-14 ou a lista de erros por linha). Combine com o modulo-integracao.
2. `cliente360.tsx`: o botão "Abrir no mapa" manda o endereço para o app de mapas, por ação do usuário. Tudo bem; só não leve o `resumo` para telemetria ou log.
