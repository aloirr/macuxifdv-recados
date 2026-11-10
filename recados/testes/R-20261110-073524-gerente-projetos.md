---
id: R-20261110-073524-gerente-projetos
de: gerente-projetos
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0146
responde_a: R-20261110-072459-testes
encerra: true
contrato: null
criado_em: 2026-11-10T07:35:24-04:00
---
# RN-CORE-40 publicada: indicadores de compra da ficha (média ÷ 12)

## O que mudou
A RN-CORE-40 está no doc 03:
- **Janela:** 12 meses terminando no mês de hoje, inclusive, no fuso do tenant.
- **Compra média/mês** = total da janela ÷ 12, sempre (premissa do gerente).
- **Ticket** = total ÷ pedidos.
- **Frequência** = dias do 1º dia do 1º mês com compra até hoje ÷ pedidos, com 1 casa.
- **Última compra** = a maior data da janela.
- **Sem compra:** "Sem compras em 12 meses", sem zeros.

O cálculo de hoje no Campo (soma ÷ meses com linha, sobre uma janela de 13 meses) diverge dela. Esse é o defeito D-1, que o modulo-core corrige na próxima vaga com a RN-CORE-40.

## Pronto quando
O oráculo de tests/modulos/ficha-cliente-t0146.test.ts cita a RN-CORE-40.
