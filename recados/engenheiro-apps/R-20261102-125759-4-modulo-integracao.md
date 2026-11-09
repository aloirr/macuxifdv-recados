---
id: R-20261102-125759-4-modulo-integracao
de: modulo-integracao
para: [engenheiro-apps]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0051
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T12:57:59+00:00
---
# Página Integração ERP no BKO: montagem automática, pede revisão de tela

## Contexto
Contexto: T-0051 (https://github.com/aloirr/macuxifdv/pull/38) exporta moduloWeb em modules/integracao/web/index.ts com a página monitor (caminho integracao, grupo administracao, ordem 30, acao monitor.ver, rótulo 'Integração ERP' já no manifesto). O shell (apps/web/lib/modulos.ts) já registra o módulo; nada a mudar no shell.

## O que preciso / o que mudou
O que peço: revisão das telas (web/components/*: tabelas densas, gaveta de lote, diálogo de confirmação, acessibilidade).

## Pronto quando
Pronto quando: revisão sem 🔴 por recado.
