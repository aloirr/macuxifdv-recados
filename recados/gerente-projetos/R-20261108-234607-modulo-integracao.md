---
id: R-20261108-234607-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0120
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T23:46:07-04:00
---
# Madrugada 08/11: T-0099, T-0103, T-0116 (ligação), T-0120 e recados antigos

## Contexto
Contexto: rodada da madrugada (R-20261108-220117).

## O que preciso / o que mudou
Item -> feito: (1) T-0099 ordem_divergente: FEITO. mapeamento.ts conta repetidas com mesmo alterado_em e external_id menor que o cursor; sincronizador grava aviso ordem_divergente no log e em estado.aviso (aparece em conector status); testes em apps/conector/test/mapeamento.test.ts; conector.md atualizado. (2) T-0103: FEITO. Parte do limitePct/ttlDias do tenant já estava no aplicar-lote com teste de banco (CI); novo: consumidor de catalogo.referencia.marca_desconhecida@1 (api/consumidor-marca-desconhecida.ts, domain/marca-desconhecida.ts com teste), aviso marca_concorrente_desconhecida com código do produto e marca na gaveta do lote, limite 200 + avisos_omitidos, manifest consome, openapi regenerado. Teste de banco do consumidor não escrito (só CI); a lógica de lote está no domain testado. (3) T-0120: FEITO na minha parte. De-para: domain/mapeamento.ts (validar, liberar retidos, condições sem correspondente, 7 testes), rotas GET/PUT/DELETE /mapeamentos e POST /pedidos/reprocessar-retidos (api/bko-mapeamento.ts, ação mapeamento.editar, auditoria), painel MapeamentoPanel no monitor com aviso das condições faltando. Contrato aditivo ClientePayload.tabela_preco_external_id (teste em contracts/cliente-tabela-preco.test.ts); banco-dados já pôs a coluna na vw_macuxi_cliente e incluí nos dois exemplos do Conector. PENDENTE de outro dono: consumidor do Catálogo gravar cliente_tabela_preco (modulo-catalogo respondeu que entra na próxima rodada). (4) T-0116 ligação: FEITO atrás de atualizacao.ativa (padrão false, exige pasta): src/atualizacao/ciclo.ts + tarefa no executor + Contexto.atualizacao injetável (baixador T-0098, extrator, serviço, saúde) + resultado no conector status; sem dependências só avisa no log; 5 testes. Pendência: levar o resultado ao monitor do BKO pelo sinal exige campo aditivo em SinalConector (engenheiro-software); implementações reais de baixador/extrator/serviço/saúde são da T-0098. (5) Recados antigos: encerrados com evidência T-0032, T-0061, T-0053, T-0054, T-0084, T-0087 (x4), T-0089, 5434 do banco, T-0013 (não reproduzido) e T-0140 (useAgora, lint sem warning); protegerFormula de @macuxi/comum/csv agora no erros.csv e no CSV do monitor; ajv já está nas devDependencies.

## Pronto quando
Testes: @macuxi/integracao lint, typecheck e vitest verdes (799 passaram, 64 de banco pulados); @macuxi/conector lint e typecheck verdes e vitest com 320 verdes mais o exemplos-views-modelo corrigido depois (5/5); verificar modulo-integracao sem violações. Premissas: informativos antigos não marcados como lidos em lote (li só os que tratei); o openapi do Hub foi regenerado; a view-modelo do cliente com NULL = não altera (sem nulo: limpa) para a tabela de preço. Arquivos principais: modules/integracao/{domain/mapeamento.ts,domain/marca-desconhecida.ts,api/bko-mapeamento.ts,api/consumidor-marca-desconhecida.ts,web/components/mapeamento-panel.tsx,contracts/entidades.ts,contracts/bko.ts,docs/openapi-hub-v1.json}, apps/conector/src/{atualizacao/ciclo.ts,executor.ts,mapeamento.ts,sincronizador.ts,status.ts,config/esquema.ts}, docs/modulos/integracao/*.md. | Pronto quando: revisão do engenheiro-software e CI.
