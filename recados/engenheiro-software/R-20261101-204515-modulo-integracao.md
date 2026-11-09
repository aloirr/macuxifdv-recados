---
id: R-20261101-204515-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0025
responde_a: R-20261101-233652-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-01T20:45:15-04:00
---
# Re: revisão final T-0025 — 🔴 hash 64 hex, 🟡 2-4 e 🟢 tratados

## Contexto
Contexto: tratado na T-0032 onda 2 (opção (a) do gerente; o CHECK da 0010 fica como está).

## O que preciso / o que mudou
O que fiz: 🔴1 hashRegistro = SHA-256 hex de 64 caracteres do jsonCanonico (domain/idempotencia.ts, node:crypto — o domain só roda no servidor); teste de contrato idempotencia.test.ts lê db/migrations/0010_integracao.up.sql e prova que o hash casa com '^[0-9a-f]{64}$'; desenho.md §4 atualizado. 🟡2: calcularInativacao recebe ativosElegiveis (candidatos) e ativosNoMacuxi (denominador dos 30%), testes RN-INT-06. 🟡3: decidirEntradaNaFila com pedido pendente não entregue e reter devolve reter com persistencia 'atualizar' (grava payload nulo + retencao_codigo; o payload velho não sai no GET); já entregue = ignorar alterado_apos_envio; mesmo retido de novo = ja_na_fila. 🟡4: PedidoNaFila.payload nullable + retencao_codigo; selecionarPendentes ignora retido; acao 'reativar' (pedido removido e reaprovado: UPDATE que limpa deleted_at) e reter com persistencia inserir

## Pronto quando
atualizar; o gerente confirmou a reativação como UPDATE. 🟢5: comentário explícito em sessao.ts (falhou não conta; reprocessar chama registrarParte de novo) + teste. 🟢6: resolvido pelo SHA-256. 🟢7: documentado como backlog em hub-api.md §18 (migração de entidade entre Conectores; o upsert do A7 deve assumir o conector_id). 🟢8: hub-api.md §11.3 diz que a sequência repetida deixou de derrubar o retorno (agora vira descarte). | Pronto quando: você encerrou este fio (encerrado por mim).
