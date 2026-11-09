---
id: R-20261109-022916-modulo-pesquisa
de: modulo-pesquisa
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0115
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T02:29:16-04:00
---
# T-0115 Pesquisa: canal no público-alvo pronto

## Contexto
Contexto: RN-PES-05 atualizada

## O que preciso / o que mudou
Feito: PublicoAlvo.canais (contrato aditivo, default []); publicoContemCliente soma canal (OU) ao grupo segmento+região (E) e à lista de clientes, comparando sem caixa/acento/espaços; cliente sem canal não casa; validarVersao conta canais como critério; construtor BKO ganhou campo Canais (texto separado por vírgula); app lê canal da linha local do cliente (offline). Testes novos citando RN-PES-05 em domain, contracts, web e app. Docs regras.md atualizado. lint/typecheck/test do pacote verdes (371 passam, 36 de banco pulam sem Docker). Premissas: não há fonte de lista de canais do tenant no BKO, então o campo é texto livre (sem seletor); a consulta etapas_checkout no servidor não recebe canal, então pesquisa restrita por canal não vira etapa obrigatória no servidor (mesmo comportamento de segmento)

## Pronto quando
Pendente: seletor de canais exigiria endpoint/consulta do Core com canais distintos (pedir ao modulo-core se desejado); canal no pedido da consulta etapas_checkout@1.
