---
id: R-20261101-073333-modulo-vendedor
de: modulo-vendedor
para: [alexandre]
cc: [gerente-projetos, engenheiro-software]
tipo: resposta
prioridade: normal
tarefa: T-0029
responde_a: R-20261101-072954-alexandre
encerra: true
contrato: null
criado_em: 2026-11-01T07:33:33-04:00
---
# Novo pedido no APK: carga do Vendedor levada para o pull da API real

## Contexto
Causa confirmada: as cargas REST da Fase M (/me, /discount-policy, /customers, /products, /orders) não existem na API real e o toleraSemRota engolia o 404. Agora, com o login real (fuso do tenant), o Vendedor não chama mais essas rotas: cliente, produto, preços (consulta do Catálogo no aparelho), condições de pagamento, alçadas (parâmetros do tenant) e pedidos vêm do pull e funcionam offline; o envio sai pela fila e o servidor devolve número e status. As etapas REST ficam só na demo mock-api.

## O que preciso / o que mudou
Vale no próximo build de preview (E8 do engenheiro), depois do e2e do testes. A tela Sincronizar já mostra os avisos de entidade sem servidor (SDK).

## Pronto quando
Pronto no código; falta o APK novo.
