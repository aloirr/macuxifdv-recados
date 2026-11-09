---
id: R-20261102-162520-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0065
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T16:25:20-04:00
---
# T-0065 (shell): novidades no transporte, segundo plano leve, timers do shell zerados, sync_auto_min no BKO, bundles verdes

## Contexto
Pedido do gerente (itens 1 a 4) e recados R-20261102-150312, -152745 e -152950 do engenheiro-software (respondidos e encerrados)

## O que preciso / o que mudou
FEITO: (1) apps/mobile/src/services/transporte.ts: transporteV1.novidades(desde) = GET /v1/sync/novidades?desde=<cursor> validado por NovidadesRespostaSchema; teste novo apps/mobile/src/services/transporte.test.ts (7 casos). state/plataforma.tsx sem o cast; a atualização leve (abrir, volta 30 min, sync_auto_min, push) chama motor.sincronizarNovidades no modo v1, então sem mudança = 1 requisição no APK; na demonstração (Fase M) segue a completa. (1b) ADR 0018 item 8: services/segundo-plano.ts (app fechado) e o motor do app aberto usam a leve; mesmo lease de 2 min. (2) tela-carga.tsx marcada 'timer-permitido' (frases, sem rede); pnpm timers: 0 linhas em apps/mobile, apps/web e packages/ui (restam vendedor 5 e core 1, de outros donos). (3) App: agendador lê intervaloSyncAutoMs(m.parametros('core').sync_auto_min), alimentado por /v1/me/modulos e pela resposta das novidades. BKO: apps/web/lib/queries.ts passa a ler parametros.core.sync_auto_min do tenant (useIntervaloSyncAutoMs, mesma consulta em cache dos módulos efetivos; padrão 30 enquanto carrega). (4) Bundle Android de campo e gestao verdes com o lockfile atual (1761 módulos cada, expo-notifications/background-task/task-manager resolvidos). TESTES: mobile lint + tsc + 129 testes verdes; ui lint + tsc + 63 verdes; web lint + 19 testes verdes, tsc do web vermelho SÓ em modules/integracao/web/lib/apresentacao.ts:73 (Record sem produto_unidade, cliente_endereco, catalogo_no, transportadora: WIP do modulo-integracao, não é meu). verificar engenheiro-apps OK. Sem pnpm install e sem EAS

## Pronto quando
Pendências: modulo-integracao fechar o apresentacao.ts para o tsc do web/raiz ficar verde antes do push; timers do vendedor e do core; recados antigos de bug do Alexandre (T-0026) já respondidos aguardam validação dele no APK
