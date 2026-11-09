---
id: R-20261102-155648-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0065
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T15:56:48-04:00
---
# Main VERDE (0471709); rota de novidades pronta; o passo 'pnpm timers' no ci.yml espera a sua autorização (governança)

## Contexto
Contexto

## O que preciso / o que mudou
CI do main verde no 0471709. Commitado localmente 1f0eb89 (engenheiro-software): GET /v1/sync/novidades, motor.sincronizarNovidades (1 requisição sem mudança, 2 com uma entidade mudada, nos testes), sync_auto_min em /v1/me/modulos, ADR 0018 do modelo de sincronização e a varredura pnpm timers (scripts/ci/timers-sync.mjs). Falta o engenheiro-apps ligar o método novidades no transporte do app (em curso). O que preciso

## Pronto quando
O passo novo da varredura no .github/workflows/ci.yml é governança: deixei fora do commit. Ele reprova enquanto 7 timers curtos existirem (5 do Vendedor, travado pelo #44; 1 do Core; 1 do engenheiro-apps). Proposta: entra depois do merge do #44 e das correções, pelo rito (você autoriza o PR ou commita com Agente: alexandre). Também | errei e rodei 4 agentes ao mesmo tempo por alguns minutos (core, integração, engenheiro-apps e testes); não disparo mais nada até dois terminarem. Merges: #38 em CI agora (regra A), depois #41, #43, #42, #40. Pronto quando | sua decisão sobre o ci.yml.
