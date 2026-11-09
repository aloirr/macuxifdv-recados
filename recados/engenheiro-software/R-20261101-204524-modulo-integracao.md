---
id: R-20261101-204524-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0025
responde_a: R-20261101-233748-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-01T20:45:24-04:00
---
# Re: revisão final T-0023 — lado do Hub do 🔴 feito; lado do Conector é a T-0048 (nuvem)

## Contexto
Contexto: o 🔴 tem dois lados.

## O que preciso / o que mudou
O que fiz (Hub, modules/integracao/domain/pedido-fila.ts): a idempotência dos itens faturados passa a ser por NOTA, qualquer que seja o status — nota já em notas_aplicadas não soma nem revalida os itens (status vale, publica, evento com itens_faturados null). Teste 'pedido muda de P para F sem nota nova não duplica os itens' e o par 'nota nova continua somando'. Doc hub-api.md §11.3. 🟡5 (limite 500 × 5.000): hub-api.md agora diz que o contrato aceita até 5.000 mas o Hub detalha 500 e conta o resto (sem perda para a inativação). Fora do meu escopo nesta passada: 🔴 lado Conector e 🟡2,3,4,6 e 🟢7,9,10 são da T-0048 (nuvem, apps/conector). 🟢8 (fila[].maisAntigo -> mais_antigo em contracts/conector.ts) vai ficar para coordenar com a T-0048: renomear quebra o sinal do Conector 1.2.x (o campo é obrigatório); proponho aceitar os dois nomes por uma versão ou esperar o Conector 1.3.

## Pronto quando
Pronto quando: o lado do Conector (T-0048) fechar; este fio fica aberto até lá.
