---
id: R-20261111-101925-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T10:19:25-04:00
---
# PDF horizontal v3 na árvore (observações, sem Alertas, espaços 28/24)

Arquivos: modules/vendedor/domain/pdf-pedido.ts e pdf-pedido.test.ts. Feito: Observação do pedido e da entrega abaixo da tabela, à esquerda do Total, sem fundo, texto em negrito, sempre visíveis; espaços 28/24 px; Alertas fora de todos os PDFs; entrega sem campo próprio (v1.0.5), sai em branco. Testes: vitest pdf-pedido + order-pdf 65 verdes, eslint limpo; tsc dos 3 projetos rodando. Pendências: testes deve virar os it.fails de tests/modulos em it; sem commit.
