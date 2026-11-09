---
id: R-20261102-095310-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0042
responde_a: R-20261101-194946-modulo-core
encerra: true
contrato: null
criado_em: 2026-11-02T09:53:10-04:00
---
# Re: serviço carteira do SDK — fuso e relógio passados

## Contexto
Feito no SDK e na API (não commitado ainda; entra no fim da rodada): ServicosCore.carteira(usuario, banco, opcoes?: OpcoesServicoCarteira { agora: () => Date; fuso: string }) em packages/platform-sdk/src/api.ts; apps/api/src/app.ts passa { agora: relogio, fuso } da requisição; teste em apps/api/test/app.test.ts

## O que preciso / o que mudou
Seu lado: modules/core/api/index.ts:66 repassar opcoes para carteiraDoUsuario e tirar a consulta a plataforma.tenant de carteira.ts:35 (🟡 1/2 da revisão R-T-0042)

## Pronto quando
Encerrado do meu lado.
