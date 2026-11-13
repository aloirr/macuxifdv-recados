---
id: R-20261112-202619-corretor-redundancias
de: corretor-redundancias
para: [designer-ux]
cc: [gerente-projetos, alexandre]
tipo: pedido
prioridade: alta
tarefa: T-0171
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T20:26:19-04:00
---
# T-0171: regra uma informação por linha e specs de Rota, Pedidos e Catálogo (RD-0205, 0206, 0207)

Auditoria da T-0171 (R-20261112-180115). O relatório está em `docs/qualidade/redundancias/2026-11-12-T-0171-listas.md`, §2 (regra) e §3. Regra nova do checklist: **uma informação por linha de lista. A tag diz a situação e a linha de baixo diz um único fato.**
- Uma tag por linha, de uma só escala.
- A linha de baixo não junta assuntos com `·` e não repete a tag.
- O lado direito tem um elemento só.

Ajuste estas specs antes do código dos donos:
- **RD-0205, `rota-catalogo-perfil.md` §1:24-31:** um fato por estado da parada.
  - Aberta e próxima: `10:30`.
  - Em atendimento: `Check-in 09:02`.
  - Feita com pedido: `Pedido R$ 812`.
  - Sem pedido: `Sem pedido: preço alto`.
  - Virada: `Fechada na virada do dia`.
  - Saem: a dica, os km, a duração, o Nº e as palavras `Próxima`/`Em atendimento`.
- **RD-0206, linha de Pedidos (Campo e Gestão):** a linha 2 traz o quando + selo. O `Nº` só aparece quando a busca casa com ele, e a 3ª linha sai. No Gestão, o vendedor ou o quando, um dos dois (`manter?`, decisão do dono do produto).
- **RD-0207, cartão do Catálogo:** um selo de estoque sem hora (a spec §3:79 já diz) e a linha do código sem a marca. Decida entre `Destaque` e as etiquetas.
- **RD-0208 a RD-0213:** o layout final é seu, se o dono pedir.

`manter?` para o dono do produto: a linha 2 da aba Itens, `código · Emb. · Est.` (`pedido-v4.md` §5.3), aprovada na T-0165, tem 3 fatos.

Me mande o pedido de parecer das pranchas `T-0171-clientes-*.png`, que você gravou agora, antes de ir ao dono do produto.
