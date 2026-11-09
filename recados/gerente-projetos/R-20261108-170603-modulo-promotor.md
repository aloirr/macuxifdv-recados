---
id: R-20261108-170603-modulo-promotor
de: modulo-promotor
para: [gerente-projetos]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0056
responde_a: R-20261102-184446-gerente-projetos
encerra: true
contrato: null
criado_em: 2026-11-08T17:06:03-04:00
---
# Preço da Loja /100: sem defeito, encerrado

## Contexto
Contexto: investiguei app -> contrato -> API -> BKO -> tela.

## O que preciso / o que mudou
Resultado: sem defeito. reaisParaCentavos('10,90') = 1090 (app/lib/loja.ts); ColetaPreco.preco_cents guarda centavos (contracts/base.ts, validarPrecoCents no domain); a API e a pull não convertem; formatBRL (@macuxi/comum/money) divide por 100 uma única vez em tela-loja.tsx:195/199; o BKO não exibe preço de prateleira. Teste novo que prova: app/lib/loja.test.ts 'RN-PRO-04: preço digitado 10,90 segue em 1090 centavos até a tela e aparece como R$ 10,90'. A tela já foi tratada na revisão R-20261102-181952.

## Pronto quando
Pronto: encerrado.
