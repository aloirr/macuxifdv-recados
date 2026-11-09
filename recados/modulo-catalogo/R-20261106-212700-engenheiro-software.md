---
id: R-20261106-212700-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0089
responde_a: R-20261106-205058-modulo-catalogo
encerra: false
contrato: null
criado_em: 2026-11-06T21:27:00-04:00
---
# Revisão T-0084 e T-0089 K1-K3: sem 🔴, pode subir; 5 🟡 (colisão da faixa do ERP, PUT em faixa apagada, produto órfão, CSV, db test da consulta)

Contexto: revisão do R-20261106-205058 (T-0084 🟡 e T-0089 K1-K3), feita no diff local de modules/catalogo, contra o desenho docs/desenho/T-0089.md §3 e §8 e a migração 0037. Sem 🔴: pode subir no lote. O espelho já está atualizado: packages/platform-sdk/src/manifestos-referencia.test.ts (menu 'Tabelas de preço', ação tabela_preco.gerenciar para analista e admin, com assert no teste T-0089) e .coord/contratos/modulos.md (rotas e códigos 409/422).

O que preciso:
Conferido e aprovado:
- domain/escalonada.ts:
  - vigência fechada nas duas pontas, em data civil no fuso do tenant: ctx.fuso() na API e usuario().fuso no aparelho;
  - na mesma (medida, mínimo), a faixa da tabela do cliente vence a geral, e depois a de início mais recente;
  - validarFaixa é a mesma no BKO e na API (422 RN-VEN-23) e segue o CHECK da 0037 (^[A-Z]{1,4}$).
- P3: preco_unidade_cents é sempre o da unidade base, nos contratos e no sync.
- P4: o Catálogo entrega a faixa como está, e quem aplica o menor é o Vendedor. O BKO avisa com mais_cara_que_a_tabela.
- precos-cliente.ts:
  - faixas só em item vendável com preço visível;
  - sem faixa com RN-CAT-05 (perfil) ou RN-CAT-06 (sem tabela);
  - o pull da tabela_escalonada segue a mesma trava de perfil dos outros preços (sync.ts puxar).
- O SQL da consulta e do provedor bate com as colunas da 0037. Os casts ::text da `date` e ::float8 do bigint estão corretos.
- `faixas?` e `embalagens?` são opcionais na @1, então o contrato é aditivo:
  - o APK antigo, sem `embalagens`, usa UN × fator, como o contrato antigo já dizia;
  - o Vendedor só lê os dois campos como opcionais.
- Preço do ERP com unidade diferente da base vira aviso de log, e a linha deixa de valer, sem recusa. A unidade vem por core.cadastro_resumo@1 (fronteira ok; integracao/contracts só para os payloads).
- Rotas com acao + carteira nao_se_aplica, PUT idempotente pelo id, auditadas. Faixa do ERP só leitura (409).
- Decisão (ponto 4): manter tabela_preco.gerenciar só para analista e admin. Preço é cadastro, e o gerente já atua na alçada. Se o produto quiser o gerente, a mudança é aditiva depois. Levei ao gerente-projetos.

🟡 1. api/consumidores-erp.ts (criarConsumidorTabelaEscalonadaDoErp): a colisão no tabela_escalonada_faixa_uk com OUTRA linha vira 23505 em loop até a outbox desistir. Dois casos:
  - o ERP manda um external_id novo com a mesma chave de uma faixa do ERP já viva;
  - o ERP muda a chave de uma faixa para a de uma faixa manual.
  Trate o 23505 do faixa_uk: log de aviso (sem dado pessoal) e a decisão no domain, por exemplo a faixa do ERP substitui a outra (soft delete da antiga e insert). O consumo não pode ficar em loop. Teste com o banco em memória ou *.db.test.ts.
🟡 2. api/repositorio-postgres.ts (salvarFaixa) e api/rotas.ts (salvarFaixa):
  - repo.faixas() só vê as vivas, e o `on conflict (id) do update ... deleted_at = null` ressuscita qualquer linha pelo id;
  - um PUT no id de uma faixa do ERP apagada passa pelo 409 FAIXA_DO_ERP e reabre a linha do ERP como editável.
  Use `do update ... where catalogo.tabela_escalonada.external_id is null` e devolva 409 quando nada mudou, ou busque o atual incluindo as apagadas.
🟡 3. api/rotas.ts (salvarFaixa): produto_id não é conferido (não tem FK, como na tabela_preco_item), então o BKO pode gravar faixa órfã. Confira com repo.produtos() (ou core.cadastro_resumo@1) e devolva 422 com mensagem clara.
🟡 4. web/lib/tabelas-preco.ts:103 (celula do CSV): falta proteção contra fórmula. Nome de produto vindo do ERP pode começar com = + - @. Use protegerFormula/celulaCsv de @macuxi/comum (packages/comum/src/csv.ts, novo).
🟡 5. Testes de banco no CI: hoje não há *.db.test.ts para a consulta precos_cliente@1 com faixas (caminho quente do Novo pedido e do receber), para o repositório novo e para o consumidor da escalonada. Pelo menos o da consulta deve entrar neste lote, para o CI (stack-isolado) validar o SQL antes da demo. Os outros dois podem ir para o próximo lote.
🟢 6. domain/escalonada.ts:dataCivilNoFuso repete localIsoDate de @macuxi/comum/fuso. Pode reusar.
🟢 7. api/rotas.ts, listarEscalonada: o comentário diz que "a geral compara com a menor tabela", mas o código devolve sempre false para a faixa geral. Alinhe o comentário ou o código.
🟢 8. Preço do ERP: são duas idas ao Core por evento (produtoId e unidadeBase). Uma consulta só devolve id e unidade.

Pronto quando: a 🟡 5 (db test da consulta) neste lote, se der; as 🟡 1 a 4 numa tarefa do próximo lote; responda este recado com --encerra.
🟢 9. Rodando o vitest do Catálogo junto com Integração e Conector (máquina carregada), uma falha apareceu; sozinho, 689 verdes. Provável teste de tempo (desempenho-busca ou ranking-aplicacao): confira se o teto de tempo fica pulado fora do CI de desempenho.
