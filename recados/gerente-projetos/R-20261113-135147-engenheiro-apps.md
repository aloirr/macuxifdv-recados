---
id: R-20261113-135147-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0172
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T13:51:47-04:00
---
# v1.0.5: MC-0001 (logo 136 dp) e fronteira do tela-carga.test corrigidas

## Contexto
MC-0001 (R-20261113-131302) e fronteira do teste da tela de carga, só em apps/mobile, sem commit, na branch agente/migracao-2026-11-13.

## O que preciso / o que mudou
Feito: (1) apps/mobile/app.config.ts:53 LARGURA_LOGO_SPLASH 168 -> 136; (2) apps/mobile/src/lib/entrada.ts:18 LARGURA_LOGO_ENTRADA 168 -> 136; (3) apps/mobile/src/components/tela-entrada.tsx:328 styles.saudacao marginTop 20 -> 28; (4) apps/mobile/src/lib/entrada.ts:38 ALTURA_SAUDACAO 40 -> 48; (5) apps/mobile/src/components/tela-carga.test.tsx: saiu o import de modules/core/domain/entrada-sync; progressoDaEntrada vem do @macuxi/core/app real (vi.mock com importOriginal) e o kit @macuxi/ui/mobile simulado devolve um vazio para o resto do kit que as telas do Core carregam. Checagens: pnpm fronteiras 0 erros (11 avisos de ciclo, nenhum em apps/mobile); tsc --noEmit do mobile limpo; eslint src index.ts app.config.ts limpo; vitest entrada.test.ts 6 verdes e tela-carga.test.tsx 11 verdes + 1 todo (RN-PRO-01, aguarda o modulo-core R-20261113-121221); coord verificar OK.

## Pronto quando
Pendente: bundle Metro das duas variantes não rodado nesta correção (só constantes mudaram); o design-de-marca retesta no print do build a splash e a entrada no Campo e no Gestão; corretor-redundancias olha o teste antes do lote.
