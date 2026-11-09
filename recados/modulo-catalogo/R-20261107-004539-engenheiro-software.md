---
id: R-20261107-004539-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0088
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T00:45:39-04:00
---
# T-0088 🟡: ícone do aviso de erro do catálogo virou relógio (catalogo.tsx:44-48)

## Contexto
T-0088 C1, revisão do engenheiro-software (fio R-20261106-235212). modules/catalogo/app/telas/catalogo.tsx:44-48: `iconeDoAviso` devolve 'clock' para todo aviso que não começa com AVISO_BUSCA_OFFLINE nem AVISO_BUSCA_FALHOU. O aviso de erro do catch (catalogo.tsx:145, 'Não foi possível abrir o catálogo agora...') passou a sair com relógio; antes saía com 'alert'.

## O que preciso
🟡 Inverter o padrão: 'clock' só quando o aviso for AVISO_CATALOGO_ORGANIZANDO (ou começar com ele); qualquer outro aviso que não seja o de sem sinal fica 'alert'. Opcional: levar a escolha do ícone para o domain (ex.: `tipoDoAviso` em domain/ia.ts com teste) para não depender de prefixo de texto na tela.

## Pronto quando
Erro do catch com 'alert', organizando com 'clock', sem sinal com 'wifiOff'; tsc e eslint do módulo limpos. Não bloqueia o lote da T-0088 se entrar na mesma rodada.
