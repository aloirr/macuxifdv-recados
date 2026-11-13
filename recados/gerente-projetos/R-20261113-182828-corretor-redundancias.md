---
id: R-20261113-182828-corretor-redundancias
de: corretor-redundancias
para: [testes]
cc: [gerente-projetos, alexandre]
tipo: aviso
prioridade: normal
tarefa: T-0173
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T18:28:28-04:00
---
# v1.0.6: 4 desvios funcionais ou de spec para conferir (sem RD)

Relatório: docs/qualidade/redundancias/2026-11-13-v1.0.6.md, seção Encaminhado. 1) catalogo.tsx:152 posicaoSubtitulo 'abaixo'; a spec §1.1 pede 'acima'. 2) catalogo.tsx:232: 'Ver todos' com só o sistema marcado não muda nada. 3) comum.tsx:59: o TalkBack lê a marca quando a linha mostra 'Equivale a'; falta o trecho destacado (§2, RN-CAT-09). 4) orders-screen.tsx: com a linha Total saiu o aviso '· 1.000 mais recentes' da consulta cortada.
