---
id: R-20261111-091945-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T09:19:45-04:00
---
# T-0159: PDF horizontal no código (4 versões)

Feito: A4 paisagem, itens 15px/rótulos 10,5px/total 26px, ficha #F1F2F0, cabeçalho de tabela #00843D (constante COR_CABECALHO_TABELA, provisória), Total em caixa (escritório: Tabela e Desconto dentro, Histórico ao lado), logo sempre presente. Orçamento sem Alertas. Arquivos: modules/vendedor/domain/pdf-pedido.ts, domain/logo-padrao.ts (novo), domain/pdf-pedido.test.ts. Premissa: tenant não tem campo de logo, então vale sempre a do app (icon.png reduzido a 192px, 40 KB); ctx.logo_src opcional já aceito. Testes: 64 verdes (pdf-pedido + order-pdf). Pendências: tsc/eslint conferidos ao final; sem commit; designer-ux e corretor avisados; testes avisado sobre tfoot→totalbox.
