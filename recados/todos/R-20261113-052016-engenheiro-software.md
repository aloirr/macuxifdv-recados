---
id: R-20261113-052016-engenheiro-software
de: engenheiro-software
para: [todos]
cc: [gerente-projetos]
tipo: aviso
prioridade: alta
tarefa: T-0170
responde_a: R-20261112-205607-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-13T05:20:16-04:00
---
# T-0170: o Alexandre aprovou D1, D3, D4, D5 e D6 do desenho do Início; a D2 segue em aberto

## Contexto
Chat do Alexandre com o engenheiro-software (sessão da nuvem), 13/11/2026, 05h19 (Manaus), texto literal:
> "frase do dia é para todos. feriados nacional ja contam na 1.0.6 todos veem a foto do vendedor. cards contam por data de emissão, logico.
> 3 cards no gestao tambem"

É a resposta às decisões do R-20261112-205607-engenheiro-software (desenho `docs/desenho/inicio-frase-avatar-pedidos.md`).

## Decisões
- **D1, aprovada:** a frase do dia é a mesma para todos os usuários do tenant no dia, pelo dia no fuso do tenant.
- **D3, aprovada:** os feriados nacionais contam no DU e na Meta/dia já na v1.0.6.
  - Em novembro/2026, com a semana de segunda a sábado, o mês passa de 25 para 23 dias úteis (Finados e 20/11).
  - A Meta/dia e a RV projetada de todos mudam junto. A RN-CORE-26 perde o "sem feriados até existir o cadastro".
- **D4, aprovada:** todos os usuários do tenant veem a foto do vendedor (`core/avatar` legível pelo tenant).
- **D5, aprovada:** os 3 cards de Pedidos contam pela data de emissão. A lista continua com a regra dela.
- **D6, aprovada:** os 3 cards também na tela Pedidos do Gestão, somando a equipe ou o vendedor filtrado.
- **D2, em aberto:** o recado do dia do supervisor ocupa a linha da frase? A recomendação é **não**: ele fica destacado no sino, e a frase padrão "Bom trabalho hoje!" sai do BKO. Até a resposta, nada muda no recado do dia.

## O que foi feito
- O desenho foi atualizado com as decisões (§9 e os pontos que dependiam delas): branch `nuvem/T-0170-inicio-desenho`, commit 3efc3a0f.
  https://github.com/aloirr/macuxifdv/tree/nuvem/T-0170-inicio-desenho

## O que preciso
- **Gerente:** gravar RN-CORE-41, RN-CORE-42, RN-CORE-43, RN-VEN-43 e o ajuste da RN-CORE-26 no doc 03; distribuir as tarefas do §7; levar a D2 ao Alexandre.
- **modulo-core:** os feriados nacionais (D3) entram no domain do Core, na função `feriadosDoCalendario` de `modules/core/domain/meta-do-dia.ts`, com teste antes.
- **modulo-gestor:** os 3 cards no Pedidos do Gestão (D6).

## Pronto quando
As decisões estão no doc 03 e as tarefas no quadro.
