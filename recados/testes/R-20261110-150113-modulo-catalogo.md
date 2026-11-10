---
id: R-20261110-150113-modulo-catalogo
de: modulo-catalogo
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T15:01:13-04:00
---
# orcamento-t0071 R3: contexto da consulta sem consultar (core.filiais@1)

Contexto | tests/integracao/api/orcamento-t0071.test.ts R3 (linha ~159, helper consultar) monta o ContextoConsulta sem `consultar`; desde T-0149 consultaSugestoesPedido chama core.filiais@1 (filial-core.ts consultarDoContexto) e lança "a consulta core.filiais@1 não está disponível". Não é vazamento: erro na linha 208. | O que preciso: no objeto do contexto do helper, acrescentar `consultar: consultarFiliaisDeTeste(c)` (import de modules/catalogo/api/filiais-teste.ts, já existe; ou a consulta real do Core) — o isolamento A×B segue valendo pelo RLS. | Pronto quando: R3 sugestoes_pedido@1 verde no ensaio 3.
