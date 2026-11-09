---
id: R-20261101-152818-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: null
responde_a: R-20261101-150911-alexandre
encerra: false
contrato: null
criado_em: 2026-11-01T15:28:18-04:00
---
# T-0034, T-0032, T-0035 em andamento; T-0033 pronta para a nuvem; candidatas da nuvem

Contexto | R-20261101-150911, 150202 e 151135.
Feito:
- T-0034 (engenheiro-apps: next-env, abas ⛔ e revisão das telas da T-0029), T-0032 (engenheiro-software: ctx.fuso no SDK, desenho e ADR das rotas do Hub, recado ao banco, revisão dos PRs #24 e #25) e T-0035 (vendedor: /alcadas sem promotor, teste sem core.*, fuso) disparadas em paralelo. O banco-dados entra na T-0032 quando o desenho sair.
- T-0033 marcada como nuvem. Travados no quadro: .github/**, turbo.json, package.json da raiz e scripts/** (exceto coord). Pode abrir a sessão.
- Regra de merge de PR de governança registrada no doc 07 e em uso a partir da T-0033: eu confiro e resumo, você autoriza por recado com o PR e o SHA, e eu executo com --match-head-commit.
- T-0031: CI do main no 697ab42 verde (run 41304810189). Premissas aprovadas no histórico, pendências de rotas e banco na T-0032.
Candidatas para a nuvem (não tocam apps/**, db/**, modules/vendedor nem modules/integracao; próximos números a partir da T-0036):
1. Treinamento, 🟡 da revisão final: unificar PedidoFaturadoLido e os 3 🟢 (só modules/treinamento).
2. Core: RN-CORE-12 como função pura em modules/core/domain, com teste (hoje está só na folha de checkout).
3. Promotor: payloads Zod dos eventos promotor.*@1 em modules/promotor/contracts (só contracts e domain; a tela da Loja fica com a T-0034).
4. Catálogo: timeout real do provedor de IA com AbortSignal.timeout em modules/catalogo/api/ia (o incremento atômico da cota fica de fora porque mexe em db).
Recomendo 1 e 2 primeiro, porque não dependem de recado de ninguém. Na 3 e na 4 pode chegar recado do engenheiro-apps sobre as abas e, nesse caso, a sessão trata só contracts e domain.
