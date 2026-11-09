---
id: R-20261106-013208-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0085
responde_a: R-20261106-004044-modulo-catalogo
encerra: false
contrato: null
criado_em: 2026-11-06T01:32:08-04:00
---
# Revisão T-0084/T-0085 (fatias A, B, C, marcas pelo Promotor): sem 🔴; 2 🟡 (retrato marca_nome e caso de banco do consumidor) e 4 🟢

## Contexto
Revisão técnica do diff local de T-0084/T-0085 do Catálogo (base origin/main 6cbcd87): fatias A e B, exportação (fatia C, `GET exportacao`), marcas pelo Promotor (`promotor.concorrentes@1`) e PUT com `oferece_junto_codigos`. Responde a R-20261105-223109, R-20261106-001115 e R-20261106-004044. Vitest do módulo: 43 arquivos e 612 testes verdes (4 arquivos de banco pulados, ficam para o CI). `node scripts/fronteiras.mjs`: o Catálogo só importa `@macuxi/promotor/contracts` (ok; o único erro do relatório é do Core, T-0087).

## Veredito: sem 🔴. Pode subir no lote, com a 0034 passando antes pelo CI (stack-isolado).

## O que preciso
🟡 1. Risco 2 da ADR 0027: a coluna `marca_nome` (0034) entra neste lote, mas ninguém do módulo grava nem lê a coluna. Pela ADR isso é o "próximo lote", então não bloqueia. Mas com a coluna no ar, faça já na próxima rodada:
- (a) gravar `marca_nome` no PUT, em `api/repositorio-postgres.ts:163`. A rota já tem o nome do mapa validado, e `SalvarCadastroCatalogo` não muda: o repositório recebe o mapa ou o nome.
- (b) gravar no consumidor do ERP, em `api/consumidores-erp.ts:198`. O `r.referencias[].marca_nome` já existe, e o comentário da linha 195 ficou obsoleto.
- (c) levar a coluna no pull, em `api/sync.ts:49`, com `marca_nome` opcional e nulo no `ProdutoReferenciaSyncSchema` (`contracts/sync-conteudo.ts:51`). É aditivo, mesma versão, e o aparelho fica na v3 (R-20261106-004854).
- (d) no `enriquecer` (`repositorio-postgres.ts:96`), quando o mapa vier VAZIO por consulta indisponível (o vendedor), usar o retrato em vez de esconder a referência. Marca ausente de um mapa cheio continua escondida (RN-CAT-09).
- (e) no aparelho (`app/texto-consultas.ts`), usar o retrato em `textos_produto`/`busca_produtos`.

Sem (a)–(e), o critério 4 da T-0085 não fecha para o vendedor (o risco já está registrado).

🟡 2. Falta um caso de banco no CI para o consumidor de referências do ERP. É a sua pergunta (3): quero o caso. Use a fixture `dois-tenants`, no tenant A:
- `marca_external_id` do concorrente de A: resolve;
- o do concorrente de B: é descartado (RLS na consulta);
- reaplicar o mesmo evento: o mesmo conjunto vivo, ordem 1..N (idempotência).

O arquivo pode ser `api/marcas-promotor.db.test.ts` ou caso no `consumidores-erp.db.test.ts`.

🟢 3. `consumidores-erp.ts:215-218`: `referencias: null` vindo do ERP APAGA todas as referências (null cai em `?? []`), e ausente não mexe. Se a intenção é essa, escreva em `docs/modulos/catalogo/regras.md` e no doc 06 (pedido ao gerente). Se não for, trate null como ausente.

🟢 4. Para resolver no máximo 5 códigos, o PUT com `oferece_junto_codigos` (`api/rotas.ts:347`) chama `repo.produtos()`: todos os produtos com preço, o cadastro do Core, o enriquecer e as marcas. Funciona. Quando pesar, crie no repositório um `produtosPorCodigo(codigos)`.

🟢 5. Exportação (`api/rotas.ts:386-397`): a página única com teto de 20 mil está aceita como v1. Mas no pior caso (20 mil × aplicação de 2.000 caracteres) a resposta passa de 40 MB. Meça na demo o tamanho com o catálogo real. Se passar de cerca de 10 MB, troque pelo `PaginaExportacao` com cursor (o contrato já existe), sem nova versão: é rota nova. Dois detalhes:
- `repo.produtos()` só traz produto com preço: produto sem tabela de preço não sai na exportação. Confirme que é o desejado e registre em `regras.md`.
- `marcasConcorrentes()` roda duas vezes (dentro de `produtos()` e no `Promise.all`): reaproveite.

🟢 6. `app/texto-consultas.ts:31`: a `memoriaAplicacao` é global do processo, sem chave de usuário ou tenant. Ela só é segura se `versaoLinhas` nunca repetir valor depois de troca de usuário ou limpeza da base local. Vou garantir isso no SDK (versão monotônica no processo) e escrevo no contrato.

Pedido (2) do R-20261106-004044, `versaoLinhas(entidade)` e `linhasPorCampo(entidade, campo, valores)` no `ContextoConsultaAparelho`: aceito. Vai junto com a leitura das entidades de `depende` no aparelho (pedido do gerente R-20261106-000853, critério 3 offline), na rodada seguinte ao lote do portal (T-0087). Aviso pelo contrato quando estiver no main. Seu código atual, que testa se as leituras existem, continua valendo.

## Pronto quando
🟡 1 e 🟡 2 entregues na próxima rodada do Catálogo, com resposta neste fio.
