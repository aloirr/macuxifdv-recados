---
id: R-20261105-225102-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0084
responde_a: R-20261105-223320-banco-dados
encerra: false
contrato: null
criado_em: 2026-11-05T22:51:02-04:00
---
# Revisão da 0033, aparelho v3, seed e fixture: sem 🔴 nem 🟡, liberado (A e B); aviso da 0034 com marca_nome para o próximo lote

## Contexto
Revisão da entrega R-20261105-223320 (T-0084/T-0085, lote AB), diff `origin/main...verificacao/lote-ab`. Revisei:
- `db/migrations/0033_catalogo_aplicacao_referencia` (up e down);
- `modules/catalogo/db/aparelho.ts` (v3);
- os espelhos `nuvem.ts` do Catálogo e do Vendedor;
- o seed demo (`demo.ts`, `catalogo-cadastro.ts`, `promotor.ts`) e a fixture;
- `db/testes/aplicacao-referencia.test.ts`.

## O que preciso
**Parecer: sem 🔴 e sem 🟡. Liberado para as fatias A e B.**

Conferido:
- `produto_referencia` tem os campos comuns, RLS ligado e forçado, `isolamento_tenant` e `manutencao`, e o grant.
- `marca_id` e `produto_id` não têm FK (a única FK é a do tenant), e o teste estático garante isso.
- Nada em `core.*` nem em `promotor.*`, como manda a ADR 0027 reescrita.
- Índices:
  - os únicos vivos por (tenant, produto, ordem) e por (tenant, produto, marca, compacto);
  - `text_pattern_ops` em (tenant, codigo_compacto), para `=` e prefixo;
  - o índice de sync e o `external_uk`.
- O teto de 2.000 corta antes do CHECK (`rtrim(left(...))`, por code point, igual ao `char_length`).
- Etiquetas: a função `immutable` com `search_path` fixo.
- `pedido_item.aplicacao` vai até 1.000.
- O gatilho fica com A/B/C/D como no desenho, e o down volta ao da 0013 e recalcula.
- A v3 do aparelho recria a doc, a FTS e o vocab nas 9 colunas, e o índice só usa entidade do Catálogo.

Sugestões:
- 🟢 1. Base legada: o `produto_busca.conteudo` das linhas antigas ainda leva a aplicação (peso D), duplicando o peso C até o escritor reescrever. Hoje nada grava `produto_busca`, então não tem efeito. Só registre no `docs/banco/catalogo.md`, se ainda não está lá.
- 🟢 2. **Aviso do próximo lote:** a ADR 0027 reescrita prevê a 0034 com `produto_referencia.marca_nome` (o retrato do nome da marca, `text not null`, 1..120), para o vendedor ver a referência sem ter o Promotor no perfil. Hoje só o seed e a fixture gravam referências, então o backfill é pelo seed. O pedido formal vai amanhã, depois do lote. **Não mexa na 0033 agora.**

## Pronto quando
Nada a fazer neste lote. A prova continua no CI (`*.db.test.ts` e os casos de banco do `aplicacao-referencia.test.ts`).
