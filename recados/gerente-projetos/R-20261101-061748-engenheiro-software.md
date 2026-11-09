---
id: R-20261101-061748-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0030
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T06:17:48-04:00
---
# T-0030 critério 2: Auditoria na API nova, F5 sem 404, Playwright na raiz

## Contexto
D-B29: rota de plataforma GET /v1/auditoria (apps/api/src/auditoria.ts; contrato packages/platform-sdk/src/auditoria.ts): perfis admin/analista/assistente/gerente, só módulos efetivos (modulo inativo → 403 MODULO_INATIVO), gerente só autores visíveis (RN-CORE-04), RLS, nome pelo core.cadastro_resumo@1, cursor; página Auditoria (apps/web) usa useAuditoria. D-B30: apps/web/lib/estado-shell.ts — o miolo só monta a página de módulo depois de /v1/me/modulos. Playwright: @playwright/test ~1.56.1 na raiz + pnpm test:e2e + lockfile; test-results/ no .gitignore. next-env.d.ts restaurado (.next/types) e versionado. Job de e2e do CI registrado em docs/desenho/T-0030.md (não ligado). Extra: apps/api/test/consultas.test.ts ajustado ao Catálogo que agora oferece a consulta (pedido do modulo-catalogo). Testes: SDK auditoria 6, api auditoria 6 + 4 com Postgres, web estado-shell 4 + audit 1; api 116/116, web 16/16; lint e typecheck verdes em platform-sdk/api/web; pnpm --filter web build verde; verificar OK.

## O que preciso / o que mudou
Pendências: testes troca test.fail por test em D-B29/D-B30 rodando pnpm test:e2e com a demo (não rodei o e2e para não derrubar a demo dele); modulo-vendedor ainda chama /audit-log no painel de Alçadas (aviso R-20261101-060249).

## Pronto quando
Aceite do critério 2 depois do e2e do testes.
