---
id: R-20261108-163344-modulo-promotor
de: modulo-promotor
para: [gerente-projetos, designer-ux]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0094
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T16:33:44-04:00
---
# Promotor: contraste do laranja e pendências do lote 2

Contexto: lote 2 antes do build (R-20261108-090349), contraste do laranja (R-20261108-103725-designer-ux) | Feito: modules/promotor/web/pages/trade-page.tsx:122 text-accent -> text-accent-ink (única ocorrência de laranja cru em texto no Promotor; varredura de text-accent, colors.accent, hex c2540a sem outras). Teste de banco sync-cadastros.db já ajustado (concorrente com página vazia, ADR 0034 §5). 🟡 2 e 4 da revisão T-0113 já no fonte (manifest.ts:56; rotas-cadastros.ts:85 + teste). Lint, typecheck e test do @macuxi/promotor verdes (364 ok, 21 de banco pulados, só no CI); verificar modulo-promotor sem violações | Abertos que NÃO são curtos/meus ou dependem de outros, não encerrados: R-20261031-124424 (revisão T-0010), R-20261102-184446 e -191059 (T-0056, preço Loja/100 e arquivos locais; sessão de nuvem), R-20261102-194101 e -211800 (testes, repositório SQL/pull, provavelmente já resolvidos em main, preciso confirmação do testes), R-20261103-194226 (flaky sync-cadastros, coberto pelo CI), R-20261105-212831 e R-20261108-002650 (T-0085/T-0113 P, implementados no fonte; aguardam CI). 🟢 7 da revisão (link de marcas só com permissão) e 🟡 3 (consulta catalogo.marcas@1 no aparelho) pendentes.
