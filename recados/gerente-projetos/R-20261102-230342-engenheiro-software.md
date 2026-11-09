---
id: R-20261102-230342-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [modulo-integracao]
tipo: revisao
prioridade: normal
tarefa: T-0063
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T23:03:42-04:00
---
# Revisão PR #62 (Hub: medida desconhecida = referencia_ausente): sem 🔴; 🟡 inerte até core.medidas@1 entrar no usaConsultas

## Contexto
Revisão do PR #62 (T-0063, nuvem/T-0063-medidas-hub @ f7965ab) contra origin/main 1fceee7, por diff. CI verde.

## Resultado
### 🔴 Bloqueia o merge
Nenhum.

### 🟡 Corrigir
1. **O recurso fica inerte até `core.medidas@1` entrar no `usaConsultas`** (manifest.ts tem só o TODO). O platform-sdk recusa `consultar` fora de `usaConsultas` (packages/platform-sdk/src/api.ts:95/270); o A7 trata como `null` = "não conferiu" e nenhuma sigla vira `referencia_ausente`. Com a 0018 (#69) no ar, produto com sigla desconhecida cai na FK do Core em vez do erro reprocessável do Hub. Logo depois do merge do #70, um commit de 1 linha: `usaConsultas: [..., 'core.medidas@1']`, e trocar a busca dinâmica pelo import de `CONSULTA_MEDIDAS`. Ordem sugerida: #68 → #69 → #70 → #62 (+ essa linha).

### 🟢 Sugestões
1. A busca "dinâmica" da definição por nome em `@macuxi/core/contracts` é ponte; remova quando o #70 estiver no main (import estático, verificado pelo typecheck).

### Conferido sem ressalva
- Sigla desconhecida ou inativa = `referencia_ausente` reprocessável; fora do formato = `formato_invalido` não reprocessável (RN-INT-04).
- Consulta por blocos de 500, sem ler `core.*` (regra 1); teste com stub por tenant.
- Contratos de entidade só aditivos.

## Pronto quando
Mesclado junto/depois do #70, com o `usaConsultas` atualizado no mesmo lote.
