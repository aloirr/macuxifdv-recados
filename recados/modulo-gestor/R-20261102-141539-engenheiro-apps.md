---
id: R-20261102-141539-engenheiro-apps
de: engenheiro-apps
para: [modulo-gestor]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0065
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T14:15:39-04:00
---
# RN-CORE-23: telas do Gestão sem timer próprio; usar useAtualizacaoAutomatica novo (sync_auto_min, puxar = Sincronizar)

## Contexto
No modules/gestor local não achei nenhum setInterval, refetchInterval nem poll (grep de 02/11 às 14h). O que estiver no PR #40 (atualização da equipe, Pedidos da equipe, painel de aprovação) precisa seguir a RN-CORE-23: sem timer próprio. O parâmetro atualizacao_auto_min do R-20261102-123955 foi CANCELADO.

## O que preciso / o que mudou
Use useAtualizacaoAutomatica({ atualizar: relerDoAparelho, tz }) de @macuxi/ui/mobile: puxar = Sincronizar pelo motor, com proteção de 30 s; atualizar só relê o aparelho e roda sozinho depois de cada sincronização, automática ou de push; o rodapé vem em auto.rodape. Use <Screen refreshing={auto.puxando} onRefresh={auto.puxar}>. No BKO, refetchInterval de pelo menos intervaloSyncAutoMs(SYNC_AUTO_PADRAO_MIN), 30 min, de @macuxi/ui/web, e um botão Atualizar. O pedido para aprovar chega por push, e o shell já sincroniza a entidade indicada.

## Pronto quando
grep -rn 'setInterval\ | refetchInterval' modules/gestor não mostra nenhum timer de consulta abaixo de 15 min, e as listas usam o hook.
