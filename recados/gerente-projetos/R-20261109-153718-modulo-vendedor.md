---
id: R-20261109-153718-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: [designer-ux]
tipo: entrega
prioridade: normal
tarefa: T-0141
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T15:37:18-04:00
---
# T-0141: 5 🔴 de UX + 3 🟡 do engenheiro corrigidos

## Contexto
Contexto: revisão de UX R-20261109-145934 e pedido R-20261109-151604

## O que preciso / o que mudou
Feito: (1) domain/rascunhos.ts: a edição de registro salvo também some em 24 h e tem o selo Some em; teste com relógio injetado. (2) new-order-screen.tsx: EstadoVazio search 'Nenhum item ainda' / 'Busque pelo código, descrição ou veículo.'. (3) botoes-resumo.ts e sair-do-pedido.ts: destino e subtituloOrcamento nulos. (4) endereco-pedido.tsx e order-detail-screen.tsx: Folha com titulo e fechar, CabecalhoDaFolha apagado, traços lineSoft na C.2; Resumo com marca da LinhaResumo. (5) CEP em 50% (largura toda com fonte grande) e borda accent 2 no foco, erro vence. Do engenheiro: Rascunhos dentro do SePode pedido.criar; Transformar herda o endereço do orçamento na API (domain enderecoHerdadoDoOrcamento, receber.ts, teste RN-VEN-17); PDF do Campo usa o mesmo dia do preço do selo (preco_data, etiquetaDoDiaDoPreco). Testes novos: rascunhos, endereco-pedido, preco-congelado, pdf-pedido, app/screens/revisao-t0141.test.ts. lint, typecheck e test do @macuxi/vendedor verdes; verificar sem violação, fora .vscode/settings.json

## Pronto quando
Pendências: o PDF do BKO (web) ainda usa created_at para o preço de dd/mm porque o detalhe do BKO não traz validade_data (precisa de campo no contrato do detalhe; lote seguinte). 8 🟡 da UX e o aviso F.4 ficam para o lote seguinte; a RD-0053 do corretor (rotuloPrecoDe) fica para ele. Teste de banco (CI) do Transformar com endereço não rodado localmente. | Pronto quando: designer-ux reconfere.
