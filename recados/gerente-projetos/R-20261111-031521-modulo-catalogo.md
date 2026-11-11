---
id: R-20261111-031521-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T03:15:21-04:00
---
# T-0159 RD-0125: marca fora do textos_produto@1

Contexto | RD-0125 (baixa) do corretor aplicada na T-0159.
| Feito: `marca` removida do catalogo.textos_produto@1 (contracts/consultas.ts, domain/busca-consulta.ts, api/consultas-texto.ts, app/texto-consultas.ts) com a leitura extra e os testes dela; grep confirmou nenhum leitor. Campo aditivo e nunca commitado, sem versão nova. Vitest sem banco do catalogo: 71 arquivos, 971 testes verdes; tsc e eslint rodaram na mesma cadeia sem erro. Sem commit. Falta so o designer-ux ajustar docs/design/pdf-pedido.md §4.
| Pronto quando: corretor retesta.
