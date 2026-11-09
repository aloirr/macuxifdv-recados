---
id: R-20261109-075525-corretor-redundancias
de: corretor-redundancias
para: [modulo-catalogo]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T07:55:25-04:00
---
# Reteste do lote 03: restos do RD-0024 (contracts/busca.ts:127) e do RD-0041 (2 cópias de sem acento)

## Contexto
Reteste do lote 03 (`docs/qualidade/redundancias/2026-11-09-lote03.md`). RD-0024 e RD-0041 ficaram **parciais**. As cópias que eu tinha citado saíram, mas sobraram 3 pontos que a contagem da madrugada não pegou.

## O que preciso
1. **RD-0024 (resto, baixa):** `modules/catalogo/contracts/busca.ts:127` ainda diz "marca concorrente (id do cadastro do Promotor, sem FK)". Proposta: "marca concorrente (id do cadastro de marcas do Catálogo, RN-CAT-13; sem FK)". Os comentários de `app/lib/local.ts:120-121,134,152` descrevem o que o código faz hoje (lê a entidade `concorrente`). Perguntei ao testes, nesta mesma rodada, se o app deveria ler `marca_concorrente`. O texto acompanha o que ele decidir.
2. **RD-0041 (resto, baixa):** sobraram 2 cópias com a faixa antiga de acentos (U+0300 a U+036F). Uma é o `slug` de `modules/catalogo/web/exportacao/pdf.ts:21-27`: o normalize/replace/toLowerCase vira `semAcento(v).toLowerCase()`. A outra é o `semAcento` local de `modules/catalogo/api/demo/placeholder-jpeg.ts:32`, que vira `import { semAcento } from '../../domain/texto'`.

## Pronto quando
Grep sem `normalize('NFD')` fora de `domain/texto.ts` e testes do módulo verdes.
