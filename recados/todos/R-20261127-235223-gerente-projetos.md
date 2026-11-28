---
id: R-20261127-235223-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [todos]
tipo: resposta
prioridade: alta
tarefa: null
responde_a: R-20261127-234812-alexandre
encerra: false
contrato: null
criado_em: 2026-11-27T23:52:23-04:00
---
# Retomada: liberar da v1.0.42 travado pelo 403 de Actions (nenhuma sessão tem a permissão); estado final das frentes, previsão, nova data do G e da v1.0.43

## Contexto
Resposta ao R-20261127-234812-alexandre ("retome", 23h47). A previsão completa e o passo exato de Actions já estão no R-20261127-235023-gerente-projetos (23h50). Aqui vão só os pontos que o PO pediu.

## Liberar da v1.0.42: NÃO DISPAROU, e nenhuma sessão tem a permissão (aviso na hora)
- A sessão do gerente no VS Code usa o mesmo token fine-grained do notebook, que dá **403** no disparo de workflow. Testei às 23h47 com um disparo vazio, sem efeito.
- As sessões da nuvem estão só monitorando, e nenhuma está aberta para disparar.
- **O que destrava:** o Alexandre muda Actions para "Read and write" no token. O passo exato, de cerca de 1 min, está no 235023. Não precisa colar nem trocar o token.
- **Pronto para disparar** assim que liberar:
  - versão v1.0.42;
  - SHA **1e4619eee931eb1dac29c7e07bdaf56a336adb41**, conferido no main às 23h55, que confiro de novo antes de disparar;
  - CI do main 46083571211 verde.

## Previsão (tempo real das últimas 4 versões +15%, Manaus), contada da liberação de Actions (T0)
| Marco | Hora |
|---|---|
| liberar verde, com a issue aberta | T0 + 12 min |
| "aprovado v1.0.42" do PO, publicar e `/v1/saude` | **no ar em T0 + 21 min** |
| APKs Campo e Gestão 1.0.42 | **T0 + 46 min** |

Com T0 = 00h00 de 28/11: no ar às 00h21 e APKs às 00h46.

## Estado final de cada frente
| Frente | Branch e head | Próximo passo |
|---|---|---|
| v1.0.42 | main 1e4619ee (#865 a #869) | liberar, quando houver Actions |
| v1.0.43, core (itens 2+3 e consulta do 5) | `nuvem/v1043-modulo-core-perfis` @ 12829713, 1 commit `Agente: modulo-core`, 1 atrás do main (o #869, só `.github/`) | pareceres do testes, do corretor, do engenheiro-software e do engenheiro-apps no head; depois, o PR |
| v1.0.43, RN-CAT-22 | `nuvem/v1043-modulo-catalogo-rn-cat-22` @ bde0d1dd, só o `desempenho-veiculo.test.ts` | o testes não aprovou; falta decidir o critério 9 (vai ao PO com 2 opções antes de entrar) |
| v1.0.43, aba de pedidos no app (parte do 5) | sem branch | engenheiro-apps, depois do core |
| G (recados no fuso de Manaus) | sem branch | ver abaixo |
| #792 e #820 | fechados sem merge às 19h44 | parecer novo do corretor, num PR novo, na v1.0.43 |

**Frases já dadas e usadas:** #865, #866, #867, #868 (R-20261127-185514) e #869 (R-20261127-193726). Nenhuma está pendente. **Decisão pendente antiga:** D0 da T-0189, agora resolvida pela decisão 70 (supervisor sem o Início do BKO, RN-CORE-33 mantida). Fecho no quadro.

## G: nova data
- É governança: `scripts/coord*.mjs` e teste, com `Agente: alexandre`, numa sessão com MACUXI_AGENTE=alexandre.
- Esta sessão do gerente **não** se passa por alexandre, então o G roda no ambiente MacuxiFDV-Governanca (env_01FyP2HrRr5eLvhqK5XpdnVZ).
- **Conteúdo:** fixar -04:00 no id e no `criado_em` do `agoraLocal()` (`scripts/coord.mjs:87`), com teste.
- **Tempo:** dono ~40 min, com +15% = **46 min** depois de a sessão abrir, mais o CI do PR (~10 min) e a frase do PO.
- **Nova data:** entra logo depois dos APKs 1.0.42. Com T0 = 00h00, o PR fica pronto por volta de **01h45 de 28/11**, desde que a sessão de governança esteja aberta.
- Quem abre a sessão é quem criou o ambiente (Gerente Sênior ou PO). Aviso quando for a hora.

## v1.0.43: previsão (primeira parte)
O notebook ainda não tem Postgres, e o core tem `*.db.test.ts`.
1. **PostgreSQL portátil** (zip oficial, sem admin e sem Docker): 40 min → **46 min**.
2. **Core:** testes, typecheck e lint na sessão e os 4 pareceres no head, ~80 min → **92 min**.
3. **PR do core:** CI ~10 min → **12 min**, depois a frase do PO e o merge.

Com T0 = 00h00: o core entra por volta de **03h30 de 28/11**. A RN-CAT-22, a aba do app, a T-0201 e a T-0206 recebem previsão por etapa quando o critério 9 for decidido e as tarefas estiverem abertas. Mando a próxima previsão às 03h30, ou antes, se algo mudar.

## Pronto quando
Actions liberado, e então o liberar disparado na mesma hora.
