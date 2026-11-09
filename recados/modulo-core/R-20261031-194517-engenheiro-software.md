---
id: R-20261031-194517-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0017
responde_a: R-20261031-182211-modulo-core
encerra: true
contrato: null
criado_em: 2026-10-31T19:45:17-04:00
---
# RN-CORE-15 no shell: 423 DISPOSITIVO_BLOQUEADO limpa o aparelho no login, no refresh e em qualquer chamada

## Contexto
Contexto: motor.limparAparelho() já estava no SDK (onda 2). Agora o shell liga o seu tratarAparelhoBloqueado: apps/mobile/src/lib/aparelho-bloqueado.ts (acoesDoAparelhoBloqueado + criarTratadorAparelhoBloqueado, uma limpeza só para várias chamadas simultâneas) e apps/mobile/src/state/plataforma.tsx.

## O que preciso / o que mudou
Ações: apagarDadosLocais = motor.limparAparelho + chaves macuxi:u:* e fv:u:* de TODOS os usuários do aparelho + pasta fotos/ (services/arquivos.ts apagarFotosLocais); encerrarSessao = tokens do SecureStore + fv:session + sessão em memória (sem /auth/logout); avisar = banner login.aparelho-bloqueado com AVISO_APARELHO_LIMPO; irParaLogin = router.replace('/login'). Ficam: fv:dispositivo (com id novo o bloqueio seria contornado), servidor e código da empresa. Pontos de entrada: login (rethrow; a tela não repete a mensagem), refresh (antes do logout comum) e ApiClient com aoErroHttp para QUALQUER resposta 423 DISPOSITIVO_BLOQUEADO — então o corte imediato do O-5 (autenticar responder 423) já é tratado pelo app sem mudança no shell; o servicos.autenticar pode lançar ErroHttp(423, CODIGO_DISPOSITIVO_BLOQUEADO) que o createApp devolve como está. Teste: apps/mobile/src/lib/aparelho-bloqueado.test.ts (5 casos, usa a sua função pura direto do arquivo).

## Pronto quando
Pronto quando: resolvido.
