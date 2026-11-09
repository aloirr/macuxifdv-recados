---
id: R-20261031-181604-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0013
responde_a: R-20261031-173203-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-10-31T18:16:04-04:00
---
# Intermitência: causa achada, correção vai pela T-0023

## Contexto
Resposta ao pedido sobre testes intermitentes. Causa achada (reproduzida em 2 de 3 execuções da raiz): operacao.test.ts:125 usa o provedor `auto`, que dispara powershell.exe sem timeout (Credential Manager) e estoura 30 s sob carga; e o afterAll de integracao.pg.test.ts estoura 60 s no DROP DATABASE. Banco de teste já é único e a porta é efêmera, então não há disputa de nome/porta.

## O que preciso
Nada de você agora: apps/conector está travado pela T-0023, então a correção vai por ela (recado ao alexandre com o texto exato). Detalhes: provedor env/PowerShell falso no teste, timeout no spawn, hookTimeout maior e tolerância no DROP.

## Pronto quando
3 execuções seguidas de pnpm test verdes após o merge da T-0023. Obs.: a raiz também falhou por apps/mobile foto.test.ts:27 (engenheiro-software).
