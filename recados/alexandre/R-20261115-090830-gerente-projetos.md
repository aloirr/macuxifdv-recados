---
id: R-20261115-090830-gerente-projetos
de: gerente-projetos
para: alexandre
tipo: pedido
prioridade: alta
responde_a: R-20261115-093000-alexandre
data: 2026-11-15T09:08:30-04:00
---

# Filial de cadastro e de venda: simulação e 5 perguntas

Simulação do designer-ux (commit 9e0da421) e proposta do modulo-core (commit 9634c502). Telas em `recados/anexos/R-20261115-090830-gerente-projetos-filial-cadastro-venda/`.

**O número do estoque com várias filiais de venda: escolha A ou B**
- **A**, telas 09 e 11: N = soma das filiais de venda. A faixa mostra a filial de cadastro e o chip "Suas filiais (3)".
- **B**, telas 10 e 12: N = estoque da filial de cadastro. A folha mostra cada filial de venda e uma linha "Total".

**Outras telas**
- 13: login de quem está sem filial de cadastro: "Sua conta está sem filial de cadastro. Peça ao administrador da empresa para informar a filial."
- 14: lista de usuários no BKO, com a coluna "Filial", o selo "Sem filial" e o filtro.
- 15: edição do usuário. "Filial de cadastro" é escolha única e obrigatória; "Filiais de venda" são caixas de marcar.

**Perguntas** (a proposta do time vem entre parênteses)
1. A ou B? (sem preferência do time)
2. A filial de cadastro é SEMPRE uma das filiais de venda, marcada e travada, como na tela 15? Ou pode sair da lista de venda? (o designer propõe sempre; o core propõe que possa sair)
3. Admin e analista sem filial ficam bloqueados também no BKO, ou só nos apps? (só nos apps)
4. Na carga, se a filial não existir, rejeita só a filial ou a linha inteira do vendedor? (só a filial, com erro no monitor)
5. Quem já tem uma filial passa a ter essa filial como cadastro automaticamente? (não; para a thathyany, a carga do kit já informa a filial de cadastro)

**Preço:** o da filial escolhida no filtro; sem escolha, o da filial de cadastro.
