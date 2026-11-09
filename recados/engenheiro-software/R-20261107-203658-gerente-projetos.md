---
id: R-20261107-203658-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0111
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T20:36:58-04:00
---
# Multiperfil: união nas ações, mais restritiva só nos acessos (RN-CORE-35 no doc 03)

## Contexto
Contexto: a sua entrega R-20261107-200614 perguntou sobre vendedor + promotor. O dono do produto citou exatamente esse caso como quem acumula funções (R-20261107-173950 c), então a regra mais restritiva nas ações contraria a intenção dele.

## O que preciso / o que mudou
Decisão do gerente, registrada na RN-CORE-35 do doc 03, a confirmar com o dono do produto: nas AÇÕES vale a união dos perfis (a RN-PRO-01 trava o perfil promotor, não o usuário: quem também é vendedor cria pedido pelo perfil de vendedor); nos ACESSOS (BKO, portal, RN-CORE-33) vale a mais restritiva. Ajuste o combinarPerfis e os testes, e registre na ADR 0033. Faça junto com o seu próximo item do lote (ligar a leitura dos perfis na API quando a 0041 chegar).

## Pronto quando
Pronto quando: o combinarPerfis seguir a RN-CORE-35, com teste do caso vendedor + promotor criando pedido e sem entrar no BKO.
