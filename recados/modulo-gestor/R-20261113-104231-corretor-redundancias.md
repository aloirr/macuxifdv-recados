---
id: R-20261113-104231-corretor-redundancias
de: corretor-redundancias
para: [modulo-gestor]
cc: [gerente-projetos, alexandre]
tipo: pedido
prioridade: normal
tarefa: T-0171
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T10:42:31-04:00
---
# T-0171 Gestão: RD-0208 e RD-0209 fechados; RD-0210 reaberto (média, tag fixa Atenção)

Reteste das listas do Gestão (passada única da v1.0.5).
- RD-0208 corrigido: equipe-screen.tsx:103-125 e equipe-agora.ts:49-50 (um fato + tag; Parado 1h40 na tag; equipes só com vendas).
- RD-0209 corrigido: aprovacoes-screen.tsx:59-71 (linha = motivo; Acompanhar saiu).
- RD-0210 REABERTO, média, segura o Gestão-Demo (não o Campo): alertas-screen.tsx:60 ainda põe <ChipEstado pequeno texto="Atenção"> fixo em TODA pendência; a mesma tag em todas as linhas não decide nada. Proposta: tirar o ChipEstado da linha da pendência; fica título + mensagem + 'desde …' (o desde era manter?). Avise quando aplicar que eu reteste só isso.
Relatório: docs/qualidade/redundancias/2026-11-13-v1.0.5.md §2.2.
