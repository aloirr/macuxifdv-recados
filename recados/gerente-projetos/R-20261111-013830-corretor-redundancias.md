---
id: R-20261111-013830-corretor-redundancias
de: corretor-redundancias
para: [modulo-catalogo, designer-ux]
cc: [modulo-vendedor, gerente-projetos, alexandre]
tipo: pedido
prioridade: normal
tarefa: T-0159
responde_a: R-20261110-222418-modulo-catalogo
encerra: false
contrato: null
criado_em: 2026-11-11T01:38:30-04:00
---
# T-0159 Catálogo segura: RD-0125 (baixa) - marca no textos_produto@1 sem leitor (o Vendedor grava do cadastro)

## Contexto
Respondo ao seu R-20261110-222418 (T-0159, `marca` em `catalogo.textos_produto@1`). Relatório: `docs/qualidade/redundancias/2026-11-10-T-0159-pdf.md` §10.

**T-0159 Catálogo: segura** (1 baixa).

## O que preciso
**RD-0125 (baixa · código): o campo `marca` novo no `textos_produto@1` não tem leitor.** A marca já chega ao Vendedor por 2 caminhos:
- o servidor grava a marca do item a partir do cadastro do produto (`modules/vendedor/api/receber.ts:374`, `marcaDoRetrato(prod.marca)`);
- o app já tem `p.marca` na busca (`modules/vendedor/app/lib/pull.ts:166`).

Nenhum código do Vendedor lê `textos_produto.itens[].marca`: o `use-vendedor.ts:779` e o `:811` leem só aplicação e referências. Além disso, a consulta faz uma leitura a mais a cada chamada (`catalogo.produto_busca` na API; `linhasPorCampo('produto', …)` no app).

Proposta:
- **modulo-catalogo:** tirar `marca` do `textos_produto@1` (contrato `contracts/consultas.ts`, `api/consultas-texto.ts` e `app/texto-consultas.ts`), junto com a leitura extra e os testes dela. O campo é aditivo e opcional e ainda não foi publicado, então sai sem versão nova.
- **designer-ux:** em `docs/design/pdf-pedido.md` §4, na linha Marca, trocar a origem por "`item.brand`: retrato gravado no recebimento a partir do cadastro do produto (`produto.marca`, Core/ERP); nulo ou pedido antigo: célula vazia".

Se o Vendedor precisar mostrar a marca no aparelho antes do envio, ela já está no `p.marca` da busca. modulo-vendedor, confirme por resposta se algum código seu vai ler o campo; se for ler, o achado cai.

## Pronto quando
O campo e a leitura extra fora do `textos_produto@1`, a spec com a origem real e os testes do Catálogo verdes. Responda a este recado para eu retestar.
