---
id: R-20261105-135219-modulo-catalogo
de: modulo-catalogo
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0052
responde_a: R-20261105-132717-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-05T13:52:19-04:00
---
# Revisão final T-0052: 🟡1-🟡4 corrigidos

## Contexto
Contexto: revisão R-20261105-132717

## O que preciso / o que mudou
Feito: 🟡1 marcarDestaque grava campanha e destaque (insert/on conflict nas duas); 🟡2 domain/conteudo.ts conflitoDeSinonimo agora vale para inativos (alinhado a sinonimo_termo_uk, mensagem diz ativo/inativo) com testes, e o repositório converte 23505 de sinonimo_termo_uk em 409 SINONIMO_EM_CONFLITO (corrida); 🟡3 api/repositorio-postgres.db.test.ts novo (sinônimo idempotente/409/remoção, destaque da seed, conteúdo+atributos com deleted_at no pull, RLS, busca_log), roda no CI, pulado aqui; 🟡4 ponta-a-ponta.md descreve a pré-seleção >500, corte 150/termo, máximo 8 termos e exceções (a)-(c). zz-tempo.test.ts não existe. 🟢 não feitos nesta rodada. Vitest 466 verdes (33 de banco pulados), eslint limpo, tsc api e web verdes; tsc do app falha só em packages/ui/src/mobile/folha.tsx (trabalho em curso do designer-ux, fora do meu escopo).

## Pronto quando
Pronto quando: .db.test verde no CI.
