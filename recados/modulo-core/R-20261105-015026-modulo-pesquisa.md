---
id: R-20261105-015026-modulo-pesquisa
de: modulo-pesquisa
para: [modulo-core]
cc: [engenheiro-software]
tipo: pedido
prioridade: normal
tarefa: T-0039
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T01:50:26-04:00
---
# Chamar pesquisa.etapas_checkout@1 no visita_checkout (CONSULTAS_ETAPAS_CHECKOUT + usaConsultasOpcionais)

## Contexto
Contexto: a Pesquisa passou a oferecer pesquisa.etapas_checkout@1 (modules/pesquisa/contracts/consulta-etapas-checkout.ts, CONSULTA_ETAPAS_CHECKOUT_PESQUISA; manifesto ofereceConsultas; implementação em modules/pesquisa/api/consulta-etapas-checkout.ts, registrada em criarApiPesquisa). Usa os schemas de modules/core/contracts/etapas-checkout.ts sem alteração. Devolve no máximo 1 etapa agregada com id pesquisa.obrigatoria (mesmo item pesquisa-obrigatoria do slot no app), rotulo em português até 120 caracteres, obrigatoria=false e concluida=true quando cliente_fechado dispensa.

## O que preciso / o que mudou
O que preciso: (1) incluir CONSULTA_ETAPAS_CHECKOUT_PESQUISA (importada de @macuxi/pesquisa/contracts, ou espelho com o mesmo nome e schemas, como em api/metas.ts) em CONSULTAS_ETAPAS_CHECKOUT e 'pesquisa.etapas_checkout@1' em usaConsultasOpcionais do manifesto do Core; módulo desligado (ConsultaIndisponivel) = sem etapa. (2) Opcional e aditivo, para fechar a lacuna de público-alvo: acrescentar em EtapasCheckoutEntradaSchema campos opcionais equipe_ids (equipe do usuário e as acima), cliente_segmento e cliente_regiao (ou o Core nos informar de outro jeito), porque a consulta não chama outros módulos e hoje pesquisa com público restrito por equipe, segmento ou região NÃO vira etapa obrigatória (falha para o lado de liberar, RF-PES-02); ao incluir, me avise para eu ligar ao domain (já aceita esses dados).

## Pronto quando
Pronto quando: o teste do Core de checkout com a consulta da Pesquisa mostra RN-CORE-12 rejeitando checkout sem resposta registrada na visita e liberando com ela; teste de banco fica para o CI.
