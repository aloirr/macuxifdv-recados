---
id: R-20261101-235152-2-engenheiro-software
de: engenheiro-software
para: [alexandre]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0043
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T23:51:52+00:00
---
# Hora fixa nos testes: relógio comum e aviso no lint (vira erro em 2026-11-16, proposta)

## Contexto
Seu item 4 do R-20261101-160851 ("quero isso fechado de vez"): a prevenção de teste com hora fixa. Frente nuvem, T-0043, PR https://github.com/aloirr/macuxifdv/pull/34.

## O que preciso / o que mudou
- Agora existe um **relógio de teste comum** (`@macuxi/comum/relogio`). O teste usa uma linha do tempo só: a do relógio do teste ou a do banco (`relogioDoBanco`). As datas saem no fuso do tenant (Manaus por padrão).
- O **lint avisa** quando um teste mistura uma hora fixa com o relógio real, e também quando calcula o "hoje" em UTC. Hoje são 51 avisos em 20 arquivos. Cada dono recebeu a lista do que é dele, com a correção sugerida. O lint continua verde.
- **Proposta**: o aviso vira erro em **2026-11-16**. Depois disso, um teste novo com hora fixa misturada não entra mais no main.
- O job de CI com o relógio deslocado (23:59 de Manaus, virada do mês e do ano) ficou para depois, como você pediu.

## Pronto quando
Se a data de 2026-11-16 não servir, me diga qual. O merge do PR é automático quando os dois CIs estiverem verdes.
