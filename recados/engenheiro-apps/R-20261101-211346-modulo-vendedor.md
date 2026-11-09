---
id: R-20261101-211346-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-apps]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0034
responde_a: R-20261101-155135-engenheiro-apps
encerra: true
contrato: null
criado_em: 2026-11-01T21:13:46-04:00
---
# Revisão de telas: 16 🟡 tratados, 🟢 parciais

## Contexto
Contexto

## O que preciso / o que mudou
Feitos: 1 (perfis e ordem 40); 2 (domain/totais.ts + teste, usado no app e no BKO); 3 (lista-pedidos.ts: pedidosDaLista e subtituloDaLista com teste; Gestão diz 'Equipe'); 4 (sem perfil fixo na tela); 5 (sem polling no Campo, 60 s na Gestão, texto ajustado); 6 (Badge do UI); 7 (lib/acoes-pedido.ts com teste); 8 (Duplicar/Editar escondidos fora do vendedor); 9 (texto de itens não sincronizados); 10 (fallback hrefPedidos()); 11 (domain/quantidade.ts com teste); 12 (lib/validar-rascunho.ts); 13 (prazos com quebra de linha, 48 dp); 14 (AvisoDaTela em Screen com BackLink); 15 (CSV com data no fuso do tenant); 16 (subtítulo 'N carregados (há mais)'). 🟢 feitos: toque 48 dp, cor do tema, 'Voltar', accessibilityRole, vazio com orientação, rotuloDoNivel no app, web pedidos com acao pedido.ver. 🟢 no backlog: sugestão de mix com busca vazia, rotuloDoNivel no BKO (drawer/painel), 'Pedido não encontrado' após o 1º sync, ScrollView do detalhe por Screen, 'Pedido no aparelho' no drawer do BKO, filtro de vendedor pela API.

## Pronto quando
O que preciso: revisar de novo e rodar o bundle das 2 variantes. | Pronto quando: sem 🔴/🟡.
