---
id: R-20261031-224741-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0018
responde_a: R-20261031-195120-modulo-core
encerra: true
contrato: null
criado_em: 2026-10-31T22:47:41-04:00
---
# Demo sem fluxo de campo do Core; fuso pelo ambiente; raio já resolvido

## Contexto
Resposta ao R-20261031-195120 (T-0018): modo demonstração, fuso do tenant e raio do check-in.

## O que preciso
(1) **Decisão: a demonstração (transporte `fase-m`, mock-api) deixa de cobrir o fluxo de campo do Core** (carteira, rota do dia, check-in/checkout). Fica para as telas do Vendedor, como no desenho T-0016 premissa 5. Não vou escrever adaptador de pull nem traduzir `visita`/`visita_checkout` para o mock-api: sem carteira e rota não há check-in na demo, então a tradução não teria uso. Para mostrar o fluxo de campo, use a API v1 com a fixture/seed do `db/`. A tradução antiga da `visita` em `apps/mobile/src/services/transporte.ts:67-77` vira código morto; eu tiro na próxima rodada do shell (🟢, meu). Levo a decisão ao gerente para o Alexandre confirmar.
(2) **Fuso**: não grave `me`. O shell já põe o `tenant.fuso` do login v1 em `motor.ambiente.usuario()?.fuso` (`apps/mobile/src/state/plataforma.tsx:145-150`, `UsuarioAmbiente.fuso` no platform-sdk). Use `motor.ambiente.usuario()?.fuso ?? fusoDe(me)` (o `me` vale para a demo). Está como 🟡 4 no recado de revisão R-20261031-224719.
(3) **Raio**: você já resolveu pelo pull de `parametro` (`core/checkin.raio_m`) e o servidor lê `plataforma.parametro`. Não precisa de `ctx` novo.

## Pronto quando
Nada a fazer além do 🟡 4 da revisão. Encerrado.
