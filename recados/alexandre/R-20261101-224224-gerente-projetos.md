---
id: R-20261101-224224-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: null
responde_a: R-20261101-214812-alexandre
encerra: false
contrato: null
criado_em: 2026-11-01T22:42:24-04:00
---
# Prazo 06/11: datas no doc 05, T-0051..T-0058 reservadas para a nuvem (uma sessão por módulo) e progresso do dia

Contexto | R-20261101-214812. No main em 1a2da75: doc 05 com as datas-alvo, o plano de paralelismo e a sua premissa de 'completo' (aceita; carga de 20 mil SKUs e onboarding vão para antes do piloto, no backlog). Fichas criadas em .coord/tarefas.
Nuvem — uma sessão por módulo, com modules/<m>/** (menos db) e docs/modulos/<m>/** travados. Cada sessão começa pelas telas, contratos e domain e liga as rotas quando a migração do módulo chegar ao main:
- T-0051 Integração: monitor básico no BKO (só modules/integracao/web/**; api está com a T-0032 local). Pode abrir já.
- T-0052 Catálogo (Sprint 3): rota de busca, ficha, telas do app (aba Campo, offline FTS5) e BKO de conteúdo. Pode abrir já; a cota e a base demo ficam com o banco (0013).
- T-0053 Vendedor parte 1 (Sprint 4): pré-venda e envio ao ERP pelo Hub. Pode abrir já.
- T-0054 Vendedor parte 2 (Sprint 5): retorno/faturado no app e devolução. Começa depois do merge da T-0053 (mesma trava).
- T-0055 Gestor (Sprint 6): rotas e telas (Equipe/Aprovações), licença do Gestor na demo. Pode abrir já.
- T-0056 Promotor (Sprint 7): rotas das coletas, aba Loja, BKO de trade. Pode abrir já.
- T-0057 Pesquisa (Sprint 7): construtor, resposta no app, resultados. Pode abrir já.
- T-0058 Treinamento (Sprint 8): rotas, jornada no app, BKO. Pode abrir já.
Local (3 agentes): banco-dados com 0013 (Catálogo+Vendedor), 0014 (Gestor), 0015 (Promotor), 0016 (Pesquisa) e 0017 (Treinamento), todas até 03/11; engenheiro-software (T-0032, T-0039, revisões); engenheiro-apps (abas, shells); testes (e2e por sprint).
Progresso de hoje (estimativa):
- Sprint 2 ~75% (migrações e rotas/handlers do Hub prontos; Conector 1.2.1). Falta: lint do domain, consumidores A7/A8, parcial→total, piso 1.2.1, monitor, carga por arquivo, ciclo e2e.
- Sprint 3 ~30%, Sprint 4 ~50%, Sprint 5 ~15%, Sprint 6 ~40%, Sprints 7 e 8 ~25% (domínios prontos), Sprint 9 ~10%.
Risco: o banco é o caminho crítico (5 migrações até 03/11). Se apertar, proponho cortar a carga por arquivo da Sprint 2 para o backlog.
Fechamento da rodada local: o lint da raiz ficou vermelho pelo domain da integração (node:crypto no SHA-256). O modulo-integracao está corrigindo agora; depois faço checks, commit, push e te aviso para reiniciar o VS Code.
