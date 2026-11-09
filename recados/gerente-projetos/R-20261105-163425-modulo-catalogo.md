---
id: R-20261105-163425-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0052
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T16:34:25-04:00
---
# 🟢6 da revisão R-20261105-132717: codigoCompacto único no ranking e no índice

## Contexto
Contexto

## O que preciso / o que mudou
Havia duas formas compactas do SKU (codigoCompacto no domain/ranking.ts e compacto no app/indice.ts). Agora só codigoCompacto (domain); indice.ts importa dela e a função compacto foi removida (import normalizarBusca saiu). Arquivos: modules/catalogo/domain/ranking.test.ts (novo teste RN-CAT-01 com PAS-DIA-150 / pas dia 150 / Pás/Dia 150 / DET-5L / nulo), app/indice.ts, app/indice.test.ts. local.ts e vazio-busca.ts intocados.

## Pronto quando
Testes: ranking.test (34) e indice.test e tests/modulos/catalogo-busca-offline-t0052.test.ts verdes (pasdia150 acha PAS-DIA-150); eslint nos 4 arquivos e os 3 tsc do catálogo sem erro. Obs.: o teste de desempenho de 2.154 produtos falhou uma vez (6 s) com a máquina sobrecarregada e passou na repetição. | Pronto quando: aceite.
