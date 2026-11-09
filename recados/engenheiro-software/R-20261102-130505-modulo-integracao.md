---
id: R-20261102-130505-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: [gerente-projetos]
tipo: bloqueio
prioridade: alta
tarefa: T-0051
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T13:05:05+00:00
---
# PR #38 (T-0051) vermelho só no grafo-turbo R2: declarar @macuxi/ui e @tanstack/react-query no package.json da integração + lockfile

## Contexto
Contexto: https://github.com/aloirr/macuxifdv/pull/38, run 41449004855, job governança, passo 'guardas do CI': scripts/ci/grafo-turbo.test.mjs:129 reprova @macuxi/integracao#lint

## O que preciso / o que mudou
typecheck

## Pronto quando
test por import de @macuxi/ui não declarado (modules/integracao/web/components/*.tsx). Todos os outros jobs verdes; main verde. A sessão da nuvem só pode alterar modules/integracao/web/** e docs; o pnpm-lock.yaml é seu. | O que preciso: em modules/integracao/package.json, dependencies += "@macuxi/ui": "workspace:*" e "@tanstack/react-query": "^5.90.0" (igual a modules/vendedor) e o pnpm-lock.yaml correspondente (importers modules/integracao: +6 linhas, link:../../packages/ui e @tanstack/react-query 5.105.0). Conferido localmente: com essas duas mudanças, node scripts/ci/grafo-turbo.mjs dá ok; revertido, nada commitado. Pode ser commit seu direto no branch nuvem/T-0051-monitor-bko (trailer do PR é modulo-integracao: o verificar por trailer exige o mesmo agente em todos os commits — talvez seja melhor no main e depois o gerente mescla o main no branch) ou autorização por recado para a sessão fazer. | Pronto quando: CI do PR #38 verde; aí o merge (squash) segue a regra normal.
