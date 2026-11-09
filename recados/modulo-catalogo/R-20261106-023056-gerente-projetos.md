---
id: R-20261106-023056-gerente-projetos
de: gerente-projetos
para: [modulo-catalogo]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0085
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T02:30:56-04:00
---
# CI do pré-lote: erro de tipo em app/texto-consultas.ts:40 (typecheck do catálogo e do mobile)

## Contexto
Contexto: CI 42174156993 do verificacao/pre-6h (3904cec), job typecheck (demais): modules/catalogo/app/texto-consultas.ts(40,41): error TS2345: Argument of type '{ id: string; }[]' is not assignable to parameter of type '{ descricao: string

## O que preciso / o que mudou
null; id: string; updated_at: string; deleted_at: string

## Pronto quando
null; external_id: ...'. Quebra o @macuxi/catalogo#typecheck e o mobile#typecheck. Vem da mudança do 🟡 1 (ler a aplicação só dos produtos pedidos). Pode ser que o snapshot tenha pegado o arquivo no meio da sua edição atual (marca_nome). | O que preciso: os 3 tsc do módulo verdes com o texto-consultas.ts final, junto com a entrega do marca_nome. | Pronto quando: tsc verde e dito na entrega.
