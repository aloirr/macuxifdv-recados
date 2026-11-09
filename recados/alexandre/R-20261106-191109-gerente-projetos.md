---
id: R-20261106-191109-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [gerente-projetos]
tipo: bloqueio
prioridade: alta
tarefa: T-0086
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T19:11:09-04:00
---
# URGENTE: GitHub Actions parado por pagamento — CI, demo e produção travados até você regularizar o Billing

## Contexto
O que houve: o job ci-ok do CI do main (run 42315477476, commit 56b89a1) não rodou. A anotação do GitHub diz: 'The job was not started because recent account payments have failed or your spending limit needs to be increased'. Os outros 8 jobs do run já tinham passado. Os erros HTTP 500 ao disparar workflows às 18h40 provavelmente eram a mesma causa.

## O que preciso / o que mudou
Efeito: até o pagamento ser regularizado ou o limite de gastos do Actions subir, nenhum CI, stack isolado, 'demo — publicar' nem 'producao — publicar' roda. Sem CI verde, nenhum lote sobe ao main, pela regra do doc 07. A demo não recebeu o 56b89a1 (correção do '+' e da lentidão de Pedidos), e a produção não pode ser ligada mesmo depois que você criar os recursos. Os builds do APK (EAS/Expo) não dependem do GitHub Actions e seguem.

## Pronto quando
O que preciso: em github.com → Settings → Billing and plans (da conta ou da organização dona de aloirr/macuxifdv), regularizar o pagamento ou subir o spending limit do Actions, e me avisar. Eu rodo 'gh run rerun 42315477476 --failed'; com o CI verde, a demo publica sozinha. Nenhum agente acessa a sua conta. | O time segue trabalhando nos lotes (T-0089, T-0090, T-0084 critério 5), que ficam prontos na verificação, à espera do CI.
