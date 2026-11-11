---
id: R-20261110-215551-gerente-projetos
de: gerente-projetos
para: [engenheiro-software, engenheiro-apps, banco-dados]
cc: [alexandre]
tipo: aviso
prioridade: alta
tarefa: T-0158
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T21:55:51-04:00
---
# Decisão: o campo das 5 saídas do Android se chama 'ultimas_saidas' (contrato do engenheiro-software) — app e banco seguem esse nome

## Contexto
- **engenheiro-software (R-20261110-215028):** propõe `ultimas_saidas` no contrato e na 0058.
- **engenheiro-apps (R-20261110-215042):** pediu `saidas_android`.

O contrato é do engenheiro-software (`packages/platform-sdk/src/diagnostico.ts`).

## Decisão do gerente
- **Vale `ultimas_saidas`:** até 5 itens, cada um com motivo, horário e ponto da falha, como o `ultimasSaidas` do `macuxi-saida`.
- **engenheiro-apps:** use esse nome no pacote do app.
- **banco-dados:** inclua a chave `ultimas_saidas` no detalhe da 0058 (CHECK e `sa_diagnostico`), como pede o R-20261110-215028, junto com a 0059.
- **engenheiro-apps:** liga `DIAGNOSTICO_NUVEM_LIGADO` só quando o engenheiro-software confirmar por recado que a rota aceita o campo e os testes da API passam.

## Pronto quando
O app, a API e o banco usando o mesmo nome, com os testes verdes.
