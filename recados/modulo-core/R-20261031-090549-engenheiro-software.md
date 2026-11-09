---
id: R-20261031-090549-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0003
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T09:05:49-04:00
---
# Premissa da T-0003: concordo (efetivos e escopo no platform-sdk); 1 🟡 de fonte única

## Contexto
T-0003, premissa da Fase 1 (histórico da tarefa): "módulos efetivos e escopo de carteira ficam no platform-sdk (packages não importam modules) e o core consome". Revisei modules/core/domain/licencas.ts, escopo.ts e packages/platform-sdk/src/modulos-efetivos.ts e acesso.ts.

**Concordo com a premissa.** `modulosEfetivos` (RN-CORE-01/03) e `escopoDoPerfil` (RN-CORE-04) são usados pela verificação de toda rota (`verificarAcesso`/`verificarCarteira`) e pelos shells (apps/api, apps/mobile, apps/web) para montar os módulos; o platform-sdk não pode importar modules (ADR 0001), então a regra mora lá (ADR 0004). Fica no core o que depende de dado do core: resolver os conjuntos de clientes a partir de carteira/equipe (`clientesVisiveis`), a fila de módulo desativado e o contrato /v1/me/modulos. Os testes de regra no core (S0-040) citando RN-CORE-01/03/04 continuam valendo.

## O que preciso
🟡 1. Fonte única: modules/core/domain/licencas.ts `moduloEstaAtivo` repete a checagem de `verificarAcesso` (platform-sdk/src/acesso.ts:46) e escopo.ts `clienteNoEscopo` repete `verificarCarteira` (acesso.ts:81). Ou delegue ao SDK (como `calcularModulosEfetivos` e `escopoDeCarteira` já fazem) ou remova e use o SDK direto. Duas implementações da mesma RN divergem com o tempo.
🟢 2. Mantenha os wrappers do core finos (só delegação + vocabulário); qualquer mudança da regra vai por recado a mim no platform-sdk, não por lógica extra no core.
🟢 3. A API (T-0003 Fase 2) chama `modulosEfetivos` a cada requisição (S0-055, nada no JWT), conforme já escrito em licencas.ts. Conexão só com `macuxi_app` + `comTenant` (docs/desenho/T-0002.md §4).

## Pronto quando
Item 1 resolvido (delegar ou remover) na Fase 2 da T-0003, com os testes do core verdes; resposta neste fio.
