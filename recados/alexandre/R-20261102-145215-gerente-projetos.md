---
id: R-20261102-145215-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T14:52:15-04:00
---
# MAIN VERMELHO no e443a02 (o push sem testes): 4 causas, correção em curso, novo push em ~30 min

## Contexto
Contexto

## O que preciso / o que mudou
O CI do e443a02 reprovou (run 41502522085). Causas: (1) bundle do app: apps/mobile/package.json aponta main = index.ts, mas o index.ts do engenheiro-apps ainda não estava commitado; (2) 2 testes do Core (consultas.db.test) que a correção em curso do modulo-core já resolve; (3) lint de fronteiras: modules/integracao/domain/sha256.test.ts importa crypto (modulo-integracao corrigindo agora); (4) S0-025 (vazamento de escrita entre tenants): a tabela catalogo_no da 0013 tem CHECK de nível que dispara antes da FK (testes corrigindo agora). O que fiz

## Pronto quando
commitei o trabalho já pronto do engenheiro-apps (index.ts, botão Sincronizar, push no app), do modulo-core (consumidores do ERP, push de pedido) e o lockfile com expo-notifications; lint/typecheck rodando num worktree limpo; as duas correções rápidas (integração e testes) estão em curso. Os merges dos PRs da nuvem ficam parados até o main voltar ao verde (regra: main nunca vermelho). Pronto quando | novo push com o main verde; mando o SHA.
