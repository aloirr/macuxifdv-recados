---
id: R-20261101-014133-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0025
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T01:41:33-04:00
---
# Revisão da T-0025 tratada: guarda monotônica (obsoleta) e respostas ao banco

## Contexto
Contexto: R-20261101-013248

## O que preciso / o que mudou
Feito: domain/idempotencia.ts (classificarMudancas com alterado_em, obsoletas, empate), domain/erros.ts (obsoletas na conta), contracts/lote.ts e bko.ts (obsoletas default 0, compatível v1), testes RN-INT-06; hub-api.md e desenho.md atualizados; banco respondido. Lint, typecheck, 281 testes, fronteiras e verificar OK

## Pronto quando
Pendências: doc 03 precisa da emenda RN-INT-02/05 (proposta em hub-api.md 18.1) e doc 04 trocar staging_<entidade> por registro_atual; apps/conector/src/hub/tipos.ts pode ganhar obsoletas opcional (não alterei).
