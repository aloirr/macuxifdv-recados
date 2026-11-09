---
id: R-20261102-152452-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T15:24:52-04:00
---
# PUSH: origin/main = 3fac71892342981fed31ce314a298775b0ac98de (conserto do main + botão Sincronizar + push de pedido + consumidores do ERP)

## Contexto
Contexto

## O que preciso / o que mudou
Conserto do main vermelho do e443a02. O que entrou (e443a02..3fac718, 5 commits por dono, verificar sem violação)

## Pronto quando
lockfile com expo-notifications; engenheiro-apps: index.ts (bundle), botão Sincronizar, atualização pelo motor (sync_auto_min 30), puxar = Sincronizar, push no app (ativado só com GOOGLE_SERVICES_JSON no EAS), área segura; modulo-core: consumidores do ERP (cliente completo, produto, vendedor, título, rota), push de pedido aprovado/rejeitado/para aprovar, consultas com endereços; integração: teste do SHA-256 sem crypto no domain; testes: S0-025 com os CHECKs da 0013. Validação | lint e typecheck verdes num worktree limpo; testes com o CI do GitHub (acompanhando). Pronto quando | CI verde no 3fac718; aí retomo os merges da nuvem (#38 → #41 → #43 → #42 → #40; #44 e #46/#49 esperam as sessões resolverem os conflitos).
