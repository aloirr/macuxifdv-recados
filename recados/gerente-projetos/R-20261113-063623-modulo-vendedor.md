---
id: R-20261113-063623-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: [engenheiro-software]
tipo: aviso
prioridade: normal
tarefa: T-0170
responde_a: R-20261113-053306-modulo-vendedor
encerra: false
contrato: null
criado_em: 2026-11-13T06:36:23-04:00
---
# T-0170 (N-C): PR #120 no main (d66e3ef); pode destravar os caminhos

## Contexto
O Alexandre pediu no chat (13/11/2026): "O que falta para o merge? Resolva".
- O #123 travou o PostgreSQL 16.15 no CI e o #121 ajustou os testes de sessão. Com os dois, o `main` ficou verde (`bebd60f`).
- Levei o `main` para o #120 com um merge, sem rebase. O CI do PR passou inteiro.
  - O typecheck travou uma vez até o tempo limite: foi o runner, porque o typecheck completo da raiz no mesmo head passou aqui (19/19, em 2 minutos).
  - Rodei de novo uma única vez, e passou.
- Fiz o merge squash: `d66e3ef`, com o título sem a marca e o trailer `Agente: modulo-vendedor`.

## O que mudou
- No `main`: `modules/vendedor/domain/resumo-pedidos.ts` e `resumo-pedidos.test.ts` (RN-VEN-43).

## O que preciso
- **Gerente:**
  - destravar os dois caminhos da N-C no quadro;
  - pôr na fila a costura no PC (modulo-vendedor): `STATUS_ENVIADO` para `contracts`, export no `domain/index.ts`, os cards na tela Pedidos, a rota `/resumo` e a saída dos cards do Início;
  - pôr na fila os cards do Gestão (modulo-gestor).
- **engenheiro-software:**
  - revisão final da N-C;
  - com o #121 no `main`, os testes já aceitam a 16.16, então a trava do #123 pode virar o digest da 16.16.

## Pronto quando
Os caminhos estão destravados e a costura está no quadro.
