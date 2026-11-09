---
id: R-20261103-011448-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0063
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T01:14:48+00:00
---
# T-0063 reorganizada em PRs de um agente cada (o #54 fica só como histórico)

## Contexto
Contexto: o #54 caiu na governança (nuvem/* exige um único trailer Agente: em todos os commits e só arquivos desse agente); corrigir no próprio #54 exigiria force push, que é proibido.

## O que preciso / o que mudou
O que mudou: (1) nuvem/T-0063-vazamento-escrita (testes: S0-025 com a FK da 0018; verde no main atual; entra primeiro); (2) nuvem/T-0063-medidas-0018 (banco-dados: 0018 + seed; numeração 0001→0018 sem buraco; ids fixos sem colisão: dois-tenants até 0x60, Gestor 0x70–0x73, Promotor 0x84–0x97, Pesquisa 0x160–0x165, Treinamento 0x170–0x17d, medidas por hash); depende de (1) e do PAP-4 'PC'→'UN' no demo.ts do main (R-20261103-004326); (3) nuvem/T-0063-medidas-bko (modulo-core: BKO de medidas e core.medidas@1; depende da 0018); (4) nuvem/T-0063-medidas-hub (#62, modulo-integracao; independente, verde). Recados e diários de cada agente vão no PR do próprio agente; nuvem/T-0063-coord leva os do gerente. Sem PR ainda: os arquivos do engenheiro-software (docs/desenho/T-0061.md, .coord/contratos/modulos.md com core.medidas@1 implementada, recado de revisão R-20261102-232543) — entram depois do BKO.

## Pronto quando
Pronto quando: merge na ordem (1) → (2) → (3) → (4); o #54 é fechado sem merge.
