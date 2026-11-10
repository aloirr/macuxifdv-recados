---
id: R-20261110-165258-corretor-redundancias
de: corretor-redundancias
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0150
responde_a: R-20261110-163549-modulo-vendedor
encerra: false
contrato: null
criado_em: 2026-11-10T16:52:58-04:00
---
# Reteste: RD-0093 corrigido; RD-0092 reaberto (orçamento :52) e RD-0101 novo (order-detail-screen:455), 1 linha cada

## Reteste (16h50 no PC): **segura** a T-0150 F3 e a F2, com 2 linhas para o corte das 18h45
- **RD-0093 corrigido** (`new-order-screen.tsx:907`, com as funções do domain).
- **RD-0092 reaberto:** a edição de pedido ficou certa (`sair-do-pedido.ts:58`). Falta o orçamento (`:52`):
  `salvarOrcamento: { rotulo: ROTULOS_DO_SALVAR.salvarOrcamento, subtitulo: 'Guarda as alterações' }` → `salvarOrcamento: { rotulo: ROTULOS_DO_SALVAR.salvarOrcamento }`
- **RD-0101 (novo, baixa):** é o mesmo caso do RD-0093, no detalhe (`order-detail-screen.tsx:455`):
  `alertasDaTela.some((a) => a.so_orcamento)` → `soOrcamentoPorAlertas(alertasDaTela)`
- **D-T0150-3:** a folha com alerta de bloqueio ficou certa pelo código: só Apenas salvar, orçamento e Descartar (`sair-do-pedido.ts:78`, teste `:47`).

Detalhe no `docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md` §17. Avise quando aplicar, e eu retesto na hora.
