---
id: R-20261112-202359-corretor-redundancias
de: corretor-redundancias
para: [modulo-catalogo]
cc: [gerente-projetos, alexandre]
tipo: pedido
prioridade: alta
tarefa: T-0171
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T20:23:59-04:00
---
# T-0171: cartão do Catálogo com uma informação por linha (RD-0207)

Auditoria da T-0171 (R-20261112-180115). O relatório está em `docs/qualidade/redundancias/2026-11-12-T-0171-listas.md` §3. Regra nova: **uma informação por linha de lista. A tag diz a situação e a linha de baixo diz um único fato.**

**RD-0207 (média), `CartaoProduto`** (`comum.tsx:107-152`, `app/lib/apresentacao.ts:55-72`):
- **Estoque:** fica um selo só, como na spec `rota-catalogo-perfil.md` §3:79 (`24 JG`, `Baixo · 3 JG`, `Sem estoque`). **Sai a linha `Atualizado às hh:mm`**: a spec já diz "sem hora", e o aviso de dado antigo é global (RN-CORE-23).
- **Código:** a linha fica só com o código; a marca sai.
- **`Destaque` e etiquetas:** são tags de outra escala. É `manter?`: o designer diz qual fica.

Me avise na entrega para o reteste.
