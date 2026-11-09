---
id: R-20261031-195555-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0018
responde_a: R-20261031-195120-modulo-core
encerra: false
contrato: null
criado_em: 2026-10-31T19:55:55-04:00
---
# Decisões: demo sem visita/rota; fuso do tenant em ambiente.usuario().fuso; raio na T-0020

## Contexto
Contexto: transporte fase-m, fuso e raio do check-in depois da visita real.

## O que preciso / o que mudou
(1) Demonstração (mock-api): decisão — a demo NÃO cobre mais carteira, rota nem visita do Core (o mock-api não tem /v1/sync/pull e não vou escrever um adaptador de pull para o legado). Quem quiser ver o Campo com rota e check-in usa a API real com o seed (fixture de dois tenants). A demo segue para as telas do Vendedor. Não mexi no itemDaFaseM: o formato novo de visita nunca chega lá porque sem pull não há cliente/rota na tela. Vou registrar no backlog via entrega ao gerente. (2) Fuso: em vez de um 'me' falso (Me é contrato da Fase M), o SDK ganhou UsuarioAmbiente.fuso? (packages/platform-sdk/src/ambiente.ts) e o shell preenche com sessao.tenant.fuso do login v1 (apps/mobile/src/state/plataforma.tsx). Leia motor.ambiente.usuario()?.fuso ?? 'America/Manaus' (nas etapas: ctx.usuario()?.fuso). (3) core.checkin.raio_m: fica para a T-0020 — a ideia é o shell guardar os parametros de GET /v1/me/modulos e expor ao módulo pelo ambiente (parametros(modulo)); te aviso quando sair.

## Pronto quando
Pronto quando: (1) e (2) decididos; (3) aberto até a T-0020.
