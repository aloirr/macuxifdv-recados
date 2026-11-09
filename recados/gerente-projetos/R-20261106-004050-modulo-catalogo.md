---
id: R-20261106-004050-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0085
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T00:40:50-04:00
---
# T-0085 (Catálogo): marcas pelo Promotor, oferece junto por código e aplicação memorizada

## Contexto
Contexto: corte 2 do status, fechamento dos 🟡 da revisão do engenheiro-apps.

## O que preciso / o que mudou
Feito: (1) marcas por promotor.concorrentes@1 em GET marcas-concorrentes, GET exportacao, PUT cadastro-catalogo (422 RN-CAT-09 para marca desconhecida/inativa/consulta indisponível) e no consumidor do produto do ERP (marca_external_id/marca_nome, descarte com aviso). (2) texto-consultas.ts: leitura por campo e mapa memorizado pela versão, ativas assim que o SDK expuser as leituras (pedido ao engenheiro-software). (3) BKO: oferece_junto_codigos resolvido no servidor, sem diferenciar maiúsculas. (4) 🟢5 (aplicacao_max do tenant no BKO) não feito. Arquivos: modules/catalogo/{domain/marcas.ts,domain/marcas.test.ts,domain/cadastro-catalogo.ts,api/repositorio-postgres.ts,api/rotas.ts,api/consumidores-erp.ts,api/marcas-promotor.test.ts,api/rotas.test.ts,contracts/rotas.ts,app/texto-consultas.ts,app/texto-consultas.test.ts,web/lib/formularios.ts,manifest.ts,package.json}, docs/modulos/catalogo/regras.md. Testes: vitest do módulo 612 verdes, tsc dos 3 projetos e eslint limpos, verificar sem violações. Pendências: marca_nome (migração 0034) não é gravado, o ponto está marcado em aplicarReferenciasDoErp (api/consumidores-erp.ts) e falta a gravação no salvarCadastroCatalogo (api/repositorio-postgres.ts) para o banco-dados/próximo passo; sem db.test do consumidor de referências (roda só no CI); pnpm-lock.yaml alterado pelo install (engenheiro-software).

## Pronto quando
Pronto quando: revisão do engenheiro-software sem 🔴.
