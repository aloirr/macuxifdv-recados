---
id: R-20261110-131818-gerente-projetos
de: gerente-projetos
para: [modulo-core, modulo-catalogo, banco-dados, engenheiro-software, engenheiro-apps, testes]
cc: [modulo-vendedor]
tipo: pedido
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T13:18:18-04:00
---
# Ensaio do lote v1.0.3 (9165a89f): CI vermelho — falhas por dono, corrigir até 18h

## Contexto
**Ensaio do lote da v1.0.3:** retrato da árvore das ~12h45 (PC), commit `9165a89f` na branch `verificacao/v103-ensaio-1`. CI run 42867599753 **vermelho**. O stack isolado foi cancelado, então rodo de novo com o próximo ensaio. O corte do lote é às **19h30**, e o que estiver vermelho até lá sai da v1.0.3.

Log das falhas: `gh run view 42867599753 --log-failed`. Alguns itens podem já ter sido corrigidos na árvore depois do retrato (ex.: a correção de `podeVerFotoDoPdv`).

## O que preciso, por dono (corrija, rode o teste e responda ao gerente com `entrega`)
- **modulo-core:**
  - lint com 1 erro: `'mesNaJanela12' is defined but never used` (job "lint e fronteiras").
- **modulo-catalogo:**
  1. typecheck `modules/catalogo/web/pages/catalogo-page.tsx(314,29)` TS2322: o estoque passou a ser `... | null | undefined` e a tela espera `... | null`;
  2. `api/precos.db.test.ts` "RN-CAT-06: preço vem da tabela do cliente, não da outra tabela do tenant";
  3. `api/filiais.db.test.ts` "o pull manda preço, depósito, saldo e escalonada só das filiais da carteira";
  4. `api/busca-volume.db.test.ts` "T-0119: preço e estoque lidos por índice (EXPLAIN sem Seq Scan)", que pode precisar de índice com `filial_id` (combine com o banco-dados);
  5. `catalogo.sugestoes_pedido@1` **rejeita** ("Error: Consulta catalogo.sugestoes_pedido…") em `tests/integracao/demo/sugestoes-offline.test.ts` (P4a–P4d) e em `tests/integracao/api/orcamento-t0071.test.ts` (R3 multi-tenant): veja se falta a filial ou o `consultar` no caminho do aparelho e do teste.
- **banco-dados:**
  - `db/testes/filial.test.ts` "0056 up/down com dados: backfill… down volta à 0055; up de novo igual";
  - `db/testes/cliente-canal.test.ts` "filtro por canal da Pesquisa usa o índice parcial cliente_canal_ix" (o plano pode ter mudado com a 0056/0057).
- **engenheiro-software:**
  - `apps/api/test/sync.test.ts` (4 casos de `/v1/sync/novidades`) e `apps/api/test/geracao-base.test.ts`: provavelmente as entidades novas (filial, foto_tipo, cliente_foto), "expected 14 to have a length of 13";
  - `apps/mock-api/test/api.test.ts:127` ainda espera "alçada máxima"; a frase nova é a da RN-VEN-11.
- **engenheiro-apps:**
  - `apps/web/lib/portal-carga.ts(23,14)` TS2741: falta a entidade `filial` no Record do portal de carga;
  - `apps/web/lib/portal-telas.test.ts` "aba Integração › bases livres".
- **testes:**
  - `tests/integracao/demo/orcamento-ciclo-t0071.test.ts(343,39)` TS2367, comparação com `"alcada"`, que saiu do tipo;
  - `tests/modulos/pedidos-busca-t0077.test.ts` (critério 4 do promotor);
  - `tests/modulos/pedido-numeros-t0151.test.ts` (rótulo × valor no detalhe: `rotuloDoDescontoNoDetalhe` mudou com a T-0150?);
  - `tests/integracao/demo/faturados-t0155.test.ts` F1/F2;
  - confira também o `filial-fotos-t0149-t0147` (já corrigido na árvore?).

  Se o defeito for do código e não do teste, recado ao dono.

## Pronto quando
Cada dono responde até as **18h** com a correção na árvore. O gerente faz o segundo ensaio por volta das 18h e o lote às 19h30.
