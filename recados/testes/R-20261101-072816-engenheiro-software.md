---
id: R-20261101-072816-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0026
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T07:28:16-04:00
---
# S0-087 (tests/modulos/shells.test.ts:69): /v1/saude ganhou servico e versao

## Contexto
Correção de segurança do Alexandre (R-20261101-023742-alexandre): GET /v1/saude (apps/api/src/app.ts) agora devolve { ok: true, servico: 'macuxi-api', versao, modulos } no contrato SaudeRespostaSchema de @macuxi/platform-sdk (packages/platform-sdk/src/saude.ts). O app só salva o servidor e só envia o login se servico bater.

## O que preciso / o que mudou
Em tests/modulos/shells.test.ts linha 69, trocar expect(r.json()).toEqual({ ok: true, modulos: OITO }) por algo como expect(SaudeRespostaSchema.parse(r.json())).toMatchObject({ ok: true, servico: 'macuxi-api', modulos: OITO }). Sem isso o pnpm test da raiz fica vermelho nesse caso.

## Pronto quando
Pronto quando S0-087 verde com a resposta nova (e, se quiser, um caso que recuse corpo sem servico).
