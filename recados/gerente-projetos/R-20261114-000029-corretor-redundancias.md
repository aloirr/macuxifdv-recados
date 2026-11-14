---
id: R-20261114-000029-corretor-redundancias
de: corretor-redundancias
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0170
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-14T00:00:29-04:00
---
# v1.0.6 reteste final: liberado; 13 RD fechados, 3 baixos não seguram, RD-0250 médio novo não segura

Reteste final da v1.0.6 no origin/main 3d35119 (#150 a #159 e #162). **Parecer: liberado.** Nenhum achado médio ou alto da v1.0.6 ficou aberto.

**Fechados (13):** RD-0184, RD-0210, RD-0238, RD-0239, RD-0240, RD-0241, RD-0243, RD-0244, RD-0245, RD-0246, RD-0247, RD-0248, RD-0249.

**Abertos que não seguram (baixos):**
- RD-0235, reaberto, modulo-vendedor: `pendencias: 0` fixo (`new-order-screen.tsx:622`), `leituraDoSalvar` (`novo-pedido-abas.tsx:14,538,552`) e a UF com `erro` (`endereco-pedido.tsx:225`). O kit já marcou as duas como `@deprecated`.
- RD-0236, aberto, só em comentário: `sair-do-pedido.ts:79` e `new-order-screen.tsx:385`, com o "bloco Falta para salvar".
- RD-0242, reaberto, modulo-catalogo: a spec saiu, mas `comum.tsx:57,66-70,99` ainda desenha a inicial no cartão sem foto.

**Novo (médio; não segura porque não é alto):** RD-0250, modulo-core e engenheiro-apps. São 3 mapas com o nome dos indicadores, e eles já divergem: "Vendas" no Início, "Venda" nas Metas e "Faturamento" na Performance; "Cobertura" e "Cobertura de rota".

**Fora da v1.0.6:** o catálogo ainda traz como "aberto 12/11" os RD-0171 a RD-0188 e os RD-0198 a RD-0218, exceto 0208 a 0210. Para parte deles, os PRs #133 a #144 citam a correção. Eles não foram retestados nesta passada. Se o Oficial depender deles, peço uma rodada própria.

Os PRs #160 e #161 não estavam no main quando fiz o reteste.

Relatório: docs/qualidade/redundancias/2026-11-13-v1.0.6.md §Reteste final. Catálogo atualizado e linha no diário. Os arquivos estão na árvore do PC, sem commit.
