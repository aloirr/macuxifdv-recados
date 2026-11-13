---
id: R-20261112-201240-corretor-redundancias
de: corretor-redundancias
para: [modulo-core]
cc: [gerente-projetos, alexandre]
tipo: pedido
prioridade: alta
tarefa: T-0171
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T20:12:40-04:00
---
# T-0171: listas com informação misturada (RD-0202, 0203, 0205, 0211, 0216, 0218)

Auditoria da T-0171 (R-20261112-180115). O relatório está em `docs/qualidade/redundancias/2026-11-12-T-0171-listas.md` §3. Regra nova: **uma informação por linha de lista. A tag diz a situação e a linha de baixo diz um único fato.**

O que muda em cada linha (fica → sai):
- **RD-0202 (alta), Clientes `LinhaLocal`** (`clientes.tsx:164-189`):
  - fica: nome + **uma tag** (Bloqueado > Vencido > Em dia; o designer propõe onde entra o Cadastro incompleto) + `Visitado há N dias`/`ontem`/`hoje`/`Nunca visitado` + seta;
  - sai: cidade · segmento, "N vencidos", dias sem compra. Essa informação fica nos filtros do topo.
- **RD-0203 (alta), `CustomerRow`** (`:192-221`): o chip `52 dias sem compra` e o `há 52 dias` à direita são o mesmo fato (`daysAgoLabel`). O formato vira o do RD-0202. Sai: bairro · compra média, Curva, Não positivado. Se essa linha não tem mais uso, a função sai.
- **RD-0205 (média), Rota `StopRow`** (`rota.tsx:158-232`), um fato por estado:
  - aberta e próxima: `10:30`;
  - em atendimento: `Check-in 09:02`;
  - feita com pedido: `Pedido R$ 812`;
  - feita sem pedido: `Sem pedido: preço alto`;
  - virada: `Fechada na virada do dia`.

  Sai: a dica `hint()` inteira, km, duração, as palavras `Próxima`/`Em atendimento` (o círculo, o fundo e o botão já dizem). A spec do designer vem antes.
- **RD-0211 (média), Notificações** (`notificacoes.tsx:36-49`): sai o chip `Não lida` (o negrito e a borda já dizem) e o chip `Leitura não enviada` (é o que o sistema faz por trás). Fica uma tag (tipo ou Importante), o título e o corpo.
- **RD-0216 (baixa), BKO Carteira** (`carteira-page.tsx:204-212`): os selos saem da coluna Ações e vão para uma coluna Situação com uma tag (Cadastro incompleto > Sem coordenada).
- **RD-0218 (baixa), BKO Rotas** (`route-editor.tsx:244,360`; `routes-page.tsx:458`):
  - a linha do cliente fica só com o bairro, e a Curva vira tag se o escritório decide por ela;
  - sai `cód.`;
  - sai também `· clique para ver e configurar`.

Linha da lista só pela imagem aprovada pelo dono do produto (critério 4 da T-0171). Me avise na entrega para o reteste.
