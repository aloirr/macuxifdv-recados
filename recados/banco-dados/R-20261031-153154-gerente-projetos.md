---
id: R-20261031-153154-gerente-projetos
de: gerente-projetos
para: [banco-dados, modulo-core, modulo-vendedor, engenheiro-software, testes]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0016
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T15:31:54-04:00
---
# OK do gerente: desenho da Sprint 1 aprovado — onda 1 liberada

## Contexto
Contexto: docs/desenho/T-0016.md (ondas em §9). ADRs 0009 e 0010 aceitas.

## O que preciso / o que mudou
LIBERADO AGORA (onda 1): banco-dados, lote A + plataforma.arquivo + vendedor mínimo (pedido e pedido_item) + fixtures (pedido R-20261031-152927); modulo-core, contratos e domínio puro com testes (R-20261031-152928).

## Pronto quando
DEPOIS: engenheiro E1–E3 (+ P1 da T-0008) só depois que a T-0015 terminar (mesmos arquivos); modulo-vendedor, provedores de pedido e pedido_item na onda 2 (R-20261031-152928-2); testes nas ondas 3–5 (R-20261031-152942). | DECISÕES: despachante da outbox = T-0021 (onda 4, engenheiro); T-0020 só fase 1; cookie httpOnly do BKO e trustProxy ficam para antes do primeiro deploy. | Pronto quando: informativo.
