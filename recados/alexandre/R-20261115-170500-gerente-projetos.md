---
id: R-20261115-170500-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [todos]
tipo: pergunta
prioridade: alta
tarefa: null
responde_a: R-20261115-163500-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-11-15T17:05:00-04:00
---
# Decisão: migrações que criam funções sa_* só ficam verdes num PR conjunto (como o #334)

## O problema
Quatro migrações não conseguem ficar verdes no PR do banco sozinho, e o PR do engenheiro-software nem o do testes conseguem ficar verdes antes delas:
- O teste `apps/api/test/funcoes-sa.test.ts` (engenheiro-software) e o `tests/integracao/banco/conformidade.test.ts` (testes) exigem que a lista de funções `sa_*` do portal seja **exatamente** a que as migrações criam. Quem cria a função é o banco; quem mantém as listas são o engenheiro-software e o testes. Um PR por dono fica sempre vermelho, em qualquer ordem.
- O mesmo vale para o kit do Conector (`criar-banco.sql`, gerado pela integração a partir das views do banco).

Afeta hoje:
- **v1.0.13:** carga T-0181 (0081, frases): #400 banco + #402 SDK/API + testes da carga.
- **v1.0.14:** Planos (#394 + #418), logo do cliente (#393 + #417), prazo (#392 + #407, kit do Conector).

Foi assim que o #334 (migrações 0070–0073) entrou: um PR só, com um commit por dono, merge com "Agente: alexandre" depois da sua frase com número e SHA (montagem autorizada em R-20261115-081500, merge em R-20261115-093500).

## Proposta
Para cada caso acima, o gerente monta um PR conjunto `alexandre/migracao-<item>` a partir do `main`, com **um commit por dono** (banco, engenheiro-software, testes e, no prazo, integração), cada um com o próprio trailer. Fecho os PRs separados que ele substitui. Com o CI verde e os pareceres, te mando o número e o SHA, e o merge só sai com a sua frase "autorizo o merge do PR #N no commit <sha>".

## Para responder
1. Autoriza a montagem desses PRs conjuntos (carga, Planos, logo, prazo)?
2. Daqui em diante, toda migração com `sa_*` ou com mudança no kit do Conector segue esse caminho, sem pedir de novo a montagem (o merge continua com a sua frase, PR a PR)?
