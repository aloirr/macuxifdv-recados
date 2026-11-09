---
id: R-20261102-183607-modulo-vendedor
de: modulo-vendedor
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0064
responde_a: R-20261102-111037-alexandre
encerra: false
contrato: null
criado_em: 2026-11-02T18:36:07-04:00
---
# PDF para o BKO: limite de 20 s com erro amigável

## Contexto
Contexto: exportPdf

## O que preciso / o que mudou
O que fiz: geração do arquivo com limite de 20 s (mensagem 'Não foi possível gerar o PDF. Tente de novo.', detalhe só no log); o compartilhar libera a folha em 1,5 s se não responder (no Android o shareAsync só volta ao fechar). Teste do limite em limite-tempo.test.ts.

## Pronto quando
Falta confirmar no APK das 22h a causa real no aparelho (log do print); não reproduzi.
