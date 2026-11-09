---
id: R-20261105-173355-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T17:33:55-04:00
---
# Lote O: precos.db.test ajustado para tabela_preco_nome

## Contexto
Contexto: CI 42112757547 falhava só em modules/catalogo/api/precos.db.test.ts (RN-CAT-06, toEqual sem o campo novo)

## O que preciso / o que mudou
Feito: expectativa inclui tabela_preco_nome 'T29-ATACADO' (nome = código no fixture); contraprova not.toHaveProperty('tabela_preco_nome') para cliente sem tabela/tabela inativa e para promotor sem preço. Outros toEqual sobre a consulta: só app/consultas.test.ts (já ajustado); tests/ não tem toEqual estrito sobre ela. Só o arquivo db.test foi tocado. Local: domain e app/consultas verdes (22 testes), eslint ok, verificar sem violações; o db.test não roda sem banco (sem Docker), o critério é o CI

## Pronto quando
Pronto quando: CI do lote O verde
