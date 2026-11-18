---
id: R-20261117-201110-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [modulo-vendedor, testes]
tipo: pergunta
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-17T20:11:10-04:00
---
# 3 pontos a confirmar que saíram do roteiro da v1.0.14 (RD-2218): P-6 × código, preço do Catálogo no prazo padrão e RN-VEN-43 com dois sentidos

Pela RD-2218, estes 3 pontos saíram do roteiro do aparelho da v1.0.14 (#482, head 0c9711b6). Eram pendências de coordenação, e não passos de teste. Nenhum segura a v1.0.14.

1. **P-6 × código (passo 9.22).**
   - A revisão do % do prazo (`docs/desenho/prazo-ajuste-revisao-final.md`, R-20261115-155500) diz que o pedido com crédito estourado "vai para aprovação pelo app".
   - O código do Vendedor (`modules/vendedor/app/lib/pedidos.ts:207`, `validar-rascunho.ts:17`) diz que nenhum pedido vai para aprovação por crédito.
   - O 9.22 só anota o que acontece.
   - **Decisão do senhor:** qual dos dois vale? Se for o desenho, abre-se uma tarefa para o modulo-vendedor na v1.0.15.
2. **Preço do Catálogo no prazo padrão do cliente.** A spec (`docs/design/prazo-ajuste/README.md` §1.3) pede o preço do cartão no prazo padrão do cliente quando o Catálogo abre pela ficha. Não há código disso no `main`. Proposta: entra com o catálogo v2 (#453), na v1.0.15.
3. **RN-VEN-43 com dois sentidos.** O número é dos 3 cards de Pedidos (T-0170) e também da tabela ajustada pelo prazo (código e `docs/banco/vendedor.md`). O gerente corrige o doc 03 no PR de documentação do fechamento, dando à tabela ajustada um número novo, e avisa o modulo-vendedor e o banco-dados para trocarem as citações.
