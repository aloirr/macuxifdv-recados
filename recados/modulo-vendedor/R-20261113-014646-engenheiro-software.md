---
id: R-20261113-014646-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: T-0168
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T01:46:46-04:00
---
# T-0168 v2: a trava do limite compara o '% exibido' dos Totais (8,04% não trava, 8,05% trava) e a frase única sem 'do vendedor'

## Contexto
Decisão do dono do produto (R-20261112-183709, item 5): a trava do limite do pedido (RN-VEN-11a) compara pelo **valor exibido, com 1 casa**. 8,04% aparece "8,0%" e não trava num limite de 8,0%; 8,05% aparece "8,1%" e trava. Desenho atualizado: `docs/desenho/T-0168.md` §3 ("Comparação da trava (v2)"), §3.1 (casos 5b, 6, 6b, 6c, 9, 11, 19) e §4. Contrato: `.coord/contratos/modulos.md`, seção T-0168.

Vi que `modules/vendedor/domain/limite-desconto.ts` já tem o `permilExibido(pct)` sobre o `desconto_efetivo_alcada_pct`. Isso ainda pode discordar da tela:
- a tela mostra a linha "Desconto (%)" dos Totais = `pctExibicao(total_tabela_cents − total_cents, total_tabela_cents)` (`novo-pedido-abas.tsx:482`, `apresentacao-totais.ts:31`), em centavos;
- o nominal da alçada não passa pelo centavo da linha. Exemplo a testar: 1 item de R$ 10,00 com 8,05% no item. Se a linha fecha em R$ 9,20, a tela mostra 8,0% e a trava de hoje dispara (81 > 80).

A frase também está fora do aprovado: o RD-0196 aprovou **"Pedido acima do desconto máximo (8,0%)"**, igual no Campo e no Gestão. Hoje sai "... do vendedor (8,0%)" / "do gestor".

## O que preciso
1. `permilDoDescontoExibido({ total_tabela_cents, total_cents }): number`, em inteiro, com a mesma fórmula do `pctExibicao` (que passa a ser `permilDoDescontoExibido(...) / 10`; uma fórmula só). Acréscimo → ≤ 0.
2. `pedidoAcimaDoLimite(desconto_exibido_permil, l)` compara inteiros: exibido > 0 e exibido > limite. Sem `pct × 10` em float.
3. App (`app/lib/novo-pedido.ts:324`) e API (`domain/aprovacao.ts:385`): passar o ‰ exibido dos mesmos `totaisDoPedido`. A **alçada não muda** (nominal exato).
4. `mensagemPedidoAcimaDoLimite(permil)` sem o autor: "Pedido acima do desconto máximo (8,0%)". O limite continua sendo o do autor (gestor em nome do vendedor = limite do gestor).
5. Testes citando RN-VEN-11a: tabela R$ 100,00 com total R$ 91,96 (8,0%, não trava, vai ao supervisor) e R$ 91,95 (8,1%, trava); o caso 6c com o centavo real do `precoUnitarioFinal`; limite 0,0% com 0,04% nominal (exibe 0,0%, envia); e a frase igual no Campo e no Gestão.

## Pronto quando
Testes do domain verdes com os casos acima, app e API chamando a mesma função, a frase única nos dois apps, e lint e typecheck limpos no PC. Me avise para a revisão final.
