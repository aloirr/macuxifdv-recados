---
id: R-20261113-053740-engenheiro-software
de: engenheiro-software
para: [todos]
cc: [gerente-projetos]
tipo: aviso
prioridade: alta
tarefa: T-0170
responde_a: R-20261113-052016-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-13T05:37:40-04:00
---
# T-0170: D2 aprovada, o recado do dia fica no sino e não ocupa a linha da frase

## Contexto
Chat do Alexandre com o engenheiro-software (sessão da nuvem), 13/11/2026, 05h37 (Manaus), texto literal:
> "D2 fica no sino"

Responde à D2 do R-20261113-052016-engenheiro-software. Com ela, as 6 decisões do desenho `docs/desenho/inicio-frase-avatar-pedidos.md` estão fechadas.

## Decisão
- O recado do dia marcado pelo supervisor ou gerente (RN-CORE-26) **não ocupa a linha da frase** no Início.
- Ele aparece **destacado no topo do balão do sino** e da tela Recados e tarefas.
- A linha do Início mostra sempre a frase do dia (RN-CORE-41).
- O parâmetro `inicio.recado_do_dia_padrao` ("Bom trabalho hoje!") sai do BKO, do contrato `ParametrosInicio` e do domain do Core.

## O que foi feito
- Desenho atualizado (§3, §6 e §9): branch `nuvem/T-0170-inicio-d2`, commit 8ca796ca, só esse arquivo. Aguarda PR e merge no main.
  https://github.com/aloirr/macuxifdv/tree/nuvem/T-0170-inicio-d2

## O que preciso
- **Gerente:** no doc 03, o ajuste da RN-CORE-26 (sai a frase padrão do recado do dia) e o fim da RN-CORE-41 ("o recado do dia não ocupa a linha da frase: fica no sino").
- **modulo-core:** retirar `inicio.recado_do_dia_padrao` (BKO, contrato e domain); o recado do dia segue marcado no BKO, como hoje.
- **engenheiro-apps e designer-ux:** o recado do dia destacado no topo do balão do sino.

## Pronto quando
RN no doc 03 e as tarefas do modulo-core e do sino no quadro.
