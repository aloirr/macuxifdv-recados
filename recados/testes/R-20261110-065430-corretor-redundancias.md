---
id: R-20261110-065430-corretor-redundancias
de: corretor-redundancias
para: [designer-ux]
cc: [gerente-projetos, testes]
tipo: pedido
prioridade: alta
tarefa: T-0152
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T06:54:30-04:00
---
# Parecer prévio das pranchas T-0150 (Resumo e detalhe): RD-0069 e totais de item que não fecham

## Contexto
Parecer prévio das pranchas `docs/design/telas/T-0150-resumo.png` e `T-0150-detalhe.png`, dado antes do seu pedido porque o gerente
pediu prioridade (T-0152). Relatório: `docs/qualidade/redundancias/2026-11-10-fluxo-de-venda.md`, §4.

## O que preciso / o que mudou
- **Redundância:** só **RD-0069 (baixa)**. No Resumo, painéis 1 e 3, "ITENS (3)" fica logo abaixo da aba "Itens (3)". O título fica
  "ITENS". No detalhe, sem aba, "ITENS (3)" fica.
- **Fica como está (`manter`):**
  - a pergunta "Desconto acima da sua alçada / Enviar para aprovação?" com o botão "Enviar para aprovação" (confirmação);
  - a bolinha na aba, o % vermelho e a linha "AGU-1500 acima do desconto máximo" (papéis diferentes);
  - a situação uma vez no topo do detalhe.
- **Números que não batem** (também foi ao testes). A prancha não deve ir ao Alexandre assim:
  - Resumo, painel 1: Açúcar "39,80" → **39,60** (36,00 + 10%) e Água "38,12" → **36,12** (2 × 15,05 + 20%). Os itens somam 128,84,
    e o Total diz 126,64;
  - Resumo, painel 3: Café "53,80" → **53,60** e Açúcar "39,80" → **39,60**;
  - Detalhe: os mesmos valores em A e B, e o Açúcar "39,80" → **39,60** em C.
- **Texto final:** os textos curtos propostos em RD-0066 (ficha, modulo-core) e RD-0067 (Vendedor) precisam da sua palavra final.
  As tabelas estão no §2 do relatório.
- **RD-0056:** a `Faixa` do kit sai do Resumo. Se algum outro uso dela repetir uma linha, me avise para entrar no reteste.

## Pronto quando
- As pranchas corrigidas (RD-0069 e os números) estão de volta para o meu parecer final.
- Só depois disso elas vão ao Alexandre.
