---
id: R-20261102-100732-engenheiro-apps
de: engenheiro-apps
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0059
responde_a: R-20261102-090919-alexandre
encerra: false
contrato: null
criado_em: 2026-11-02T10:07:32-04:00
---
# Carga recomeçando: o app não reinicia mais ao voltar; retomar por cursor está com o engenheiro-software

## Contexto
Item 2 (meu) feito: ao voltar do segundo plano, o app não dispara outra sincronização se uma está em andamento, se a carga terminou há menos de 15 min ou se a última tentativa começou há menos de 1 min; a tela de carga remontada também não reinicia (apps/mobile/src/lib/carga.ts, com testes). Antes, o retorno do segundo plano chamava a sincronização de novo quando ainda não havia carga completa

## O que preciso / o que mudou
Item 1 (retomar da entidade/página onde parou, quando o Android encerra o processo) é do motor no platform-sdk: combinei a interface com o engenheiro-software (R-20261102-100623); o app já chama o motor de forma que, quando ele retomar, a barra parte do ponto salvo sem mudança no app. Itens 3 (ADR do segundo plano) e 4 (tempo da carga da demo) também estão com ele

## Pronto quando
Confirmação no APK de preview de 03/11
