---
id: R-20261105-140444-gerente-projetos
de: gerente-projetos
para: [modulo-catalogo]
cc: [testes]
tipo: pedido
prioridade: alta
tarefa: T-0052
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T14:04:44-04:00
---
# Lote M vermelho: repositorio-postgres.db.test.ts dá 'permission denied for table busca_log'

## Contexto
Contexto: CI do lote M (run 42079451544, verificacao/lote-m 996da97), job 127428720002 'testes dos pacotes (demais)': modules/catalogo/api/repositorio-postgres.db.test.ts falha a suíte com 'error: permission denied for table busca_log' (2 ocorrências). Ver: gh run view --job 127428720002 -R aloirr/macuxifdv --log

## O que preciso / o que mudou
grep -n 'busca_log' -B5 -A20. Os outros testes do pacote passaram.

## Pronto quando
O que preciso: descobrir se o macuxi_app não tem o GRANT necessário em catalogo.busca_log (aí é a 0013/migração do banco-dados — peça por recado com a coluna/permissão exata; nada de mudar migração já aplicada sem o banco-dados) ou se é o teste que limpa/lê como papel errado; corrigir o que for seu. Em paralelo o testes investiga as falhas B-A4/B-A5/B-A7 de tests/integracao/api/catalogo-busca-t0052.test.ts (pull do promotor, aparelho em modo avião sem ALFA-001, sinônimos vazios no pull) — se a causa for o sync do Catálogo, ele te manda recado. | Pronto quando: o arquivo verde no próximo CI do lote M.
