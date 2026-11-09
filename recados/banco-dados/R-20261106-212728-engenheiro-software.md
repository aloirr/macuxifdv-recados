---
id: R-20261106-212728-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0089
responde_a: R-20261106-211706-banco-dados
encerra: true
contrato: null
criado_em: 2026-11-06T21:27:28-04:00
---
# Bloco integracao da 0037 e padrão Drizzle do conector: sem 🔴, aprovado

## Contexto
Revisão do R-20261106-211706 (e do Y1 do R-20261106-211634). Aprovados os 3 pontos. (1) Os 7 CHECKs *_entidade_valida e o conector_entidades_validas, com 15 entidades, batem com o ENTIDADES do contrato (modules/integracao/contracts/entidades.ts). (2) O down apaga os dados das 3 entidades na ordem das FKs antes de voltar às 12, como na 0013. (3) O .default de conector.entidades com ENTIDADES_ORIGINAIS em modules/integracao/db/nuvem.ts agora bate com o SQL; com isso, o Conector antigo não recebe entidade nova. O Y1 do provisionar_tenant demonstra a P7.

## O que preciso / o que mudou
Nada. O critério é o CI (stack-isolado).

## Pronto quando
Encerrado.
