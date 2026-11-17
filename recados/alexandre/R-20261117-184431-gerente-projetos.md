---
id: R-20261117-184431-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [todos]
tipo: resposta
prioridade: alta
tarefa: null
responde_a: R-20261117-063420-alexandre
encerra: false
contrato: null
criado_em: 2026-11-17T18:44:31-04:00
---
# 8 de 9 merges no main; frase nova do #479 (e15df444); previsão oficial: v1.0.14 pronta para liberar por volta da 0h30 de 18/11

## Merges das frases: 8 de 9 no main
| # | Dono | Squash no main | Quando (Manaus) |
|---|---|---|---|
| #420 | engenheiro-software | ee19d3e3c1f1da6ec4b8dfc5f29149afec207b1c | 06h45 |
| #486 | designer-ux | 061343389e11b7a8bc3ff0d4d90cc48d629b157c | 06h54 |
| #403 | engenheiro-apps | c2d79f5c129a8f8cc86145013a3ffb5aa868e023 | 07h05 |
| #396 | banco-dados (0087) | 0dca0bac15c6ea3fd42db6c2db87e37113c8c977 | 07h16 (bloco 1, sozinho) |
| #483 | modulo-core | 0a1d1d8bad1703029f8b669dd6bf10f79ba9d765 | 18h34 (bloco 2) |
| #412 | modulo-vendedor | ac1691d1d184ef90da83d8ef115c1841180b215d | 18h34 (bloco 2) |
| #484 | corretor-redundancias | 77152b855c7a27a266d79c014233177e8b56abd2 | 18h35 (bloco 2) |
| #478 | testes | 088b7e5f9b5bfd579087ecaf47671788cbd5a882 | 18h35 (bloco 2) |

**CI do main:**
- #420, #486, #403 e #396: verdes, um por um, com as suítes completas e a 0087 no banco. O agendado das 12h55 também passou em 0dca0bac.
- **Bloco 2: VERDE** no último SHA, 088b7e5f (run 44191541169, concluído às 18h43, com as suítes completas), cobrindo os 4 merges. Os runs de 0a1d1d8b, ac1691d1 e 77152b85 foram cancelados pelo `cancel-in-progress`, como previa o R-20261117-065959. **O main está verde em 088b7e5f.**

## O #479 precisa de frase nova
Depois do merge do #478, o #479 ficou com conflito no diário do testes: os dois PRs de hoje acrescentaram uma linha no mesmo lugar. Juntei o main no branch (merge normal, sem force push). O diário ficou com as duas linhas, e o resto do PR não mudou.
- **Head novo:** e15df4445985224346e760cf8a07c72980e1cc12. `ci-ok` verde (run 44191737151), parecer do corretor LIBERADO nesse SHA (comentário 6963037252).
- **Frase, se o senhor aprovar:** autorizo o merge do PR #479 no commit e15df4445985224346e760cf8a07c72980e1cc12

## Previsão oficial da v1.0.14 (cenário A), feita às 18h50
| Passo | O que é | Previsão |
|---|---|---|
| 1 | Merge do #479 (com a frase nova) | 19h00 |
| 2 | #480, #481 e #482: corrigir os achados (RD-2190 a RD-2219), parecer, frase e merge | 21h30 |
| 3 | #414, #415 e #416: trocar a cópia pela `ListaParametros` do kit, parecer, frase e merge | 22h30 |
| 4 | #485: juntar o main, tirar do rascunho, parecer, frase e merge | 23h00 |
| 5 | #487 e #488: parecer no PR (o #487 talvez seja fechado com o #384), frase e merge | 23h00 |
| 6 | Último merge e CI do main verde | 23h30 |
| 7 | Reteste do corretor e da marca sobre o main e roteiro do testes, num PR só de documentação; depois o recado "PRONTO PARA LIBERAR v1.0.14" | 00h30 de 18/11 |
| 8 | Deploy do servidor (`liberar versão` 3 min + `publicar` 6 min, nas últimas versões) | logo depois da sua aprovação na issue |
| 9 | APK do Campo e da Gestão no mesmo SHA (`android build`, cerca de 23 min) | cerca de 30 min depois do deploy |

**Resumo:** se as frases chegarem na hora, a v1.0.14 fica pronta para liberar **por volta da meia-noite e meia de hoje para amanhã (18/11)**. O deploy e o APK saem logo depois da sua aprovação. A estimativa da ponte, de 14h a 18h, não se cumpriu por causa das 11 horas de sessão parada.

**Para encurtar:** os passos 2 a 5 dão de 9 a 10 PRs e frases. Se o senhor autorizar um **bloco 3**, como o bloco 2 (merges em sequência, cada um com frase, CI do head verde e parecer no SHA), eu peço as frases em lote e o passo 6 sai por volta das 22h30. Peço essa decisão.

## Economia do Actions (R-20261117-065555)
- Dos PRs que faltam, nenhum é novo: os 9 já existem (#479 a #482, #414 a #416, #485, #487 e #488). O reteste (passo 7) vai num PR só de documentação do corretor, com os pareceres da rodada 62.
- Os pareceres seguem só como comentário no PR.
