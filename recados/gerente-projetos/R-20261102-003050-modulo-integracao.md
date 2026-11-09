---
id: R-20261102-003050-modulo-integracao
de: modulo-integracao
para: [gerente-projetos, alexandre]
cc: [engenheiro-software]
tipo: entrega
prioridade: normal
tarefa: T-0048
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T00:30:50+00:00
---
# T-0048 entregue no PR #36: Conector 1.2.1 sem nota faturada 2x e com os 🟡 da revisão da T-0023

## Entrega T-0048 — Conector 1.2.1: correções da revisão final da T-0023 (PR #36)
Frente nuvem, branch nuvem/T-0048-conector-revisao. Só apps/conector/** e docs/modulos/integracao/conector.md.

**O que mudou**
- 🔴 Nota faturada 2x: quando o ERP fecha um pedido parcial sem nota nova, o faturado_total vai com a mesma nota e sem itens_faturados (RN-INT-08). Também foi corrigida a ordem da fila de retornos por pedido depois de queda do Hub, que podia fazer o total chegar antes do parcial e perder itens.
- 🟡 2 a 6: reenvio de falha_processamento sem as linhas inválidas; Retry-After longo respeitado por inteiro (pausa no cliente + espera no lote e no retorno); sinal tipado pelo SinalConector; lote.maxLinhasInvalidas até 500; pedido fora do contrato vira rejeitado_erp sem travar os demais.
- 🟢 7 e 9 feitos (pool Oracle fechado; carga completa que termina com página repetida passa ao delta). 🟢 8 (contrato do Hub) e 10 (pnpm-lock.yaml) ficaram fora da frente, com recados.
- Extra: os 10 avisos de hora fixa da T-0043 no Conector foram zerados; versão 1.2.1; conector.md atualizado.

**Testes**: @macuxi/conector com 263 verdes e 2 pulados (Oracle real); antes eram 240 e 10. Os 9 de PostgreSQL rodaram contra um PG 16 real; o novo teste do 🔴 falha com o código do main. Raiz: lint, typecheck e fronteiras verdes. pnpm test no Node 24 com PG está verde, exceto @macuxi/db/pgvector, que falta no PG local e não tem relação com a T-0048. coord verificar --base origin/main está OK.

**Como testar (5 passos)**
1. git checkout nuvem/T-0048-conector-revisao && pnpm install
2. pnpm --filter @macuxi/conector test (opcional: Postgres local + MACUXI_PG_EXIGIR=1)
3. Leia pedidos.test.ts › "a mesma nota nunca sai duas vezes com itens (T-0048)": 4 cenários
4. pnpm --filter @macuxi/conector lint: 0 avisos
5. docs/modulos/integracao/conector.md, linha "Novidades da v1.2.1"

**Premissas**: o fechamento sem nota nova repete a nota, porque o contrato exige nota no faturado. O Hub deve aplicar parcial→total com a nota já aplicada e não somar itens (pedido ao modulo-integracao local: R-20261102-003031). A pausa do Retry-After fica em memória. Pedido fora do contrato é final (rejeitado_erp). Sugiro versão mínima 1.2.1 no Hub para quem recebe pedidos.

**Pendências**: lado Hub do 🔴 (frente local); 🟢 8 mais_antigo (contrato); 🟢 10 @types/node 24 (lock do engenheiro-software, R-20261102-003031-2). Não editei .coord/diario, que é proibido nesta frente: a linha do diário fica para o gerente.
