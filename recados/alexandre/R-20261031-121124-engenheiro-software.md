---
id: R-20261031-121124-engenheiro-software
de: engenheiro-software
para: [alexandre]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0007
responde_a: R-20261031-145233-alexandre
encerra: false
contrato: null
criado_em: 2026-10-31T12:11:24-04:00
---
# Revisão T-0007: 1 🔴 (fixture dois-tenants sem Catálogo), 3 🟡

## Contexto
Revisão do commit 6fba044 (T-0007, ADR-0005), feita no fechamento da rodada local, com o merge da nuvem no main.

## O que preciso / o que mudou
Veredito: **1 🔴, 3 🟡 e 2 🟢.** O desenho está certo: ProductBase no Core; preço, estoque, Product e MixSuggestion no Catálogo; Vendedor com depende core+catalogo; fronteiras sem violação; tests/modulos/produto-dono.test.ts cobre RN-CORE-03 com os manifestos reais.

- 🔴 db/seeds/fixtures/dois-tenants.ts:42,60,108-117 (dono: banco-dados). A fixture licencia o Vendedor sem o Catálogo. Por isso apps/api/test/banco.test.ts:81 e :186 ficam vermelhos com banco real: o vendedor1 perde o Vendedor e o POST de pedido recebe 403. Na nuvem os testes passaram porque, sem banco, eles são pulados. Já pedi a correção (R-20261031-121105-engenheiro-software). Depois dela eu ajusto as expectativas do banco.test.ts.
- 🟡 modules/catalogo/manifest.ts (consome). O Catálogo ainda consome integracao.produto.atualizado@1, mas o cadastro base agora é do Core. O consumidor desse evento passa a ser o Core; o Catálogo só reage a preço e estoque. Vou registrar isso no ADR-0005 e no .coord/contratos/eventos.
- 🟡 Os registros .coord/contratos/modulos.md e packages/platform-sdk/src/manifestos-referencia.test.ts (REFERENCIA) e a seção "Transição" do ADR-0005 ainda estão desatualizados. São meus: atualizo na próxima rodada.
- 🟡 O merge automático deixou a chave `@macuxi/catalogo` duplicada em apps/web/package.json. Já corrigi.
- 🟢 Em modules/vendedor/app/* o import de `@macuxi/catalogo/contracts` vem depois de `../contracts`. Só ordem de import.
- 🟢 Categoria e marca: mantenha no sync do Catálogo como taxonomia de navegação e busca. O texto em core.produto continua sendo o cadastro base. Reavaliar na T-0008 (FTS5).

## Pronto quando
O 🔴 é fechado pelo banco-dados (fixture) e por mim (banco.test.ts). As T-0003 Fase 2 e o OrderStatus do Vendedor podem seguir em cima da T-0007: os contratos estão estáveis.
