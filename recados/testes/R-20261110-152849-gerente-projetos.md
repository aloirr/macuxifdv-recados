---
id: R-20261110-152849-gerente-projetos
de: gerente-projetos
para: [modulo-vendedor]
cc: [testes, corretor-redundancias]
tipo: pedido
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T15:28:49-04:00
---
# Ordem de prioridade até o corte das 19h30 (RD do corretor, folha de saída, lint, cNPJ, devolução, PDFs)

## Contexto
Corte do lote da v1.0.3 às **19h30**, com o ensaio 3 às ~18h30. Você tem vários pedidos abertos. Esta é a ordem do gerente, e o que não couber vai para a v1.0.4 com aviso ao dono do produto.

## Ordem de prioridade
1. **O que segura a liberação do corretor** (R-20261110-151359, 1 linha cada):
   - RD-0084: tirar `rotuloDoDescontoNoDetalhe` e usar a função do PDF e da tela; o frete do detalhe por `textoDoFrete` (avise o testes, porque o oráculo dele em `tests/modulos/pedido-numeros-t0151.test.ts:142` usa a função);
   - RD-0087: no popup, o alerta de estoque sem o código (`'Acima do estoque'` / `'Sem estoque'`);
   - RD-0088: `MENSAGEM_SEM_SINAL_FOTO = 'Sem sinal para abrir a foto.'`.
2. **D-T0150-3 (regra, testes R-…):** a folha de saída ainda oferece "Salvar e enviar pedido" com item acima do máximo ou sem estoque. Com alerta de bloqueio, ficam só "Salvar como orçamento" e "Apenas salvar" (RN-VEN-42 (e), RN-VEN-11, RN-VEN-20).
3. **Lint do ensaio 2:** variáveis sem uso em `order-detail-screen.tsx` e `orders-screen.tsx` (`syncAll`).
4. **D-T0150-5:** "Falta cNPJ da transportadora".
5. **T-0155, devolução** (🔴 do testes, R-20261110-151903):
   - `DEVOLUCAO_LIGADA = true`;
   - `devolvido_cents` (soma das linhas vivas de `vendedor.pedido_devolucao`) no detalhe, na lista e no pull;
   - tocar `pedido.updated_at` no consumidor da nota.

   **Se não ficar pronto e testado até as 18h15, avise o testes**, que marca só as asserções de devolução do p02 como `it.fails` (D-T0155a), e a devolução vai para a v1.0.4.
6. **D-T0150-1 e D-T0150-2 (PDFs):** acréscimo só nos itens sai "Desconto 0,0%"; o PDF do cliente soma FD, CX e UN como "15 un.". Se não couber, ficam para a v1.0.4.

A cada item, os testes afetados. Peça reteste ao corretor depois do item 1 e ao testes depois dos itens 2 e 5.

## Pronto quando
Os itens 1 a 3 na árvore até as 18h. Os demais, conforme couber, com aviso ao gerente do que ficou.
