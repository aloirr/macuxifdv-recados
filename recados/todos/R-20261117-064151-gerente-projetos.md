---
id: R-20261117-064151-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [todos]
tipo: resposta
prioridade: alta
tarefa: null
responde_a: R-20261116-215000-alexandre
encerra: false
contrato: null
criado_em: 2026-11-17T06:41:51-04:00
---
# Atualização das 6h41: mais 5 PRs prontos (#486, #487, #488, #478, #479), com as frases e os SHAs

Atualização do R-20261117-052100-gerente-projetos, às 6h41 de Manaus. Continua sem merge: todos esperam a frase do dono do produto.

## Mais 5 PRs prontos: CI verde no head, sem conflito e com parecer sobre o SHA
| # | Dono | O que é | Frase |
|---|---|---|---|
| #486 | designer-ux | `ListaParametros` e `valorComPadrao` no kit (RD-1583 e RD-1584) | autorizo o merge do PR #486 no commit f4213aa2d5c3b009bc27d5f9afe1e23efa2d7d30 |
| #487 | design-de-marca | parecer de marca T-0174 refeito (substitui o #384) | autorizo o merge do PR #487 no commit 81985a14cb620edf12f8802502cf42017768393f |
| #488 | gerente-projetos | backlog T-0183 refeito (substitui o #345) | autorizo o merge do PR #488 no commit f5ee4ca1936f9a09f55ffc51e84bcf34c108af5d |
| #478 | testes | logo do cliente: RD-2170 e RD-2171 fechadas, merge do main | autorizo o merge do PR #478 no commit 92e5d629f160bb95450e73ea643d0ed621ceee00 |
| #479 | testes | prazo Desc./Acrésc.: RD-2172 a RD-2176 fechadas | autorizo o merge do PR #479 no commit 9b2b91e8f72a187ebffe56a16ca3831c1c00e491 |

**Parecer do #486:** o corretor e a marca ainda não avaliaram o head. É código do kit, sem mudança visual: o visual é o mesmo das 3 cópias já liberadas (MC-1515). Se o senhor preferir esperar o parecer antes da frase, ele é o próximo trabalho da sessão.

## Continua igual ao recado das 5h21
- As 6 frases daquele recado continuam valendo: #403, #420, #396, #483, #412 e #484. Nenhum desses heads mudou.
- **#480, #481 e #482** (testes) ainda têm achados que seguram o merge (RD-2190 a RD-2219). Corrijo um por vez em seguida.
- **Decisões pendentes do senhor:** o catálogo v2 (#453): sai fora da v1.0.14 ou espera a nuvem? E os antigos #285, #288 e #302: congelo ou fecho?

## Ocorrências da madrugada
- **Comentário duplicado no #478:** às 5h22 publiquei por engano, no #478, uma cópia do parecer antigo (fe7f7f74), porque um arquivo temporário de outra sessão tinha o mesmo nome. Apaguei a cópia em seguida e publiquei o parecer certo. Desde então uso nomes novos nos arquivos temporários.
- **Rede:** caiu por volta das 5h30 (sem DNS) e voltou às 5h37. Nada se perdeu.
- **#478 com conflito:** o conflito no diário do testes veio da linha que eu tinha acrescentado ao diário. Resolvi com um merge normal do main (92e5d629), sem force push.
