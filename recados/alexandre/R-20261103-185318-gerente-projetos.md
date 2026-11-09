---
id: R-20261103-185318-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0072
responde_a: R-20261103-161508-alexandre
encerra: false
contrato: null
criado_em: 2026-11-03T18:53:18-04:00
---
# Status 19h — plano e numeração da T-0071/T-0072/T-0073 até o APK de 05/11; 4 sessões da nuvem com prompt

## Contexto
Contexto: resposta ao item 5 do R-20261103-161508. Numeração: T-0072 = novo visual; T-0073 = boas-vindas; migração 0020 = T-0071 (pronta na árvore); 0021 = recado do dia da T-0073 (banco-dados, 04/11 até 10h). Desenho da T-0073 pronto em docs/desenho/T-0073.md: core.inicio@1, domain meta-do-dia com 8 casos, recado do dia como colunas em core.notificacao e card 'Pedidos para aprovar' do Gestor no slot inicio.cards. RN-CORE-26, inicio.parado_min=60 e as notas no doc 03. Governança: ver R-20261103-172706 (falta .claude/agents/designer-ux.md e 4 testes do coord).

## O que preciso / o que mudou
NUVEM, para você mandar os prompts: (N1) 04/11 9h–20h, modulo-core, nuvem/T-0073-boas-vindas: prompt PRONTO no §6 de docs/desenho/T-0073.md. Peço acrescentar ao fim: '8. contracts: campo opcional bloqueado em core.cadastro_resumo@1 (aditivo), para o Vendedor aplicar a RN-VEN-13 ao cliente bloqueado; depois, o visual da T-0072 nas telas de modules/core/app, no mesmo PR, quando a base do packages/ui estiver no main'. (N2–N4) a partir de 04/11 ~12h, depois do merge da base da T-0072: visual novo nas telas do app de modulo-promotor (nuvem/T-0072-visual-promotor), modulo-pesquisa (nuvem/T-0072-visual-pesquisa) e modulo-treinamento (nuvem/T-0072-visual-treinamento). Prompt de cada uma: 'Você é o agente modulo-<m> do Macuxi FDV. Tarefa T-0072 (.coord/tarefas/T-0072.md). Branch nuvem/T-0072-visual-<m> a partir do main. Altere SÓ modules/<m>/app/**. Aplique os tokens e componentes do packages/ui (versão do main) e o guia docs/design/referencia-2026-11-03/Componentes.dc.html (+ docs/design/*.md do designer-ux): um só botão principal por tela, botões em níveis, chips de estado com texto, folha de baixo para cima, textos curtos sem frase explicativa. Nenhuma regra muda; se precisar, anote no PR. Lint, typecheck e test do pacote verdes; PR para o main com antes/depois por tela.'

## Pronto quando
LOCAL (no máximo 4): HOJE à noite: commit da T-0071 (fatias 1 a 5) quando a raiz der verde; 🟡 do vendedor (Transformar com % e R$ juntos) e usaConsultas sugestoes_pedido@1. 04/11: banco-dados 0021 (até 10h); designer-ux, base da T-0072 (até 11h) e docs/design/inicio.md (até 10h), se o agente já tiver carregado; engenheiro-software, revisão da fatia 5 (8h); 12h modulo-vendedor nas telas da T-0071 já no visual novo; tarde: engenheiro-apps nas transições do shell, modulo-gestor (card do Início + visual das telas do Gestão, local para não colidir), modulo-catalogo (visual das telas do Catálogo, local porque a T-0071 mexe no módulo) e testes (e2e da T-0071). 05/11: até 12h, telas da T-0071 e Início no shell (engenheiro-apps); 12h–15h revisões (designer-ux visual, engenheiro-apps técnica); 15h–18h revisão final, merges da nuvem e build de preview Campo/Gestão. | Riscos: o designer-ux ainda não carrega (sem a definição do agente, a base da T-0072 atrasa e a fatia 6 da T-0071 começa no visual atual, ajustado depois). A fila do EAS levou ~60 min hoje: o build sai às 16h de 05/11 para ficar pronto às 18h. Cortes na ordem do desenho da T-0071; na T-0072, o BKO web fica fora (backlog).
