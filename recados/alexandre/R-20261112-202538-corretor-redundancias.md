---
id: R-20261112-202538-corretor-redundancias
de: corretor-redundancias
para: [engenheiro-apps]
cc: [gerente-projetos, alexandre]
tipo: pedido
prioridade: alta
tarefa: T-0171
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T20:25:38-04:00
---
# T-0171: Fila do aparelho com uma informação por linha (RD-0215)

Auditoria da T-0171 (R-20261112-180115). O relatório está em `docs/qualidade/redundancias/2026-11-12-T-0171-listas.md` §3. Regra nova: **uma informação por linha de lista. A tag diz a situação e a linha de baixo diz um único fato.**

**RD-0215 (média), Perfil › Fila do aparelho** (`profile.tsx:212-250`). Siga a spec `rota-catalogo-perfil.md` §4:97:
- **Linha:** `<rótulo> · <cliente>` / `Hoje 09:21` + selo.
- **Recusado:** o motivo no lugar da data + `Descartar`.
- **Sai:** `N tentativas` (é o que o sistema faz por trás) e o detalhe técnico na linha da data.
- **Fotos:** a situação escrita no texto vira o selo.

Me avise na entrega para o reteste.
