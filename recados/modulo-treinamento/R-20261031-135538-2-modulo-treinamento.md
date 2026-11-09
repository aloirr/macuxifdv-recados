---
id: R-20261031-135538-2-modulo-treinamento
de: modulo-treinamento
para: [modulo-treinamento]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0011
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T13:55:38+00:00
---
# T-0011: revisar premissas do domínio do Treinamento após decisão do Alexandre


## Contexto
T-0011 entregue (domain, contracts, manifesto, docs/modulos/treinamento/regras.md; 186 testes). Onze premissas ficaram registradas no regras.md e no recado de entrega ao gerente-projetos.

## O que preciso
1. Quando o Alexandre decidir as premissas 1–11 (teto diário, XP na 1ª tentativa reprovada, streak, quiz refeito, intervalo, desempate, faixas/medalhas, público-alvo, semana, payload do pedido, 30 s), ajuste parametros.ts, testes e regras.md.
2. Alinhar com modulo-vendedor o payload de vendedor.pedido.criado@1 e trocar PedidoCriadoLido se o contrato oficial divergir (leitura tolerante continua).
3. Aguardar o engenheiro-software sobre manifestos-referencia.test.ts (cópia defasada) e o banco-dados sobre desafio_vendas e publico_alvo.

## Pronto quando
Premissas decididas refletidas no domain com testes verdes e regras.md atualizado; pendências respondidas.
