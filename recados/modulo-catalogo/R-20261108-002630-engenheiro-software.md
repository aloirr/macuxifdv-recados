---
id: R-20261108-002630-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0113
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T00:26:30-04:00
---
# T-0113 K: cadastro de marcas concorrentes no Catálogo (catalogo.marcas@1, entidade marca_concorrente, evento catalogo.marca_concorrente.alterada@1, BKO) — ADR 0034

## Contexto
T-0113, decisão do dono R-20261107-173950 b: o Catálogo passa a ser o dono das marcas concorrentes, e o Promotor lê por contrato. ADR docs/decisoes/0034-marcas-concorrentes-no-catalogo.md e desenho docs/desenho/T-0113.md §2 fatia K. A tabela `catalogo.marca_concorrente` vem do banco-dados (fatia B, mesmos ids de `promotor.concorrente`). Lote único: B, depois K, depois P.

## O que preciso
1. Contratos:
   - `MarcaConcorrenteSyncSchema` e `entidadeMarcaConcorrente` (pull, servidor vence);
   - `CONSULTA_MARCAS` `catalogo.marcas@1`. Entrada `{ids? ≤ 500, busca? ≤ 120, incluir_inativas = false}` strict; saída `{marcas: [{id, nome, ativo, external_id}]}`, por `lower(nome), id`, no máximo 2000, sem apagadas;
   - `EVENTO_MARCA_CONCORRENTE_ALTERADA` `catalogo.marca_concorrente.alterada@1`, strict: `{id, nome, ativo, external_id|null, fato: criada|alterada|inativada|reativada, alterada_em}`;
   - o comentário de `catalogo.referencia.marca_desconhecida@1` passa a citar o cadastro do Catálogo.
2. Domínio, com teste antes citando RN-CAT-13 (proposta, texto na ADR §7) e RN-CAT-09: validação do nome e fato da escrita.
3. API `/v1/catalogo/marcas`:
   - GET (`produto.consultar`; cada marca com a contagem `referencias`);
   - POST idempotente pelo id do cliente e PUT :id (`marca.gerenciar`, ação nova, analista e admin);
   - sem DELETE;
   - 422 `RN-CAT-13`;
   - auditoria só com ids;
   - evento na outbox, na mesma transação.
   Renomear atualiza `produto_referencia.marca_nome` na mesma transação. Inativar ou reativar toca `updated_at` das referências.
4. Fim da dependência do Promotor: `MARCAS_DO_PROMOTOR`, PUT `cadastro-catalogo`, consumidor do ERP, `enriquecer`, exportação e `GET marcas-concorrentes` passam a ler a tabela própria. Saem `CONSULTA_CONCORRENTES`, `usaConsultasOpcionais: ['promotor.concorrentes@1']` e `@macuxi/promotor` do package.json; o lockfile é comigo.
5. Sync:
   - provedor de `marca_concorrente`;
   - o provedor de `produto_referencia` manda como lápide a referência de marca inativa ou apagada e a manda de novo ao reativar (ADR §6);
   - consulta `catalogo.marcas@1` também no aparelho.
6. Manifesto: ofereceConsultas, publica, sync e a ação `marca.gerenciar`. A entrada `'marca'` sem entidade não é reaproveitada.
7. BKO: página `catalogo/marcas` "Marcas concorrentes" (grupo cadastros):
   - lista, busca e filtro;
   - criar e editar;
   - inativar com a confirmação "N referências saem da busca";
   - reativar;
   - link "Cadastrar marca" no seletor da referência.
   Textos com o designer-ux.

## Pronto quando
- lint, typecheck e testes do @macuxi/catalogo verdes;
- teste de rota de um tenant SEM o Promotor cadastrando marca e gravando referência;
- nenhum import de `@macuxi/promotor` no Catálogo;
- recado ao modulo-promotor com os nomes exportados e entrega ao gerente.
