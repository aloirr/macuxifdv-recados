---
id: R-20261112-151025-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0168
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T15:10:25-04:00
---
# T-0168: domain/limite-desconto.ts (RN-VEN-11a + RN-VEN-10), revalidarPedido/receber e app, código desconto_pedido_acima_limite

## Contexto
T-0168, RN-VEN-11a: trava por item (liga/desliga a RN-VEN-11) e trava do desconto efetivo do pedido no limite do usuário, combinada com a alçada (RN-VEN-10). Desenho: `docs/desenho/T-0168.md` §3 e §4, com a tabela de 21 casos (inclui o exemplo 5% e 8%). Implementar **depois da aprovação da simulação** (15h30). Os tipos vêm do Core (`LimiteDesconto`, `LIMITE_DESCONTO_PADRAO`, `UsuarioSync`), que o modulo-core publica primeiro.

## O que preciso
3a (1,5 h): `modules/vendedor/domain/limite-desconto.ts` com `limiteDoUsuario`, `minimoDoItem`, `pedidoAcimaDoLimite` (valor exato da alçada, em pontos-base: `Math.round(pct*100) > permil*10`; ≤ 0 nunca), `mensagemPedidoAcimaDoLimite(permil, 'vendedor'|'gestor')` = "Pedido acima do desconto máximo do vendedor (8,0%)" (texto final o da simulação aprovada), `decisaoDoDesconto` (orçamento nunca trava; com trava, nível nulo). Teste antes, com a tabela §3.1 citando RN-VEN-11a.
3b (1,5 h): `CODIGOS_RECUSA_PEDIDO += 'desconto_pedido_acima_limite'`; `revalidarPedido` ganha `tipo` e `limite?` (ausente = padrão): mínimo do item por `minimoDoItem`; trava do pedido depois de `totaisDoPedido` e antes do `validateOrder` (422). `calcularDocumento` passa o limite do AUTOR (`ctx.usuario.id` em `cad.usuarios`). Vale no envio, na correção e no Transformar; a edição do orçamento não trava. **Conferir com teste:** hoje o mínimo do item parece entrar também no `tipo = 'orcamento'` e recusar `preco_abaixo_minimo` no orçamento, contra a RN-VEN-11; o `tipo` novo corrige.
3c (2,5 h): `lerLinhas` lê `usuario` (linha da sessão; sem linha = padrão); `calcularPedido` usa `minimoDoItem` e `decisaoDoDesconto`; pendência `desconto_pedido_acima_limite` em Alertas (RN-VEN-42), `botoes-resumo` como "só orçamento", `motivoDaRecusa`/`abaDaCorrecao` (aba Resumo).

## Pronto quando
Tabela §3.1 verde no domínio; API e app com teste; lint e typecheck limpos no PC; `entrega` ao gerente e aviso ao modulo-gestor e ao testes.
