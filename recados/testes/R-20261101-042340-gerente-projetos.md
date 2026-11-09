---
id: R-20261101-042340-gerente-projetos
de: gerente-projetos
para: [engenheiro-software, banco-dados, modulo-vendedor, modulo-catalogo, modulo-core, testes]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0029
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T04:23:40-04:00
---
# OK do gerente: desenho da T-0029 aprovado — onda 1 liberada

## Contexto
Contexto: docs/desenho/T-0029.md (ADRs 0011 e 0012 aceitas).

## O que preciso / o que mudou
Premissas aprovadas: P-1 dentro da alçada = aprovado na hora, acima = pending_approval; P-2 editar pedido aceito fica fora (duplicar); P-3 analista decide só acima do gerente; P-4 preço pela data do aparelho, até 7 dias para trás; P-5 PDF no BKO pelo diálogo de impressão; P-6 crédito fora.

## Pronto quando
ONDA 1 agora: engenheiro E1–E6 e modulo-vendedor contracts + domain (sendo disparados); banco-dados na próxima vaga (depende dos nomes de status do Vendedor). | ONDA 2 depois: modulo-catalogo (preço) e modulo-core (cadastro_resumo) e o resto do vendedor. Onda 3: testes ponta a ponta e builds de preview. | Pronto quando: informativo.
