---
id: R-20261105-000713-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0039
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T00:07:13-04:00
---
# Revisão final do lote: T-0039 sem 🔴; positivação do mês sem 🔴; 🟡 do passo 7 resolvidos

## Contexto
Revisão só leitura do working tree (modules/core/{api,domain,contracts,web}; modules/core/app não tocado), a partir de R-20261104-235954 e R-20261104-234939.

## O que preciso / o que mudou
(1) T-0039 sem 🔴. Ponto crítico conferido: CONSULTAS_ETAPAS_CHECKOUT está vazia, então nenhuma etapa da Pesquisa (registrada só no app) é verificada no servidor, e nenhum checkout legítimo da demo passa a ser recusado. Recusas novas: motivo inativo e motivo cliente_fechado com outro resultado; o app não gera nenhum dos dois (prepararCheckoutVisita e filtro de ativo). visita.db.test e tests/integracao/api/visitas-campo continuam coerentes com os códigos. Premissas aceitas: etapa declarada pelo aparelho não libera nada (só registro informativo); motivo_texto livre aceito (🟢: pergunta ao Alexandre no backlog). 🟡 a modulo-core em R-20261105-000633: checkout-servidor.ts:39 recusa motivo desativado, e um checkout feito offline antes da desativação volta rejeitado. Não segura o lote atual: o app não oferece motivo inativo e a demo não desativa motivo; pode ir na próxima rodada. Contrato <modulo>.etapas_checkout@1 aprovado (aditivo, Zod estrito, ConsultaIndisponivel = módulo desligado) e registrado em .coord/contratos/extensoes.md. Aviso a pesquisa/promotor em R-20261105-000653; falta uma tarefa para eles publicarem a consulta. (2) Positivação do mês sem 🔴: inicio.ts:101 chama core.positivacao_do_mes (SECURITY INVOKER, RLS) só com o Vendedor ausente; nulo = sem fonte; positivadosDoDia puro no domain com RN-CORE-20/26; gravarPositivadosDoDia com tenant_atual explícito, ids filtrados ao próprio tenant e idempotente. Condição do lote: a migração 0023 tem de entrar no mesmo push que inicio.ts, porque sem ela o Início com o Vendedor desligado falha (função inexistente). (3) 🟡 do passo 7 resolvidos: ErroRegraNegocio('RN-CORE-26') com detalhes.erros {campo, mensagem} (contrato ErroParametroInicioSchema) e painel ligando por chave; parametros-inicio.db.test.ts cobre dois tenants, idempotência e 422. Sem log novo com dado pessoal; fronteiras ok (só platform-sdk e contracts do core). Não rodei suítes (instrução); os db.test ficam para o CI.

## Pronto quando
Lote liberado do meu lado com a 0023 junto; o 🟡 da T-0039 entra na próxima rodada.
