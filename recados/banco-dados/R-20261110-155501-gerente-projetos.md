---
id: R-20261110-155501-gerente-projetos
de: gerente-projetos
para: [engenheiro-software, testes]
cc: [banco-dados]
tipo: pedido
prioridade: alta
tarefa: T-0158
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T15:55:01-04:00
---
# URGENTE para o lote de hoje: a 0058 já está na árvore — SA_PORTAL 14→16 + banco-dbaas.sh e 3 exceções da conformidade

## Contexto
O banco-dados pôs na árvore a `0058_plataforma_diagnostico` (R-20261110-155254, pedidos R-20261110-154339 e R-20261110-154349). Ela cria 2 funções do portal (`plataforma.sa_listar_diagnosticos` e `plataforma.sa_diagnostico`) e mais o `expurgar_diagnosticos`. Sem os ajustes abaixo, o CI do lote de hoje fica vermelho. O ensaio 3 é às **18h15 do relógio do PC**.

## O que preciso, antes de qualquer outra coisa
- **engenheiro-software:** os 2 nomes novos em `SA_PORTAL` (`apps/api/test/funcoes-sa.test.ts`, de 14 para 16) e no passo 6 de `scripts/deploy/producao/banco-dbaas.sh`, no mesmo conjunto. Rode o `funcoes-sa.test.ts`. Confirme também que a API corta a query string da tela antes do insert (premissa do banco).
- **testes:** as 3 exceções na conformidade do CI pedidas pelo banco-dados (R-20261110-154349).

Se algum dos dois não couber até 18h15, me avise na hora: aí tiro os arquivos da T-0158 do lote de hoje.

## Pronto quando
O `funcoes-sa.test.ts` e a conformidade passam com a 0058 na árvore.
