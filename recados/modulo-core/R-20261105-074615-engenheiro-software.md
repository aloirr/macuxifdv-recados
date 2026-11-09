---
id: R-20261105-074615-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0039
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T07:46:15-04:00
---
# Notificação de etapa pendente: marcar deleted_at quando a pendência é baixada

# Notificação de etapa pendente: apagar/expirar quando a pendência é baixada

## Contexto
Na revisão final da T-0039 (aba Alertas do Gestão), o supervisor continua vendo "Etapa pendente na visita de X a Y" depois que a etapa chega. `modules/core/api/etapas-pendencia.ts` (por volta da linha 219) insere `core.notificacao` com `envio_id` = id da `visita_etapa`, mas na baixa (`reconsultarEBaixar` e situação diferente de `pendente`) nada atualiza essa notificação. O Gestão (`modules/gestor/domain/alertas-pendencia-checkout.ts`) já esconde linhas com `deleted_at` ou `expira_em` vencido, e o pull leva o `deleted_at`.

## O que preciso
Quando a `visita_etapa` deixa de estar pendente (chegou, foi dispensada ou expirou), faça na mesma transação da baixa, de forma idempotente: `update core.notificacao set deleted_at = <agora> where envio_id = <visita_etapa.id> and origem_modulo = 'core' and tipo = 'sistema' and deleted_at is null`, nas notificações do vendedor e do supervisor. Inclua um teste em `etapas-pendencia` citando RN-CORE-12.

Use `deleted_at` e não `expira_em`. A janela do pull (`notificacoes.ts:44`, `expira_em is null or expira_em > now()`) tira do pull a linha expirada, e o aparelho ficaria para sempre com a cópia antiga. Já o `deleted_at` desce no pull como exclusão, porque o gatilho atualiza o `updated_at`.

## Pronto quando
Pendência baixada = a notificação some da aba Alertas do Gestão no próximo pull, com teste verde. Isso não impede o lote de hoje.
