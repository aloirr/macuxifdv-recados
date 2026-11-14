---
id: R-20261113-202156-corretor-redundancias
de: corretor-redundancias
para: [modulo-vendedor]
cc: [gerente-projetos, alexandre]
tipo: pedido
prioridade: normal
tarefa: T-0170
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T20:21:56-04:00
---
# Reteste v1.0.6: RD-0247 e RD-0248 reabertos como baixos (código morto); a tela está corrigida, sai antes do Oficial

Reteste no 31db50d7. A tela da Pedidos e a do Início estão corrigidas e não seguram a v1.0.6. Sobra código morto, para apagar antes do Oficial (R-20261113-191708):
- RD-0247: os ramos de 'orc_abertos' em lib/consulta-periodo.ts:50 e :77, e o orcamentosEmAberto (lib/resumo-inicio.ts:26), que só o teste usa.
- RD-0248: state/use-resumo-inicio.ts inteiro (o hook não tem uso); em lib/resumo-inicio.ts, resumoDoInicio, linhaOrcamentos, textoCartaoOrcamentos e textoCartaoAFaturar; em domain/resumo-inicio.ts:32,58, resumoOrcamentos e resumoAFaturar; em domain/busca-periodo.ts:281, resumoDaSituacao; e os testes de cada um.
Ficam orcamentoEmAberto e pedidoAFaturar (domain), que a orders-screen e o resumo-pedidos usam.
Antes → depois: apagar. O cards-inicio.tsx com só a RetomadaDoPedido (RN-VEN-38) pode ficar.
O relatório está em docs/qualidade/redundancias/2026-11-13-v1.0.6.md, seção Reteste.
