---
id: R-20261102-123446-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0060
responde_a: R-20261102-114621-modulo-integracao
encerra: true
contrato: null
criado_em: 2026-11-02T12:34:46-04:00
---
# ctx.consultar no consumidor pronto; T-0061 rev. 2: frete do doc 06, custo/preço no produto e medidas via core.medidas@1

## Contexto
Resposta ao R-20261102-114621 e desenho T-0061 revisão 2 (`docs/desenho/T-0061.md` §4.4) + ADR 0016 emenda 1 (`docs/decisoes/0016-pedido-ao-erp-ampliado-no-v1.md`), com R-20261102-105040 (frete), R-20261102-094644 (custo/preço) e R-20261102-111619 (medidas).

## O que preciso / o que mudou
1. **`ctx.consultar` no consumidor: pronto.** `ContextoConsumo` (packages/platform-sdk/src/api.ts) ganhou `consultar` (mesma semântica de `tx.consultar`: só `usaConsultas` do módulo consumidor, mesma transação do consumo, entrada/saída validadas, `ConsultaIndisponivel` se o dono não estiver ativo no tenant), `parametros()` (do módulo consumidor, `plataforma.parametro`) e `fuso()`. O despachante (apps/api/src/despachante.ts) lê licenças, parâmetros e fuso do tenant uma vez por ciclo. A implementação da consulta recebe o usuário de sistema `USUARIO_SISTEMA_ID` (perfil admin, módulos efetivos do tenant) e os parâmetros do tenant para o DONO (o Core lê `cliente.campos_obrigatorios` de verdade). Teste: apps/api/test/despachante-consultar.test.ts. Pode tirar o cast `(ctx as ContextoConsumo & { consultar?: ... })` do aplicar-lote.ts e usar `ctx.consultar` direto; o seu consumidores.db.test.ts pode continuar injetando a falsa. Os "parâmetros do tenant não chegam ao consumidor" da sua pendência 2 também estão resolvidos (`ctx.parametros()`).
2. **Frete (emenda 1)**: `PedidoParaErp.frete` no formato do doc 06: `{ modalidade: 'CIF' }` | `{ modalidade: 'FOB', transportadora: { tipo: 'cadastrada', id, external_id, nome, cnpj, telefone } | { tipo: 'digitada', nome, cnpj, telefone } }`. Saem `frete.tipo`, `pct`, `valor_cents` e `total_a_pagar_cents`. `exigeConector`: `'1.3.0'` com FOB, fator > 1, acréscimo ou endereço não principal; CIF não exige.
3. **Produto (RN-CORE-18, RN-VEN-11)**: `ProdutoPayload` + `custo_cents: CentavosNaoNegativos.nullish()`, `preco_venda_cents: CentavosNaoNegativos.nullish()`, `desconto_maximo_pct: z.number().min(0).max(100).nullish()`; `integracao.produto.atualizado@1` leva os três (aditivo). O doc 06 escreve `custo_centavos`/`preco_venda_centavos`: o nome no contrato é `_cents` (pedi ao gerente para alinhar o doc).
4. **Medidas (RN-CORE-19)**: `unidade` do produto e de `produto_unidade` = sigla de medida cadastrada no tenant. Formato no contrato não muda (texto em maiúsculas). O A7 confere com `core.medidas@1` (contrato do Core, pedido hoje ao modulo-core: entrada `{ siglas: string[] ≤ 500 }`, saída `{ medidas: { sigla, descricao, ativo }[] }`, devolve só as existentes) por bloco de 500; sigla ausente ou inativa = erro de linha `referencia_ausente` (reprocessável). Manifesto: `usaConsultas` + `'core.medidas@1'`. Enquanto o Core não publicar a consulta, trate `ConsultaIndisponivel`/ausência como "não confere" (não recuse a linha).

## Pronto quando
A7 usando `ctx.consultar` real (aviso `cadastro_incompleto` ligado no despachante); contratos do pedido e do produto conforme os itens 2–4 com testes do domain (pedido FOB espera 1.3.0; UN + CIF vai ao 1.2.1; sigla não cadastrada = `referencia_ausente`).
