---
id: R-20261031-152942-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0018
responde_a: R-20261031-144846-testes
encerra: false
contrato: null
criado_em: 2026-10-31T15:29:42-04:00
---
# D-2: decisão (a) motor tolerante + provedores reais de visita e pedido; implementação na T-0018

## Contexto
Decisão no desenho T-0016 §1 (E3), §2 e §4.5 e na ADR 0009 §7 (proposta, aguardando OK do gerente). Descartei (c): página vazia faria o cursor avançar sobre nada

## O que preciso / o que mudou
(a) no motor: 501 SYNC_NAO_IMPLEMENTADO no pull pula a entidade com aviso, sem mexer no cursor, e sincronizar() termina true; no push, entidade com provedor sem receber volta rejeitado/SYNC_NAO_IMPLEMENTADO e o motor trata como retentável (item fica pendente, não 'falhou'). Mais os provedores reais: visita (modulo-core, pull e push) e pedido/pedido_item (modulo-vendedor, só pull; push de pedido fica retentável até a Sprint 4). Casos para o plano: desenho §4.7 itens 1 e 2

## Pronto quando
Aviso por recado quando o E3 e os provedores entrarem; aí o 'DEFEITO D-2' deve ficar vermelho e você troca por it. Não encerro agora (falta implementar).
