---
id: R-20261106-043409-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T04:34:09-04:00
---
# Revisão do lote (catálogo C9, integração, limpeza do banco, testes T-0084): sem 🔴, pode subir

## Contexto
Revisão de código do lote (base origin/main = 4effc7c), sem git, sem Docker e sem ler .env. Rodei: vitest do catálogo (app/texto-consultas, app/busca-produtos-aparelho, api/rotas, domain), 487 testes, verde; o único vermelho foi da 1ª rodada, o desempenho RF-CAT-02 de 5 s já conhecido, e passou na 2ª. Integração (domain/catalogo-produto, domain/pedido-fila): 70 verdes. db/testes/apagar-banco.test.ts: 10 verdes. Typecheck de @macuxi/catalogo (api, web, app), @macuxi/integracao e @macuxi/db: verde. `coord verificar engenheiro-software`: sem violação.

## O que pode subir (nenhum 🔴)
- modulo-catalogo: C9 no aparelho pelo SDK novo, lib/local.ts com `lerConcorrente`, memória da aplicação por versaoLinhas e exportação com `marca_nome`. A C9 não lê o Promotor, o que está provado em teste. Vereditos em R-20261106-042933: 🟡 retrato × cadastro do Promotor no "Equivale a" (RN-CAT-09, depende do meu SDK), 🟡 C9 sem pré-seleção FTS5 em catálogo > 500 (ranking da cauda e custo; depende do meu SDK), 🟡 C9/C8 da API sem retrato nem campanha (api/consultas-texto.ts), 🟡 anoAtual pelo relógio do processo, e 4 🟢.
- modulo-integracao: `ItemPedidoErp.aplicacao` é aditivo na v1 (sem @2 nem ADR); `ReferenciaCruzada` frouxa + `referencia_descartada` + corte de etiqueta. R-20261106-042947: 🟡 gravar os valores aparados e 3 🟢.
- banco-dados: db/src/apagar-banco.ts, banco-teste.ts e dbaas/teste-compatibilidade.ts. O job não fica mais frouxo: nenhum grant nem filiação do admin, e a trava estática vale. R-20261106-042954: 🟡 o prazo de 30 s passa do idle de 10 s do pg.Pool e pode esconder um pool sem end(); proposta de 8 s + aviso no log.
- testes: os três arquivos T-0084. R-20261106-042958: 🟡 falta a C9 do aparelho × aba no teste offline; 🟡 o it.todo P-2e (ItemPedidoErp.aplicacao) já pode virar teste. Apareceu tests/modulos/seletor-busca-offline-t0084.test.ts durante a revisão: não revisei, fica para a próxima.

## Pendências
Minhas (SDK): no contexto da consulta do aparelho, (1) leitura das entidades de `opcionais` quando o módulo está ativo, sem Error, e (2) FTS5 `buscarComDesfecho` nos índices do próprio módulo. As duas destravam os 🟡 1 e 2 do catálogo. Fora de escopo, como pedido: a Equipe por CSV (modulo-core), a 0036 e o excecoes.ts/fixture de convites (banco-dados).

## Pronto quando
O lote pode subir. Os 🟡 entram neste lote, se couberem, ou no próximo.
