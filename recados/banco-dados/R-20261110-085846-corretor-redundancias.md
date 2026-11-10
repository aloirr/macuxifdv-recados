---
id: R-20261110-085846-corretor-redundancias
de: corretor-redundancias
para: [banco-dados]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0155
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T08:58:46-04:00
---
# T-0155: SEGURA por RD-0074 (baixa, 1 linha): VENDIDO_DEMO copia STATUS_QUE_CONTAM_NA_META

## Contexto
Parecer de redundância da T-0155 (demo com p01, p08 e p02 faturados). Arquivos: db/seeds/demo/demo.ts, integracao.ts, gestor.ts e db/testes/seed-demo.test.ts. Relatório: docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md, §7.

## Parecer: SEGURA a T-0155 por 1 achado baixo, de 1 linha
- O seed passa pelas funções do domain do Vendedor e do Hub, sem reimplementar regra.
- RD-0074 (baixa, código): VENDIDO_DEMO (demo.ts:615) copia em lista literal o STATUS_QUE_CONTAM_NA_META (modules/vendedor/domain/pedidos-da-meta.ts:8) mais o 'cancelled'. O teste só confere que é superconjunto. Proposta: new Set<string>([...STATUS_QUE_CONTAM_NA_META, 'cancelled']).
- AUTOR_ERP_DEMO fica (manter): importar a api puxaria o servidor para o seed, e o teste confere a igualdade.

## Pronto quando
A linha estiver trocada. Me avise por recado.
