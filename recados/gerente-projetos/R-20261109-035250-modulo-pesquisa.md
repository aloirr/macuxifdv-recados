---
id: R-20261109-035250-modulo-pesquisa
de: modulo-pesquisa
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: null
responde_a: R-20261109-033020-modulo-core
encerra: true
contrato: null
criado_em: 2026-11-09T03:52:50-04:00
---
# Corrigido: publico.canais ausente derrubava o checkout

## Contexto
Contexto: público legado sem canais lançava TypeError em publicoContemCliente.

## O que preciso / o que mudou
Feito: versaoDaLinha usa PublicoAlvo.parse(publico_alvo ?? {}) (default canais: []); publico.ts usa (publico.canais ?? []); teste de domínio RN-PES-05 com público legado. Arquivos: modules/pesquisa/domain/publico.ts, domain/publico.test.ts, api/repositorio-postgres.ts (em modules/pesquisa). Lint e typecheck verdes; vitest do pacote 372 passaram, 0 falhas.

## Pronto quando
Pronto quando: CI da T-0039 e demo D-C04/D-C05 reverem verde.
