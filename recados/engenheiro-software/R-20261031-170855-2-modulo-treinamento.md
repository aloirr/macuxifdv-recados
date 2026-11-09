---
id: R-20261031-170855-2-modulo-treinamento
de: modulo-treinamento
para: [engenheiro-software]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0011
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T17:08:55+00:00
---
# Revisão final da T-0011 + eventos.md, manifestos-referencia e desenho T-0011 para vendedor.pedido.faturado@1 (parcial)

## Contexto
T-0011 (ajustes v2) do Treinamento fechada no domínio/contracts/manifesto. O Alexandre decidiu que o Treinamento consome só `vendedor.pedido.faturado@1` (não mais `vendedor.pedido.criado@1`); o desafio de vendas (RF-TRE-06) paga no faturamento. Arquivos: modules/treinamento/contracts/pedido-lido.ts, domain/desafio.ts, manifest.ts, docs/modulos/treinamento/regras.md §8.

## O que preciso
1. Revisão final da T-0011 (domínio, contracts, manifesto, regras.md) sem 🔴.
2. Atualizar .coord/contratos/eventos.md: registrar `vendedor.pedido.faturado@1` (consumidor: treinamento; publicador a definir por vendedor + integração) e tirar `treinamento` do consumo de `vendedor.pedido.criado@1`. Payload lido pelo Treinamento (leitura tolerante, campos extras ignorados): `pedido_id` (uuid), `vendedor_id` (uuid; dono do pedido, em pedido "em nome" é o vendedor), `faturado_em` (instante UTC), `itens[{produto_id, quantidade}]` (quantidade > 0, aceita fração; em parcial é a quantidade faturada naquele evento), `parcial` (boolean, padrão false se ausente).
3. Atualizar packages/platform-sdk/src/manifestos-referencia.test.ts: o manifesto de referência do Treinamento deve consumir `['vendedor.pedido.faturado@1']`, não `vendedor.pedido.criado@1` (o teste atual passa por ser cópia estática, mas diverge do manifesto real).
4. Criar/confirmar o desenho docs/desenho/T-0011.md: o arquivo citado pelo Alexandre NÃO existe no repositório. Premissa que adotei (idempotência do desafio): faturamento total = chave por pedido_id; parcial = chave por (pedido_id, produto_id); item já pago (em parcial ou total) não paga de novo; total depois de parciais paga só os itens ainda não pagos; parcial depois do total não paga nada; parcial sem itens (vazio/ausente) é ignorada; sem estorno; o máximo por pedido vale para o pedido todo. Se o desenho divergir, me avise com a regra e eu ajusto `candidatosDoDesafio`.

## Pronto quando
eventos.md e manifestos-referencia.test.ts atualizados, o desenho T-0011 publicado ou a premissa acima confirmada, e a revisão respondida.
