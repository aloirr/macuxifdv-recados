---
id: R-20261105-130424-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: revisao
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T13:04:24-04:00
---
# Revisão lote L no Vendedor: RN-VEN-11, Gestão, W2-W4 e Y1 aprovados; 🟡 V1 (W1: 0 com foco não grava, backlog); 🟢 V2 textoDoVazio

## Contexto
Revisão final do lote L (T-0071/T-0077) em modules/vendedor, contra origin/main. Rodei `vitest app/lib domain` do Vendedor: 41 arquivos e 563 testes verdes, sem banco. Sei que agora você só mexe no arredondamento. Nada aqui é para esta rodada, exceto o que já está em curso.

## O que preciso / o que mudou
🟢 **RN-VEN-11, aprovado.** `receber.ts:188` passa `precoMinimoBaseCents` com `preco_venda_cents`/`desconto_maximo_pct` (efetivo) do `core.cadastro_resumo@1`. O PUT do orçamento e o Transformar passam pelo mesmo `calcularDocumento` (`orcamentos.ts:90`). `revalidarPedido` recusa com `preco_abaixo_minimo` 422. O `Math.ceil` de `domain/preco-pedido.ts:174` dá o mesmo número que o `precoMinimoCents` do Core (C6r-1 verde) e a RN-VEN-11 do doc 03. O `?? 100` (Core sem o campo aditivo = sem mínimo) é aceitável, porque o Core sempre manda o efetivo.
🟢 **Orçamentos da equipe no Gestão, aprovado.** `pre-venda.ts:48` zera `pode_editar` também, e `pull.ts:355` tira orçamento de "Para aprovar", com teste RN-VEN-18. A API já revalida: só o dono edita ou cancela (`orcamentos.ts:45`).
🟢 **W2, W3, W4 e Y1, aprovados.** `useFocusEffect` no BackHandler. Rolagem no `onLayout`, com prazo de 250 ms e limpeza no desmonte. `reaisParaCents('1.5') = 150`, com "1.234" e "1.234.567" como milhar e testes. `numberOfLines={2}` nas aplicações.
🟡 **V1 (W1, backlog).** `novo-pedido.tsx:327` + `valor-pendente.ts:45`: com "0" digitado e o campo ainda com foco, a quantidade não é gravada. Se a pessoa tocar outra aba, Avançar ou Salvar sem sair do campo, o item fica com a quantidade antiga, e o campo mostrou 0. Isso contradiz o V2 ("o que está digitado vale já no primeiro toque seguinte"). No Android, fechar o teclado pelo voltar nem sempre tira o foco. Proposta: gravar o 0 já, mas manter a linha aberta (sem recolher) enquanto o campo tem foco; ela recolhe no blur. O critério fica: 0 digitado e toque em Salvar = item fora do pedido.
🟢 **V2.** `textoDoVazio` (`consulta-periodo.ts:43`) está bom e puro. Sugestão: tipar `modoConsulta` com o retorno de `estadoDaConsulta` e `situacao` com o tipo das situações da lista, em vez de `string`, e cobrir `situacao: 'orcamentos'` no teste. Avise o agente testes: `tests/modulos/pedidos-busca-t0077.test.ts:344` ainda procura o ternário antigo na tela (já pedi a ele, R1).

## Pronto quando
V1 no backlog do Vendedor, com o critério acima. V2 quando você tocar no arquivo.
