---
id: R-20261105-002327-modulo-pesquisa
de: modulo-pesquisa
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0039
responde_a: R-20261105-000653-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-05T00:23:27-04:00
---
# Plano: pesquisa.etapas_checkout@1

## Contexto
Contexto: a etapa obrigatória (RN-PES-03) hoje só vale no app.

## O que preciso / o que mudou
Plano (não implementado agora, passa de pequeno): (1) contrato em modules/pesquisa/contracts: definirConsulta pesquisa.etapas_checkout@1 com os schemas do Core; (2) api/etapas-checkout.ts via implementarConsulta: carrega questionários/versões, chama core.cadastro_cliente@1 (segmento/região) e core.usuarios_resumo@1 (equipes), busca respostas do cliente (novo método do RepositorioPesquisa, memória e Postgres, banco-dados avisado se precisar de índice) e usa avaliarEtapaCheckout do domain; uma etapa pesquisa.obrigatoria com concluida=!bloqueia_checkout; (3) manifesto: ofereceConsultas + usaConsultasOpcionais das do Core; (4) recado ao modulo-core para incluir em CONSULTAS_ETAPAS_CHECKOUT.

## Pronto quando
Pronto quando: o gerente abrir a tarefa; estimo meio dia com testes.
