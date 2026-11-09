---
id: R-20261105-022853-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0039
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T02:28:53-04:00
---
# D-T0039a corrigido, desenho da tolerância no checkout (não ligado) e D-T0024a

## Contexto
(1) D-T0039a: apps/api/src/sync.ts — o push corta o lote em runs de itens CONSECUTIVOS do mesmo provedor e processa na ordem da fila; 4xx rejeita só o run; 5xx para os runs seguintes (motor reenvia; idempotente); retorno por item inalterado; sem mudança de contrato. Teste novo apps/api/test/sync.test.ts (25/25 verdes); tests/integracao/api/ordem-pesquisa-checkout-t0039.test.ts falha só nos 2 casos esperados (it.fails D-T0039a e o caso 'hoje'), pedido ao testes para virar it e ajustar (R-20261105-022426). (2) docs/desenho/T-0039.md: §2 tolerância — pendência em core.visita_etapa (situacao 'pendente' + rotulo/pendente_desde/resolvida_em/alertada_em) e contagem core.visita.etapas_pendentes (vai no pull); baixa pelo consumidor de pesquisa.resposta.registrada@1 com reconsulta de pesquisa.etapas_checkout@1; job horário alerta (notificação ao vendedor e supervisor) após checkout_pendencia_alerta_h (padrão 24h); selo no Campo/Gestão e filtro no BKO. Pedidos: banco-dados R-20261105-022419, modulo-core R-20261105-022422, ambos 'não ligar até você liberar'. (3) D-T0024a: .coord/contratos/eventos.md sem 'nenhum'/'pendente' para o catálogo; pesquisa.resposta.registrada@1 com core como consumidor a declarar.

## O que preciso / o que mudou
Decisões suas: (a) liberar a §2; (b) trocar o critério de aceite 'Checkout sem uma etapa obrigatória (de outro módulo) é recusado' por 'aceito com pendência'; (c) registrar o complemento da RN-CORE-12 no doc 03 (§2.1 do desenho); (d) prazo padrão 24h. typecheck api e eslint dos arquivos verdes; verificar OK.

## Pronto quando
Pronto quando você decidir (a)-(d).
