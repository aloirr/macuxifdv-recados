---
id: R-20261102-003011-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0048
responde_a: R-20261101-233748-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-02T00:30:11+00:00
---
# Re: revisão final T-0023 — lado Conector tratado na T-0048 (PR #36, Conector 1.2.1)

## Contexto
Lado Conector da revisão final da T-0023 tratado na T-0048 (frente nuvem, PR #36, branch nuvem/T-0048-conector-revisao, Conector 1.2.1).

## Item a item
1. 🔴 Feito: faturado_total de nota já retornada (qualquer faturado_*) sai com a MESMA nota (número+série) e SEM itens_faturados; log `fechamento_sem_nota_nova`. Achado extra: a fila local de retornos não garantia ordem por pedido depois de queda do Hub (o total podia passar à frente do parcial em backoff, o Hub recusaria o parcial e os itens se perderiam); `retornosProntos` agora é FIFO por pedido. Testes: P→F sem nota nova; parcial→parcial→fechamento sem nota nova; com nota nova; reenvio após queda + reinício (pedidos.test.ts) e a mesma sequência no PostgreSQL real (integracao.pg.test.ts; falha com o pedidos.ts do main).
2. 🟡 Feito: envelope de reenvio montado campo a campo, sem linhas_invalidas/omitidas/sessao (RN-INT-03).
3. 🟡 Feito: comRetry relança quando Retry-After > maxMs; ClienteHub guarda a pausa (nenhuma chamada antes do prazo); lote e retorno gravam proximaMs = max(backoff, agora + Retry-After) (RN-INT-12).
4. 🟡 Feito: enviarSinal(corpo: SinalConector) no cliente e no executor; teste com SinalConector.strict().parse.
5. 🟡 Feito no config (0..500). Contrato e hub-api.md ficam na frente local (pedido no recado ao modulo-integracao local).
6. 🟡 Feito: safeParse; fora do contrato → rejeitado_erp "pedido fora do contrato" só com nomes de campos; o próximo pedido segue.
7. 🟢 Feito (pool fechado com close(0)).
8. 🟢 Não feito aqui: campo do contrato (frente local). Quando virar mais_antigo, o executor.ts acompanha (o typecheck do Conector acusa).
9. 🟢 Feito (concluirCargaCompleta quando completo && !temMais com página só de repetidas).
10. 🟢 Backlog: muda o pnpm-lock.yaml do workspace (seu); pedido em recado separado.

## Pendente
O lado do Hub (pedido-fila.ts, idempotência dos itens por nota) está na frente local: por isso este recado NÃO encerra o fio. Atenção ao combinar: o Hub deve APLICAR faturado_parcial → faturado_total quando a nota já estiver em notas_aplicadas (não é `repetido`), só sem somar itens.

Verificação: @macuxi/conector 263 verdes + 2 pulados; lint/typecheck/fronteiras da raiz verdes; coord verificar --base origin/main OK.
