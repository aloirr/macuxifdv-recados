---
id: R-20261103-183257-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T18:32:57-04:00
---
# Status 18h — T-0071: fatias 1 a 5 prontas na árvore (0 🔴); commit no main assim que a raiz der verde; plano até o APK de 05/11

## Contexto
Contexto: status das 18h (enviado 18h30). A demo continua no ar com o código de ca61571; nada rodou no Postgres 5432.

## O que preciso / o que mudou
O que entrou (pronto e revisado, AINDA NÃO no main; o commit sai quando a validação da raiz pelo testes der verde, previsão até 19h30): (1) banco-dados: migração 0020 com up e down (R$ no item e no pedido, ajuste_em, catalogo.produto_relacao com RLS, índice dos orçamentos abertos), espelhos Drizzle e base demo da referência (Mini Box Japiim C5110, café CX R$ 215,46, complementares e água 1,5 L). Na base: o Mini Box deixou de ser o cliente bloqueado, papel que passou para a Mercearia do Porto. (2) modulo-vendedor, domain e contratos: o caso da referência fecha em teste (398,30 / 14,67 / 3,84 / 379,79 / 4,6%), mais validade por data civil, Transformar e Duplicar completos, sugestões e contratos aditivos. (3) modulo-catalogo: catalogo.sugestoes_pedido@1 no aparelho e na API, embalagens[] e o pull de produto_relacao. (4) Componentes do novo pedido em packages/ui (feitos antes da troca de dono; o designer-ux refaz o visual na T-0072). (5) modulo-vendedor, API: repositório SQL do orçamento, pull com orçamento, receber com R$, PUT e cancelar do orçamento, lista com tipo e PDF 'Orçamento'. Revisão do engenheiro-software: 0 🔴 nas fatias 2 a 4; a 5 é revisada amanhã cedo.

## Pronto quando
Pendências: 🟡 pedidoDoOrcamento copia % e R$ juntos (com o vendedor); 'bloqueado' não existe em core.cadastro_resumo@1 (o Core acrescenta na T-0073); a demo só recebe a 0020 quando for reiniciada, sem derrubar sem sua ordem. | Plano até 05/11: HOJE à noite, designer-ux nos tokens e na base da T-0072 (depende do agente carregar, ver R-20261103-172706) e desenho da T-0073 (engenheiro-software, até 19h). 04/11: 8h revisão da fatia 5; 9h nuvem modulo-core T-0073 (eu mando o prompt); 9h–11h base visual T-0072; 12h fatia 6, telas das 3 abas, folha do Salvar, orçamento e Transformar (vendedor, já no visual novo); tarde: transições do shell (engenheiro-apps), regressão do Gestor (meta/ranking sem orçamento), e2e do testes; nuvem: visual das telas de core, catálogo, promotor, gestor, pesquisa e treinamento. 05/11: até 12h telas da T-0071 e Início (T-0073); 12h–15h revisões (designer-ux visual, engenheiro-apps técnica); 15h–18h revisão final e build de preview Campo/Gestão. Cortes, se atrasar, na ordem do desenho: clientes parecidos → versão superior → Editar do orçamento recebido.
