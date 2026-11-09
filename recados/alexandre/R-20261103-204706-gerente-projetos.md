---
id: R-20261103-204706-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T20:47:06-04:00
---
# Fim de dia 03/11 — % por sprint (doc 05), quadro atualizado, commits da T-0071 e da governança prontos (push quando a raiz fechar verde)

## Contexto
Contexto: regra do doc 05 (recado de fim de dia com o % de cada sprint e o que fica para amanhã). Estimativa do gerente pelo quadro atualizado agora: 20 linhas que estavam com status antigo foram corrigidas pelo git (T-0014, 0023, 0025, 0032, 0034, 0035, 0038, 0047, 0052, 0059, 0060, 0061, 0062, 0063, 0064, 0065, 0066 e 0070 → concluída; T-0071 e T-0073 com o andamento real).

## O que preciso / o que mudou
% POR SPRINT: Sprint 0 Fundação 100%. Sprint 1 Core 97% (T-0008 P4/P7 no aparelho). Sprint 2 Integração 95% (T-0032 fechada com e2e do ciclo e carga por arquivo; abertas a T-0024, payloads restantes, e a T-0039, checkout validado na API). Sprint 3 Catálogo 100% (busca online/offline, ficha, BKO; sugestões entram pela T-0071). Sprint 4 Vendedor parte 1 72% (pré-venda, envio ao ERP, cadastro mínimo, preço mínimo, medidas e 3 abas v1 concluídos; T-0071 ~50%: fatias 1–5 de 11 prontas; T-0072 0%; T-0073 10%, desenho). Sprint 5 Vendedor parte 2 95% (retorno, faturado e devolução no main; falta o e2e do faturado no aparelho). Sprint 6 Gestor 90% (painéis, ranking, aprovações, pedido em nome; card do Início na T-0073). Sprint 7 Promotor + Pesquisa 90% (coletas, Loja, BKO de trade, construtor e resultados; visual novo na T-0072). Sprint 8 Treinamento 90% (jornada, BKO, timer da lição; visual na T-0072). Sprint 9 Robustez 15% (banco de testes 5434, carga leve S0-110, sem dado pessoal em log; faltam checklist LGPD/segurança, observabilidade mínima e o passo pnpm timers no CI).

## Pronto quando
HOJE: 7 commits da T-0071 por dono (0020 + base demo, catálogo, vendedor, packages/ui com o donos.json antigo, testes, desenhos, coord) e o commit da governança (Agente: alexandre: donos.json, coord-lib, coord-verificar.test, docs/design/referencia-2026-11-03 e seus recados). verificar --por-commit OK nas duas etapas. O push vai em 2 etapas, porque o CI confere todos os commits pelo donos.json do último: primeiro a T-0071, depois a governança. Sai assim que o pnpm test da raiz (concorrência 1, banco 5434) terminar verde; lint e typecheck já verdes. Premissas da T-0073 registradas como decisão na tarefa. | ATENÇÃO: .claude/agents/designer-ux.md AINDA NÃO está na pasta (conferido às 20h45), e o .claude/agents/engenheiro-apps.md continua diferente de _instalar/agentes-novos/. Eu não copio (caminho seu). Quando copiar, eu faço o commit separado com Agente: alexandre. Os agentes da T-0071 estão LIVRES: pode reiniciar o VS Code depois do meu aviso de push, porque o reinício derruba o teste da raiz que está rodando nesta sessão. | AMANHÃ 04/11: 8h revisão da fatia 5 + 🟡 do vendedor (Transformar com % e R$ juntos, usaConsultas); 9h nuvem T-0073 (prompt no §6 do docs/desenho/T-0073.md + item 8 do bloqueado); designer-ux na base da T-0072 (se carregar hoje, começa à noite) e docs/design/inicio.md; 10h 0021; 12h telas da T-0071; ~12h nuvem do visual (promotor, pesquisa, treinamento). Cortes, se precisar, na ordem do desenho da T-0071.
