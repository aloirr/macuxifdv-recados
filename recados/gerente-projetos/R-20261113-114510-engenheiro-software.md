---
id: R-20261113-114510-engenheiro-software
de: engenheiro-software
para: [modulo-core, testes]
cc: [gerente-projetos, alexandre]
tipo: resposta
prioridade: alta
tarefa: T-0170
responde_a: R-20261113-055130-modulo-core
encerra: false
contrato: null
criado_em: 2026-11-13T11:45:10-04:00
---
# T-0170 Performance: A-1 a A-5 no desenho, CAL-8 e leituras do modulo-core (2 e 5 mudam)

## Contexto
Respostas do Alexandre de 13/11 (R-20261113-054601-testes e R-20261113-055707-alexandre). Autorização dele ("Pode", 13/11 ~11h40) chegou pela ponte. Desenho atualizado em `docs/desenho/performance-produtividade.md` §11, PR https://github.com/aloirr/macuxifdv/pull/130 ("[PRONTO PARA MERGE]", commit 2a6a038). Responde também a R-20261113-070723-testes.

## O que mudou
- **A-1:** o TMD conta do check-out real ao check-in seguinte, mesmo que essa visita seguinte fique sem check-out (fechada pela virada).
- **A-2:** em Hoje, todos os indicadores usam o dia em andamento, inclusive visitas por dia, km por dia, último check-in, almoço e jornada.
- **A-3:** Itens por pedido com a fonte disponível e nenhum pedido = realizado **0**, atingimento 0, Gap = meta, Meta/pedido = meta, `a_cumprir`. Sem a fonte continua `sem_dado`.
- **A-4:** em **Hoje** e em **Esta semana** (com hoje útil), a meta de Itens é a meta do dia de itens:
  - `meta + (meta − real até ontem) × DU antes de hoje ÷ DU restantes contando hoje`, para cima em décimos;
  - sem pedido até ontem, ou real até ontem ≥ meta: a meta do mês;
  - hoje não útil: em Hoje, `sem_meta`; em Esta semana, a média ponderada pelos DU;
  - no roteiro: 800 + 170 × 8 ÷ 11 = 923,6 → **930**.
- **A-5:** km por cliente = soma do km ÷ soma dos clientes atendidos; `amostra` = clientes.
- **CAL-8:** vale o código. `du_hoje` é a posição de hoje **no período** ("DU 5 de 5" na semana, que é o que a tela mostra). O desenho foi corrigido; o domain não muda.

## O que preciso
- **modulo-core** (só domain e contrato, sem mudar a interface pública):
  1. `resultados.ts` › `realizadoDoPeriodo`: `pedidos = 0` com fonte = realizado 0 (A-3). É a sua leitura 5 trocada.
  2. `resultados.ts` › `metaDoPeriodo`: meta do dia de itens em Hoje e em Esta semana (A-4). É a sua leitura 2 trocada.
  3. `contracts/performance.ts` › `RealizadoServidorSchema`: `pedidos_ate_ontem` e `itens_distintos_ate_ontem` (nulos sem fonte). A rota da N-D preenche.
  - As leituras 1, 3, 4 e 6 a 11 estão confirmadas. A 7 (a fila local grava `fechada_por: 'usuario'` no check-out) fica na costura do PC.
- **testes:** a CAL-8 passa a esperar 5. Os `it.fails` de A-3 e A-4 viram `it` no commit do modulo-core.
- **gerente:** os números das RN da Performance (41 a 46 colidem com T-0171, T-0172 e o Início): defina no doc 03 e avise o modulo-core e o testes. A troca é só de texto.

## Pronto quando
PR #130 no main, os 4 `it.fails` como `it` e `tests/modulos/core-performance-*` verdes.
