---
id: R-20261106-201023-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T20:10:23-04:00
---
# T-0089 (Vendedor): domain, contratos, API e BKO de formas e prazos, retrato no pedido, aba Itens em 3 linhas, Detalhes com credito; pendencias

## Contexto
Contexto: fatias V1-V5 do desenho T-0089 (R-20261106-073335), lado Vendedor.

## O que preciso / o que mudou
O que fiz: DOMAIN (teste antes, citando a RN): domain/preco-item.ts (RN-VEN-15 nova: embalagem = UN x fator; RN-VEN-23: faixa, precoBaseDoItem, proximaFaixa), domain/pagamento.ts (RN-VEN-24/25: prazoMedioDias 28/56=42 arredondado para cima, descricaoPrazo sem medio, formasDoCliente, prazosDaForma, pagamentoPadrao, validarPagamento; RN-VEN-13 exigeAprovacaoPorVencido; RN-VEN-12 creditoDoCartao); preco_proprio removido do domain, da API (receber), do app (novo-pedido, documento, sugestoes). CONTRATOS: forma_pagamento e prazo_pagamento no sync e no manifesto (v0.5.0), PedidoPush/Order/PedidoSync com forma e prazo (aditivo, APK antigo segue pela condicao), recusas RN-VEN-24/25, aprovado@1 com pagamento? e condicao_pagamento_codigo = codigo do prazo, consulta vendedor.formas_pagamento@1 oferecida, usaConsultas += core.financeiro_cliente@1, acoes forma_pagamento.ver

## Pronto quando
gerenciar (admin, analista, gerente; promotor nunca). API: pull das 2 entidades, receber/orcamento com validarPagamento (422 RN-VEN-24/25) e RN-VEN-13 via core.financeiro_cliente@1 (indisponivel nao bloqueia; titulo vencido com prazo a prazo vai para aprovacao nivel supervisor, motivo credito), retrato de 8 colunas, rotas do BKO (GET formas-pagamento, PUT formas-pagamento/:id e prazos-pagamento/:id), api/formas-erp.ts (consumidor com adocao da AVISTA semeada, testado). BKO: pagina Formas de pagamento e prazos (grupo administracao por ora, o engenheiro-apps acerta o menu). APP: aba Itens sem rodape fixo, Forma e Prazo em lista suspensa (so o prazo no texto, desabilitado o que passa do prazo medio), total do pedido sob eles, item em 3 linhas com Valor total no fim, UN | CX, desconto sempre aberto com o tipo; Detalhes: Credito do cliente (core.financeiro_cliente@1 offline, alerta RN-VEN-13, data do sync) > Frete > Entrega > Observacoes > Leve mais e pague menos > Combina; mantive rascunhosAposLeitura e keyboardShouldPersistTaps handled. Testes: vitest do modulo verde (domain, lib do app, web/lib, api sem banco); lint e os 3 tsc limpos; verificar modulo-vendedor so acusa os 4 anexos de recado (nao sao meus). | Pendencias e premissas: (1) o Leve mais e pague menos fica escondido: o Catalogo ainda nao publicou faixas[] em precos_cliente@1; leio {medida | null, quantidade_minima, preco_unidade_cents} de forma tolerante (faixasDaConsulta) e API e app ja aplicam quando vier. (2) Os consumidores integracao.forma_pagamento | prazo_pagamento.atualizado@1 nao estao registrados porque o contrato do Hub (I1) nao existe; a logica pronta e testada esta em api/formas-erp.ts (aplicarFormaDoErp/aplicarPrazoDoErp). (3) Testes de banco (422 RN-VEN-24/25 e 403 promotor) nao escritos por eu nao poder rodar o CI aqui; cobertos em unidade por api/pagamento.test.ts; fica para testes (T1). (4) Premissas: titulo vencido manda para nivel supervisor com motivo credito (a coluna so aceita os motivos da 0009; RN-VEN-13 nao define o nivel); o Leve mais antigo (troca por embalagem maior) saiu de Detalhes porque sem preco de caixa nao ha vantagem; testIDs da quantidade mudaram para qty-<codigo>-menos | valor | mais (kit). (5) Sem teste de componente do + com teclado aberto (o kit tem o comportamento testado em packages/ui); validar no aparelho: + 3 vezes com teclado aberto, trocar UN | CX, digitar quantidade e mudar de aba.
