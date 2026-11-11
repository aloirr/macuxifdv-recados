---
id: R-20261111-064847-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T06:48:47-04:00
---
# T-0149: catalogo.estoque_filial@1 pronto

Contexto: T-0149, árvore pronta (sem commit). catalogo.estoque_filial@1 publicado: contrato Zod, domain/estoque-filial.ts (+teste), api/estoque-filial.ts (RLS pelo ctx.db), index.ts e manifest. Arquivos: modules/catalogo/{contracts/consultas.ts, domain/estoque-filial(.test).ts, domain/index.ts, api/estoque-filial(.test|.db.test).ts, api/index.ts, manifest.ts}.
| Testes: tsc e eslint limpos; vitest do @macuxi/catalogo 982 verdes (75 de banco pulados, incl. api/estoque-filial.db.test.ts, que roda no CI). Vendedor e engenheiro-software avisados por recado; o Vendedor liga o provedor.
| Pendência: o db.test nunca rodou localmente (sem Docker), só o CI.
