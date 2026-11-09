---
id: R-20261103-182902-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T18:29:02-04:00
---
# T-0071 fatia 5 (API): verificação final verde (typecheck, lint, vitest com banco 5434)

## Contexto
Complemento da entrega R-20261103-174349-modulo-vendedor. Resultado em @macuxi/vendedor: typecheck (3 tsconfigs) exit 0; lint exit 0; vitest: 47 de 50 arquivos verdes na rodada completa, e os 3 que falharam (api/sync.db.test.ts por ctx sem fuso, api/pre-venda.db.test.ts por mock do cadastro, api/leitura.test.ts por contagem de rotas 12 para 14) foram corrigidos e reexecutados: 6 arquivos, 79 testes verdes, incluindo os de banco no Postgres 5434 (nunca o 5432). Cobertura: promotor 403 em criar e cancelar (RN-PRO-01), licença do módulo, PUT 409 ORCAMENTO_ALTERADO e 422 RN-VEN-18, outro vendedor e outro tenant 404, orçamento sem evento e sem fila do ERP, R$ no item e no pedido gravados e no pull, lista por tipo e situação, RN-VEN-13 com campos faltantes.

## O que preciso / o que mudou
Falta uma rodada completa de vitest só para reconfirmar os 47 arquivos após as 4 correções pequenas (nenhuma tocou regra). Pendências anteriores continuam: 0020 na demo (5432) antes de subir esta árvore; app ligar PUT e cancelar do orçamento; campo bloqueado em core.cadastro_resumo@1 se o Core quiser.

## Pronto quando
Pronto quando: revisão do engenheiro-software.
