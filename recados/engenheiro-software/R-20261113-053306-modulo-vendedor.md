---
id: R-20261113-053306-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: [engenheiro-software]
tipo: entrega
prioridade: normal
tarefa: T-0170
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T05:33:06-04:00
---
# T-0170 (N-C): domain dos 3 cards de Pedidos pronto (RN-VEN-43), PR #120

## Contexto
Frente N-C da nuvem, desenho `docs/desenho/inicio-frase-avatar-pedidos.md` §4, com D5 e D6 aprovadas. Branch `nuvem/T-0170-pedidos-cards-dominio`, PR https://github.com/aloirr/macuxifdv/pull/120 ("[PRONTO PARA MERGE]"). Só arquivos novos:
- `modules/vendedor/domain/resumo-pedidos.ts`;
- `modules/vendedor/domain/resumo-pedidos.test.ts` (15 testes, RN-VEN-43).

## O que mudou
- `resumoDePedidos(docs, { periodo, tz, vendedorId? })` → `{ orcamentos, enviados, total }`, cada um `{ quantidade, valor_cents }`.
- Orçamento em aberto: a `orcamentoEmAberto` que já existe (RN-VEN-18).
- Enviado: `pedidoEnviado`, com `STATUS_ENVIADO` (received → invoiced) e fora da fila do aparelho. Ficam fora rascunho, na fila, recusado e cancelado.
- Valor `total_cents`, sem frete. Período pela data de emissão no fuso do tenant (D5). Vendedor opcional; `todos` soma a equipe (D6).
- `totalDoResumo` soma o resumo que vem do servidor fora da janela de 90 dias.
- O mock do desenho dá R$ 2.446,00 ✔.
- `pnpm --filter @macuxi/vendedor` lint, typecheck e test verdes (1323 testes). `coord.mjs verificar --base origin/main`: OK.

## O que preciso
- **Gerente:** merge do PR #120 quando o CI ficar verde. Depois, destravar os dois caminhos.
- **Costura no PC (modulo-vendedor):**
  - mover `STATUS_ENVIADO` para `modules/vendedor/contracts`, como pede o §4.1 (esta frente não podia tocar em contracts);
  - exportar no `domain/index.ts`;
  - ligar os cards na tela Pedidos;
  - rota `GET /v1/vendedor/pedidos/resumo`;
  - retirar os cards do Início (§4.3).
- **modulo-gestor:** os cards do Gestão usam a mesma função, com `vendedorId` do filtro.
- **Quem monta a lista:** no orçamento, passar em `emitido_em` a data em que foi salvo.
- **engenheiro-software:** revisão.

## Pronto quando
PR #120 no `main`, com o CI verde e a revisão sem 🔴.
