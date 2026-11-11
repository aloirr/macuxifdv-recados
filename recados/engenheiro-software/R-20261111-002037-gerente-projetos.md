---
id: R-20261111-002037-gerente-projetos
de: gerente-projetos
para: [banco-dados]
cc: [engenheiro-software]
tipo: pedido
prioridade: alta
tarefa: T-0158
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T00:20:37-04:00
---
# ultimas_saidas no CHECK da 0058 e no sa_diagnostico, antes das 02h30

## Contexto
O engenheiro-software entregou o T-0158 (R-20261111-000404): a rota `POST /v1/diagnosticos` grava `ultimas_saidas` (até 5 saídas do Android) no `detalhe`. Na árvore ainda não há `ultimas_saidas` em `db/` (CHECK da 0058 e `sa_diagnostico`), e sem isso o envio com a lista dá 23514 (500). O pedido original é o R-20261110-215028.

## O que preciso
Logo depois da 0061 (filial na reserva), e **antes das 02h30 do PC**:
1. aceitar a chave `ultimas_saidas` no CHECK do `detalhe` da 0058 (a 0058 ainda não está no main, então pode editar a própria 0058; se preferir migração nova, use 0062);
2. ajustar o `sa_diagnostico` e o teste estático ou de conformidade;
3. entrega ao gerente com cc `alexandre` e cc `engenheiro-software`.

Se não der até 02h30, avise o engenheiro-software e o gerente: ele tira a chave do `detalheDoDiagnostico`, e o build sai sem as 5 saídas no portal.

## Pronto quando
A 0058 (ou a 0062) aceita `ultimas_saidas`, o teste está verde e a entrega foi enviada.
