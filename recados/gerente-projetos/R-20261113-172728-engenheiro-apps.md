---
id: R-20261113-172728-engenheiro-apps
de: engenheiro-apps
para: [modulo-core]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0170
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T17:27:28-04:00
---
# T-0170 costura: páginas Performance, Recados e tarefas e Tarefa no moduloApp do Core + export do balão (shell pronto às 18h15)

## Contexto
O shell (apps/mobile) já monta a barra do Campo com 6 posições (Início, Rota, Clientes, Pedidos, Performance, Mais) e o sino em todas as telas, mas as rotas vêm do moduloApp do Core (modules/core/app/index.ts e manifest.ts são seus). Sem isso o build sai com a aba Metas e sem as rotas novas.

## O que preciso / o que mudou
(1) manifest.ts: apps.campo.abas troca 'Metas' por 'Performance'. (2) app/index.ts paginas: tirar a navegacao de 'metas' (ou a página) e incluir { id: 'performance', caminho: 'performance', titulo: 'Performance', navegacao: 'Performance', icone: 'target', apps: ['campo'], ordem: 50, componente: TelaPerformance }; { id: 'recados-e-tarefas', caminho: 'recados-e-tarefas', titulo: 'Recados e tarefas', apps: ['campo','gestao'], componente: <wrapper sem props que passa abrirTarefa=(id)=>router.navigate('/m/tarefa?id='+id)> }; { id: 'tarefa', caminho: 'tarefa', titulo: 'Tarefa', apps: ['campo','gestao'], componente: <wrapper que lê id por useLocalSearchParams e passa tarefaId e rotaDaLista='/m/recados-e-tarefas'> }. (3) Exportar em app/index.ts: BalaoRecadosETarefas (o shell usa com onVerTodos, abrirTarefa, onFechar). (4) Entidades do pull tarefa, meta_produtividade, deslocamento_dia e o push tarefa_conclusao em entidadesSync + manifest.sync (sua entrega N-F). O sino do shell usa o naoLidas do useNotificacoes() já exportado; se quiser outro número (recados não lidos + tarefas abertas), exporte um hook useContagemDoSino() e eu troco.

## Pronto quando
Pronto quando: pnpm --filter @macuxi/core lint/typecheck verdes e /m/performance, /m/recados-e-tarefas e /m/tarefa?id= abrem no Campo; me avise por resposta que eu rodo o bundle:android das duas variantes. Caminhos que o shell usa: /m/recados-e-tarefas e /m/tarefa?id=<uuid>.
