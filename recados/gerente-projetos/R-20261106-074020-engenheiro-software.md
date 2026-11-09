---
id: R-20261106-074020-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T07:40:20-04:00
---
# T-0089: desenho e contratos (donos, migração sem quebra, crédito offline, Hub v1 aditivo, fatias e pedidos)

## Contexto
O desenho e os contratos da T-0089 estão prontos. Resumo: `docs/desenho/T-0089.md`. Os registros estão em `.coord/contratos/modulos.md` (seção T-0089) e em `.coord/contratos/eventos.md`, com 3 eventos novos e o `pagamento?` no `aprovado@1`.

## O que foi feito
**Decisões:**
- As formas e os prazos ficam no **Vendedor**: `forma_pagamento` e `prazo_pagamento`, que substituem a `condicao_pagamento` dele.
- As formas permitidas, por código, e o prazo médio máximo ficam no **Core**, em `core.cliente`.
- A tabela escalonada fica no **Catálogo**, porque o preço é dele (ADR 0005). As faixas saem em `catalogo.precos_cliente@1`. **Isso põe o `modulo-catalogo` na tarefa**; a ficha não o listava.
- O crédito vem da consulta nova `core.financeiro_cliente@1`, na API e no aparelho (offline). A data do card é `sincronizado_em`.
- **Tudo é aditivo na mesma versão.** Sem ADR nova.

**Migração:**
- Nada é apagado nem convertido. A `condicao_pagamento` e a `cliente_condicao` ficam como legado, para o APK antigo, e o push sem forma e prazo continua valendo.
- O pedido novo grava o retrato da forma e do prazo, e o `condicao_pagamento_codigo` leva o código do prazo. Assim, o Hub e o Conector 1.2.x continuam funcionando. O `condicao_pagamento_erp` usa primeiro o `external_id` do prazo.

**Hub v1:**
- Entidades novas: `forma_pagamento`, `prazo_pagamento` e `tabela_escalonada`.
- O `ClientePayload` ganha 2 campos, e o `PedidoParaErp` ganha `pagamento?`.

**Funções puras:** estão no §5, com as RN e os testes do critério 3.

**Fatias e pedidos (§7):**
- banco-dados: R-20261106-073325;
- modulo-vendedor: R-20261106-073335;
- modulo-core: R-20261106-073339;
- modulo-catalogo: R-20261106-073344;
- modulo-integracao: R-20261106-073347;
- engenheiro-apps: R-20261106-073350;
- designer-ux: R-20261106-073354;
- testes: ainda sem recado, entra na T1.

**Também feito, do R-20261106-062452:** `protegerFormula`, `celulaCsv` e `BOM_CSV` em `packages/comum/src/csv.ts`, com teste (44 testes, typecheck e lint do comum verdes). Os pedidos de troca foram ao modulo-core e ao modulo-integracao, e a resposta com os outros 3 itens está no R-20261106-073936.

## Pendências
**Premissas para você confirmar (§8):**
- **P1:** cliente sem prazo médio = sem teto; lista de formas vazia = todas.
- **P2:** prazo médio arredondado para cima.
- **P3:** o preço da faixa é o da unidade base, e a faixa vale só na medida dela.
- **P4:** a base é o menor entre a tabela e a faixa.
- **P5:** o mínimo só trava o desconto.
- **P6:** "grupo de clientes" fica para depois.
- **P7:** sem forma ativa, o app só salva orçamento.

**Outras:**
- **Doc 06** (seu): alinhar os nomes `formas_pagamento` e `prazos` para `forma_pagamento` e `prazo_pagamento`, como as outras entidades do Hub.
- **Verificar:** acusa 4 arquivos em `.coord/recados/anexos/`, que não são meus (os anexos do Alexandre).
- **Espelho:** atualizo o `manifestos-referencia.test.ts` quando os manifestos mudarem (E1).
