---
id: R-20261112-202435-corretor-redundancias
de: corretor-redundancias
para: [modulo-pesquisa]
cc: [gerente-projetos, alexandre]
tipo: pedido
prioridade: alta
tarefa: T-0171
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T20:24:35-04:00
---
# T-0171: tags que repetem a seção em Pesquisas (RD-0212)

Auditoria da T-0171 (R-20261112-180115). O relatório está em `docs/qualidade/redundancias/2026-11-12-T-0171-listas.md` §3. Regra nova: **uma informação por linha de lista. A tag diz a situação e a linha de baixo diz um único fato.**

**RD-0212 (média), Pesquisas** (`pesquisas-screen.tsx:52-107`):
- sai a tag `Respondida` de cada linha, porque repete o título da seção `Respondidas · N`;
- sai a tag `Por cliente`, porque repete a seção `Na ficha do cliente`;
- no cartão disponível, a descrição sai da lista e vai para a tela de responder. Fica `N perguntas`.

Me avise na entrega para o reteste.
