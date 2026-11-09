---
id: R-20261102-131324-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos, alexandre]
cc: [engenheiro-software, engenheiro-apps]
tipo: entrega
prioridade: normal
tarefa: T-0053
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T13:13:24+00:00
---
# T-0053 entregue no PR #39: retorno do ERP ligado; orçamento pronto atrás de repositório (falta a 0013)

## Contexto
PR: https://github.com/aloirr/macuxifdv/pull/39 (branch nuvem/T-0053-pre-venda-erp).
O que fiz

## O que preciso / o que mudou
(1) Retorno do ERP: o consumidor de integracao.pedido.retorno_erp@1 (api/retorno-erp.ts, regra em domain/retorno-erp.ts) já está ligado. O status só anda para a frente (integrado, rejeitado_erp, faturado parcial ou total, cancelado só pelo ERP). Grava o número do ERP e um histórico com autor ERP, e publica status_alterado@1 e faturado@1, este com os itens pela sequência. (2) Orçamento (RF-VEN-03, RN-VEN-32, RN-VEN-13): validade, situação, conversão offline em pedido novo (uma vez por orçamento) e cliente inativo só com orçamento, tudo no domain. O push aceita tipo=orcamento: o orçamento fica recebido, sem alçada, sem evento e fora da fila do ERP. As colunas novas ficam atrás de RepositorioPreVenda; em produção uso preVendaIndisponivel até a 0013. (3) App Campo: Pedido

## Pronto quando
Orçamento (com o parâmetro orcamento.ativo), Converter em pedido e a situação na lista e no detalhe. BKO: a situação do orçamento. (4) Docs em docs/modulos/vendedor/pre-venda-e-erp.md.
Testes | modules/vendedor de 253 para 304 testes, com Postgres real, multi-tenant, perfis e sem hora fixa. Raiz verde: lint, typecheck, apps/api 153, tests/ 402, sdk 307. verificar --base origin/main OK.
Critérios | Os critérios 2 a 5 estão atendidos. O 1 (ponta a ponta na demo) está parcial: falta o local.
Fica para o local | banco-dados: 0013 (R-20261102-130953), com tipo, validade_ate, orcamento_origem_id, convertido_pedido_id, pedido_item.quantidade_faturada, a seed e os parâmetros da demo. modulo-integracao (R-20261102-131006): consumir vendedor.pedido.aprovado@1 na pedido_fila_erp, porque sem isso nenhum pedido chega ao Conector. testes (R-20261102-131045): e2e. engenheiro-apps: nada a montar no shell, só revisar as telas novas (new-order, order-detail, orders, status do BKO).
Premissas | O orçamento é uma linha de vendedor.pedido com tipo=orcamento, sem evento de pedido. O desconto acima do bloqueio continua recusado no orçamento. A validade é de 24 h × N a partir da chegada ao servidor; na conversão vale a hora do aparelho, com até 7 dias de recuo. O faturado_total sem itens depois de uma nota parcial não publica faturado@1 até a 0013. O diário .coord não foi alterado, porque a frente nuvem proíbe .coord/**.
