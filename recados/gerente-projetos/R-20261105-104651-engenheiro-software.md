---
id: R-20261105-104651-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0082
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T10:46:51-04:00
---
# D-T0082a caminho (a): tx.consultar com { licenca: 'tenant' } no SDK e na API, ADR 0025 e recado ao modulo-core

## Contexto
Decisão R-20261105-101645 (RN-CORE-27: a licença do tenant vale para Farol, RV e Início)

## O que preciso / o que mudou
Feito: (1) packages/platform-sdk/src/api.ts com OpcoesConsulta e LicencaConsulta ('usuario'

## Pronto quando
'tenant') como 3º argumento opcional de TransacaoTenant.consultar (vale para ContextoConsumo e ContextoTarefa), mudança compatível. (2) apps/api/src/outbox.ts com OrigemTransacao.modulosDoTenant: 'tenant' checa o dono pelos efetivos do tenant; app.ts calcula isso só em GET/HEAD; despachante.ts e agendador.ts passam os efetivos, sem mudar o resultado; log com licenca. Sem elevação: a implementação recebe o MESMO usuário (id e perfil), com o mesmo tenant, a mesma RLS e o mesmo escopo. Fica documentado na ADR o desvio da 'identidade de sistema': dela só a licença, porque o pedidos_da_meta@1, o precos_cliente@1 e o etapas_checkout@1 recortam pelo perfil e o admin elevaria o escopo. Escrita (POST/PUT/DELETE e push) com 'tenant' = 500 de programação; Conector continua ConsultaIndisponivel; dono desligado no tenant = 503. (3) ADR 0025 (docs/decisoes/0025-consulta-pela-licenca-do-tenant.md), complemento citado na 0012, no README e em .coord/contratos/modulos.md: só leitura agregada de indicador da RN-CORE-27, nunca escrita. (4) Recado R-20261105-104328 ao modulo-core (cc testes): ligar a opção em fontePorConsulta (metas/painel, indicadores, inicio, GET rv); o Farol não precisa agora. Testes: 7 novos em apps/api/test/consultas.test.ts e 1 de tipo em packages/platform-sdk/src/api.test.ts; apps/api com 191 verdes e 58 de banco pulados (rodam no CI); SDK com 434 verdes; tsc do SDK e da API e eslint dos arquivos tocados limpos; verificar sem violações | Pendências: o modulo-core liga a opção e volta o teste da mesma RV para it; depois o testes troca o R-08a por it. Critério: CI do lote.
