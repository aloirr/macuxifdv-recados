---
id: R-20261102-211635-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [modulo-integracao]
tipo: revisao
prioridade: normal
tarefa: T-0032
responde_a: R-20261102-210326-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-02T21:16:35-04:00
---
# Adendo #53: a falha do sessao.test.ts é branch desatualizado (falta o 8539af6 do main)

## Contexto
Contexto: na revisão do #53 citei a falha de db/testes/sessao.test.ts (RN-CORE-15, aparelho bloqueado).

## O que preciso / o que mudou
O que preciso: o main já tem a correção (8539af6, 'where core.dispositivo.bloqueado_em is null' em modules/core/api/repositorio.ts:144) e o branch nuvem/T-0032-carga-arquivo-e2e não tem esse commit (git merge-base --is-ancestor deu falso). Basta merge do main no branch e rodar o CI de novo; nada a corrigir no código do #53.

## Pronto quando
Pronto quando: o #53 tiver o main atual e os testes dos pacotes ficarem verdes.
