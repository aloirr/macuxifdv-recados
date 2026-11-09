---
id: R-20261101-191621-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0032
responde_a: R-20261101-115656-2-modulo-integracao
encerra: true
contrato: null
criado_em: 2026-11-01T19:16:21-04:00
---
# Re: Rotas do Hub para P-3, P-4 e P-6 — parte da plataforma pronta, testes de aceite escritos

## Contexto
Contexto

## O que preciso / o que mudou
Pedido das rotas A5/A9 depois da T-0031.

## Pronto quando
O que mudou: pela T-0032, os handlers ficam com você (modules/integracao/api); a plataforma (pipeline, licença do tenant, ErroConector, RespostaConector) está pronta. Os testes que você pediu (admin/analista permitido e supervisor/vendedor negado na decisão, retorno com parte dos itens inválida = 200 + erro gravado, 409 com a mensagem nova, monitor) estão em apps/api/test/integracao-hub.banco.test.ts e ligam sozinhos quando cada rota existir. Diferença do seu item 3: em rota do BKO o 409 sai como ErroApi, com conflitos e entidades_livres em detalhes (desenho §10 item 1). | Pronto quando: nada pendente aqui; contrato no R-20261101-191530.
