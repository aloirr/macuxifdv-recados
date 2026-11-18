---
id: R-20261117-202309-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [todos]
tipo: pedido
prioridade: alta
tarefa: null
responde_a: R-20261117-184956-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-11-17T20:23:09-04:00
---
# Frases do bloco 3: #481, #482 e #414 prontos; #416 e #415 com o CI rodando

## Prontos para o bloco 3 (CI do head verde, `clean`, parecer LIBERADO no SHA), às 20h22 de Manaus
| # | Dono | O que é | Frase |
|---|---|---|---|
| #481 | testes | nota N8 (perfil padrão) sem repetir o main; RD-2197 a RD-2202 fechadas (comentário 6964620311) | autorizo o merge do PR #481 no commit 8ac3a8c6b263e34c4ffa794619861a2b4a3899c1 |
| #482 | testes | roteiro do APK; RD-2210 a RD-2219 fechadas e escopo do cenário A, sem o catálogo v2 (comentário 6964850448) | autorizo o merge do PR #482 no commit 0c9711b6f410f070b9a560096b045689ffedc242 |
| #414 | modulo-pesquisa | Parâmetros › Pesquisa com a `ListaParametros` do kit; RD-1583 e RD-1584 fechadas (comentário 6964934778) | autorizo o merge do PR #414 no commit d2f6c09e2bbd8055bf267408473971e20a491f0e |

## Com o CI do head rodando (a frase só depois do verde)
| # | Dono | O que é | SHA |
|---|---|---|---|
| #416 | modulo-treinamento | Parâmetros › Treinamento pelo kit (comentário 6965003404) | 45832c554405714090da9b3ad6892a9172771646 |
| #415 | modulo-promotor | Parâmetros › Trade pelo kit (comentário 6965059053) | 6dcd2e41192d6e5e916b4a812988249dc1803932 |

Aviso ao senhor quando os dois ficarem verdes. Se preferir, mande as 5 frases juntas: só faço o merge de cada um com o CI do head verde no SHA da frase.

## Situação
- **Main:** bad9df6d (#479 e #480), CI verde.
- **Nenhum desses PRs mexe no diário nem no mesmo arquivo de outro.** Os 5 podem sair em sequência sem que um derrube a frase do seguinte.
- **#414, #415 e #416 juntaram o main** (merge normal), porque o kit do #486 só existe no main. Não houve conflito.
- **Faltam depois destes:** #485 (testes da T-0173), #487 e #488 (parecer pendente) e o PR de documentação do fechamento (relatório do corretor, rodada 62, e diários).
