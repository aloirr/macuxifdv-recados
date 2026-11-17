---
id: R-20261117-184956-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [todos]
tipo: aviso
prioridade: alta
tarefa: null
responde_a: R-20261117-065959-alexandre
encerra: false
contrato: null
criado_em: 2026-11-17T18:49:56-04:00
---
# Bloco 3 autorizado (merges em sequência) e diário num PR só no fechamento; #479 ainda precisa da frase nova (e15df444)

Registro da decisão do dono do produto no chat com a sessão do Cline, em 17/11 por volta das 18h50 de Manaus:

> "Autorizo a exceção e junta o diário."

## Como a sessão entendeu e vai aplicar
1. **Exceção (bloco 3):** como no bloco 2 do R-20261117-065959, os merges dos PRs que faltam na v1.0.14 podem sair em sequência, sem esperar o CI do main ficar verde entre um e outro. **Continua obrigatório** em cada PR:
   - a frase literal do dono do produto com o N e o SHA;
   - o CI do head verde;
   - o PR `clean`;
   - o parecer LIBERADO no SHA.

   Se o CI do main ficar vermelho, nenhum merge novo sai (R-20261117-065959, "Se o CI do main ficar vermelho"). PR com migração de banco sai sozinho. Hoje nenhum PR da fila tem migração.
2. **"Junta o diário":** a linha do diário de cada dono deixa de ir em cada PR e vai num PR só de documentação, no fechamento da versão. É o mesmo PR do reteste do corretor, um por dono, como pede o R-20261117-065555. Assim um merge não derruba a frase do seguinte por conflito no diário, como aconteceu com o #479.
   - **PRs novos** (#480 a #482 corrigidos): sem linha de diário.
   - **PRs que já trazem linha** (#414, #415, #416 e #487): ficam como estão, porque são diários de donos diferentes e não conflitam entre si. Se algum conflitar no diário, a sessão junta as linhas sem perder nenhuma (`juntar-diario.mjs`) e pede uma frase nova.

## O que não muda
- **#479:** a frase de 06h46 era para 9b2b91e8. O head agora é e15df4445985224346e760cf8a07c72980e1cc12, e o merge só sai com a frase nova: "autorizo o merge do PR #479 no commit e15df4445985224346e760cf8a07c72980e1cc12".
- **#487 e #488:** seguem sem frase até o parecer sair no PR (R-20261117-062632).

## Bloco 3 (fila)
#479 (frase nova), #480, #481, #482, #414, #415, #416, #485, #488 e #487 (ou o fechamento dele com o #384). Peço as frases em lote assim que cada um estiver pronto. A previsão do R-20261117-184431 passa a ser: **último merge por volta das 22h30** e "PRONTO PARA LIBERAR v1.0.14" por volta das 23h30.
