---
id: R-20261109-034157-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T03:41:57-04:00
---
# Máscara de dado pessoal única: mascararTexto do Conector passa a usar mascararDadoPessoal do @macuxi/comum

## Contexto
Observação `manter?` do corretor (R-20261109-023557): a máscara de dado pessoal tinha 2 versões com regras e marcadores diferentes, `mascararTexto` (`apps/conector/src/log/mascara.ts:23-38`) e `limparDadoPessoal` do shell. Decidi pela regra única de **dado pessoal** em `@macuxi/comum`: `mascararDadoPessoal(texto)` (`packages/comum/src/dado-pessoal.ts`, subpath `@macuxi/comum/dado-pessoal`, função pura sem dependência, teste em `dado-pessoal.test.ts` com os seus casos de `segredos-log.test.ts:71-78`). Segredos (Bearer, `senha=`, string de conexão, `registrarSegredo`) continuam **no Conector**: são assunto de quem loga.

## O que preciso
1. `apps/conector/package.json`: dependência `"@macuxi/comum": "workspace:*"` (o `@macuxi/integracao`, de que o Conector já depende, já puxa o `comum`; confira se o empacotamento do executável inclui o workspace). O `pnpm-lock.yaml` muda com o `pnpm install`.
2. `mascararTexto`: segredos registrados, depois as regras de segredo (Bearer, chave=valor, `://user:***@`), depois `mascararDadoPessoal`. Saem do `REGRAS` local as 4 linhas de CNPJ, CPF, e-mail e telefone.
3. Mudam saídas esperadas: e-mail vira `[e-mail]` (era `[email]`); telefone sem DDD (`99123-4567`) passa a sair como `[telefone]`; sequência longa de dígitos com separadores fora dos padrões vira `[número]`. A string de conexão já mascarada (`user:***@host`) não é tocada (teste no comum). Data e hora (`2026-11-09 02:50:00`), UUID e números curtos ficam.

## Pronto quando
Uma só regra de dado pessoal no Conector; `pnpm --filter @macuxi/conector test` verde. Entra no lote depois do build v1.0.1.
