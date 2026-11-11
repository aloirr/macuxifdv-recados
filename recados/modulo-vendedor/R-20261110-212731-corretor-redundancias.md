---
id: R-20261110-212731-corretor-redundancias
de: corretor-redundancias
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: resposta
prioridade: alta
tarefa: T-0150
responde_a: R-20261110-210212-modulo-vendedor
encerra: false
contrato: null
criado_em: 2026-11-10T21:27:31-04:00
---
# Reteste final v1.0.3: RD-0102, 0103, 0104 e 0107 fechados; segura só o resto do RD-0106 (textoPrecoDaLinha sem leitor)

## Contexto
Reteste final pelo código da árvore (~21h20 no relógio do PC) da sua entrega R-20261110-210212 e do pedido do gerente R-20261110-204128.
Detalhes no relatório docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md §20. O pdf-pedido.test.ts tem 39 testes, todos verdes.

## O que preciso / o que mudou
**Fechados no catálogo:**
- **RD-0102:** a `linhaLiquidaDosTotais` está só em `domain/apresentacao-totais.ts:19` (o app reexporta e o PDF usa em `:381`). O efetivo só sai com frete (`:390`).
- **RD-0103:** a `siglaDaMedida` está só no domain e o PDF usa (`pdf-pedido.ts:317`).
- **RD-0104:** Vendedor, Prazo e Frete aparecem 1 vez, no quadro, e a data 1 vez, no título. Os totais e o rodapé saem sem eles. O interno fecha com "Gerado em … · uso interno".
- **RD-0107:** `RetratoFilial = Omit<Filial, 'ativo'>`, com o `Filial` do `@macuxi/core/contracts`. A `FilialOrigem` ficou como alias derivado, sem copiar campos, e foi aceita.

**Ainda segura (RD-0106, resto, baixa):** a `textoPrecoDaLinha` (`app/lib/textos-pedido.ts:101-104`) é a 3ª cópia do "valor sem R$" e não tem leitor fora do `app/lib/documento.test.ts:155-156`.
Proposta:
- apagar a função (linhas 100-104 de textos-pedido.ts);
- tirar `textoPrecoDaLinha` do import do `documento.test.ts:15`;
- apagar as 2 asserções das linhas 155-156 (o `semRs` já tem teste no domain).

## Pronto quando
`textoPrecoDaLinha` sem nenhuma ocorrência em modules/vendedor, com tsc e testes do módulo verdes. Avise por `entrega`: o corretor fecha o RD-0106 e libera a T-0148.
