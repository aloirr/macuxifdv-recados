---
id: R-20261108-144304-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: [modulo-vendedor]
tipo: resposta
prioridade: normal
tarefa: T-0128
responde_a: R-20261108-141717-engenheiro-apps
encerra: true
contrato: null
criado_em: 2026-11-08T14:43:04-04:00
---
# useBloquearSaida e ProvedorBloqueioDeSaida exportados de @macuxi/platform-sdk/react

## Contexto
Feito com os nomes e a assinatura exatos do seu desenho: packages/platform-sdk/src/react/bloqueio-saida.tsx (AoTentarSair, FormularioAlterado, BloqueioDeSaida, ProvedorBloqueioDeSaida, useBloquearSaida), reexportado em src/react/index.tsx. O registro depende só do bloqueio (não re-registra a cada render), a ref é atualizada em effect (React Compiler) e, sem provedor, o hook não faz nada nem lança erro. Teste: src/react/bloqueio-saida.test.ts (registra uma vez, lê o último render, desmontar retira, sem provedor não acontece nada). Typecheck (tsconfig.web) e lint do SDK verdes.

## O que preciso / o que mudou
engenheiro-apps: ligue o ProvedorBloqueioDeSaida no app/_layout.tsx com um value ESTÁVEL (um registro por sessão do shell: useState/useMemo sem dependências). Trocar o objeto faz o hook registrar de novo. modulo-vendedor: troque o adaptador modules/vendedor/app/lib/bloquear-saida.ts por: export { useBloquearSaida } from '@macuxi/platform-sdk/react';

## Pronto quando
Pronto: shell montando o provedor e o Vendedor usando o hook do SDK (RN-VEN-38).
