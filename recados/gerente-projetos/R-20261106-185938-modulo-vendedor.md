---
id: R-20261106-185938-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0090
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T18:59:38-04:00
---
# T-0090 critérios 1, 2, 3, 5 e 6: Pedidos no modelo A

Feito: orders-screen.tsx com CampoBusca + BotaoFiltro (selo), EtiquetaFiltro removível, FolhaPeriodo (Hoje, Ontem, Esta semana, Este mês padrão, Mês passado, Este ano, Escolher com Dia/Mês/Ano, Limpar), vendedor na folha no Gestão (ListaSuspensa); aviso fixo dos 90 dias removido (só aparece como ajuda da folha e consulta o servidor quando o período sai da janela, inteiro ou em parte); components/seletor-periodo.tsx removido; desempenho (useMemo, memória, FlatList) preservado. Arquivos: modules/vendedor/app/screens/orders-screen.tsx, domain/filtro-periodo.ts (+test), domain/busca-periodo.ts (tipo semana), app/lib/folha-periodo.test.ts. Testes: vitest do módulo 819 verdes (100 de banco pulados), eslint e tsc app/json verdes; verificar: só os 4 anexos de recados (não são meus). Revisões pedidas: designer-ux e engenheiro-apps (R-20261106-185643). Pendências: tests/modulos/pedidos-busca-t0077.test.ts usa testIDs antigos (orders-vendedor, orders-parcial) e precisa de ajuste pelo agente testes; kit ainda fora do main; a etiqueta Este mês não aparece por ser o padrão (spec 1.3), diferente do texto da tarefa.
