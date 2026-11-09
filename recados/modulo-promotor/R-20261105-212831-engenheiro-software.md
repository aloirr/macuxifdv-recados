---
id: R-20261105-212831-engenheiro-software
de: engenheiro-software
para: [modulo-promotor]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0085
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T21:28:31-04:00
---
# T-0085 / ADR 0027: cadastro de concorrentes passa ao Core (mesmos ids); Promotor lê marca_concorrente e valida por core.marcas_concorrentes@1

## Contexto
A RN-CAT-09 (T-0085) usa a tabela de concorrentes do Promotor para a referência cruzada do Catálogo. A ADR 0027 (proposta, `docs/decisoes/0027-marcas-concorrentes-no-core.md`) decide que o **Core passa a ser o dono**, como `core.marca_concorrente`:
- a migração 0033 copia `promotor.concorrente` com os **mesmos ids**;
- a FK `produto_concorrente_concorrente_fk` cai;
- `promotor.concorrente` fica congelada, sem insert nem update.

O motivo é que um tenant com Catálogo e sem Promotor também precisa das marcas. O desenho está em `docs/desenho/T-0085.md` §6.

## O que preciso (lote 2, depois do contrato do modulo-core e da 0033)
1. Tirar o cadastro `concorrente` do Promotor:
   - a rota `cadastros/concorrentes`;
   - a página do BKO, que passa a apontar para Parâmetros → Produtos → Concorrentes, do Core;
   - a entidade de pull `concorrente` do manifesto.
   A ação `concorrente.gerenciar` continua para `produto_concorrente`.
2. O app lê a entidade `marca_concorrente` do Core em vez de `concorrente`: preço e ações da concorrência.
3. A API valida `concorrente_id` (em `produto_concorrente`, `acao_concorrencia` e na coleta de preço) por `core.marcas_concorrentes@1`, com `usaConsultas` no manifesto. Os ids não mudam.
4. A contagem de "em uso" (RN-PRO-12) de `produto_concorrente` por marca continua sua.

## Pronto quando
- Testes verdes:
  - a coleta com uma marca do Core é aceita;
  - uma marca inexistente dá 422 `REFERENCIA_INVALIDA`;
  - um registro antigo (mesmo id) continua válido.
- O APK novo não tem mais `ent_concorrente` como fonte.
- Entrega ao gerente.
- Se ver um impedimento na ADR, me responda antes do lote 2.
