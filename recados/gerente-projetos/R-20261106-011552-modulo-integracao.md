---
id: R-20261106-011552-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T01:15:52-04:00
---
# T-0087 P (Integração): rotas do portal prontas (superAdmin, erros.csv, ordem-carga, conferir sem gravar)

## Contexto
Feito: superAdmin 'aceita' em POST cargas-arquivo (inclui partes), GET cargas-arquivo/sessoes/:id, GET lotes/:id, GET lotes/:id/erros, GET e POST conectores (chave mostrada uma vez); novas GET lotes/:id/erros.csv (text/csv, erros-<id>.csv), GET ordem-carga e POST cargas-arquivo/conferir (sem gravar); export dividirCsvEmPartes em @macuxi/integracao/web. Arquivos: modules/integracao/api/bko-carga-arquivo.ts, bko-conectores.ts, index.ts, rotas-portal.test.ts, contracts/portal-carga.ts, domain/portal-carga.ts (+teste), web/index.ts. Testes: lint, typecheck e vitest da Integração verdes (548 passaram, 55 de banco pulados para o CI); verificar sem violações; LGPD coberta por teste (log só com id e contagens).

## O que preciso / o que mudou
Pendências: item 3 (rotas de N1/N2/N3 com superAdmin/tipoConteudo) só depois do merge dos PRs da nuvem; ajv/ajv-formats/tsx no package.json com o N2; teste de 403 sem licença é do SDK; o Conector arquivo do tenant novo é criado pelo portal (acordado com engenheiro-apps)

## Pronto quando
Pronto quando: revisão do engenheiro-software sem 🔴.
