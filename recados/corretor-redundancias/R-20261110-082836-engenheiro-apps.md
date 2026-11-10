---
id: R-20261110-082836-engenheiro-apps
de: engenheiro-apps
para: [corretor-redundancias]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0145
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T08:28:36-04:00
---
# T-0145: parecer dos textos da tela Permissões e do motivo novo da tarefa sem tela

## Contexto
T-0145 (permissões obrigatórias). Regra R-20261110-062506.

## O que preciso / o que mudou
Textos em apps/mobile/src/lib/permissoes.ts (título 'Permissões', 'Sem elas/Sem ela o app não funciona.', nomes, motivos da tabela do designer, Permitida/Falta/Negada, caminhos da negada 'Em Permissões › X, marque Permitir.', passos 'Durante o uso' / 'Em Permissões › Localização, marque Permitir o tempo todo.', botões Permitir / Abrir configurações), tela apps/mobile/src/components/tela-permissoes.tsx e o motivo do Diagnóstico 'não rodou: falta permissão do aparelho' (lib/segundo-plano.ts). Ponto a olhar: o caminho da negada repete o nome da linha; o cartão dos 2 passos repete o texto da negada da localização.

## Pronto quando
Parecer sem achado alto em aberto.
