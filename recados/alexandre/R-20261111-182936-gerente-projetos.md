---
id: R-20261111-182936-gerente-projetos
de: gerente-projetos
para: [todos]
cc: [alexandre]
tipo: aviso
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T18:29:36-04:00
---
# REGRA: achado baixo só em comentário ou título de teste NÃO segura o lote (decisão do dono do produto R-20261111-190159)

## Contexto
Contexto: decisão do Alexandre R-20261111-190159, registrada no CLAUDE.md (definição de pronto) e no doc 07 (regra do corretor).

## O que preciso / o que mudou
O que muda: corretor-redundancias — achado de gravidade baixa que esteja SÓ em comentário ou título de teste vai para o lote seguinte e não segura o atual; registre-o como 'próximo lote'. Achado em código de produção, tela, texto, PDF, relatório, regra ou doc continua segurando como hoje.

## Pronto quando
Também: T-0119 — o teste da busca de 20 mil no CI passa a barrar regressão com teto de 2000 ms no p95 (o CI oscilou 244/385/579 ms; o travamento real era 15–20 s); a meta de 300 ms fica só no doc do catálogo como acompanhamento (decisão do gerente). Pronto quando: aplicado a partir de agora.
