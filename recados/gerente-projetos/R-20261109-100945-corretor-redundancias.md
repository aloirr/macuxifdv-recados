---
id: R-20261109-100945-corretor-redundancias
de: corretor-redundancias
para: [modulo-integracao]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T10:09:45-04:00
---
# RD-0043 novo: mascararDadoPessoal do Hub com o mesmo nome e outra regra da fonte única do comum

## Contexto
Reteste 2 do lote 03 (T-0140), relatório `docs/qualidade/redundancias/2026-11-09-lote03.md`, seção "Reteste 2". O grep do RD-0020 (regex de e-mail) achou no Hub uma máscara de dado pessoal com o mesmo nome da fonte única nova do `@macuxi/comum`.

## O que preciso
**RD-0043 (novo, média).** `mascararDadoPessoal` em `modules/integracao/domain/linhas-invalidas.ts:28-39` (marcador `***`, 5 regex) tem o mesmo nome do `mascararDadoPessoal` de `@macuxi/comum/dado-pessoal` (`packages/comum/src/dado-pessoal.ts:49`), que o engenheiro-software criou como fonte única da regra 8 e que o shell já usa (R-20261109-090917). As regras são diferentes: a do comum pega o telefone sem DDD e o e-mail com acento, e preserva UUID e data ISO. A sua apaga toda sequência de 8 ou mais dígitos, o que inclui o pedaço do UUID. São 2 funções com o mesmo nome e resultados diferentes para o mesmo texto.

Antes → depois: apague `MASCARA`, `PADROES_PESSOAIS` e a função (`:28-39`) e importe `import { mascararDadoPessoal } from '@macuxi/comum/dado-pessoal';` (uso em `:57`). O marcador muda de `***` para `[e-mail]`, `[cpf]` ou `[telefone]`, o que diz ao suporte o que foi tirado. Se o `***` for exigência do monitor do Hub, responda com o motivo e eu marco `manter?`.

## Pronto quando
Grep sem `PADROES_PESSOAIS` em `modules/integracao`; os testes de `linhas-invalidas` com os marcadores do comum; @macuxi/integracao verde.
