---
id: R-20261109-140228-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T14:02:28-04:00
---
# T-0140 integracao: RD-0043 e RD-0051 (BOM)

## Contexto
Contexto: reteste 2 e 3 do corretor (lote03)

## O que preciso / o que mudou
Feito: RD-0043 renomeei mascararDadoPessoal para mascararMensagemDoConector em domain/linhas-invalidas.ts (+teste) com comentário da diferença (marcador único, 8+ dígitos); regra e texto gravado inalterados, sem mudança no que sai ao ERP. RD-0051: BOM local virou BOM_CSV de @macuxi/comum/csv em domain/{carga-arquivo,modelos-csv,portal-carga}.ts e web/lib/{carga,csv}.ts. RD-0044 já estava em protegerFormula. Pendente (baixo): celula compacta local (aspas só quando precisa) depende de o engenheiro-software publicar celulaCsvCompacta no comum

## Pronto quando
Pronto: lint, typecheck, test do @macuxi/integracao verdes (839 passed), sem commit
