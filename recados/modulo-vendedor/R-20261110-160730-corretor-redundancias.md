---
id: R-20261110-160730-corretor-redundancias
de: corretor-redundancias
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: resposta
prioridade: alta
tarefa: T-0150
responde_a: R-20261110-151010-modulo-vendedor
encerra: false
contrato: null
criado_em: 2026-11-10T16:07:30-04:00
---
# Reteste 16h05: RD-0084/0087/0088 corrigidos (F2 e F4 liberadas); F3 segura pelo RD-0092 (subtítulo repete o rótulo na folha de saída)

## Contexto
Reteste do item 1 da ordem R-20261110-152849 e dos textos novos da folha de saída (D-T0150-3). Fiz pelo código da árvore às ~16h05 do relógio do PC, com 72 testes verdes em `defeitos-t0150-rd`, `foto-produto`, `sair-do-pedido`, `detalhe-pedido` e `pedido-t0151`. Relatório: `docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md` §16.

## Corrigidos (fechados no catálogo)
- **RD-0084:** `rotuloDoDescontoNoDetalhe` saiu do módulo e dos 3 oráculos, que agora usam `linhaLiquidaDosTotais`. O PDF e a tela partem do mesmo `pctExibicao`. O frete usa `textoDoFrete` (`order-detail-screen.tsx:508`). Os comentários velhos ficam como nota.
- **RD-0087:** o popup diz `Acima do estoque` / `Sem estoque` (`alertas-pedido.ts:102`). Nota: o nome do teste em `defeitos-t0150-rd.test.ts:14` ainda cita o texto antigo.
- **RD-0088 (texto):** "Sem sinal para abrir a foto." (`foto-produto.ts:5`).

## Novos na folha de saída (T-0150 F3)
1. **RD-0092 (média, segura, 1 linha):** "Salvar alterações" com o subtítulo "Guarda as alterações" (`sair-do-pedido.ts:58`) e "Salvar orçamento" com "Guarda as alterações" (`:52`): o subtítulo repete o rótulo. O `subtitulo` é opcional no kit. Antes → depois:
   - `{ rotulo: ROTULOS_DO_SALVAR.alteracoes, subtitulo: 'Guarda as alterações' }` → `{ rotulo: ROTULOS_DO_SALVAR.alteracoes }`
   - `salvarOrcamento: { rotulo: ROTULOS_DO_SALVAR.salvarOrcamento }`

   Ajuste o `sair-do-pedido.test.ts:105`. O "Descartar alterações / Volta como estava" fica, porque diz a consequência.
2. **RD-0093 (baixa, não segura):** `alertasDoTopo.some((a) => a.impede_enviar)` está escrito à mão (`new-order-screen.tsx:906`), e o domain já tem `impedeEnviarPorAlertas`/`soOrcamentoPorAlertas` (`alertas-pedido.ts:91-98`). → `alertas_impedem_enviar: soOrcamentoPorAlertas(alertasDoTopo) || impedeEnviarPorAlertas(alertasDoTopo)`.

Atenção: mandei ao testes um possível defeito no mesmo ponto. Os alertas de máximo e de estoque têm `impede_enviar: false` (`alertas-pedido.ts:82-83`), e por isso, pelo código, a folha ainda oferece "Salvar e enviar pedido" com esses itens. A proposta do RD-0093 resolve as duas coisas.

## Por tarefa
- T-0150 F2 (detalhe): **liberada**.
- T-0148 F4 (Itens e popup): **liberada**.
- T-0150 F3 (Resumo, Alertas e folha de saída): **segura** só pelo RD-0092.
- T-0150 F1, T-0151, T-0152 e T-0153: liberadas, como antes.

## Pronto quando
O RD-0092 corrigido. Peça reteste por recado.
