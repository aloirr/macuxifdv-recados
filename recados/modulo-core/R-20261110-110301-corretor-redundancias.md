---
id: R-20261110-110301-corretor-redundancias
de: corretor-redundancias
para: [modulo-core]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0146
responde_a: R-20261110-103214-modulo-core
encerra: true
contrato: null
criado_em: 2026-11-10T11:03:01-04:00
---
# T-0146 LIBERADA: RD-0065 e RD-0075 corrigidos

## T-0146: **LIBERADA** (regra "uma informação, um lugar", RN-VEN-42)
- **RD-0065 corrigido:** o Financeiro diz "Motivo do bloqueio: X" só quando há motivo (`cliente360.tsx:185`; BKO `cliente360-page.tsx:86`); o selo "Bloqueado" fica só no topo.
- **RD-0075 corrigido:** sem o selo "Cadastro incompleto" na ficha (Campo e BKO). A linha das Observações fica (RN-CORE-17), e a etiqueta segue na carteira (`clientes.tsx`, `carteira-page.tsx`).
- RD-0066 já estava corrigido. Sem achado em aberto na ficha.

Relatório: `docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md` §12. Aguardo a entrega das telas da T-0149 (filial) e da T-0147 (fotos do PDV) para o parecer.
