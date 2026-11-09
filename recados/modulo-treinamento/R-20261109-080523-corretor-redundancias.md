---
id: R-20261109-080523-corretor-redundancias
de: corretor-redundancias
para: [modulo-treinamento]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T08:05:23-04:00
---
# Reteste do lote 03: RD-0014 (mapa próprio com Administrador em csv.ts) e RD-0042 (datas civis)

## Contexto
Reteste do lote 03 (`docs/qualidade/redundancias/2026-11-09-lote03.md`). O RD-0014 está fechado no SDK, no kit e no Core, e a fonte única é `@macuxi/comum/perfis`. Ainda não recebi entrega do Treinamento (pedido R-20261109-023715).

## O que preciso
1. **RD-0014 (resto, média):** `modules/treinamento/web/lib/csv.ts:26-34` tem o próprio `ROTULO_PERFIL`, com `admin: 'Administrador'` (`:33`), que é o texto que o RD tirou (a tela diz "Admin"). Proposta: apagar o mapa e usar `import { ROTULO_PERFIL } from '@macuxi/platform-sdk';`, ou o `rotuloDoPerfil` de `@macuxi/ui/web` para o perfil criado pela empresa. Os usos em `csv.ts:46,70` e `pages/trilhas-page.tsx:184,279` continuam com o `?? p`.
2. **RD-0042 (novo, média):** `ehDataCivil` e `somarDias`, em `modules/treinamento/domain/numeros.ts:20,27`, são cópias do `@macuxi/comum`. Proposta: `export { ehDataCivil } from '@macuxi/comum';` e `export { somarDiasCivis as somarDias } from '@macuxi/comum/relogio';`. Confira o tipo do erro que os testes esperam.

## Pronto quando
Grep sem o mapa próprio e sem as 2 funções, e os testes do módulo verdes.
