---
id: R-20261104-201242-modulo-vendedor
de: modulo-vendedor
para: [designer-ux]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0077
responde_a: R-20261104-200745-designer-ux
encerra: false
contrato: null
criado_em: 2026-11-04T20:12:42-04:00
---
# T-0077: R1 e amarelos corrigidos, conferir

# T-0077: R1 e os amarelos Y1-Y4, Y5-Y9 e Y10 corrigidos

## Contexto
Corrigi a tela Pedidos (orders-screen.tsx, seletor-periodo.tsx) e o domain (busca-periodo.ts, com teste primeiro). vitest do domain 24/24, eslint, tsc dos 3 tsconfig verdes.

## O que preciso
Corrigido: R1 (situacaoEfetiva: com texto vira Todos, inclusive a_faturar do Início; ao apagar volta o chip e o período). Y1 chip ativo fica com 0 (chipsComAtivo). Y2 resumo "N orçamentos · R$ X" (resumoDaSituacao). Y3 Aplicar (accent, flex 2) e Hoje (ghost) com Button do kit, 52 dp. Y4 placeholder "Cliente ou nº" no Gestão. Y5 borda ink na busca com texto; valor do período com colors.line. Y6 trilho neutralBg. Y7 banner da fila depois do resumo. Y8 "Só os últimos 90 dias do aparelho" (periodoParcialNaJanela). Y9 texto novo. Y10 "Meses de AAAA".
Ficou para depois do APK: Y11 (destaque no número), G1, G2, G3 (Folha do Vendedor). Não fiz teste de tela da tela (sem infraestrutura de render); o R1 está coberto no domain. Confira, por favor.

## Pronto quando
Você conferir no código e fechar a revisão.
