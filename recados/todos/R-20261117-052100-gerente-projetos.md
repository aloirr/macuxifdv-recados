---
id: R-20261117-052100-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [todos]
tipo: resposta
prioridade: alta
tarefa: null
responde_a: R-20261116-215000-alexandre
encerra: false
contrato: null
criado_em: 2026-11-17T05:21:00-04:00
---
# Madrugada de 17/11: 6 PRs prontos com CI verde (frases com SHA), 3 com CI rodando, rascunhos e decisão sobre os antigos

Rodada da madrugada da sessão do Cline, de 16/11 às 22h40 até 17/11 às 5h20 (horário de Manaus). Segue a ordem do R-20261116-215000-alexandre. **Nenhum merge foi feito:** todos esperam a frase do dono do produto. Nenhum force push e nenhum rebase.

## Prontos para merge: CI verde no head, sem conflito e com parecer (situação às 5h20)
Cada frase vale só para o SHA indicado. Sugiro esta ordem, de cima para baixo:

| # | Dono | O que é | Frase |
|---|---|---|---|
| #403 | engenheiro-apps | planos: coluna Plano | autorizo o merge do PR #403 no commit b246ed192f750abaa7213d181fd4ae1f029d332d |
| #420 | engenheiro-software | senha do autorizador (T-0173), refeito | autorizo o merge do PR #420 no commit ec3d18c9303ee5c7350dd635044611f8d222f5d3 |
| #396 | banco-dados | lote cancelado, migração 0087, refeito | autorizo o merge do PR #396 no commit 6fe977b7aef90e2cd0ebcd69bda9b67f76fe776e |
| #483 | modulo-core | "Salvar almoço" (D-PAR-05) | autorizo o merge do PR #483 no commit 7e9c43ddc16a4fa6ee4b6b15991ba9c1f66dfa63 |
| #412 | modulo-vendedor | Alçadas em Parâmetros, refeito, RD-1582 fechada | autorizo o merge do PR #412 no commit e4cbdc473ddc7759702ed908f1913a8abd962760 |
| #484 | corretor-redundancias | pareceres das rodadas 50 a 61 | autorizo o merge do PR #484 no commit 8b4a0a06df99ccf0f310ccda3ab97b2741f4c7c6 |

- **#396 (0087):** não mexe em `sa_*` nem no kit do Conector, então não precisa de PR conjunto. O número 0087 foi conferido contra o main e contra todos os PRs abertos.
- **Ordem:** cada merge pode deixar os PRs seguintes atrás do main, mas sem conflito (os arquivos não se cruzam). O GitHub não exige o branch atualizado. Se ele pedir, eu junto o main (merge normal) e o SHA muda, e aí a frase precisa ser nova.

## Com o CI rodando às 5h20: a frase só depois do CI verde
| # | Dono | O que é | SHA |
|---|---|---|---|
| #486 | designer-ux | `ListaParametros` e `valorComPadrao` no kit (RD-1583 e RD-1584) | f4213aa2d5c3b009bc27d5f9afe1e23efa2d7d30 |
| #487 | design-de-marca | parecer de marca T-0174 refeito (substitui o #384) | 81985a14cb620edf12f8802502cf42017768393f |
| #488 | gerente-projetos | backlog T-0183 refeito (substitui o #345) | f5ee4ca1936f9a09f55ffc51e84bcf34c108af5d |

## Em rascunho, esperando outro PR
- **#485** (testes da T-0173): espera o merge do #420. Depois junto o main e tiro do rascunho.
- **#414, #415, #416** (Parâmetros de pesquisa, promotor e treinamento): esperam o merge do #486. Depois, no papel de cada dono, troco a cópia local pela `ListaParametros` do kit, e o corretor reconfere.
- **#453** (catálogo v2): o head d7d0bb83 já junta o main e está verde na sessão (1214 testes). Continua em rascunho por causa da **RD-1707**: os exports da folha "Estoque por filial" ficam sem uso até a parte 2 das telas (`catalogo.tsx` e `produto.tsx` do app Campo). As telas existem nos branches de 15/11 (`catalogo-campo-modulo-catalogo-v8`), mas sobre o kit antigo. Ligar isso exige print do aparelho e parecer de marca, e não dá para fazer no notebook sem aparelho. **Decisão sua:** (a) a v1.0.14 sai sem o catálogo v2, que fica para o lote seguinte; ou (b) espero a nuvem voltar para fazer a parte 2.
- **#478 a #482** (testes): os pareceres do #484 seguram esses PRs (RD-2170 a RD-2219). As correções são do testes, PR a PR. É o próximo trabalho da sessão.

## Antigos (lista D): decisão
- **#384** e **#345:** refeitos como #487 e #488. Fecho os antigos quando os novos entrarem.
- **#285** (login: senha temporária, auditoria da falha, mensagens de bloqueio), **#302** (e-mails de senha) e **#288** (testes do Esqueci a senha): **não refiz.** Estão 145 a 153 commits atrás, têm conflito em 20 e 8 arquivos e só 4% a 24% do conteúdo deles está no main. O login e os e-mails mudaram no meio (#306, #308, #361, #374). Refazer é praticamente reescrever o código de login, e isso pede aparelho para testar. **Proposta:** ficam abertos e congelados até a nuvem voltar, com uma tarefa nova para o modulo-core, o engenheiro-software e o testes. Se o senhor preferir, fecho os 3 e abro a tarefa no quadro.

## Pareceres do corretor feitos na sessão (rodada 62)
Publicados como comentário no PR, sobre o SHA exato: #483, #420 e #396 LIBERADOS; #412 LIBERADO (RD-1582 fechada). O registro no relatório `docs/qualidade/redundancias/2026-11-15-v1014.md` entra no próximo PR do corretor.

## Limites do notebook (escritos em cada PR)
- Os testes de banco (`*.db.test.ts`) ficam pulados: o notebook não tem Postgres, e o `pg-local.sh` é só para Linux.
- Dois testes caem também no main deste notebook (Windows) e não têm a ver com os PRs: `apps/api/test/sync-pacotes.test.ts` (caminho com `\`) e `modules/integracao/docs/exemplos/python` (precisa de python3 com `requests`).
- O quadro (`.coord/quadro.md`) não foi atualizado nesta rodada. Entra no PR do gerente junto com o fechamento da v1.0.14.
