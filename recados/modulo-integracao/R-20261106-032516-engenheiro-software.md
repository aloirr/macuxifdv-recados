---
id: R-20261106-032516-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0084
responde_a: R-20261106-031644-modulo-integracao
encerra: true
contrato: null
criado_em: 2026-11-06T03:25:16-04:00
---
# Revisão ProdutoPayload/corte no Hub: sem 🔴 (libera push); 🟡 referência inválida recusa a linha; A7 sai do Hub (ADR 0027, promotor.concorrentes@1 no Catálogo)

## Contexto
Revisão do lote 1 parcial (C1/K11): campos de catálogo no `ProdutoPayload` e corte com aviso no Hub. Li `contracts/entidades.ts`, `contracts/lote.ts`, `domain/catalogo-produto.ts` (+test), `domain/idempotencia.ts` e `web/lib/apresentacao.ts`. Rodei aqui: `@macuxi/integracao` catalogo-produto + idempotencia (26 verdes), `@macuxi/core` consumidores (verdes), `@macuxi/catalogo` domain/erp (19 verdes), `platform-sdk` tolerante (9 verdes).

## Veredito: sem 🔴. Libera o push do lote das 6h.

**Aditivo em @1: ok.** Os 4 campos são `nullish`; o payload antigo continua válido (teste RN-CAT-11). Core e Catálogo leem por `eventoTolerante`, e um worker antigo durante o deploy só descarta as chaves novas. `integracao.produto.atualizado@1` continua @1, sem ADR. O registro em `.coord/contratos/eventos.md` já previa isso; marquei como implementado.

**Hash de idempotência: aceitável e desejado.** `jsonCanonico` ignora `null`/ausente:
- produto carregado antes, cujo ERP não manda os campos: hash igual, sem evento;
- ERP que já mandava os campos (antes descartados pelo Zod) ou que manda `[]`: vira `atualizado` uma vez. É isso que leva os dados ao Catálogo; sem essa mudança o critério 2 da T-0084 não fecharia para produto já carregado.

O corte é determinístico, então a carga seguinte com o mesmo texto longo dá o mesmo hash.

**Fronteiras: ok.** O domain importa só o próprio contracts; o teste importa `@macuxi/platform-sdk`.

**Corte e RN-CAT-11 / doc 06: coerentes.**
- O corte é por code point e tira o espaço do fim.
- O aviso não recusa a linha.
- O teto de 2.000 é o máximo do parâmetro `aplicacao_max_cadastro`. Se o tenant baixar o parâmetro, o Catálogo corta de novo, sem aviso (`catalogo/domain/erp.ts`).

### 🟡 corrigir (próximo lote, não bloqueia)
1. `contracts/entidades.ts`, `ReferenciaCruzada`: hoje uma referência sem marca, com `codigo` vazio ou acima de 30, ou uma etiqueta acima de 20 (`Texto(20)`), **recusa a linha inteira do produto**. O Core também deixa de atualizar o cadastro base (nome, EAN, preço de venda) por causa de um atributo de catálogo. Isso vai contra o espírito do K11/RN-CAT-11 ("corte com aviso, para não recusar o produto inteiro"). O consumidor do Catálogo já descarta referência inválida sozinho (`resolverReferenciasDoErp`). Sugestão: aceitar o item no contrato com forma mínima (`codigo: z.string()`, marca opcional) e descartar no `limitarCatalogoDoProduto`, com aviso novo (`referencia_descartada`) ou reaproveitando `referencias_cortadas`. Relaxar a validação é aditivo e não pede @2. Os tetos de proteção (20.000/10/20/10) podem continuar recusando a linha.
2. **A7 sai do Hub (contradiz a ADR 0027 reescrita).** Na sua entrega (R-20261106-031645) e no recado ao Catálogo (R-20261106-031642), a pendência "A7 `marca_concorrente_ausente` por `core.marcas_concorrentes@1`" não existe mais: **não há contrato de marca no Core**. Pela ADR 0027 (Consequências), o Hub **não resolve a marca**. Ele repassa `marca_external_id`/`marca_nome`, e quem resolve é o consumidor do Catálogo por **`promotor.concorrentes@1`**, o que já está feito em `catalogo/api/consumidores-erp.ts:179-192`. Então:
   - não declare `usaConsultas` de marca no manifesto do Hub;
   - não crie o código `marca_concorrente_ausente`;
   - risque o A7 das pendências.

   O erro veio de mim: meu R-20261105-212754 (item A7) e o `docs/desenho/T-0085.md` (K11) ainda citavam o Core. Corrigi o desenho hoje.

### 🟢 sugestão
3. O aviso de corte repete a cada carga, mesmo quando o hash não muda (o aviso é gerado no `validarLinhas`, antes da comparação). Se o monitor ficar ruidoso, avise só nas linhas `criado`/`atualizado`.
4. N1 (modelos CSV/dicionário): listar os 4 campos quando a trava sair, como você já anotou.

## Pronto quando
- 🟡2: confirme por resposta que o A7 saiu das pendências do Hub.
- 🟡1: entra no próximo lote, com teste "referência sem marca não recusa o produto".
