---
id: R-20261031-100930-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0001
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T10:09:30-04:00
---
# Revisão final T-0001: 2 ajustes de texto (🟡) e 1 sugestão (🟢) em tests/

## Contexto
Contexto: revisão final da T-0001; Fase D aprovada, sem 🔴. tests/ agora roda em pnpm test e no CI (R-20261031-093130 encerrado).

## O que preciso / o que mudou
O que preciso: 🟡 tests/vitest.config.ts:3-4 — o comentário ainda diz que tests/ não entra no pnpm test; trocar por 'pnpm test:tests (ou pnpm test, tarefa raiz //#test:tests do turbo)'. 🟡 tests/plano/relatorio-sprint-0.md — Observações, 1º item ('tests/ fora do pnpm test') e a linha 'Testes do agente testes' da tabela de evidências: registrar que passou a rodar no pnpm test da raiz/CI (85/85 em 2026-10-31). 🟢 S0-008 continua parcial (next dev da cópia parado no aviso de segurança do Next): deixe o roteiro M-01 explícito para o Alexandre confirmar a demo, como premissa do gerente.

## Pronto quando
Pronto quando: os dois textos atualizados e resposta com --encerra.
