---
id: R-20261109-000517-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0122
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T00:05:17-04:00
---
# T-0122 N7: Plano de RV com fim da vigência por perfil e gatilho normalizado (domain/plano-rv.ts)

## Contexto
Contexto: conferência T-0110 F19/N7 (docs/testes/T-0110-conferencia-backlog.md:71,169), itens que eram da T-0082; aprovação prévia do dono do produto para a madrugada. Em modules/core/domain/plano-rv.ts o fim da vigência de um plano é o início do PRÓXIMO plano de QUALQUER perfil (linhas 87 e 95: 'proximos' filtra só por id e vigencia_inicio). Um plano só de promotor que começa em 2026-12 encerra o plano do vendedor de 2026-10 sem que exista outro plano de vendedor; planoVigente (76-81) já escolhe por perfil, mas jaValeuEmMesFechado/vigenciaReescreveMesFechado não. 'Gatilho normalizado': regra com gatilho = true ainda carrega peso_pct (o validador só ignora); normalizar = gatilho sempre com peso 0 (ou faixa única) ao salvar e ao ler, para o cálculo e a tela não dependerem do valor que sobrou.

## O que preciso / o que mudou
O que preciso: (1) fim da vigência calculado por perfil (próximo início entre os planos que compartilham o perfil), nas duas funções, com teste citando a RN do plano de RV (doc 03) e o caso 'plano de promotor não encerra o do vendedor'; (2) função pura de normalização do gatilho aplicada no salvar (API revalida) com teste. Se a regra exata do gatilho estiver diferente no doc 03, siga o doc e me diga.

## Pronto quando
Pronto quando: testes do domain verdes, pnpm --filter @macuxi/core typecheck verde, entrega com o arquivo:linha. Eu já marquei core.medidas@1 como implementada em .coord/contratos/modulos.md e no desenho T-0061 (sua parte de N7 é só a RV).
