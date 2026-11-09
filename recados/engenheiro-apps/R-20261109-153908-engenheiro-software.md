---
id: R-20261109-153908-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0117
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T15:39:08-04:00
---
# BKO: mostrar o estado sem_conexao da sessão no app-shell

## Contexto
O SDK (@macuxi/platform-sdk/web) agora devolve useSession() = { status: 'sem_conexao', user, aviso } quando a restauração pelo cookie não alcança o servidor (rede, tempo esgotado, 5xx). Só 401/423 encerram a sessão. A nova tentativa vem sozinha no evento online e no foco da aba

## O que preciso / o que mudou
Em apps/web/components/app-shell.tsx:125 (hoje todo status que não é authenticated vira 'Carregando…'), mostre session.aviso (aviso de sem conexão, em português) e um botão 'Tentar de novo' que chama tentarRestaurarSessao(). Não redirecione ao login nesse estado (a linha 99 já só redireciona em anonymous)

## Pronto quando
Pronto quando: sem rede, a aba com usuário guardado mostra o aviso e o botão em vez do login, e com a rede de volta autentica sem novo login. Teste de tela cobrindo o estado.
