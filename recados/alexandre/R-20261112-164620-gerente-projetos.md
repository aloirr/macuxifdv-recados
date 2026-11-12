---
id: R-20261112-164620-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pergunta
prioridade: alta
tarefa: T-0168
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T16:46:20-04:00
---
# T-0168: simulação do limite de desconto (10 imagens) para aprovar; 4 premissas do designer e 1 decisão técnica

## Contexto
Simulação da T-0168, o limite de desconto por item e por pedido, para você aprovar. A regra é a RN-VEN-11a do doc 03, com as suas sugestões do R-20261112-080845. O designer-ux fez a simulação; o parecer do corretor sai em seguida e eu repasso.

**Imagens** (em `recados/anexos/`, todas começando por `2026-11-12-T-0168-`):
- **BKO, aba Parâmetros do usuário:**
  - `bko-1-padrao.png`: padrão, "por item" ligada e "por pedido" desligada;
  - `bko-2-obrigatorio.png`: "por pedido" ligada e o limite vazio, que dá "Obrigatório";
  - `bko-3-duas.png`: as duas ligadas, com limite de 8,0%.
- **App Campo:**
  - `campo-1-pedido.png`: pedido acima do limite, com a linha "Pedido acima do desconto máximo do vendedor (8,0%)" e só "Salvar como orçamento";
  - `campo-2-item.png`: item acima do máximo do produto, que é a trava de hoje, para comparar;
  - `campo-3-duas.png`: as duas acima;
  - `campo-4-alcada.png`: entre a alçada e o limite, onde vai para aprovação;
  - `campo-5-item-desligado.png`: "por item" desligada, então o item passa do máximo;
  - `campo-6-orcamento.png`: orçamento salvo.
- **App Gestão:** `gestao-1-em-nome.png`, pedido em nome da vendedora, com o limite do gestor.

**Premissas do designer, para você decidir:**
1. As duas funções e o limite ficam juntos na aba **Parâmetros**, porque o limite só vale com "por pedido" ligada.
2. O campo "Desconto máximo do pedido (%)" só aparece com "por pedido" ligada.
3. Acima do limite, a linha da alçada sai, porque o pedido só sai como orçamento.
4. No Gestão, a frase diz "do gestor": "Pedido acima do desconto máximo do gestor (10,0%)". Se aprovar, eu ajusto a RN-VEN-11a.

**Decisão técnica do engenheiro:** a trava compara o valor exato, como a alçada. Com limite de 8,0%, um pedido de 8,04% trava, mesmo a tela mostrando 8,0%. Se preferir que compare o valor exibido, a troca é de uma linha.

## O que preciso
Responda "aprovo a simulação da T-0168", com as premissas 1 a 4 e a decisão técnica, ou diga o que muda.
- **Já começou:** o banco-dados está fazendo o schema, que não depende da aprovação.
- **Depois do seu "aprovo":** core, vendedor e gestor implementam, em cerca de 9 h de caminho crítico.
- **Previsão do BUILD PRONTO da v1.0.5:** 13/11, por volta das 8h de Manaus, se você aprovar até as 17h.

## Pronto quando
Simulação aprovada ou com ajustes.
