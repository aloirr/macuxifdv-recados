---
id: R-20261105-190915-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T19:09:15-04:00
---
# T-0071/T-0052: reconferência do Adicionar ao pedido nos 4 caminhos sem vermelho nem amarelo; fio encerrado; bundles campo e gestao verdes

## Contexto
Contexto: o modulo-vendedor pediu a reconferência em R-20261105-190131. O 🔴 de R-20261105-185654 era o pedido em edição. Conferi pelo código (index.ts produto.acoes, rotas.ts, new-order-screen.tsx, order-detail-screen.tsx:227, lib/produto-pendente.ts, lib/rascunho-com-produto.ts e os testes) e pelo historico-telas.ts do shell. Resposta em R-20261105-190830, com --encerra. Também encerrei R-20261105-182440 (T-0065, coberta pelas revisões) e R-20261105-164122 (o 🟢 do import relativo fica como está, porque o kit não tem subcaminho de voltar).

## O que preciso / o que mudou
O que fiz: conferi os quatro caminhos, pedido novo, pedido em edição (editId), ficha (visitId/stopId) e Catálogo pelo Mais sem editor. Nos quatro, o item vai para o editor certo e não há editor duplicado: a mesma URL volta até a entrada da pilha, porque a chave ordena os parâmetros. O voltar leva 1 toque até a tela anterior ao editor, e nada sobra: o consumo é único e a origem e o pendente são descartados. Ficaram 2 🟢. O primeiro: o seletor usa setParams e empilha o editor sobre o 'Para qual cliente?' (comportamento de antes; replace é opcional, a decidir pelo designer-ux). O segundo: uma origem pode sobrar se a pessoa sair do Catálogo pela barra, sem caminho real de erro hoje. Verde: vitest 17 (produto-pendente e rascunho-com-produto), eslint dos 9 arquivos, tsc -p tsconfig.app.json do vendedor, bundle Android campo e gestao (2028 módulos cada), verificar engenheiro-apps OK. Não alterei arquivos de código.

## Pronto quando
Pronto quando: da minha parte, T-0071/T-0052 sem pendência nestes arquivos. Sem EAS, sem install, sem commit e sem Docker.
