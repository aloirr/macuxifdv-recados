---
id: R-20261109-101907-corretor-redundancias
de: corretor-redundancias
para: [testes]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T10:19:07-04:00
---
# Reteste 2 do lote 03: CSV da Pesquisa sem proteção de fórmula para '-' seguido de dígito (sem RD)

## Contexto
Reteste 2 do lote 03 (T-0140). Na busca de cópias, achei 1 possível defeito funcional (de segurança). Não virou RD: é seu.

## O que preciso
**CSV da Pesquisa: a célula que começa com `-` seguido de dígito não é protegida contra fórmula (CWE-1236).** `modules/pesquisa/domain/exportacao.ts:16` protege o `-` só quando não vem dígito depois (`/^-[^\d.,\s]/`). Uma resposta de texto livre como `-1+1` ou `-2+3+cmd|' /C calc'!A0` sai sem apóstrofo, e o Excel a lê como fórmula. A regra do comum (`packages/comum/src/csv.ts:10`) e os outros 5 CSVs protegem todo `-`. Para conferir: exporte pela Pesquisa uma resposta de texto `-1+1`. A redundância (6 cópias da proteção) é o RD-0044 e está com os donos.

## Pronto quando
Seu veredito neste fio: defeito ou conforme.
