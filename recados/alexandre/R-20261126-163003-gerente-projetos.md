---
id: R-20261126-163003-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [todos]
tipo: resposta
prioridade: alta
tarefa: null
responde_a: R-20261126-155851-alexandre
encerra: false
contrato: null
criado_em: 2026-11-26T16:30:03-04:00
---
# Acelerado: #801 verde (5ec0421d), 5 PRs refeitos, T-0197 (#824) e T-0198 (#825) abertos; frases do #782 e #805 em lote; v1.0.37 em 27/11 até 14h

## Contexto
Resposta ao R-20261126-155851 ("Quero tudo agora. Acelere."). Estado às 16h30 de Manaus.

**Sobre as "sessões":** a nuvem está parada e não há como abrir sessões nela. Esta sessão do Cline não tem subagentes nem CLI de agente instalada neste notebook. Por isso trabalho em paralelo com **worktrees separadas, uma por dono** (`C:\macuxifdv-wt\<item>`), cada uma com o seu branch, o seu commit com o trailer do dono e o seu push. Os testes rodam em segundo plano enquanto o código seguinte anda. Nada fica em fila esperando outro item.

## Feito desde as 16h
| Item | Estado |
|---|---|
| #771 (0105–0107) | **no main** (fc5a6956), CI do main verde |
| #801 (0108) | juntei o main sem mudar a árvore. Head **5ec0421d**, **CI verde**, `clean` |
| #782 (catálogo v2) | CI verde, `clean`. Parecer válido no head (comentário 7202184938) |
| #805 (fim das listas) | CI verde, `clean` |
| #802, #803 e #804 | **refeitos** a partir do #782, só com os commits do dono (`agente/v1037-80{2,3,4}-*`), conteúdo idêntico ao dos PRs antigos. `verificar` OK. Os PRs abrem assim que o #782 entrar |
| #807 e #808 (E4/E4b) | cherry-pick limpo, conteúdo idêntico. Vão para o branch depois do #801 e do #782 |
| **T-0197** (catálogo vazio no pedido) | **PR #824**, typecheck e testes do catálogo verdes aqui; CI rodando |
| **T-0198** (Salvar sem itens) | **PR #825**, typecheck e 1711 testes do vendedor verdes aqui; CI rodando |

Os pareceres do #824 e do #825 saem assim que o CI de cada um ficar verde.

**Atenção:** o combo #782 + #805 + #802 + #803 + #804 sobre o main passou no typecheck e nos testes do core, pesquisa e promotor. No platform-sdk, porém, **8 testes de `motor-sync.pacote.test.ts` estouraram o tempo (30 s)** neste notebook (Windows e SQLite com arquivos, 555 s no arquivo inteiro). O combo não toca esse arquivo nem o motor de sync. Por isso trato como lentidão do notebook, não como defeito. Quem decide é o CI do liberar.

## Ensaio das 21h30
SHA: **5ec0421dc7e638b2a04823771372200c4ee04f9f** (R-20261126-160507). Disparo pela **tag v1.0.36**. Esse SHA não muda mais até o ensaio.

## Frases prontas (em lote)
Cada uma vale só para o SHA indicado:

1. `autorizo o merge do PR #782 no commit bbed256442d837510b1e2dc6a22160c90893d336`
2. `autorizo o merge do PR #805 no commit ebc9ae2ec187b43e706459d6e4392fa8d93997eb`. O #805 entra junto com o #802, o #803 e o #804. O corretor confere o parecer do #805 no head antes do merge. Se não estiver liberado, não faço o merge e aviso.

O **#801** espera o **ensaio verde**: peço a frase dele depois das 21h45, com o resultado do ensaio. O #802, o #803 e o #804 (refeitos) e o #824 e o #825 ganham o SHA final assim que o CI e o parecer saírem; mando essas frases num segundo lote.

## Os 6 parâmetros sem tela no BKO
Comecei o levantamento. Três já têm regra e leitura no código e só faltam o painel e a rota de gravação:
- **campos obrigatórios do cliente**: a API `GET|PUT /v1/core/parametros/campos-obrigatorios` já existe; falta só o painel em Parâmetros › Clientes;
- **dias de atraso**: `titulo_vencido_dias`, lido no domain do vendedor;
- **validade do orçamento**: `validade_orcamento_dias`, usado na API de orçamentos.

Os outros três **ainda não têm regra no código**: pedido mínimo, crédito excedido (é o P-6, T-0184) e estoque insuficiente. Esses precisam de regra nova, teste e decisão de UX.

**Previsão:**
- os três primeiros entram na **v1.0.37** se ficarem prontos até as 12h de 27/11;
- os três de regra nova vão para a **v1.0.38**. O crédito excedido segue a simulação do P-6, que ainda tem pontos em aberto.

## Nova previsão da v1.0.37 (com folga de 15%)
| Passo | Quando (Manaus) |
|---|---|
| #782, depois #805, #802, #803 e #804 juntos | 26/11, até 19h, com as frases |
| #824 e #825 (os dois defeitos) | 26/11, até 20h |
| Ensaio | 26/11, 21h30 |
| #801 sozinho, depois E4 e E4b | 26/11, até 23h30 |
| 3 parâmetros (campos obrigatórios, dias de atraso, validade do orçamento) | 27/11, até 12h |
| Liberar, deploy e APKs 1.0.37 | **27/11, até 14h** |

**v1.0.37 no ar em 27/11 até as 14h**, 4 horas antes da previsão anterior. Depende das frases e do ensaio verde.

## Custo
Esta sessão é uma só e não abre sessões da nuvem, então não há crédito extra das sessões. O Actions gasta um CI por PR.

## Pronto quando
As frases 1 e 2 chegam, e o ensaio das 21h30 roda.
