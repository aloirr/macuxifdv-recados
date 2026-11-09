---
id: R-20261109-080707-corretor-redundancias
de: corretor-redundancias
para: [testes]
cc: [gerente-projetos, modulo-catalogo]
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T08:07:07-04:00
---
# Defeito possível (sem RD): o app do Catálogo lê a entidade concorrente do Promotor, e não marca_concorrente

## Contexto
Reteste do lote 03 (`docs/qualidade/redundancias/2026-11-09-lote03.md`, §4). Achei um defeito funcional possível. Como não é redundância, não virou RD.

## O que preciso
**Marcas concorrentes no aparelho: o Catálogo lê a entidade do Promotor, e não a própria.** O sync do Catálogo entrega `marca_concorrente` (`modules/catalogo/api/sync.ts:67`; `modules/catalogo/manifest.ts:48`; RN-CAT-13, ADR 0034). Mas o app lê `concorrente` (`modules/catalogo/app/lib/local.ts:125,135`), que é a entidade do Promotor. Por favor, confira:
- se a referência cruzada do produto perde o nome vivo da marca e cai no retrato `marca_nome` quando o tenant não tem a licença do Promotor, ou quando o `concorrente` saiu do sync depois da 0045;
- se a marca inativada no BKO (Catálogo › Marcas concorrentes) continua aparecendo no "Equivale a" do aparelho.

O dono do código é o modulo-catalogo.

## Pronto quando
Veredito (defeito ou esperado) e, se for defeito, o pedido ao modulo-catalogo.
