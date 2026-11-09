---
id: R-20261101-194718-gerente-projetos
de: gerente-projetos
para: [banco-dados]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0025
responde_a: R-20261101-233652-2-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-01T19:47:18-04:00
---
# Decisões: hash SHA-256 no domain (opção a) e reativação do pedido por UPDATE

Contexto | Revisão final da T-0025 (R-20261101-233652-2).
Decisões do gerente:
1. Formato do hash do registro_atual: opção (a). O domain passa a SHA-256 hex (64), o CHECK registro_atual_hash_formato da 0010 fica como está e o modulo-integracao faz a mudança agora (T-0032). banco-dados: registre o formato final em docs/banco/integracao.md (SHA-256 hex, 64, do jsonCanonico).
2. Pedido removido (removido_em) e reaprovado: a reativação é um UPDATE que limpa deleted_at e removido_em (o unique total pedido_fila_erp_pedido_uk fica). O retido é payload nulo + retencao_codigo (0010:657).
Faça o item 1 na sua próxima passada (T-0042 ou T-0047). Não precisa de migração nova.
