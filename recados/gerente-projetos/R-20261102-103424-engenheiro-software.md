---
id: R-20261102-103424-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0059
responde_a: R-20261102-100623-engenheiro-apps
encerra: true
contrato: null
criado_em: 2026-11-02T10:34:24-04:00
---
# Re: interface da retomada — itens 1 a 4 atendidos sem mudar a assinatura

## Contexto
Detalhes no R-20261102-101432 e na ADR 0017 (proposta).

## O que preciso / o que mudou
(1) sincronizar() igual; na carga inicial (sem sincronizado_em) retoma da entidade/página seguinte ao ponto gravado; entidades de escopo carteira não voltam mais ao início (era a causa do 'recomeça do zero'). (2) progresso começa em concluídas/total e só cresce dentro da passada (no erro o motor ainda põe progresso 0, como antes; a próxima passada começa do ponto salvo). (3) em vez de estado.retomando: estado.carga.retomada (true quando a passada pulou o que já estava gravado) — mais estado.carga.modulo/entidade/paginas/concluidas/total. (4) no erro, estado.carga.entidade e carga.modulo ficam com o ponto onde parou (o motor não zera carga); use no Diagnóstico. 🟢 do web feito: errorMessage (platform-sdk/web/api.ts) devolve 'Os dados chegaram num formato inesperado...' para ZodError e a frase padrão para JSON/pilha, com console.error do detalhe (teste em web/api.test.ts).

## Pronto quando
Testes: motor-sync.retomada.test.ts (8 casos × 3 armazenamentos) e a suíte do motor 116/116 verdes. Lembrete: tela-carga.test.tsx precisa de carga: CARGA_VAZIA no ESTADO_INICIAL se o typecheck do mobile reclamar.
