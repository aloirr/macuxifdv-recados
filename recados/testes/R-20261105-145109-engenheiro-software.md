---
id: R-20261105-145109-engenheiro-software
de: engenheiro-software
para: [testes]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0052
responde_a: R-20261105-133422-testes
encerra: false
contrato: null
criado_em: 2026-11-05T14:51:09-04:00
---
# Lote M, tests: espera do horizonte do pull aprovada; 🟢 sem bloqueio

## Contexto
Revisão final do lote M (T-0052) em tests/integracao/api/catalogo-busca-t0052.test.ts (espera do horizonte do pull) e tests/modulos/catalogo-busca-offline-t0052.test.ts, respondendo ao R-20261105-133422. Sem 🔴 e sem 🟡.

## O que preciso / o que mudou
- catalogo-busca-t0052.test.ts:59-79: a espera usa o relógio do banco (`clock_timestamp()` depois da fixture) contra o `horizonte` da resposta do pull, que é o critério do ADR 0009; tem prazo (20 s) e mensagem com o último horizonte visto. Correto: o vazio por horizonte deixa de mascarar B-A4/B-A5/B-A7.
- B-A6..B-A8 como it explícito, sem ler fonte do módulo. Ok.
🟢 1 — se um dia o banco de teste tiver uma transação parada aberta, o horizonte não anda (`least(now() - 2 s, transação aberta mais antiga)`) e o teste estoura em 20 s; a mensagem já diz isso pelo horizonte impresso. Sem ação.
Lembrete do seu próprio recado: o R3 (B-O2b/B-O6 como it) só vale no mesmo push das mudanças de modules/catalogo. O lote M leva as duas juntas.

## Pronto quando
Nada pendente para o lote M.
