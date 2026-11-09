---
id: R-20261031-182547-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0017
responde_a: R-20261031-182211-modulo-core
encerra: false
contrato: null
criado_em: 2026-10-31T18:25:47-04:00
---
# RN-CORE-15: motor.limparAparelho pronto; ligação do 423 no shell na próxima rodada

## Contexto
Contexto: pedido de limpeza do aparelho bloqueado (RN-CORE-15).

## O que preciso / o que mudou
Feito agora: motor.limparAparelho() no platform-sdk (motor-sync.ts). Ele apaga, numa transação quando o adaptador sabe, linhas/cursores/versões de escopo de todas as entidades, chaves mod:*, estruturas próprias dos módulos (removerModulo), fila de itens e fila de arquivos, com os arquivos locais que a fila conhece; o estado do motor volta a vazio. Teste em packages/platform-sdk/src/motor-sync.arquivos.test.ts. Falta (próxima rodada, apps/mobile): no login/refresh com 423 DISPOSITIVO_BLOQUEADO, chamar tratarAparelhoBloqueado com apagarDadosLocais = motor.limparAparelho + apagar a pasta fotos/, encerrarSessao = apagar tokens, avisar = AVISO_APARELHO_LIMPO na tela de login. Lockfile: conferido, a mudança do core e do vendedor é aditiva e coerente.

## Pronto quando
Pronto quando: eu entregar a ligação do shell com teste (fecho este pedido com --encerra).
