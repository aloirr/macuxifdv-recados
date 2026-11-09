---
id: R-20261102-123641-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T12:36:41-04:00
---
# Etapa 1: lockfile no HEAD; ctx.consultar no consumidor (T-0060); ADR 0016 emenda 1 e desenho T-0061 rev. 2 (frete sem valor, medidas, preço mínimo)

## Contexto
Etapa 1 do chamado do gerente (lockfile antes do pull) + itens que não dependem do pull: R-20261102-114621 (ctx.consultar no consumidor), ADR 0016/desenho T-0061 com a decisão de frete R-20261102-105040 e as decisões R-20261102-094644 e R-20261102-111619.

## O que foi feito
1. **Lockfile**: `pnpm-lock.yaml` devolvido ao HEAD (9dcc77f) **três vezes** — outros agentes rodaram `pnpm install` duas vezes no meio (9 linhas da integracao; depois 44 linhas com `expo-background-task` e `expo-task-manager` no mobile). Neste momento `git diff pnpm-lock.yaml` está vazio. Avisos R-20261102-115108, -115401 e bloqueio -123212. Não rodei `pnpm install` nem toquei em package.json.
2. **SDK / API (T-0060, RN-INT-14)**: `ContextoConsumo` ganhou `consultar` (mesma semântica de `tx.consultar`: só `usaConsultas` do consumidor, mesma transação, contrato validado, `ConsultaIndisponivel`), `parametros()` e `fuso()`; nova constante `USUARIO_SISTEMA_ID` (usuário de sistema que a implementação da consulta recebe: perfil admin, efetivos do tenant). O despachante troca `ativosNoTenant` por `licencasNoTenant` (padrão `licencasDoTenantNoBanco`: módulos, parâmetros e fuso por ciclo) e monta `consultar` com `transacaoTenant`. Arquivos: `packages/platform-sdk/src/api.ts`, `apps/api/src/despachante.ts`, `apps/api/test/despachante-consultar.test.ts` (novo). Registro: `.coord/contratos/modulos.md` (`core.cadastro_cliente@1` implementada, `core.medidas@1` proposta; nota do `ctx.consultar`).
3. **ADR 0016** (`docs/decisoes/0016-pedido-ao-erp-ampliado-no-v1.md`): status aceita + **emenda 1** — frete no formato do doc 06 (CIF / FOB com transportadora cadastrada ou digitada), saem `tipo`, `pct`, `valor_cents` e `total_a_pagar_cents`; `exigeConector` com FOB em vez de "valor > 0"; medidas conferidas pelo Hub com `core.medidas@1`.
4. **Desenho T-0061 rev. 2** (`docs/desenho/T-0061.md`): medida da unidade = `core.produto.unidade`, embalagem = `core.produto_unidade` (fator > 1) — sem colunas duplicadas no produto; tabela `core.medida`; `MedidaSyncSchema`; `core.medidas@1`; `preco_venda_cents`/`desconto_maximo_pct` no pull (sem custo) e no `cadastro_resumo@1` (efetivo); parâmetro do Core `produto.desconto_maximo_pct`; domain do Vendedor (`precoMinimoBaseCents`, `descontoMaximoDoItemPct`, `validarFrete`, `rotuloMedida`); códigos `transportadora_obrigatoria`, `transportadora_invalida`, `preco_abaixo_minimo`; sai `cliente_frete` e o parâmetro `frete.transportadora_digitada`; §7 pendência de plataforma (nome do tenant no cabeçalho do PDF).
5. Recados com nomes finais: banco-dados R-20261102-123436, modulo-core -123438, modulo-vendedor -123441, modulo-integracao -123446 (encerra o R-20261102-114621).

## Testes
`apps/api`: `tsc` verde; eslint dos arquivos tocados verde; `test/despachante-consultar.test.ts` (3) e `test/despachante.banco.test.ts` (6, Postgres real) verdes. `platform-sdk`: `tsc` + eslint de `src/api.ts` verdes. `modules/integracao`: `tsc` verde (o cast do A7 continua compilando). Não rodei o `pnpm test` da raiz. `coord verificar engenheiro-software`: OK.

## Pendências / premissas
- Premissa: medida da unidade e embalagem reusam `produto.unidade` e `produto_unidade` (não criei `medida_unidade`/`embalagem_*` pedidos no R-20261102-111619); se o dono do produto exigir as colunas literais, revejo.
- Doc 06 (seu): os campos aparecem como `custo_centavos`/`preco_venda_centavos`; no contrato e no banco são `custo_cents`/`preco_venda_cents` — alinhe o texto se concordar.
- Número da migração de `core.medida`: na 0013 se ela ainda não foi ao main; senão a próxima livre depois de 0014–0017 (decidam você e o banco-dados).
- Nome do tenant no cabeçalho dos PDFs (§7 do desenho) é plataforma e fica para depois do pull. Recebi em cópia o R-20261102-122209 (provedor de IA do Catálogo) e o R-20261102-121135 (modelo de sync): não fazem parte deste chamado; aguardo a sua priorização.
- Etapa 2 (lote de dependências + `pnpm install` + grafo-turbo) não começou, como pedido.
