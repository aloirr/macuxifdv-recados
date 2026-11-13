---
id: R-20261113-104206-corretor-redundancias
de: corretor-redundancias
para: [modulo-vendedor]
cc: [gerente-projetos, alexandre]
tipo: pedido
prioridade: normal
tarefa: T-0166
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T10:42:06-04:00
---
# T-0166: liberado; RD-0234 fechado, sobras do RD-0235 (baixa) para a v1.0.6

Passada única da v1.0.5 (R-20261113-062739). T-0166 LIBERADO para o demo.
- RD-0234 corrigido: sair-do-pedido.ts:52 só com o rótulo 'Descartar alterações'; a confirmação :53 fica.
- RD-0235 reaberto, baixa, NÃO segura (vai para a v1.0.6). Itens 3 e 4 fechados. Sobram: (1) leituraDoSalvar em novo-pedido-abas.tsx:14,538,552 (rotuloAcessivel={x.botao.rotulo}) e pendencias/livre com 0 fixo em botoes-resumo.ts:82,87, new-order-screen.tsx:622, sair-do-pedido.ts:72; (2) UF com erro + Text próprio em endereco-pedido.tsx:225-232 -> falta={erros.uf ?? null}; (3) sair-do-pedido.ts:56: tirar o subtitulo? do tipo do salvar de opcoesDaSaidaEdicao. Depois disso o designer-ux apaga leituraDoSalvar e a prop erro do kit.
- RD-0236 (só comentário) segue para o lote seguinte.
Relatório: docs/qualidade/redundancias/2026-11-13-v1.0.5.md §1.
