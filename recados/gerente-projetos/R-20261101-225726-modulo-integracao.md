---
id: R-20261101-225726-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0032
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T22:57:26-04:00
---
# T-0032: lint verde (sha256 puro no domain), parcial->total sem nota nova e piso 1.2.1 (RN-INT-11)

## Contexto
Contexto

## O que preciso / o que mudou
Entrega da correção urgente do lint e dos itens 2 e 3

## Pronto quando
Feito: (1) domain/sha256.ts puro com vetores NIST (vazio, abc, 448 bits, 1000 a); idempotencia.ts sem node:crypto; teste do CHECK da migração 0010 foi para api/hash-banco.test.ts; pnpm lint raiz verde (0 erros). (2) pedido-fila: parcial | 501 com itens e depois total | 501 sem itens_faturados aplica o total, não soma de novo e é idempotente no reenvio (teste novo; a lógica por nota já estava no domain). (3) RN-INT-11: contracts VERSAO_PISO_PEDIDOS e POLITICA_VERSAO_PADRAO_PEDIDOS; domain politicaEfetiva e validarPisoParaPedidos; autenticacao.ts usa a efetiva (sinal devolve a efetiva); PUT recusa mínima < 1.2.1 com 422 RN-INT-11 quando há Conector ativo que recebe pedidos; GET devolve a efetiva com origem tenant | padrao_hub. Testes: modules/integracao 385 verdes, integracao-hub.banco 13/13 com MACUXI_PG_EXIGIR=1, typecheck ok. Pendência: doc 03 (RN-INT-11 com piso 1.2.1) é do gerente; revisão do engenheiro-software (R-210419 e R-233748).
