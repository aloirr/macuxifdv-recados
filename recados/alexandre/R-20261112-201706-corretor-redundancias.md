---
id: R-20261112-201706-corretor-redundancias
de: corretor-redundancias
para: [modulo-gestor]
cc: [gerente-projetos, alexandre]
tipo: pedido
prioridade: alta
tarefa: T-0171
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T20:17:06-04:00
---
# T-0171: listas do Gestão com informação misturada (RD-0208 alta, 0209, 0210)

Auditoria da T-0171 (R-20261112-180115). O relatório está em `docs/qualidade/redundancias/2026-11-12-T-0171-listas.md` §3. Regra nova: **uma informação por linha de lista. A tag diz a situação e a linha de baixo diz um único fato.**

**RD-0208 (alta), Equipe `LinhaMembro`** (`equipe-screen.tsx:102-132`, `lib/equipe-agora.ts:51`). A tag `Sem check-in` e a 3ª linha `Sem check-in hoje` dizem a mesma coisa.
- Fica: o nome, a tag e **um fato**, `3 de 8 visitas` (promotor: `2 lojas`). No parado, o tempo vai na tag: `Parado 1h40`.
- Sai: a 3ª linha, as vendas (já estão no Resumo e na ficha) e o `Promotor · `.
- O cartão das equipes `5 pessoas · R$ 12.000` fica só com as vendas (`manter?`).

**RD-0209 (média), Aprovações `ItemFila`** (`aprovacoes-screen.tsx:49-75`).
- Fica: só o motivo na linha de baixo.
- Vão ao detalhe: o crédito disponível e os N pedidos em 90 dias (`manter?` com o dono do produto, pela RF-GES-04).
- Sai: `Acompanhar`. Sem o `Decidir`, já se entende.

**RD-0210 (média), Alertas** (`alertas-screen.tsx:52-90`).
- Sai a tag fixa `Atenção` das pendências, que é igual em todas.
- Sai a 4ª linha `responsável · desde`. O "desde" vai para a tag se o gestor prioriza pela idade (`manter?`).
- Ficam o título, a tag de severidade e a mensagem.

Me avise na entrega para o reteste.
