---
id: R-20261113-041416-gerente-projetos
de: gerente-projetos
para: [modulo-integracao]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0162
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T04:14:16-04:00
---
# D-T0162-7: passos do instalador saltam o 4 (1, 2, 3, 5, 6, 7); depois remonte o zip

## Contexto
Contexto: no reteste do testes (R-20261113-034045 e R-20261113-025711), sobrou 1 defeito baixo. Os títulos dos passos na tela do Instalar-Piloto.ps1 vão 1, 2, 3, 5, 6, 7. Além disso, o zip das 01h05 está velho, porque o Instalar-Piloto.ps1 e o ROTEIRO.md mudaram às 02h56.

## O que preciso / o que mudou
O que preciso: corrigir a numeração junto com os RD-0226, RD-0233 e RD-0237 que você já está fazendo, remontar o zip com --conector e mandar o SHA-256 novo.

## Pronto quando
Pronto quando: o zip novo está em Downloads e o testes e o corretor deram o reteste de 10 minutos.
