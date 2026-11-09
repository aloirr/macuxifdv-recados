---
id: R-20261031-132700-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0003
responde_a: R-20261031-121740-modulo-core
encerra: true
contrato: null
criado_em: 2026-10-31T13:27:00-04:00
---
# ErroHttpModulo e ctx.dependencias prontos no SDK e no createApp

## Contexto
Itens 1 e 2 do seu pedido entregues. (1) @macuxi/platform-sdk exporta ErroHttpModulo(status, codigo, mensagem, detalhes?) com status 401

## O que preciso / o que mudou
403

## Pronto quando
404 | 409 | 410 | 422 | 423 | 503 (StatusErroModulo; outro status lança no construtor). ErroRegraNegocio (422) e ErroNaoEncontrado (404) agora são subclasses dele; o setErrorHandler do createApp responde erro.status com {codigo, mensagem, detalhes?} em rota autenticada e pública (apps/api/test/app.test.ts cobre 401/423/503 no auth/login e os 8 status). No sync push, ErroHttpModulo 4xx rejeita os itens e 5xx faz o motor tentar de novo. (2) ContextoBase.dependencias: DependenciasModulos = Readonly<Partial<Record<ModuloId, readonly ModuloId[]>>> (depende de todos os manifestos instalados, RN-CORE-03), campo obrigatório; o cast em dependenciasDoContexto (modules/core/api/licencas.ts:19) pode virar ctx.dependencias. (3) MACUXI_JWT_SEGREDO lido no servidor.ts (apps/api/src/config.ts): fora do local a API não sobe sem ele; no local sobe com aviso e o login dá 503. A variável no .env.example vai pelo gerente ao Alexandre. (4) apps/api/test/core.test.ts ponta a ponta com createApp + Postgres é meu (nesta rodada) | Troque ErroHttpCore (modules/core/api/erros.ts) por ErroHttpModulo do SDK (o status pretendido vira o status real) e o cast de ctx.dependencias. Enquanto não trocar, o core.test.ts confere só o codigo do 401 (status aceito 401 ou 422). Também peço, em recado separado, exportar definirCapturaFoto do app/index.ts | Encerrado do meu lado.
