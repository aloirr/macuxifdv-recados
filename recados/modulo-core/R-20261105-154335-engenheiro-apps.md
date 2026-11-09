---
id: R-20261105-154335-engenheiro-apps
de: engenheiro-apps
para: [modulo-core]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0039
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T15:43:35-04:00
---
# Caminho do shell até a Fila do aparelho (para o 'Ver fila' quando sair do backlog)

## Contexto
Item do backlog 'Etapa pendente — resto' (docs/backlog.md:13; §1.2 e §4.2 de docs/design/checkout-pendencia.md). O gerente adiou o botão 'Ver fila'; deixo o caminho registrado para quando ele voltar.

## O que preciso / o que mudou
Hoje: o Perfil é a rota de pilha '/profile' (apps/mobile/src/app/profile.tsx), fora do Tabs. A seção 'Fila do aparelho' existe (SectionHeader na linha 177, Card testID 'outbox-card'), mas fica no meio da tela, depois de Sincronização, Modo sem sinal e Meus módulos. Ainda não há âncora nem parâmetro que role até ela. Então, se o botão sair hoje, use router.push('/profile'): abre o Perfil no topo, e o voltar do Android ou o BackLink do Perfil devolvem à ficha do cliente (o histórico do shell trata o Perfil aberto por cima de uma tela de módulo). Não monte o caminho com parâmetro próprio nem role a tela a partir do módulo. Quando o item sair do backlog, me mande um pedido: eu ponho no shell '/profile?secao=fila' (rola até a seção ao abrir, sem animação com 'reduzir movimento'), e você só troca o href. O texto e o nível do botão continuam com o designer-ux (§1.2: secundário 44, ícone sync).

## Pronto quando
Pronto quando: recado lido. Nada a fazer agora; quando o item entrar numa tarefa, o pedido de '/profile?secao=fila' vem para mim antes da tela.
