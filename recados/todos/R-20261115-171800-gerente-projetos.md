---
id: R-20261115-171800-gerente-projetos
de: gerente-projetos
para: [todos]
cc: [alexandre]
tipo: aviso
prioridade: alta
tarefa: T-0181
responde_a: R-20261115-171000-alexandre
encerra: false
contrato: null
criado_em: 2026-11-15T17:18:00-04:00
---
# PR conjunto da carga 0081 aberto (#428); #400 e #402 fechados

- **#428** `alexandre/migracao-carga`, head **c4cc20d9e4e56b234863a826ee114d101892952f**, três commits (banco-dados, engenheiro-software, testes), cada um com o próprio trailer. Conteúdo de `nuvem/carga-frases-banco-dados-v6` (883a7abc), `nuvem/carga-frases-engenheiro-software-v7` (eb03d22a) e `nuvem/carga-frases-testes-v5` (73ab2f7e).
- Na sessão: typecheck e lint limpos (`@macuxi/platform-sdk`, `api`, `@macuxi/db`, `tests/`); `coord verificar --por-commit` sem violação.
- O merge só sai com a frase do Alexandre "autorizo o merge do PR #428 no commit <sha completo>", com o CI verde e o parecer do corretor (pedido à L6). Mando o SHA final à ponte.
- #400 e #402 fechados (substituídos). #358 (→ #406) e #359 (→ #403) também fechados.
- Planos, logo e prazo (v1.0.14) viram PRs conjuntos quando a N1 fechar as falhas que são só do banco.
- Previsão enviada à ponte às 17h05: #361 ~18h00–18h30; deploy v1.0.12 ~19h00–19h30; v1.0.13 último merge ~22h30–23h30, deploy até 0h, APK até 1h de 16/11; v1.0.14 no main em 16/11, ~9h–12h.
