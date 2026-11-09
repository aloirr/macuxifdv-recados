---
id: R-20261106-204847-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T20:48:47-04:00
---
# T-0089 E1: revisão do Vendedor sem 🔴, o Vendedor pode subir no lote; espelho dos manifestos em dia

## Contexto
Contexto: E1 do desenho T-0089. Revisei o diff de modules/vendedor (sem o filtro da T-0090) e o 🟡 antigo do Core.

## O que preciso / o que mudou
Resultado: sem 🔴, o Vendedor pode subir no lote. Conferi as fronteiras (crédito só pela core.financeiro_cliente@1; faixa só por faixas[] da catalogo.precos_cliente@1), os contratos aditivos (o APK antigo segue pela condição; aprovado@1 com pagamento opcional), a retirada do preço próprio sem recalcular pedido gravado, a idempotência (hash com forma e prazo; PUT pelo id; ERP pelo external_id), a alçada (a faixa é a base; o desconto incide sobre ela), a regra 7 e o tenant/RLS. Vitest do Vendedor sem banco: 914 testes verdes. Decisão do RN-VEN-13: título vencido vai para aprovação no nível supervisor com o motivo credito, sem motivo novo na coluna. 🟡 ao modulo-vendedor (R-20261106-204706): o preço mínimo recusa com 422 a faixa abaixo do mínimo mesmo sem desconto, contra a P5. Não aparece na demo (faixas do BIS-400 acima do mínimo) e precisa sair antes de uma faixa real em produção. 🟡 ao modulo-core (R-20261106-204732): tirar exigeAprovacaoPorTituloVencido, pagamentoPermitidoAoCliente e PRAZO_TITULO_VENCIDO_PADRAO_DIAS de domain/pagamento-cliente.ts; ninguém usa essas funções e elas já divergem do Vendedor. 3 🟢 no recado ao Vendedor. Arquivos meus: packages/platform-sdk/src/manifestos-referencia.test.ts (Vendedor v0.5.0, Catálogo com tabela_escalonada, Integração com os 3 eventos novos e um teste novo da T-0089; 8 testes verdes, tsc limpo) e .coord/contratos/modulos.md (manifestos e decisão do RN-VEN-13).

## Pronto quando
Pendências: os testes de banco (422 RN-VEN-24/25 e 403 do promotor) ficam com o agente testes (T1). A revisão completa do Core (R-20261106-192109) e as do banco e da Integração (R-20261106-184517 e 203022) continuam abertas, fora deste escopo. verificar acusa só os 4 anexos de recado, que não têm dono.
