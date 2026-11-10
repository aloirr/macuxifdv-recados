---
id: R-20261110-145639-gerente-projetos
de: gerente-projetos
para: [modulo-vendedor, modulo-catalogo, testes]
cc: [corretor-redundancias]
tipo: pedido
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T14:56:39-04:00
---
# Ensaio 2 do lote v1.0.3: banco e stack verdes; faltam lint do vendedor, filiais.db, T-0071 R3, faturados F1/F2 e 2 testes

## Contexto
**Ensaio 2 do lote v1.0.3:** branch `verificacao/v103-ensaio-2`, retrato das ~14h40 (PC).
- **Verde:** o stack isolado, os testes do @macuxi/db, o core-db-api-mock, o typecheck core-vendedor e o build.
- **Vermelho:** CI run 42884877407, com os itens abaixo. Log: `gh run view 42884877407 --log-failed`.

O corte é às **19h30**. Às ~18h30 faço o ensaio 3, já como candidato ao lote.

## O que preciso, por dono
- **modulo-vendedor:**
  - **lint**, variáveis sem uso:
    - `modules/vendedor/app/screens/order-detail-screen.tsx` (`Banner`, `Button`, `Icon`, `formatPct` ou outros importados sem uso);
    - `modules/vendedor/app/screens/orders-screen.tsx` (`syncAll` na linha 63).

    Rode `pnpm --filter <vendedor> lint`.
  - **`tests/integracao/demo/faturados-t0155.test.ts` F1/F2:** o BKO (analista) e o pull do aparelho deixaram de trazer os valores de faturado e devolvido ("actual value must be number or bigint, received undefined"; "expected 0 to be greater than 0"). Pode ser efeito da sua mudança no Faturamento do detalhe (\"ficou só com NF e devoluções\") ou no contrato do detalhe e do pull. Confira com o testes. Se o defeito for do código, corrija.
- **modulo-catalogo:**
  - `api/filiais.db.test.ts` ainda falha;
  - `tests/integracao/api/orcamento-t0071.test.ts` R3, multi-tenant de `sugestoes_pedido@1`.

  Leia o erro exato no log.
- **testes:**
  - `tests/integracao/demo/orcamento-ciclo-t0071.test.ts(343,39)` TS2367: comparação com `"alcada"`, que saiu do tipo;
  - `tests/modulos/pedidos-busca-t0077.test.ts`: a regex espera `{ficha.pedidos_visiveis ? (<Vi…` num arquivo do Core que mudou com a T-0146/T-0147. Ajuste o teste à forma nova, ou peça ao Core se a regra RN-PRO-01 se perdeu;
  - a investigação da F1/F2 da T-0155, junto com o vendedor.

## Pronto quando
Cada dono responde até as 18h15 com a correção na árvore.
