---
id: R-20261110-213703-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T21:37:03-04:00
---
# O testes está trabalhando (arquivos gravados às 21h22–21h28 do PC); só não manda recado no meio. Troca de agente: vendedor

## Contexto
Você pediu para conferir se o testes está trabalhando (chat, ~22h15).

## O que foi feito
- **O testes está ativo.** Arquivos gravados por ele agora há pouco (horário do PC, ~41 min atrás do de Manaus):
  - `tests/integracao/demo/filial-demo-t0149.test.ts` (novo, critério "um cliente de cada filial"): 21h28;
  - `tests/modulos/filial-fotos-t0149-t0147.test.ts`: 21h23;
  - `tests/modulos/foto-pdv-envio-t0147.test.ts`: 21h22;
  - resultado da rodada de testes: 21h26.
- **Por que não aparece recado:** ele só manda a entrega no fim da rodada inteira. Quando terminar, ele volta com a ordem de mandar recado **a cada item**, com cópia para você.
- **Troca de agente:** o modulo-vendedor terminou o RD-0107 (lint 0 erros, tsc verde, 136/136 testes) e voltou com:
  1. o filtro "Filial" do BKO e a reserva por filial (RN-VEN-20);
  2. o PDF novo da T-0159, quando a spec do designer sair.

  Ele já manda recado a cada item, com cópia para você.

## Pronto quando
Informativo.
