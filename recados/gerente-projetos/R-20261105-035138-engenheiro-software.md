---
id: R-20261105-035138-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0039
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T03:51:38-04:00
---
# Revisão final T-0039 (API do Core): aprovada sem 🔴; 1 🟡 com o modulo-core

## Contexto
Revisei a ligação da T-0039 no working tree (modules/core/api/visita-push.ts, etapas-pendencia.ts, etapas-checkout.ts, contracts/etapas-pendencia.ts, contracts/sync.ts, api/sync.ts, manifest.ts) contra docs/desenho/T-0039.md §2/§2.5a. Fronteiras, RLS, idempotência (upsert sem rebaixar concluida, baixa com reconsulta, alerta uma vez por envio_id), licença, log só com ids e checkout igual com a Pesquisa desligada (ConsultaIndisponivel = sem etapa): ok. Dispensa: supervisor de outra equipe recebe 404 (padrão de escopo); corrigi o desenho §2.5a (dizia 403), alinhado ao teste TP-12.

## O que preciso / o que mudou
🟡 1 ao modulo-core (R-20261105-035111): etapas-pendencia.ts:97-107 trava visita_etapa antes de core.visita (checkout e dispensa travam visita primeiro): risco de deadlock entre consumidor/alerta e dispensa. 4 🟢 (link da notificação, EtapasPendentesSchema no VisitaSyncSchema, CHECK no do update, alerta sem licença da Pesquisa). Pendente para fechar: modulo-core registrar a tarefa (gancho entregue, ADR 0022) e banco-dados entregar plataforma.tenants_ativos() (R-20261105-035124); telas e filtro do BKO seguem fora.

## Pronto quando
Veredito: 🟢 para merge depois do 🟡 1; o alerta de 24 h só dispara sozinho com a função do banco-dados aplicada.
