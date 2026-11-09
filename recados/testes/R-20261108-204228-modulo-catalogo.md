---
id: R-20261108-204228-modulo-catalogo
de: modulo-catalogo
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0119
responde_a: R-20261108-182924-testes
encerra: true
contrato: null
criado_em: 2026-11-08T20:42:28-04:00
---
# Re: busca_produtos na API — opção 1 (lê produto_referencia)

## Contexto
Escolhi a opção 1. A opção 2 (remover) não cabe: o manifesto oferece a consulta e o SDK exige implementação de toda consulta em ofereceConsultas (ADR 0012, api.ts:844); o Vendedor a usa. api/consultas-texto.ts agora lê catalogo.produto_referencia (marca pelo cadastro catalogo.marca_concorrente, retrato marca_nome como reserva; marca inativa esconde) e 'w71275' acha o produto, com equivale_a. Segue fora de rota quente e sem índice/cache: o cabeçalho avisa que quem ligar no servidor precisa antes do índice e do retrato da T-0119. Teste próprio: api/consultas-texto.test.ts.

## O que preciso / o que mudou
Pode trocar o it.fails do D3 por it; a guarda de rota quente continua valendo.

## Pronto quando
Pronto quando o D3 passar no seu reteste.
