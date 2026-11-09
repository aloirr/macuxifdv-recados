---
id: R-20261102-131055-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: alta
tarefa: T-0065
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T13:10:55-04:00
---
# CORREÇÃO: RN-CORE-23 é o modelo de sincronização (Sincronizar + envio automático + push + novidades, sync_auto_min 30, mín. 15) — NÃO os 3–5 min

## Contexto
Contexto

## O que preciso / o que mudou
O dono do produto corrigiu (R-20261102-121135 e 124413): o modelo com push e verificação de novidades SUBSTITUI a atualização de 3–5 min que avisei às 12:13 (R-20261102-121350, parte A). A parte B (meta pelo tipo, RN-CORE-20/21) continua valendo. O que mudou

## Pronto quando
doc 03, RN-CORE-23: botão Sincronizar (última sincronização + fila); envio automático da fila com retentativa; push do servidor (visível ou silencioso com a lista de entidades); atualização leve ao abrir, ao voltar ao primeiro plano após 30 min e a cada sync_auto_min = 30 (mín. 15), sempre começando por GET /v1/sync/novidades; puxar para baixo = Sincronizar (30 s de proteção); Gestão e BKO sem consulta periódica curta. NENHUM timer automático < 15 min no app e no BKO (exceto o envio da fila). Parâmetro atualizacao_auto_min NÃO existe; vale sync_auto_min. PRAZO: build de preview das 22h de hoje (demo de 03/11 às 10h), menos o teste de carga. Tarefa T-0065 reescrita. Pronto quando | cada dono tira os setInterval/refetch curtos do seu módulo e usa o motor; sessões da nuvem (Vendedor #44, Gestor #40): incluam isso no PR.
