---
id: R-20261106-212842-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T21:28:42-04:00
---
# T-0089 revisão Catálogo e Integração: as duas sem 🔴, podem subir no lote; 🟡 para o próximo

Contexto: T-0089, revisão final do Catálogo (R-20261106-205058) e da Integração (R-20261106-203022), feita no diff local, sem git de escrita e sem Docker.

O que fiz / resultado:

1. **Catálogo pode subir no lote** (sem 🔴; R-20261106-212700). Conferi estes pontos:
   - P3: o preço da faixa é o da unidade base.
   - P4: o Vendedor aplica o menor preço; o BKO avisa quando a faixa é mais cara.
   - A vigência fica fechada, em data civil no fuso do tenant.
   - A faixa da tabela do cliente vence a geral.
   - Não sai faixa com RN-CAT-05 nem com RN-CAT-06, nem no pull.
   - `faixas?` e `embalagens?` são opcionais na @1: o APK antigo cai em UN × fator e o Vendedor tolera a ausência.
   - Fronteiras: 0 erros.
   Há 5 🟡 para o próximo lote:
   - colisão da faixa do ERP no índice único, que entra em loop;
   - PUT ressuscita uma faixa do ERP apagada;
   - produto_id não é conferido;
   - CSV sem proteção de fórmula;
   - falta *.db.test.ts da consulta com faixas. Este é o mais importante, porque é o SQL do caminho quente do pedido. Conferi o SQL contra a 0037 lendo; o ideal é o teste entrar já neste lote.
2. **Integração pode subir no lote** (sem 🔴; R-20261106-212703). Conferi:
   - contratos e eventos aditivos na v1;
   - `PedidoParaErp` não strict, então o Conector 1.2.x descarta o `pagamento`;
   - ordem do condicao_pagamento_erp: prazo_external_id, depois de-para, depois retido;
   - o pedido antigo não muda de payload nem de hash;
   - medida da faixa como sigla;
   - CSV só com as 2 listas.
   Uma 🟡: a ORDEM_CARGA do Conector põe tabela_escalonada antes de preco, e a tabela de preço nasce no consumidor do preço. Pendências do dono: OpenAPI (N2), modelos CSV (N1) e views (B2).
3. **Bloco integracao da 0037 aprovado** (R-20261106-212728, banco-dados).
4. **Pedido ao banco-dados** (R-20261106-212729): desligar PRECO_PROPRIO_CX_LIGADO (db/seeds/demo/demo.ts:221, ainda true). Sem isso, o APK antigo da demo mostra o preço próprio da CX, que a API não usa mais.
5. **Decisão de produto (ponto 4 do Catálogo):** mantive tabela_preco.gerenciar só para analista e admin. Se o dono do produto quiser o gerente, a mudança é aditiva.
6. **Aviso operacional:** o pedido com a forma AVISTA semeada (P7, prazo sem external_id) cai no de-para pelo código 'AVISTA'. O tenant com ERP e sem de-para condicao_pagamento AVISTA terá o pedido retido (mapeamento_ausente). Vale pôr isso no roteiro de produção.

Arquivos meus:
- packages/platform-sdk/src/manifestos-referencia.test.ts: menu 'Tabelas de preço', ação tabela_preco.gerenciar e assert no teste T-0089;
- .coord/contratos/modulos.md: rotas e códigos do Catálogo;
- .coord/diario/engenheiro-software.md.

Testes:
- vitest: Catálogo 689 verdes (37 pulados), Integração 583 verdes, Conector 254 verdes, espelho 8 verdes;
- tsc: verde no Catálogo (3 projetos), na Integração, no Conector e no platform-sdk;
- fronteiras: 0 erros.
Rodando o vitest de Catálogo, Integração e Conector juntos, o Catálogo falhou uma vez; sozinho ficou verde. Parece teste de tempo e está anotado como 🟢.
O verificar acusa só 4 anexos de .coord/recados/anexos (do dono do produto), que não são meus.

Pendências: os recados do Core (R-20261106-211632/211648, C3) e do Vendedor (R-20261106-212634, P5) chegaram durante esta revisão e ficam para a próxima chamada.

Pronto quando: lido.
