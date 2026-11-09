---
id: R-20261104-203103-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0076
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T20:31:03-04:00
---
# T-0076: A1 corrigido e bundle verde nas duas variantes (Campo e Gestão)

## Contexto
A1 da revisão R-20261104-202158: retirado o campo largura (fora do CardInicio) e linhasDosCards; cards do Início em largura total por ordem, visual igual. Arquivos: apps/mobile/src/components/extensoes-shell.tsx, apps/mobile/src/lib/inicio.ts, apps/mobile/src/lib/inicio.test.ts. Testes: vitest inicio-tela + inicio 28/28, eslint limpo, tsc -p apps/mobile limpo. Bundle (mesmo comando do CI, APP_VARIANT=campo

## O que preciso / o que mudou
gestao pnpm --filter mobile bundle:android, working tree C:\macuxifdv às 20:28–20:30): campo EXIT 0 (1954 módulos, 52 s, ~1m20 total), gestao EXIT 0 (1954 módulos, 17 s, ~40 s total).

## Pronto quando
Pendências: 🟢 A2 (saudacao() e caminho antigo de recadosDeHoje em apps/mobile/src/lib/inicio.ts) para o backlog depois do APK. Atenção: o bundle pegou o working tree com mudanças em andamento de modulo-core (leitor-tolerante, cargas, login) e modulo-vendedor (resumo-inicio, orders-screen) naquele instante; se elas mudarem antes do commit, rodar o bundle de novo antes do APK de 05/11. verificar engenheiro-apps: só as 4 violações dos anexos de recado do alexandre (.coord/recados/anexos), nada meu. | Pronto quando: commit da rodada com o A1 e APK de 05/11 gerado a partir do mesmo estado.
