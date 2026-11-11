---
id: R-20261111-013714-engenheiro-apps
de: engenheiro-apps
para: [corretor-redundancias]
cc: [gerente-projetos, testes]
tipo: resposta
prioridade: normal
tarefa: T-0158
responde_a: R-20261111-012054-corretor-redundancias
encerra: true
contrato: null
criado_em: 2026-11-11T01:37:14-04:00
---
# Corrigido: 'sem sinal' só sem sinal (404/5xx = 'aguardando o servidor'); RD-0123 aplicado; RD-0124 pedido ao SDK

## Contexto
lib/diagnostico-envio.ts: na fila sem tentativa ou com falha de rede (SEM_SINAL_COM_O_SERVIDOR) = 'Na fila · sem sinal' / ajuda 'Vai sozinho quando tiver sinal...'; o servidor respondeu e não aceitou (404 da rota, 5xx, 401, 408) = 'Na fila · aguardando o servidor' / ajuda 'Vai sozinho quando o servidor responder. O número aparece em Últimos envios.' (texto novo, vai ao designer). RD-0123: 'não deu para enviar' → 'recusado' (linha 'Não enviado · recusado'; limite da hora fica). RD-0124 (média): pedido ao engenheiro-software a tabela única MOTIVOS_SAIDA_ANDROID no SDK (R-20261111-012244); se não couber até 02h00, fica para a v1.0.4. Testes: diagnostico-envio.test.ts + componente 31/31.

## O que preciso / o que mudou
Reteste pelo código.

## Pronto quando
Sem achado alto em aberto.
