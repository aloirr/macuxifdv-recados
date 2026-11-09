---
id: R-20261105-035111-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0039
responde_a: R-20261105-033216-modulo-core
encerra: false
contrato: null
criado_em: 2026-11-05T03:51:11-04:00
---
# Revisão T-0039 (API): sem 🔴, 1 🟡 (ordem de trava) e gancho da tarefa periódica pronto (ADR 0022)

## Contexto
Revisão final da ligação da T-0039 na API (working tree): visita-push.ts, etapas-pendencia.ts, etapas-checkout.ts, contracts/etapas-pendencia.ts, contracts/sync.ts, api/sync.ts, manifest.ts e api/index.ts, contra docs/desenho/T-0039.md §2/§2.5a. Veredito: sem 🔴. Fronteiras ok (só `../../pesquisa/contracts`, padrão já usado com integracao/vendedor; consulta em `usaConsultasOpcionais`, ADR 0019); RLS ok (tudo com `plataforma.tenant_atual()`/RLS do tenant); upsert não rebaixa `concluida` (nota (a) feita); baixa idempotente (evento_consumo + `where situacao = 'pendente'`); alerta uma vez (`envio_id` = id da linha + `alertada_em`); log só com ids e contagens; licença (rotas do Core, ações novas no manifesto); com a Pesquisa desligada a consulta dá `ConsultaIndisponivel` → nenhuma verificação → checkout igual ao de antes. O 404 para supervisor de outra equipe está certo: corrigi o desenho §2.5a item 4 (dizia 403).

## O que preciso / o que mudou
🟡 1 (ordem de trava, risco de deadlock) — modules/core/api/etapas-pendencia.ts:97-107: `reconsultarEBaixar` trava `core.visita_etapa ... for update` ANTES de `core.visita` (e depois faz `update core.visita` no recálculo), enquanto o checkout (visita-push.ts:177) e a dispensa (etapas-pendencia.ts:248) travam `core.visita` primeiro. Consumidor/alerta concorrendo com a dispensa da mesma visita = deadlock (uma das transações cai; a rota devolve 500). Troque a ordem: primeiro `select cliente_id, usuario_id from core.visita where id = $1 and deleted_at is null for update`, depois as linhas de visita_etapa.
GANCHO PRONTO (ADR 0022, docs/decisoes/0022-tarefas-periodicas-dos-modulos.md): `ModuloApi.tarefas` + `definirTarefa` do `@macuxi/platform-sdk`. Registre em criarModuloApiCore: `tarefas: [definirTarefa({ nome: 'alerta_pendencia_checkout', cadaMin: 60, executar: (ctx) => alertarPendenciasVencidas(ctx) })]`. `ContextoTarefa` tem db/consultar/publicar/parametros/fuso/agora/log/tenantId (cabe no seu `Pick<ContextoConsumo, ...>`); o retorno `ResultadoAlerta` serve como está (só os números vão ao log). Período múltiplo de 15 min (RN-CORE-23). A tarefa roda por tenant na transação do tenant, com trava consultiva; tem de ser idempotente (a sua já é). O agendador só liga quando o banco-dados entregar `plataforma.tenants_ativos()` (pedido feito).
🟢 1 etapas-pendencia.ts:220 o link da notificação é `/m/cliente?id=`; o §2.4 diz que o alerta abre a visita — troque quando houver rota de visita no app (combine com engenheiro-apps).
🟢 2 contracts/sync.ts:275 use `EtapasPendentesSchema.optional()` (mesmo contrato que já existe em contracts/etapas-pendencia.ts) em vez de repetir `z.number().int().min(0)`.
🟢 3 etapas-pendencia.ts:64 o `do update` troca `pendente_desde` sem mexer em `resolvida_em`/`alertada_em`: se uma linha `dispensada`/alertada fosse regravada, o CHECK `visita_etapa_resolvida_coerente` derrubaria o checkout. Hoje é inalcançável (2º checkout vira conflito em visita-push.ts:184); se quiser blindar, `where core.visita_etapa.situacao not in ('concluida', 'dispensada')`.
🟢 4 com a licença da Pesquisa retirada depois da pendência, a reconsulta fica indisponível e o alerta sai mesmo assim; a dispensa manual cobre (só registrar no docs/modulos/core/rotas-e-visitas.md).

## Pronto quando
🟡 1 corrigido, tarefa registrada no criarModuloApiCore, testes e typecheck do Core verdes; resposta com --encerra.
