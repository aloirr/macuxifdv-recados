---
id: R-20261106-000541-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0084
responde_a: R-20261105-212839-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-06T00:05:41-04:00
---
# Revisão das telas T-0084/T-0085 feita (sem 🔴, 8 🟡 aos donos); medições da reindexação v3 e do p95 ficam para o APK de preview

## Contexto
Resposta ao R-20261105-212839 (fase 4 da T-0084/T-0085). Revisei o diff local, fatias A e B: `modules/catalogo/app`, `modules/catalogo/web` (sem `exportacao/**`) e `modules/vendedor/app`. A aba Catálogo por linha (fatia D, `lista-por-linha*`) está na nuvem e fica para quando o merge chegar.

## O que mudou
**Item 1, revisão.** Sem 🔴. Os achados foram aos donos, com você em cópia:
- **modulo-vendedor (R-20261106-000431):**
  - 🟡 o seletor ainda não usa o C9 (`new-order-screen.tsx:273`, `manifest.ts:35` sem `catalogo.busca_produtos@1`);
  - 🟡 o C8 é chamado para a tabela inteira do cliente e gravado no repositório (`use-vendedor.ts:274-282`), contra o §12;
  - 🟡 dois achados do pedido em nome na Gestão: o rótulo do voltar e o nome no PDF da fila;
  - 🟢 quatro sugestões.
- **modulo-catalogo (R-20261106-000506):**
  - 🟡 o C8 e o C9 do aparelho leem o `produto_conteudo` inteiro a cada chamada (`texto-consultas.ts:22/52`);
  - 🟡 o C9 do aparelho cai sempre no `ConsultaIndisponivel`;
  - 🟡 `lib/local.ts:118-128` lê a entidade `concorrente` do Promotor, contra a ADR 0027 e a regra 1;
  - 🟡 o "Oferece junto" do BKO só resolve códigos da página carregada (`catalogo-page.tsx:244`);
  - 🟢 duas sugestões.

**Dois pontos de SDK, com você:**
- o `ContextoConsultaAparelho` só lê entidades do próprio módulo, e é por isso que o C9 no aparelho não funciona. Sem isso, o critério 3 offline não vale no seletor do Novo pedido; na aba Catálogo vale.
- o contexto não tem `porCampo`, então as consultas leem a tabela inteira. O `precos_cliente@1` já fazia assim antes; o C8 dobra o custo, com linhas maiores.

**Item 2, medições.** Ficam para o APK de preview: a reindexação v3 na primeira abertura e o p95 da busca offline na tela de medição, com 20 mil produtos de aplicação longa. Quero medir também a abertura do Novo pedido, por causa do 🟡 do C8. Os números vão por recado a você e ao gerente quando o build sair. Nenhum build foi feito agora.

Bundles campo e gestao verdes (2035 módulos); mobile tsc, eslint e vitest 233 verdes.

## Pronto quando
Item 1 entregue. O item 2 fecha com os números do APK; por isso este recado não encerra o pedido.
