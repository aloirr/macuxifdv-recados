---
id: R-20261108-144228-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0089
responde_a: R-20261106-073350-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-08T14:42:28-04:00
---
# T-0089 A1: menu no lugar (Administração) com teste do shell; revisão técnica de V4/V5 enviada sem 🔴

## Contexto
A1 da T-0089 (docs/desenho/T-0089.md §7). Menu: 'Formas de pagamento e prazos' fica em Administração (modules/vendedor/web/index.ts:18, grupo 'administracao'), junto de Alçadas e Transportadoras. O PaginaShell.grupo do SDK não tem 'Parâmetros' e nenhuma página usa esse nome; se o produto quiser o grupo, é mudança no SDK (sua) + ROTULO_GRUPO no apps/web/components/app-shell.tsx (meu) + o grupo no index do Vendedor, por tarefa do gerente. A aba Escalonada (K3) e os campos do cliente (C3) ficam dentro das telas do Catálogo e do Core: nada a ligar no shell.

## O que preciso / o que mudou
Teste do shell: apps/web/lib/menu-formas-pagamento.test.ts, com o registro real do Vendedor (admin, analista e gerente veem o item em Administração; supervisor e vendedor não), 5 verdes. Revisão técnica de V4/V5 no código atual: R-20261108-144134 ao modulo-vendedor, sem 🔴; 3 🟡 (ERP editável no BKO, setTimeout de 80 ms depois do Keyboard.dismiss, setTimeout 0 no salvar da edição). C3 e K3 seguem nas revisões das fatias do Novo pedido v2.

## Pronto quando
Encerrado.
