---
id: R-20261104-232204-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0073
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T23:22:04-04:00
---
# Revisão final do passo 7 (parâmetros do Início): sem 🔴, dois 🟡 e dois 🟢

## Contexto
Revisei por leitura e git diff (sem rodar suítes): domain/inicio-parametros.ts (+teste), contracts/inicio-parametros.ts, api/parametros-inicio.ts (+teste), montagem em api/index.ts, web/components/metas/inicio-parametros-panel.tsx e metas-page.tsx, e o 🟢 de api/promotor-pedidos.ts:47 (filtro tenant_id explícito, ok). Conferido e ok: ação parametro.inicio só analista e admin (manifest.ts:41, teste), licença do módulo pelo SDK (teste com modulos vazio), RLS mais tenant_id = plataforma.tenant_atual() explícito no select e no upsert, upsert com o índice parcial parametro_uk e 'is distinct from' (updated_at só muda quando muda, o pull recebe), auditoria antes/depois só quando o efetivo muda (RN-AUD-01), contrato aditivo (arquivo novo e export), fronteiras ok, mensagens em português com a ação seguinte.

## O que preciso / o que mudou
🟡1 modules/core/api/parametros-inicio.ts:47: erro de negócio usa erroHttp(422, 'PARAMETROS_INICIO_INVALIDOS', ...). O padrão é 422 com codigo RN, como metas.ts:186: troque por new ErroRegraNegocio('RN-CORE-26', mensagem, { erros }) do @macuxi/platform-sdk e ajuste o teste parametros-inicio.test.ts:90. 🟡2 a ligação erro→campo por palavra-chave (inicio-parametros-panel.tsx:29-38, regex /dia útil/, /frase padrão/, /parado/) é 🟡: prende a tela à redação da frase do domain e, se a frase mudar, o erro vai calado para o aviso do topo, sem teste que pegue isso. Concordo com a sua sugestão: validarParametrosInicio devolve erros: Array<{ campo: 'dias_uteis_semana'

## Pronto quando
'recado_do_dia_padrao' | 'parado_min'; mensagem: string }> (tipo em contracts/inicio-parametros.ts), o 422 leva esse formato em detalhes.erros e o painel mapeia por campo; o que vier sem campo vai para o aviso. A rota ainda não está no main e não tem consumidor, então pode mudar já, sem versão. O teste do domain afirma o campo de cada erro. 🟢1 modules/core/app/lib/inicio-local.ts:46-49 e :122: o app aceita parado_min > 0 (sem a faixa de 15 a 480) e o recado sem trim nem limite de 140. Use parametrosInicioDasLinhas(l.parametros) para que app e API leiam igual. 🟢2 não existe modules/core/api/parametros-inicio.db.test.ts: crie um espelhando o promotor-pedidos.db.test.ts (dois tenants isolados pela RLS, PUT repetido sem auditoria nova e sem mudar o updated_at, linha removida cai no padrão). | Pronto quando: os 🟡1 e 🟡2 estiverem corrigidos com testes verdes e você me avisar por resposta a este recado. Nenhum dos dois segura o lote do passo 7; os 🟢 ficam a seu critério.
