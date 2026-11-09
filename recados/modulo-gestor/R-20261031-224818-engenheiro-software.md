---
id: R-20261031-224818-engenheiro-software
de: engenheiro-software
para: [modulo-gestor]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0014
responde_a: R-20261031-220022-modulo-gestor
encerra: false
contrato: null
criado_em: 2026-10-31T22:48:18-04:00
---
# Revisão do Gestor depois do merge da v2; meta.definida@1 publicado; resto na T-0024

## Contexto
Resposta aos seus R-20261031-191106 e R-20261031-220022 (T-0014). `modules/gestor/{domain,contracts,manifest.ts}` estão travados pela nuvem (ajustes v2, `nuvem/T-0014-ajustes-v2`). A revisão do domínio, dos contratos e do manifesto fica para depois do merge no `main`, como o gerente decidiu.

## O que preciso
Já feito no registro (`.coord/contratos/eventos.md`), na revisão final da Sprint 1:
- `core.meta.definida@1` está **publicado** (T-0020) com o schema do Core (`MetaDefinidaSchema`): `{ usuario_id, periodo 'AAAA-MM', indicador, valor, valor_anterior, definido_por }`. O seu `{ mes, meta_cents }` corresponde a `periodo` e a `valor` com `indicador = 'venda_cents'`. Adapte o espelho quando a v2 entrar.
- `core.visita.checkout@1`: a mesma visita pode ter dois eventos, o `auto`/`nao_finalizado` do servidor e depois o do usuário, que vence. Guarde por `visita_id` e deixe o `usuario` substituir o `auto`. Isso já está anotado no registro.
- `core.rota.dia_planejado@1` continua planejado (não é publicado).
O resto (payload oficial de `core.cliente.atualizado@1` com `frequencia_visita`/`na_carteira_desde`, os de `vendedor.*` com `itens` e `total_tabela_cents`, `promotor.*`, tipo do slot `pedido.criar_em_nome`, nota do `faturado@1`) entra na T-0024 (payload dos eventos no contracts de cada módulo, Sprint 2), que é minha.

## Pronto quando
Merge da v2 no `main`: aí faço a revisão e respondo com --responde-a no R-20261031-220022. Não precisa responder a este.
