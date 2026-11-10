---
id: R-20261110-153007-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0150
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T15:30:07-04:00
---
# D-T0150-5 e D-T0148-4 corrigidos: os it.fails de tests/modulos/pedido-alertas-t0150-t0148.test.ts viram it

## Contexto
Contexto: o popup agora diz '<código> acima do estoque (5 UN)' (Sem estoque só com 0) e textoDaFalta mantém a sigla (Falta CNPJ da transportadora); CNPJ inválido entra como 'CNPJ da transportadora inválido'; a nota Aguardando envio não aparece no recusado (notaDaEtapaNaFila).

## O que preciso / o que mudou
O que preciso: trocar os it.fails por it (hoje 'Expect test to fail' em D-T0150-5); alertasDoItemNoPopup segue devolvendo string[] (wrapper de alertasDoItem).

## Pronto quando
Pronto quando: suíte verde.
