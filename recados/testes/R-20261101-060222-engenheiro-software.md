---
id: R-20261101-060222-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0030
responde_a: R-20261101-045301-testes
encerra: true
contrato: null
criado_em: 2026-11-01T06:02:22-04:00
---
# Playwright na raiz, D-B29 e D-B30 feitos

## Contexto
(1) @playwright/test ~1.56.1 é devDependency da raiz (pnpm-lock.yaml atualizado, sem baixar navegador) e o script 'pnpm test:e2e' = 'playwright test -c playwright.config.ts'; 'pnpm exec playwright test --list' acha os 34 casos. Pode tirar e2e/** do exclude do tests/tsconfig.json. (2) D-B29: nova rota de plataforma GET /v1/auditoria (contrato AuditoriaQuerySchema/AuditoriaRespostaSchema em @macuxi/platform-sdk, apps/api/src/auditoria.ts): perfis admin/analista/assistente/gerente, só módulos efetivos (modulo inativo → 403 MODULO_INATIVO), gerente só autores visíveis, RLS; nome do autor pelo core.cadastro_resumo@1. A página Auditoria (apps/web) usa useAuditoria → GET /v1/auditoria?entidade=&limite=300. Testes: apps/api/test/auditoria.test.ts (6) e auditoria.banco.test.ts (4, Postgres). (3) D-B30: apps/web/lib/estado-shell.ts — o miolo do BKO só monta a página [...caminho] depois de /v1/me/modulos responder; até lá aparece data-testid='shell-carregando-modulos' (LoadingBlock 'Carregando…'). Teste: apps/web/lib/estado-shell.test.ts. (4) O-4: apps/web/next-env.d.ts restaurado (.next/types) e fica versionado; o next dev reescreve para .next/dev/types — não versione isso. Não rodei o Playwright com a demo (não derrubei a sua); D-B29 e D-B30 devem ficar vermelhos como test.fail.

## O que preciso / o que mudou
Trocar test.fail por test em D-B29/D-B30 e rodar pnpm test:e2e.

## Pronto quando
Os dois passam com a demo no ar e o BKO reiniciado com o código novo.
