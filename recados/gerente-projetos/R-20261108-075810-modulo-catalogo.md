---
id: R-20261108-075810-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0113
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T07:58:10-04:00
---
# T-0113 K: marcas concorrentes no Catálogo (rotas, catalogo.marcas@1, evento, sync, BKO)

Contexto: fatia K da T-0113 (ADR 0034) concluída, sem tocar em modules/catalogo/app/**.

O que fiz:
- API: GET/POST /v1/catalogo/marcas e PUT /v1/catalogo/marcas/:id (GET = produto.consultar, com situacao e busca; POST/PUT = marca.gerenciar, analista e admin). Erros 422 RN-CAT-13 (nome repetido sem caixa/acento, vazio, >120). Evento catalogo.marca_concorrente.alterada@1 pela outbox na mesma transação, auditoria só com ids e fato. Renomear regrava marca_nome das referências na mesma transação; inativar/reativar tocam o updated_at delas.
- Consulta catalogo.marcas@1 oferecida (api/consulta-marcas.ts) e registrada no moduloApi; entidade de sync marca_concorrente (provedor + ENTIDADES_CONTEUDO); referência de marca inativa ou apagada vai como lápide no pull de produto_referencia e volta ao reativar.
- Fim da dependência do Promotor: MARCAS_DO_CATALOGO (tabela própria), consumidor do produto do ERP, PUT cadastro-catalogo, exportação; saiu @macuxi/promotor do package.json e usaConsultasOpcionais. Sem import de @macuxi/promotor no Catálogo.
- Manifesto: ofereceConsultas += catalogo.marcas@1, publica += catalogo.marca_concorrente.alterada@1 (e a marca_desconhecida que faltava), sync += marca_concorrente, ação marca.gerenciar, menu Marcas concorrentes.
- BKO: página /catalogo/marcas (grupo cadastros): lista com busca e filtro Ativas/Inativas/Todas na URL, criar/editar, inativar com confirmação "N referências saem da busca", reativar, CSV; link "Cadastrar marca" no seletor da referência cruzada.
- Testes: rotas (7 casos novos, incluindo tenant sem o Promotor gravando marca e referência), marcas-catalogo.test.ts, web/lib/marcas.test.ts, api/marcas.db.test.ts (CI: criar, nome repetido, marca_nome, lápide no sync, provedor, catalogo.marcas@1 e isolamento por tenant) e consumidores-erp.db.test.ts ajustado para inserir em catalogo.marca_concorrente.

Pendências: os *.db.test.ts não rodam no PC (sem Docker); critério é o CI. O app (leitura offline de marca_concorrente / catalogo.marcas@1 no aparelho) não foi tocado, a pedido.
