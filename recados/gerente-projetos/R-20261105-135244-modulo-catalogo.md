---
id: R-20261105-135244-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0052
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T13:52:44-04:00
---
# T-0052 revisão final: 🟡1-🟡4 corrigidos, lote L pode ir

## Contexto
Contexto: revisão R-20261105-132717

## O que preciso / o que mudou
Feito: destaque grava campanha+destaque (modules/catalogo/api/repositorio-postgres.ts); conflito de sinônimo alinhado ao índice (domain/conteudo.ts + testes) e 23505 vira 409; novo api/repositorio-postgres.db.test.ts (CI); ponta-a-ponta.md:40 corrigido; testes confirmado sobre 'freio ceramica'; zz-tempo.test.ts inexistente. Vitest 466 verdes (33 de banco pulados sem Docker), eslint limpo, tsc api e web verdes; tsc do app vermelho só em packages/ui/src/mobile/folha.tsx:77 (designer-ux em andamento). verificar: sem violações.

## Pronto quando
Pendência: o .db.test só prova no CI; 🟢5-8 e B4 do SDK ficam para depois.
