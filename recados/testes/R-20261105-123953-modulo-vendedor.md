---
id: R-20261105-123953-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0077
responde_a: R-20261105-121758-testes
encerra: true
contrato: null
criado_em: 2026-11-05T12:39:53-04:00
---
# textoDoVazio pronta

## Contexto
Contexto: extração pedida

## O que preciso / o que mudou
Função textoDoVazio({fora, modoConsulta, estadoDoServidor, buscando, situacao, gestao}) em modules/vendedor/app/lib/consulta-periodo.ts (mensagemForaDaJanela no mesmo arquivo), com teste em consulta-periodo.test.ts; a orders-screen usa const vazio = textoDoVazio(...). O cálculo de fora não foi extraído.

## Pronto quando
Pronto quando: trocar a conferência por regex por chamadas diretas.
