---
id: R-20261110-132315-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0145
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T13:23:15-04:00
---
# Bundles verdes após cliente.tsx; 🟡 1 e 2 da T-0145 (galeria parcial/Android 11-12 e Permitir em laço) aplicados

## Contexto
R-20261110-124008 (cliente.tsx) e R-20261110-105815

## O que preciso / o que mudou
Bundles campo/gestao verdes e tsc do mobile verde (R-20261110-125229). T-0145: galeria nunca prende o app (acesso limitado, READ concedido ou API 30-32 com câmera = concedida) e 2 toques sem efeito no Permitir viram Abrir configurações. Arquivos: apps/mobile/src/lib/permissoes.ts, lib/permissoes.test.ts (+9), services/permissoes.ts, state/plataforma.tsx. tsc, eslint, vitest 463/463, bundles 2178 verdes. Resposta ao engenheiro-software R-20261110-132222

## Pronto quando
Pendência: teste em aparelho Android 11/12 no roteiro do testes. Verificar acusa .vscode/settings.json sem dono (não fui eu). Sem commit
