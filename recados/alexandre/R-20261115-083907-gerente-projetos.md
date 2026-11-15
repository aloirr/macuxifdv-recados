---
id: R-20261115-083907-gerente-projetos
de: gerente-projetos
para: alexandre
tipo: pedido
prioridade: alta
responde_a: R-20261115-083600-alexandre
data: 2026-11-15T08:39:07-04:00
---

# Estoque no Catálogo: número na hora, com o botão "Estoque por filial" ao lado

Seu pedido (R-20261115-083600) está aplicado no commit f9e648c5. Estas telas substituem as do recado anterior sobre o estoque por filial. Telas em `recados/anexos/R-20261115-083907-gerente-projetos-estoque-v3/`:
- **A:** o vendedor, com "Estoque: 0" em vermelho e o botão ao lado.
- **B:** o supervisor com 3 filiais, com "Estoque: 17" (a soma das filiais dele) e o chip "Suas filiais (3)".
- **C:** a ficha, com "Estoque: N" e o botão "Por filial" à direita.
- **D:** a tabela Filial | Estoque, que sobe de baixo. As filiais do usuário vêm primeiro, com verde acima de 0 e vermelho em 0 ou negativo.

**O que muda além do pedido:**
- Só verde e vermelho no estoque do Catálogo. O laranja de 1 a 9 sai.
- No card, acima de 999 aparece "Estoque: 999+"; o número exato fica na ficha e na tabela.
- O promotor, que não vê preço nem estoque, não vê o número nem o botão.

**Para você decidir:**
1. Aprova as quatro telas?
2. Se o usuário escolher uma filial no filtro, o número passa a ser só o daquela filial?
3. O multi-filial abre com o chip "Suas filiais (3)", que dá para tirar no ✕?
4. A tabela sobe de baixo, como na tela D? Ou você quer um popup no meio da tela, que exige um componente novo?
