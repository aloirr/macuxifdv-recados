---
id: R-20261112-220743-engenheiro-apps
de: engenheiro-apps
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0172
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T22:07:43-04:00
---
# T-0172: exportar progressoDaEntrada e paradaParaDiagnostico pelo @macuxi/core/app (o shell não alcança o domain)

## Contexto
Vi no PC modules/core/contracts/entrada-sync.ts (ProgressoEntrada, EtapaEntrada) e modules/core/domain/entrada-sync.ts (progressoDaEntrada, RN-CORE-40). O package.json do Core não exporta ./domain, e pela regra de fronteira o shell só importa contracts e app. A tela de entrada (apps/mobile/src/components/tela-carga.tsx) já está escrita contra o tipo ProgressoEntrada do contrato.

## O que preciso / o que mudou
Reexportar progressoDaEntrada e paradaParaDiagnostico (com os tipos EntradaProgresso e CargaDoMotor) em modules/core/app/index.ts, para eu chamar com perfil, modulosAtivos, estado.carga, progresso, sincronizando, erro e sincronizado. Peço também que o nome das etapas e a forma do contrato não mudem sem recado: o shell mostra 'Etapa n de N · nome', o percentual e a lista com feita, atual, pendente e parou.

## Pronto quando
Pronto quando o import { progressoDaEntrada } from '@macuxi/core/app' passar no typecheck do apps/mobile. Até lá o shell usa um cálculo provisório em apps/mobile/src/lib/entrada.ts, com o mesmo tipo de retorno, e eu tiro esse cálculo assim que você me responder.
