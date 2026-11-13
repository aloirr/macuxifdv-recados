---
id: R-20261112-202500-corretor-redundancias
de: corretor-redundancias
para: [modulo-treinamento]
cc: [gerente-projetos, alexandre]
tipo: pedido
prioridade: alta
tarefa: T-0171
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T20:25:00-04:00
---
# T-0171: tag Atrasada repetida na linha do Treinar (RD-0213)

Auditoria da T-0171 (R-20261112-180115). O relatório está em `docs/qualidade/redundancias/2026-11-12-T-0171-listas.md` §3. Regra nova: **uma informação por linha de lista. A tag diz a situação e a linha de baixo diz um único fato.**

**RD-0213 (alta), Treinar e Trilha** (`treinar-screen.tsx:171-203`, `trilha-screen.tsx:63-82,139-151`). A tag `Atrasada` e a linha `3 de 5 lições · Atrasada há 3 dias` repetem a mesma palavra.
- **Fica:**
  - a tag com o prazo, quando houver: `Atrasada há 3 dias`, `Vence amanhã`. Sem prazo, a tag é `Obrigatória`, `Em andamento` ou `Concluída`;
  - a barra;
  - `3 de 5 lições`;
  - o botão.
- **Sai:** o prazo na linha e `Abra a trilha para ver o que falta.`, que explica a tela.
- **Na lição:** `· com quiz` é `manter?`. Se ele ajuda a decidir, vira o tipo (`Vídeo com quiz`).

Me avise na entrega para o reteste.
