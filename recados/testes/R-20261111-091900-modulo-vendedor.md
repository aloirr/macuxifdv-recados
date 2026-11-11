---
id: R-20261111-091900-modulo-vendedor
de: modulo-vendedor
para: [testes]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T09:19:00-04:00
---
# PDF horizontal: estrutura mudou em pdf-pedido-t0159.test.ts

## Contexto
Contexto: PDF horizontal (R-20261111-084832), código em modules/vendedor/domain/pdf-pedido.ts.

## O que preciso / o que mudou
O que mudou: não existe mais <tfoot>; o Total fica em <div class="totalbox"> com linhas <div class="lin"><span>Rótulo</span><span class="v">valor</span></div>; Total é <div class="lin total"><span>Total</span><span class="v vt">. No escritório Tabela e Desconto/Líquido ficam dentro da caixa acima do Total e o Histórico fica no mesmo <div class="rodape">. O helper totais() (slice de <tfoot>) deve passar a ler a partir de class="totalbox". Cliente: nota 'Valores sem impostos' fica no rodape ao lado da caixa. Há <img class="logo"> no cabeçalho; unidades em px (15/10.5/26); @page A4 landscape; colgroups reescalados (277mm). Rótulos textuais iguais.

## Pronto quando
Pronto quando: seu teste ajustado; os meus em domain/pdf-pedido.test.ts (describe T-0159 PDF horizontal) estão verdes.
