---
id: R-20261106-202601-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T20:26:01-04:00
---
# T-0089: revisão do Core C1-C3 e do kit U1 sem 🔴; Core C1/C2, kit e espelho podem subir

## Contexto
T-0089 E1 (parcial): fiz a revisão do Core (C1-C3, R-20261106-192109) e do kit U1/T-0090 do designer-ux, pelo diff local e contra docs/desenho/T-0089.md. Não revisei modules/vendedor, que está em curso.

## O que fiz
- **Core: sem 🔴** (R-20261106-202430). Fronteiras, contratos aditivos (o APK antigo segue), a ação `cliente.pagamento_editar` (analista, admin) com auditoria e RLS, "hoje" no fuso do tenant e nenhum dado pessoal em log: tudo ok.
  - 🟡 1: `exigeAprovacaoPorTituloVencido`, `pagamentoPermitidoAoCliente` e `PRAZO_TITULO_VENCIDO_PADRAO_DIAS` são regras do pedido duplicadas no domain do Core (pagamento-cliente.ts:7-8 e :44-64). Elas devem sair do Core.
  - 🟡 2: a C3 está incompleta. A ficha do BKO tem `formasDisponiveis={null}` fixo (cliente360-page.tsx:107). Falta uma rota que chame `vendedor.formas_pagamento@1` e o teste da tela.
  - 🟢: tirar o cast no consumidor do Hub (o `ClientePayload` já tem os campos) e esconder o painel quando o tenant não tem o Vendedor.
- **Kit: sem 🔴** (R-20261106-202434). Nenhum componente leva regra de negócio, e as props são compatíveis.
  - 🟡: no Segmentado compacto, o `flex: 1` do `segItem` estica o visual até 44 dp (formulario.tsx:128 e :499-501), quando deveria ficar em 30 dp.
  - Impacto nas telas atuais do Vendedor: novo-pedido-itens.tsx:207 (com 3 medidas transborda 3 dp) e novo-pedido-abas.tsx:435 e :447. A linha cresce 8 dp. Nada quebra.
- **Espelho**: packages/platform-sdk/src/manifestos-referencia.test.ts (o Core oferece `core.financeiro_cliente@1` e tem a ação nova; o Vendedor usa a consulta) e .coord/contratos/modulos.md (situação da consulta).

## Testes
- modules/core: vitest 1234 verdes (271 pulados, os de banco) e `tsc -p tsconfig.json` verde. Não rodei o tsconfig.web nem o mobile: fica para os checks da raiz.
- @macuxi/ui: vitest 157/157.
- Espelho: 7/7.
- `verificar engenheiro-software`: só as 4 violações de `.coord/recados/anexos/*` do alexandre, que não são minhas.

## O que pode subir
- **Pode subir**, com os checks da raiz verdes: Core C1/C2 (contratos, consulta na API e no aparelho, pull, consumidor e PUT), o kit U1/T-0090 e o espelho. Os 🟡 não bloqueiam.
- **Pendências**: a C3 completa e a correção do Segmentado compacto, que precisa ser conferida no aparelho antes da revisão de UX da V4. A revisão da 0037 do banco-dados (R-20261106-184517) continua na minha fila, fora deste escopo.
