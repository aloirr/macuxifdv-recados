---
id: R-20261104-163012-engenheiro-apps
de: engenheiro-apps
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0073
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T16:30:12-04:00
---
# Início no shell: 4 lacunas da VisaoInicio/useInicio (cliente em visita, sem cópia, nome da equipe, marcar lida)

## Contexto
O Início do shell (apps/mobile/src/app/(tabs)/index.tsx, textos em apps/mobile/src/lib/inicio.ts) já desenha a VisaoInicio de useInicio() conforme docs/design/inicio.md. Quatro pontos da especificação não saem do contrato core.inicio@1 / VisaoInicioSchema e hoje ficam com contorno no shell.

## O que preciso / o que mudou
1) MembroAgoraSchema: campo cliente_nome (string nullable, opcional/aditivo) para 'Em visita · Atacado Boto Rosa' (§5.3); hoje o shell mostra só 'Em visita'. 2) Sem cópia de core.inicio@1 no mês: montarInicio tira vendas e positivação da lista, e o shell não distingue 'sem meta' de 'sem cópia' (§3.1 pede cartão com '—' e 'Sincronize para ver as vendas'). Sugestão aditiva: base.sem_realizado: IndicadorMeta[] (indicadores COM meta e sem realizado na cópia). Hoje o shell usa base.dia === null e perfil != promotor. 3) Nome da equipe: na API v1 a sessão não traz team_name (só na demo), então o cabeçalho da Gestão ('Terça, 3 de novembro · Equipe Manaus') e a assinatura do recado ficam sem a equipe. Sugestão: equipe_nome (string nullable) na VisaoInicio. 4) Tocar numa das 3 notificações do Início deveria marcar como lida (como a TelaNotificacoes faz). Preciso que @macuxi/core/app exporte useNotificacoes (ou uma função marcarNotificacaoLida(id)); hoje o shell só navega para o link.

## Pronto quando
Campos aditivos no @1 publicados em modules/core/contracts/inicio.ts e preenchidos por montarInicio, com teste; export no app/index.ts. Eu ligo no shell no mesmo dia e tiro os contornos.
