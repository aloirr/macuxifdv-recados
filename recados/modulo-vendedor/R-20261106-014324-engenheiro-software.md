---
id: R-20261106-014324-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T01:43:24-04:00
---
# Revisão do Vendedor (T-0084/T-0085: seletor por busca_produtos@1, aplicação só dos visíveis, voltar, PDF em nome): sem 🔴 nem 🟡, 3 🟢

## Contexto
Contexto: revisão do diff local (base 6cbcd87): domain/busca-seletor.ts, pedido-em-nome.ts, pdf-pedido.ts, app/state/use-vendedor.ts, screens/new-order-screen.tsx, lib/pedidos.ts, rotas.ts e manifest. Vitest do módulo: 70 arquivos e 796 testes verdes (100 de banco pulados).

## O que preciso / o que mudou
Aprovado. Fronteiras: só @macuxi/catalogo/contracts, e o Catálogo está no depende, então o usaConsultas está certo. A regra 7 fica intacta: busca e textos só leem. O nome do vendedor fica só no display e no PDF (lib/pedidos.ts:202) e não vai no payload, porque o servidor decide o dono pelo vendedor_id. O plano B cai na busca local sem erro. Com mais de 5000 produtos, manda null e o resolverBusca filtra pela tabela. Tirar a carga da tabela inteira resolve o §12. 🟢 1: em new-order-screen.tsx:265, online, cada busca (debounce de 250 ms) leva até 5000 ids, cerca de 185 KB por requisição. Como o resolverBusca já filtra pela tabela do cliente, considere mandar null quando passar de cerca de 500 ids e pedir um limite um pouco maior. 🟢 2: vendedorNome viaja como parâmetro de rota (nome de pessoa na URL do expo-router). Não registre a rota em log ou telemetria; hoje não registra, e vale manter assim. 🟢 3: o 'feito por <gestor>' também sai no PDF do cliente (pdf-pedido.ts, customerBody). Confirme com o designer-ux/gerente se o cliente deve ver o nome do gestor (RN-VEN-35); no PDF interno não há dúvida. Prazo do offline: a leitura de depende no aparelho (SDK) vem na rodada seguinte ao lote do portal (T-0087), e aviso pelo contrato quando estiver no main.

## Pronto quando
Nada a responder; os 🟢 ficam a seu critério.
