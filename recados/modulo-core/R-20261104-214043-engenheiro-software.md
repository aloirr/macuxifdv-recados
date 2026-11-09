---
id: R-20261104-214043-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0077
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T21:40:43-04:00
---
# Revisão final D2: 2 🟡 no pull de historico_compra do promotor (desligar sem tocar updated_at; linha oculta leva valores)

## Contexto
Revisão final do lote 2 (branch verificacao/T-0071-T-0077-lote, commits 53d9e76 e 93f9afd). D2 (RN-PRO-01, decisão R-20261102-204544): o `GET /v1/core/clientes/:id` está correto e não tem 🔴. Há dois 🟡 no pull de `historico_compra` para o promotor.

## O que preciso
🟡 **D2-a: desligar a opção não limpa o histórico que o aparelho já tem.**
- Em `modules/core/api/promotor-pedidos.ts:45`, o `updated_at` do histórico só é tocado quando a opção é religada (`if (c.ligado)`).
- Ao desligar, um aparelho com o cursor adiantado só recebe como removidas as linhas que mudaram depois do cursor. O histórico baixado antes continua no aparelho até um pull completo.
- O comentário de `ocultarHistorico` (`modules/core/api/sync.ts:189`) diz que o aparelho limpa o que já tinha. Hoje isso só acontece no pull completo.
- O teste `modules/core/api/promotor-historico.db.test.ts` usa sempre `desde: null`, por isso não pega o caso.
- Correção: tocar o `updated_at` em qualquer mudança (`antes !== c.ligado`) e acrescentar um teste com cursor. O teste faz um pull, pega o cursor da última linha, desliga a opção e faz um pull incremental a partir desse cursor. O `HISTORICO` tem que voltar com `deleted_at`.

🟡 **D2-b: a linha "removida" ainda leva os valores ao aparelho.**
- `ocultarHistorico` (`modules/core/api/sync.ts:194`) só preenche o `deleted_at`. `valor_cents`, `pedidos`, `itens` e `ultima_compra_em` seguem na resposta do pull para um perfil que o tenant configurou para não ver.
- O motor apaga a linha ao gravar, mas o dado passa pela rede. Isso contraria o próprio título do teste ("sem dado") e o precedente do RN-CAT-05 ("o preço nem chega ao aparelho").
- Correção: na linha oculta, zerar ou anular os campos de valor e manter só o que o schema do pull exige (`id`, `updated_at`, `deleted_at`, `external_id`, `cliente_id`, `ano_mes`). O teste deve verificar `valor_cents` 0 ou ausente.

🟢 Fica a seu critério: religar toca o histórico do tenant inteiro e todos os perfis baixam tudo de novo. Aceitável, porque a troca é rara. Registre isso no comentário.

## Pronto quando
- `promotor-pedidos.ts` toca o histórico ao desligar e ao religar.
- A linha oculta não leva mais os valores.
- `promotor-historico.db.test.ts` tem o caso incremental e a verificação dos valores.
- O CI de banco está verde.
Nenhum dos dois bloqueia o push do lote. Pode ir na próxima rodada, mas de preferência antes do APK do promotor.
