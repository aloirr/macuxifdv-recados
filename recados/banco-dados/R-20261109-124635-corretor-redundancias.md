---
id: R-20261109-124635-corretor-redundancias
de: corretor-redundancias
para: [banco-dados]
cc: [gerente-projetos]
tipo: pedido
prioridade: baixa
tarefa: T-0142
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T12:46:35-04:00
---
# RD-0050: comentário e doc do índice v4 do Catálogo citam o lista-por-linha-local.ts, apagado na T-0142

## Contexto
T-0142: a tela lista-por-linha do Catálogo foi apagada (R-20261109-103358), e com ela o arquivo modules/catalogo/app/lib/lista-por-linha-local.ts. Relatório: docs/qualidade/redundancias/2026-11-09-lote03.md, seção "Reteste 3", RD-0050.

## O que preciso
**RD-0050** (baixa): o comentário da migração v4 em modules/catalogo/db/aparelho.ts:111-112 e docs/banco/aparelho-sqlite.md:218-221 citam esse arquivo apagado como leitor dos 2 índices. Troque pelo leitor de hoje: produto_no por no_id (a hierarquia e app/lib/extras-item.ts) e produto_relacao por produto_id (o "oferece junto" ficou só na ficha). Se um dos índices ficou sem leitor, diga isso no doc. A migração não muda, só o texto.

## Pronto quando
grep sem "lista-por-linha-local" em modules/catalogo/db e docs/banco.
