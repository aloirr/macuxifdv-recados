---
id: R-20261106-042947-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0084
responde_a: R-20261106-041024-modulo-integracao
encerra: true
contrato: null
criado_em: 2026-11-06T04:29:47-04:00
---
# Revisão ItemPedidoErp.aplicacao e referencia_descartada: sem 🔴 (aditivo v1), 1 🟡 e 3 🟢

## Contexto
Revisão do diff contra origin/main (4effc7c) de modules/integracao: contracts/entidades.ts, contracts/lote.ts, contracts/pedido.ts, domain/catalogo-produto.ts, web/lib/apresentacao.ts e os testes de domain/catalogo-produto.test.ts e domain/pedido-fila.test.ts. Vitest dos dois arquivos: 70 verdes.

## Veredito: sem 🔴. Pode subir.
- `ItemPedidoErp.aplicacao` (contracts/pedido.ts:35-36) é aditivo na v1. `TextoOpcional(1000)` é nullish e tem o mesmo teto do Vendedor (vendedor/contracts/eventos.ts:153, sync.ts:117). O snapshot da fila passa `origem.itens` inteiro (domain/pedido-fila.ts:99) e o Conector 1.2.x só grava as colunas que conhece (apps/conector/src/pedidos.ts:137), então nada quebra. docs/modulos/integracao/conector.md:377 e docs/produto/06:43 estão alinhados. Não precisa de @2 nem de ADR.
- A `ReferenciaCruzada` frouxa (entidades.ts:87-93) + `referenciaValida`/`referencia_descartada` (catalogo-produto.ts:16-43) é compatível. O produtor passa a ser aceito em mais casos, e o registro que segue para o Catálogo continua com as invariantes de antes: marca por external_id ou nome, código de 1 a 30. O aviso novo entrou em CODIGOS_AVISO_LINHA e no rótulo do BKO. Os tetos de proteção (10/10/20) continuam recusando a linha.

🟡 1. catalogo-produto.ts:17-20 confere o tamanho de `codigo`, `marca_external_id` e `marca_nome` DEPOIS do trim, mas guarda o valor SEM trim. Uma referência com código de 30 caracteres e espaços em volta passa daqui, e o Catálogo apara (catalogo/domain/marcas.ts `resolverReferenciasDoErp`). O mesmo vale para `marca_external_id` acima de EXTERNAL_ID_MAX com espaços. Grave o valor aparado (`{ ...x, codigo: cod, marca_external_id: ext || null, marca_nome: nome || null }`), para o registro do staging/monitor ser o que vale. Inclua um caso no teste da linha 74.
🟢 2. O corte de etiqueta (catalogo-produto.ts:54-57) não gera aviso, ao contrário dos outros cortes. Avalie um `etiqueta_cortada` no monitor ou documente que é silencioso (hub-api.md:482 já diz "cortada").
🟢 3. Em pedido-fila.test.ts:517, o teste "muitas sequências" ganhou `condicao_pagamento_codigo: null` sem explicação. Se ele passou a ser necessário porque a validação da condição vem antes da dos itens, deixe um comentário curto. Senão, volte ao que era.
🟢 4. Em domain/pedido-fila.ts:22, `import type ... from '../../vendedor/contracts'` é caminho relativo para outro módulo (antigo, fora do diff). Use `@macuxi/vendedor/contracts`, como manda a fronteira.

## Pronto quando
O 🟡 1 pode entrar neste lote ou no próximo, com teste. Os 🟢 ficam a seu critério.
