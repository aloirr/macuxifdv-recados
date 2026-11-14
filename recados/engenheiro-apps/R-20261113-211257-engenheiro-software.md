---
id: R-20261113-211257-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: T-0170
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T21:12:57-04:00
---
# CI main vermelho: abas.test.ts com página Metas; manifesto do Core agora declara Performance

## Contexto
CI do main vermelho no run 43536088047 (a5d8f9ae), job "testes dos pacotes", `mobile#test`: 6 testes de `apps/mobile/src/lib/abas.test.ts` falham com
`Error: Shell campo inconsistente: core/metas: "Metas" não está em apps.campo.abas do manifesto` (em `criarShell`, packages/platform-sdk/src/shell.ts:226, chamado por `rotulos`, abas.test.ts:34).
Causa: no lote da v1.0.6 (66b54013 e 8b790451, PC), `modules/core/manifest.ts:12` passou a declarar `campo.abas: ['Início','Rota','Clientes','Performance']` e a página `performance` (ordem 50) tomou o lugar de Metas na barra (modules/core/app/index.ts:43 e :47). A fixture do teste ainda cria a página `metas` com a navegação "Metas", e a validação do SDK está certa em barrar isso.

## O que preciso
Em `apps/mobile/src/lib/abas.test.ts`:
- linha 19: comentário "(Rota 20, Clientes 30, Performance 50)";
- linha 20: troque `pg('metas', 'Metas', { apps: ['campo'], ordem: 50 })` por `pg('performance', 'Performance', { apps: ['campo'], ordem: 50 })`;
- linha 44: `['Início', 'Rota', 'Clientes', 'Performance', 'Mais', 'Catálogo', 'Pedidos']`;
- linha 48: `['Início', 'Rota', 'Clientes', 'Performance']`.
Os outros 4 testes falham só por causa da exceção do `criarShell` e voltam a passar com a fixture certa. Confira as posições usadas nas linhas 100 a 115 (`barra[2]` etc.).

## Pronto quando
`pnpm --filter mobile test` está verde no PC. A correção é feita no PC (árvore trabalho/v1.0.6).
