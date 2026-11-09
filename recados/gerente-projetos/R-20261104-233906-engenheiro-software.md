---
id: R-20261104-233906-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0072
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T23:39:06-04:00
---
# Revisão técnica: #91, #92, #93 e #94 sem 🔴 e sem 🟡; Vendedor R-232805 com 2 🟡 (por_status por pedido_evento, exibições); 0022/0023 sem 🔴

## Contexto
Revisão técnica dos 4 PRs do visual da T-0072 (pedidos R-20261104-231124, 231147, 231218 e 231248) e das entregas locais do modulo-vendedor (R-20261104-232805) e do banco-dados (R-20261104-232520). Diffs lidos depois do `git fetch`; nenhuma suíte rodada, nada alterado no repositório.

## Veredito por PR (publicado no próprio PR com `gh pr review --comment`)
- **#91 promotor (13e65a3): sem 🔴, sem 🟡.** RN-PRO-01 ok (nenhuma ação de pedido); a lógica continua no lib/loja e na fila; nenhum timer. 🟢: os IDs do mix agora ficam numa folha (`loja.mix.<id>.abrir` antes).
- **#92 treinamento (6fe1a6f): sem 🔴, sem 🟡.** `timer-permitido` mantido (licao-screen.tsx:46, RN-TRE-04); nenhum timer novo; a folha "Enviar assim" usa `treinar-quiz-enviar-assim` e `treinar-quiz-revisar`. 🟢: dar `testID` à Folha do quiz.
- **#93 pesquisa (333b3a6): sem 🔴, sem 🟡.** A validação no aparelho chama o mesmo `prepararEnvio` que o `enviar` já usa (nenhuma regra nova, RN-PES inalteradas, a API revalida); pontos de extensão com ação secundária. 🟢: `switch` exaustivo por motivo; Desfazer da foto; `respiroInferior`.
- **#94 core (a7ecfde): sem 🔴, sem 🟡.** testIDs preservados; o `SheetButton` removido não tem consumidor; `BottomSheet` com `rodape?` compatível; `checkout-confirm` ganhou `ocupado`. 🟢: registrar 4 testIDs novos em docs/modulos/core/test-ids.md. Se o head marcado for outro, revejo só o delta.
Pela técnica, os 4 podem ir na ordem #91 → #92 → #93 → #94 (regra A), com o head marcado. Todos ficam só em modules/<m>/app/**, com imports só de packages/*, core/contracts e do próprio módulo, CI verde nos 4.

## Entregas locais
- **modulo-vendedor R-20261104-232805: sem 🔴; 2 🟡** (recado R-20261104-233817): V1 = D1: `por_status=1` (api/pedidos.ts:181-186) usa `updated_at`, que anda em qualquer UPDATE; deve usar `exists` em `vendedor.pedido_evento.ocorrido_em` (uma linha por transição, índice pronto), mais o caso de banco no pedido.db.test.ts. V2: `apagarCopiaDoServidor` preserva todas as `exibicoes`, enquanto o `planoBaseRecriada` do domain (que tem teste) não é usado; não volta fantasma, mas ficam exibições órfãs e o teste não distingue os dois comportamentos. 🟢: `PedidosPage.parse` na consulta e aviso de corte em 1.000. Sugiro segurar o item 6 do lote até o V1.
- **banco-dados 0022/0023 (R-20261104-232520): sem 🔴, sem 🟡**, prontas para o lote (0022 antes da 0023). 4 🟢 na resposta R-20261104-233821.
- Aviso ao `testes` (R-20261104-233840) com os passos novos dos e2e (quiz, pesquisa, mix).

## Pronto quando
Merge dos 4 PRs pela regra A; V1 e V2 do Vendedor respondidos antes do item 6 entrar no lote.
