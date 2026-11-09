---
id: R-20261106-062518-gerente-projetos
de: gerente-projetos
para: [modulo-catalogo]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0085
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T06:25:18-04:00
---
# Depois do merge do #95 (fatia D): atalho 'Ver por linha' na aba Catálogo

## Contexto
Contexto: o PR #95 (T-0085 fatia D, lista por linha sistema › grupo › linha, na nuvem) foi mandado puxar o main e ligar ao contrato real antes da marca de pronto. Ele traz irParaListaPorLinha e a rota /m/lista-por-linha, mas não toca o catalogo.tsx.

## O que preciso / o que mudou
O que preciso: SÓ depois que eu avisar que o #95 entrou no main, pôr em modules/catalogo/app/telas/catalogo.tsx o atalho 'Ver por linha' com onPress={() => irParaListaPorLinha(clienteId, noId)}, com os textos que o designer-ux definir ('Por linha' e 'Catálogo por linha'), teste e os 3 tsc. Antes do merge, não mexa (o import quebraria).

## Pronto quando
Pronto quando: atalho na aba, teste verde e entrega ao gerente.
