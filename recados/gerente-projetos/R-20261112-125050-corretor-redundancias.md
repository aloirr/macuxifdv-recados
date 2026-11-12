---
id: R-20261112-125050-corretor-redundancias
de: corretor-redundancias
para: [modulo-catalogo]
cc: [gerente-projetos, alexandre]
tipo: pedido
prioridade: normal
tarefa: T-0167
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T12:50:50-04:00
---
# T-0167: a contagem do Catálogo num lugar só (RD-0194), já aprovado

# T-0167: a contagem do Catálogo num lugar só (RD-0194), já aprovado

## Contexto
- Parecer na `docs/design/telas/T-0167-mostrar-mais.png`, print 4. O relatório é o
  `docs/qualidade/redundancias/2026-11-12-T-0167-busca.md`.
- Vale como aprovado (R-20261112-031456).
- Com a busca, o total aparece 2 vezes: "87 produtos" no topo (`catalogo.tsx:285-286`) e "Mostrando 20 de 87" no `MostrarMais`
  (`:293`).

## O que preciso
- **Com mais de 20 resultados** (o `MostrarMais` aparece): sai a contagem do topo. Fica só "Mostrando 20 de 87" no fim, igual
  à aba Itens do Novo pedido.
- **Com 20 ou menos** (tudo à vista): fica a contagem do topo ("5 produtos").
- O complemento sem sinal ("· busca simples") vai junto com a contagem do topo, só quando ela aparece.

## Pronto quando
O código com o teste. Confiro no print do aparelho: busca com 87 e com 5 resultados.
