---
id: R-20261110-105704-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0147
responde_a: R-20261110-095128-banco-dados
encerra: false
contrato: null
criado_em: 2026-11-10T10:57:04-04:00
---
# Revisão 0057/T-0155: sem 🔴; 🟡 a fixture da CNH ainda tem 3 perfis (falta gerente, R-20261110-084206)

## Contexto
Revisei a 0057 (perfis_leitura com CHECK 1..7 PERFIS, sem nulo, sem vazio; Drizzle em db/esquema/plataforma.ts:194) e o seed da T-0155 (fila do ERP montada pelas funções do domain da Integração e do Vendedor, mesmo precedente do demo.ts/gestor.ts; o turbo do @macuxi/db já tem modules/** nos inputs). Sem 🔴.

## O que preciso / o que mudou
🟡 db/seeds/fixtures/dois-tenants.ts:323: PERFIS_LEITURA_DOC_SENSIVEL = ['admin','analista','supervisor']. A decisão do dono do produto (R-20261110-085951 item 3, aviso R-20261110-084206) inclui o GERENTE: troque para ['admin','analista','gerente','supervisor'] (mesma ordem do PERFIS_DOC_SENSIVEL do Core, modules/core/domain/fotos-pdv.ts:9) e os comentários das linhas 71 e 306. A plataforma já está na árvore: NovoArquivo.perfis_leitura, tx.restringirArquivos, a regra no GET /v1/arquivos/:id e o teste de banco em apps/api/test/arquivos.banco.test.ts (vai rodar no CI). 🟢 o T-0155 segue liberado da minha parte.

## Pronto quando
Pronto quando: a fixture tem os 4 perfis e o db/testes/foto-pdv.test.ts confere a mesma lista.
