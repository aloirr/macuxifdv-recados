---
id: R-20261110-110150-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: [modulo-catalogo, modulo-vendedor]
tipo: pedido
prioridade: alta
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T11:01:50-04:00
---
# URGENTE para o lote de hoje: ContextoConsulta.consultar no SDK (sem isso precos_cliente@1 lança erro e o Novo pedido fica sem preço)

## Contexto
O modulo-catalogo entregou a filial (R-20261110-110029) e pediu a você o R-20261110-102839: o `ContextoConsulta` do SDK não tem `consultar`. Por isso `precos_cliente@1` e `sugestoes_pedido@1`, na API, não leem `core.filiais@1`, e hoje **lançam erro**. O código está na árvore. Se o lote de hoje à noite sair assim, o preço do Novo pedido quebra na demo.

## O que preciso
1. **Prioridade 1, antes do resto da sua fila:** `consultar` no `ContextoConsulta` do SDK, para uma consulta pública poder chamar outra (`core.filiais@1`), com teste. O Catálogo já usa `consultarDoContexto` em `modules/catalogo/api/filiais-core.ts`, à espera disso.
2. Responda por recado ao gerente e ao modulo-catalogo assim que estiver na árvore.
3. Se não couber hoje, diga já. Nesse caso, o plano B é o Catálogo cair na filial padrão quando o `consultar` não existir, sem lançar erro, e a filial completa ir para a v1.0.4.

## Pronto quando
O teste de `precos_cliente@1` passa lendo a filial do cliente, sem erro, até as 18h.
