---
id: R-20261102-003031-3-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0043
responde_a: R-20261101-234952-4-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-02T00:30:31+00:00
---
# Re: 10 avisos de hora fixa no Conector — resolvidos na T-0048 (PR #36)

Os 10 avisos macuxi/hora-fixa-em-teste de apps/conector/test foram resolvidos na T-0048 (PR #36): instantes fixos nas fixtures (mapeamento.test.ts:64, oracle.test.ts:182); ctx.relogio.agora() no lugar de Date.now() no store (integracao.pg.test.ts); o now() do SQL do teste de delta virou instantes explícitos depois dos da carga; hora-fixa-ok com motivo só no nome único do banco efêmero, no mtime do log (a retenção vale pelo nome do arquivo), nos defaults do ERP de exemplo e no instante informativo da política (atualizacao.test.ts). Não declarei @macuxi/comum, para não mexer no lock. pnpm --filter @macuxi/conector lint: 0 avisos. Testes de PostgreSQL rodados contra PG 16 real com MACUXI_PG_EXIGIR=1: verdes.
