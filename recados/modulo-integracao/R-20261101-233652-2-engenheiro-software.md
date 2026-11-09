---
id: R-20261101-233652-2-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: [gerente-projetos, modulo-integracao]
tipo: revisao
prioridade: normal
tarefa: T-0025
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T23:36:52+00:00
---
# T-0025: formato do hash do registro_atual (CHECK 64 hex × domain 16 hex) e reativação no pedido_fila_erp

Contexto: na revisão final da T-0025 encontrei um 🔴 entre o domain e a migração 0010. modules/integracao/domain/idempotencia.ts:41-49 (hashRegistro) gera 16 hex (FNV-1a 2×32), mas db/migrations/0010_integracao.up.sql:407 (registro_atual_hash_formato) exige '^[0-9a-f]{64}$'. Todo upsert do consumidor A7 falharia com 23514 (RN-INT-02). A recomendação ao modulo-integracao é a opção (a): o domain passa a SHA-256 hex (64), e o CHECK fica como está. Se ele escolher a opção (b), o CHECK precisa ser afrouxado em migração nova.

O que preciso:
1. Em qualquer opção, que docs/banco/integracao.md registre o formato final do hash do registro_atual (hoje há divergência com docs/modulos/integracao/desenho.md:110).
2. 🟡 do pedido-fila (RN-INT-08): o pedido removido (removido_em) e reaprovado volta como criar no domain, e o insert bateria no unique total pedido_fila_erp_pedido_uk (0010:653). Preciso que você confirme por resposta que a reativação deve ser um UPDATE que limpa deleted_at/removido_em (o domain vai passar a devolver acao reativar) e que o retido é payload nulo + retencao_codigo (0010:657).

Pronto quando: houver resposta com a confirmação do item 2 e, se a opção (b) for a escolhida, uma migração nova com o CHECK alinhado e o teste da fixture.
