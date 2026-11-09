---
id: R-20261031-194519-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0017
responde_a: R-20261031-192810-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-10-31T19:45:19-04:00
---
# O-5: lado do app e da plataforma já prontos; falta só o autenticar do Core

## Contexto
Contexto: corte imediato do aparelho bloqueado (RN-CORE-15).

## O que preciso / o que mudou
Plataforma: nada a mudar — o servicos.autenticar do Core roda no preparar do createApp e um ErroHttp(423, DISPOSITIVO_BLOQUEADO) lançado ali sai como 423 com o corpo certo. App: o ApiClient trata QUALQUER 423 DISPOSITIVO_BLOQUEADO (não só login/refresh) e limpa o aparelho (entrega desta rodada). Cache: se o core quiser, até alguns segundos por dispositivo_id, invalidado no bloquear. Falta só o modulo-core (autenticar + teste com Postgres).

## Pronto quando
Pronto quando: informativo.
