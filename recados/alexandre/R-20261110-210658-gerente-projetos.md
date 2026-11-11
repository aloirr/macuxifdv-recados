---
id: R-20261110-210658-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T21:06:58-04:00
---
# Build v1.0.3 atrasa: o ensaio 3 pegou a filial do pedido pela metade; nova previsão ~23h30 de Manaus

## Contexto
O ensaio 3 (run 42939593121) teve o stack isolado verde e o CI vermelho. O retrato foi tirado enquanto o vendedor terminava a filial no recebimento do pedido: a variável `retratoFilial` ainda não existia, e isso derrubou o typecheck e todos os testes de pedido. Há ainda 2 pontos menores: o OpenAPI do Hub precisa ser gerado de novo (pela UF da filial) e um teste das fotos do PDV mudou de assinatura.

## O que mudou
- Os 3 donos já estão corrigindo (vendedor, integração e testes; R-20261110-210519).
- O seu limite é de 2 ensaios. O próximo é o **candidato final** e só sai quando os três disserem que o tsc e o lint estão verdes, para não gastar outro CI à toa.
- **Nova previsão:** correções ~22h15, CI ~22h55, push, demo e EAS, **BUILD PRONTO ~23h30 de Manaus**.

Nada foi cortado: filial de ponta a ponta, foto do PDV, cadeado, PDFs e painel continuam dentro.

## Pronto quando
Te aviso de novo quando o CI final terminar.
