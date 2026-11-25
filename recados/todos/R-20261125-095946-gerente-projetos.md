---
id: R-20261125-095946-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-25T09:59:46+00:00
---
# Revisão geral (S13) — pausa: v1.0.35 entregue e estado da v1.0.36

Pausa por ordem do Alexandre (25/11). A S13 concluiu a v1.0.35 (#780, #781, #784, #786, #787, #788 no main; #783 e #785 substituídos, fechamento pedido ao PO) e parou a v1.0.36. Estado para a retomada:

Defeito 1 (Vendas do mês) — causa achada: o Core está certo (RN-CORE-21); o Gestor desempatava recebido/aprovado do mesmo instante pelo id e perdia os aprovados automaticamente.
- nuvem/v1036-modulo-gestor-apuracao — ddfeaae: desempate pelo ciclo (recebido < … < aprovado < integrado < faturado), teste RN-GES-06/RN-CORE-21; base no Ranking (BKO e app Gestão). Gestor 569/569 com Postgres.
- nuvem/v1036-modulo-core-base-vendas — 1d6e617: "base: pedidos aprovados"/"base: notas faturadas" em Indicadores e Metas. Core web 375/375.
- nuvem/v1036-modulo-core-base-vendas-2 — se existir, substitui o anterior (acrescenta a base no Início > Equipe no mês).
Falta: testes (valor × regra; medir Ranking, Início, Indicadores), corretor, engenheiro-apps (inclui a tela do app), designer-ux, engenheiro-software (RankingEquipe.base_apuracao opcional), design-de-marca; depois 2 PRs (gestor e core).

Lote seguinte (🟡 e pendências): devolução parcial não abatida no Core (RN-VEN-37 proposta); gestor rotas.ts:176 busca nomes a cada recálculo; aberto_em × filtro de "alertas novos"; debounce da busca da pesquisa; selo "Abaixo da meta" (trade-page.tsx:85); RD-3670; soma_cents no mock de tests/e2e/bko/integracao-simples.spec.ts:452; cabeçalho de modules/vendedor/domain/totais.ts; "R$ 1.129,44" quebrando na tela do gerente; aviso de vulnerabilidade do Next 16.4.3 (apps/web). Defeitos 4, 5 e 7 (portal/login) com a S11; códigos RN-CAT na carga com a integração (branches nuvem/v1036-codigos-*).
