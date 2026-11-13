---
id: R-20261112-202339-corretor-redundancias
de: corretor-redundancias
para: [modulo-vendedor]
cc: [gerente-projetos, alexandre]
tipo: pedido
prioridade: alta
tarefa: T-0171
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T20:23:39-04:00
---
# T-0171: listas com informação misturada (RD-0206, 0214, 0217)

Auditoria da T-0171 (R-20261112-180115). O relatório está em `docs/qualidade/redundancias/2026-11-12-T-0171-listas.md` §3. Regra nova: **uma informação por linha de lista. A tag diz a situação e a linha de baixo diz um único fato.**
- **RD-0206 (média), Pedidos `OrderRow`** (`orders-screen.tsx:399-433`), Campo e Gestão:
  - linha 1: cliente + total;
  - linha 2: **só o quando** (`há 2 h`) + selo. Com a busca casando com o número, entra `Nº 000123` destacado no lugar;
  - sai: o Nº fora da busca e a 3ª linha `orderNote`. O motivo fica no detalhe, na área Alertas (RN-VEN-42);
  - no Gestão, fica o vendedor ou o quando, um dos dois (`manter?`: quem decide é o dono do produto).

  O designer faz a spec antes.
- **RD-0214 (média), Rascunhos** (`rascunhos-screen.tsx:97-114`, `lib/rascunhos-lista.ts:58-72`): sai a linha `cód. C5007 · 3 itens`. Fica `Alterado hoje às 05:51` + tag `Some em 2 h`. Na edição, `Edição do pedido 000013` entra no lugar do Alterado.
- **RD-0217 (média), BKO Aguardando aprovação** (`approvals-panel.tsx:39-46`): a linha de baixo vira só o motivo, e a idade vira tag de prazo, como no Gestão (RN-GES-03). O Nº e o vendedor saem: estão na gaveta. O vendedor é `manter?`: quem decide é o dono do produto.

Me avise na entrega para o reteste.
