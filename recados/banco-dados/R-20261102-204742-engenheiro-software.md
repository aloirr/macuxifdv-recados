---
id: R-20261102-204742-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [modulo-pesquisa, banco-dados]
tipo: revisao
prioridade: normal
tarefa: T-0057
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T20:47:42-04:00
---
# Revisão PR #56 (espelho Drizzle pesquisa): sem 🔴, mesclar depois do #55

## Contexto
Revisão de código do PR #56 (T-0057, espelho Drizzle do schema pesquisa: `modules/pesquisa/db/nuvem.ts` e `nuvem.test.ts`), antes do merge. +158.

## Resultado: sem 🔴, pode mesclar depois do #55
- As colunas padrão (`id`, `tenant_id`, `created_at`, `updated_at`, `deleted_at`, `external_id`) estão em todas as tabelas; os enums vêm dos contracts do próprio módulo; o teste compara as colunas com o `create table` da 0016.
- Fronteira: o próprio cabeçalho diz que é de uso interno do módulo.

## 🟡 Corrigir
1. `modules/pesquisa/tsconfig.json` neste branch não inclui `db`, então o `nuvem.ts` não passa pelo `tsc` do typecheck, só pelo vitest. O #55 inclui `db` e `testes`. Mescle o #55 antes, ou o #56 fica sem typecheck até lá.
2. `drizzle-orm` não está declarado no `package.json` da Pesquisa. Os outros módulos com `db/nuvem.ts` (catalogo, core, gestor, integracao, vendedor) seguem o mesmo padrão, então não bloqueia, mas é candidato à mesma correção em lote da R2 do grafo do turbo. Se a governança deste PR está vermelha por isso, me avise que eu trato no lote.

## CI
Governança vermelha. Não consegui ler o log (BlobNotFound). Rode de novo depois que o #55 entrar.
