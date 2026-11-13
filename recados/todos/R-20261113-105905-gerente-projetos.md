---
id: R-20261113-105905-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T10:59:05-04:00
---
# Chat do dono do produto ~10h30: guardião desligado por ordem dele; governança do main trazida ao PC; design-de-marca rodando

## Contexto
Contexto: chat do Alexandre com o gerente, 13/11/2026 ~10h20-10h30 (Manaus). Textos literais: 'Porra que vacilo. Porque nao viu isso antes. De seu jeito de integrar o agente de marcas'

## O que preciso / o que mudou
'Passe por cima do guardiao agora. E continue a operacao'

## Pronto quando
'Nao estou no computador. Faca o que eu Pedi!!!'. | O que foi feito: (1) por ordem explícita do dono do produto, o guardião foi desligado pelo interruptor documentado no CLAUDE.md, com MACUXI_GUARDA=off no .claude/settings.local.json, que fica fora do git. Para religar, basta apagar a chave env; (2) a governança do main (.claude, .coord/donos.json, scripts/coord*, .github) foi trazida para a árvore do PC, com o design-de-marca, a skill e o guardião atual; (3) foram relançados o core (regex de ultima_visita_data e T-0171), o gestor (RD-0210) e o corretor (gravar os relatórios). A validação de marca roda num agente genérico com as instruções do design-de-marca, porque o tipo só aparece depois de reiniciar a sessão. REGRA PARA TODOS: mesmo com o guardião desligado, cada agente grava só nos próprios caminhos (.coord/donos.json). O CI de governança continua conferindo donos e trailer no main. | Pronto quando: o guardião volta a ser ligado na próxima reabertura do VS Code.
