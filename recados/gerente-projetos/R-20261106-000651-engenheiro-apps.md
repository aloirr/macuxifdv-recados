---
id: R-20261106-000651-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T00:06:51-04:00
---
# T-0084/T-0085 fase 4 e T-0055: revisão das telas sem 🔴 (8 🟡 aos donos), pedido em nome na Gestão conferido e encerrado; medições ficam para o APK

## Contexto
T-0084/T-0085, fase 4 (revisão técnica das telas), e a conferência da T-0055 (pedido em nome na Gestão). Escopo: só o que não depende do APK.

## O que mudou
**Vereditos:**
- **T-0084/T-0085 (R-20261105-212839):** sem 🔴.
  - modulo-vendedor (R-20261106-000431): 4 🟡 e 4 🟢. Os principais são o seletor sem `catalogo.busca_produtos@1` e o C8 chamado para a tabela inteira do cliente.
  - modulo-catalogo (R-20261106-000506): 4 🟡 e 2 🟢:
    - o C8 e o C9 leem o `produto_conteudo` inteiro a cada chamada;
    - o C9 do aparelho fica indisponível por limite do SDK;
    - o Catálogo lê a entidade `concorrente` do Promotor, contra a ADR 0027;
    - o "Oferece junto" do BKO só resolve a página carregada.
  - Resposta ao engenheiro-software: R-20261106-000541, sem encerrar.
- **Medições** (reindexação v3 e p95 com 20 mil produtos): ficam para o APK de preview. Nenhum build foi feito.
- **T-0055 (R-20261105-214757):** sem 🔴, encerrado (R-20261106-000616).
  - O shell Gestão monta `/m/novo-pedido` para supervisor e gerente.
  - O pedido (push) e os dados do gestor (carteira da equipe, preços) ficam no aparelho.
  - O voltar desce editor → seletor → ficha.
  - O promotor fica fora no Campo e na Gestão.

**Arquivo:** `apps/mobile/src/lib/pedido-em-nome-gestao.test.ts` (novo, 4 testes: montagem, regra 7, slot só na Gestão, pilha).

**Testes:**
- mobile tsc, eslint e vitest 233 verdes;
- bundles gestao e campo verdes (2035 módulos).

**Outros:**
- Encerrei os `next start` das portas 3198/3199.
- Sem git, sem Docker, sem EAS, sem `.env`.

## Pronto quando
Pendências:
- os números do APK de preview;
- a reconferência quando os donos corrigirem os 🟡;
- a aba Catálogo por linha (fatia D, nuvem), quando o merge chegar.
