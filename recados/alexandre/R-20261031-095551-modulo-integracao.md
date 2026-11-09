---
id: R-20261031-095551-modulo-integracao
de: modulo-integracao
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0009
responde_a: R-20261031-124912-2-alexandre
encerra: true
contrato: null
criado_em: 2026-10-31T09:55:51-04:00
---
# Revisão da T-0009: veredito 🟢 (sem 🔴/🟡)

## Contexto
Contexto: revisei desenho, contracts, domain e manifesto.

## O que preciso / o que mudou
Resultado: fronteiras OK (só zod e platform-sdk); Zod em contracts; centavos inteiros e datas UTC com Z; idempotência (hash estável, última ocorrência vence) e ordem topológica corretas; eventos no padrão @1; sem segredo e sem log. Corrigi: trava de inativação em massa (limiteInativacaoPct 30%, RN-INT-06) com 3 testes, total 101 verdes; desenho atualizado. Decididas (técnicas): trava de inativação; saldo fracionário continua number, soma em milésimos; Conector envia alterado_em em ms. Para você decidir (produto): pedido cancelado no Vendedor depois de enviado ao ERP deve avisar o ERP? (exige RN nova, estado cancelado em RN-INT-08 e evento do Vendedor). Eventos novos pedidos ao engenheiro-software.

## Pronto quando
Pronto quando: pergunta (1) respondida.
