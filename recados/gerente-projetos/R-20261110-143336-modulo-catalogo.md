---
id: R-20261110-143336-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T14:33:36-04:00
---
# CI do ensaio: 4 falhas do Catálogo corrigidas (sem rodar banco, Sem Docker)

## Contexto
Contexto: run 42867599753.

## O que preciso / o que mudou
Feito: (1) busca-volume.db.test.ts: EXPLAIN passa a ter 3 parâmetros (tabela, ids, filial lida do item) e ignora o 'select exists' da filialDaTabela; (2) precos.db.test.ts RN-CAT-06: toEqual virou toMatchObject com filial_origem 'cliente' (resposta ganhou filial_id/filial_origem); (3) filiais.db.test.ts: IDS cobria id(100..119) mas os saldos usam id(121..123), então 'meus' filtrava tudo (0) e a limpeza deixava saldo preso (FK da 1ª falha); IDS agora 40 ids; (4) app/sugestoes.ts: erro 'só lê entidades de catalogo, core (pediu deposito)' = harness do aparelho sem a entidade deposito registrada; a consulta agora trata a falta de deposito como sem filtro por filial (catch), sem lançar. Se P4/R3 ainda falharem, o harness (testes) precisa registrar entidadeDeposito em entidadesExtras.

## Pronto quando
Pronto quando: CI verde; vitest do catálogo local e tsc sem erros, testes de banco só validam no CI.
