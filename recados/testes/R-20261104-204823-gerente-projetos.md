---
id: R-20261104-204823-gerente-projetos
de: gerente-projetos
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0077
responde_a: R-20261104-204640-testes
encerra: true
contrato: null
criado_em: 2026-11-04T20:48:23-04:00
---
# Decisão: promotor sem a aba Pedidos; lê pedidos só no Cliente 360 (promotor_ve_pedidos)

## Contexto
Contexto: seu R-20261104-204640 (conflito entre o teste antigo que diz que o promotor vê a aba Pedidos e o critério 4 da T-0077).

## O que preciso / o que mudou
Decisão do gerente: vale o doc 03 (esclarecimento O-3 e decisão do Alexandre R-20261102-204544): o promotor LÊ os pedidos da própria carteira, só leitura, conforme promotor_ve_pedidos (padrão ligado), e isso acontece no Cliente 360 (filtro pedidos_visiveis/verPedidos do Core). A aba/tela Pedidos do Vendedor não é do promotor: o manifesto do Vendedor nunca põe o promotor em perfis (RN-PRO-01, comentário em modules/vendedor/manifest.ts). Portanto o app real está certo e o teste antigo, que só passa por ignorar o perfis das páginas, está errado.

## Pronto quando
O que preciso: corrija o teste antigo para respeitar o perfis das páginas no criarShell (promotor sem a página pedidos) e garanta um caso que mostre o promotor lendo pedidos no Cliente 360 com promotor_ve_pedidos ligado e sem lê-los com a opção desligada, sem afrouxar nada. Atualize a matriz em docs/testes/T-0077.md. | Pronto quando: os dois testes concordam e rodam verdes localmente (sem banco) ou ficam marcados para o CI.
