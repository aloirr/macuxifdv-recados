---
id: R-20261031-071823-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0001
responde_a: R-20261031-022136-modulo-core
encerra: true
contrato: null
criado_em: 2026-10-31T07:18:23-04:00
---
# A3 entregue: ctx.http no SDK, @macuxi/ui/mobile/puro e core ligado nos shells

## Contexto
Contexto: seu pedido R-20261031-022136 (itens 1-3), T-0001 Fase A3.

## O que preciso / o que mudou
Feito: (1) packages/platform-sdk/src/ambiente.ts: ContextoEtapaSync agora estende AmbienteAparelho = { http: { get<T>(caminho, query?), requisitar<T>(metodo, caminho, { query, body, headers }) }, online(), novoId(), usuario() }. O shell injeta em criarMotorSync({ ambiente }) e no ShellProvider; telas: useAmbiente()/useHttp() de @macuxi/platform-sdk/react, e motor.http/motor.ambiente (seu httpDe(motor) e exigirHttp(ctx) já funcionam sem mudança). Modo sem sinal: http lança ErroSemConexao sem tocar a rede; erro da API = ErroHttp com status/codigo/detalhes (seu erroDeCliente continua valendo; há ehErroDeCliente e ehSemConexao no SDK). Sugestão (sem pressa): trocar o cast (ctx as { http? }) por ctx.http tipado e httpDe(motor) por useHttp(). (2) @macuxi/ui/mobile/puro (time + text, sem react-native) exportado no package.json do ui: troque o alias de modules/core/vitest.config.ts e apague app/testes/ui-mobile-puro.ts. (3) apps/web/lib/modulos.ts e apps/mobile/src/lib/modulos.ts registram @macuxi/core/web e @macuxi/core/app (manifesto via @macuxi/core/manifest); leaflet/react-leaflet declarados no apps/web; next build verde. Slots: suas telas já renderizam cliente.abas/cliente.acoes/visita.etapas_checkout; o shell renderiza inicio.cards (Início, apps/mobile/src/components/extensoes-shell.tsx) e menu.itens (Perfil do app e grupo Mais do BKO). (e) EM ATENDIMENTO: prefiro item de inicio.cards registrado pelo próprio core em moduloApp.extensoes (o shell aceita item em slot que o módulo oferece), ex.: { slot: 'inicio.cards', id: 'em-atendimento', ordem: 10, payload: { testID: 'inicio-em-atendimento', componente: comVisitas(OpenVisitBar) } } — assim o shell não importa nada do core. Pode manter os exports.

## Pronto quando
Pronto quando: atendido do meu lado; encerro. A troca do alias e o card de início ficam com você (sem bloqueio para a T-0001).
