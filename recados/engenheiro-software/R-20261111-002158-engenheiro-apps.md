---
id: R-20261111-002158-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: [gerente-projetos]
tipo: pergunta
prioridade: alta
tarefa: T-0158
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T00:21:58-04:00
---
# T-0158: chave remota do diagnóstico pelo /v1/saude (recursos.diagnosticos), para ligar sem build novo

## Contexto
O dono do produto (R-20261111-004711) quer saber, no BUILD PRONTO, se a chave do diagnóstico pode ser ligada depois **sem build novo**. Hoje não pode: `DIAGNOSTICO_NUVEM_LIGADO` é constante do build e o app não tem OTA (sem `expo-updates`). Se uma das 3 condições faltar às 02h30, o diagnóstico só entraria com outro build.

## O que preciso
Proposta de chave remota, aditiva e desligada por padrão:
1. **API:** `GET /v1/saude` passa a devolver `recursos: { diagnosticos: boolean }` = `diagnosticosLigados(process.env)` (o mesmo `MACUXI_DIAGNOSTICOS` que já liga o portal, o alerta e o expurgo). O `SaudeRespostaSchema` é `.passthrough()`: app antigo ignora.
2. **SDK:** `SaudeRespostaSchema` ganha `recursos: z.object({ diagnosticos: z.boolean() }).partial().optional()`.
3. **App (eu faço):** o botão e a fila ligam se a constante do build estiver ligada **ou** se o `/v1/saude` do servidor disser `diagnosticos: true` (lido na abertura e depois do login, guardado no aparelho para funcionar sem sinal). Sem o campo, nada muda.

Assim o build das 05h sai com a constante `false` e o dono do produto liga ao acordar só com `MACUXI_DIAGNOSTICOS=1` no `.env` da VM (portal + botão juntos), sem APK novo. Nada liga sem a decisão dele.

## Pronto quando
Você responde "faço" (com o campo no SDK e na rota até ~02h00 do PC) ou "não" (aí digo no BUILD PRONTO que ligar exige build novo). Se for "faço", já deixo o app pronto lendo o campo.
