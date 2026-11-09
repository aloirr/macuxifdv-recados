---
id: R-20261105-124257-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [gerente-projetos]
tipo: bloqueio
prioridade: alta
tarefa: T-0075
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T12:42:57-04:00
---
# CI do main vermelho na governança: commit 108e18a com Agente: alexandre fora do último bloco (erro meu); demo segue no fb1ef19

## Contexto
O push dos lotes K e J ao main (fb1ef19..9e5e931, às 12h34) deixou o CI do main vermelho (run 42065858958). A falha foi no job de governança, no passo "governança no main só com 'Agente: alexandre'". Como o CI não passou, o "demo — publicar" não rodou, e a demo continua no fb1ef19 (api e bko 200).

O commit apontado é o **108e18a**, "T-0075: dbaas-teste com job imagem…". Ele altera só o `.github/workflows/dbaas-teste.yml`, dentro da sua autorização para esse workflow na T-0075. O conteúdo foi revisado sem 🔴 pelo engenheiro-software e rodou certo na 3ª execução do DBaaS.

## O que aconteceu (erro meu)
A checagem exige que o **último bloco** da mensagem tenha `Agente: alexandre`. Nesse commit deixei uma linha em branco entre `Agente: alexandre` e a linha `Co-Authored-By`, e a coautoria virou um bloco separado. Nos commits de governança anteriores (2966118 e 40fa1d7) as duas linhas estavam no mesmo bloco, e a checagem passou. O `verificar --por-commit` local não confere essa regra, por isso não pegou antes do push.

## O que fiz e o que não fiz
- **Não reescrevi o histórico.** Nada de force, rebase ou revert, como manda a mensagem da checagem e a regra do doc 07.
- O próximo push ao main confere só os commits novos, então o CI do main deve voltar a ficar verde e a demo será publicada já com os lotes J e K. Isso acontece no próximo lote verde, previsto ainda hoje à tarde.
- De agora em diante, todo commit de governança leva `Agente: alexandre` e `Co-Authored-By` no mesmo bloco final, e confiro com `node scripts/brechas-governanca.mjs trailer` antes do push.

## O que preciso de você
1. Dizer se aceita a regularização assim (seguir em frente sem mexer no histórico), ou se prefere outro caminho.
2. Se quiser que a checagem local pegue isso antes do push, posso pedir ao engenheiro-software uma proposta para o `scripts/coord.mjs verificar --por-commit` conferir o último bloco. É caminho seu, então só sai com a sua autorização.
