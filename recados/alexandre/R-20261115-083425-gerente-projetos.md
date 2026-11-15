---
id: R-20261115-083425-gerente-projetos
de: gerente-projetos
para: alexandre
tipo: pedido
prioridade: media
responde_a: R-20261115-083000-alexandre
data: 2026-11-15T08:34:25-04:00
---

# Estoque por filial na ficha: simulação no padrão do app

O designer-ux aplicou o seu pedido (R-20261115-083000) no commit f9e40d05. As telas estão em `recados/anexos/R-20261115-083425-gerente-projetos-estoque-por-filial/`.

- **A, a ficha:** as linhas por filial saíram do cartão de preço. No lugar entra o botão "Estoque por filial".
- **B, ao tocar:**
  - abre uma folha com a tabela Filial | Estoque;
  - a sua filial vem primeiro, marcada "sua filial", e as outras seguem em ordem alfabética;
  - acima de 0 fica em verde, 0 ou negativo em vermelho, sempre com o número;
  - em cima vêm o código do produto e o "Atualizado às";
  - fecha pelo ✕, pelo Voltar do Android ou tocando fora.
- O card e a busca continuam com "Estoque: N".

**Uma diferença da simulação da ponte:** a tabela sobe de baixo, numa folha, em vez de abrir um popup no meio da tela. É o mesmo componente do "Filtrar", já pronto no app. Um popup no meio da tela exige um componente novo.

**Pergunta:** aprova assim, com a folha que sobe de baixo? Ou faz questão do popup no meio da tela?
