---
id: R-20261031-121145-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0007
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T12:11:45-04:00
---
# Merge da rodada: 3 conflitos resolvidos; api#test vermelho pela fixture dois-tenants (banco-dados); revisão T-0007 com 1 🔴

## Contexto
Fechamento da rodada. Merge da nuvem (T-0007 6fba044, T-0012 f4fdbe5, T-0005 d277a55) em andamento no main local.

## O que preciso / o que mudou
- Conflitos resolvidos, sem marcador e com git add, sem commit. O lado da T-0004 já cobria a T-0007, porque o catálogo está em `instalados.ts` e as deps @macuxi/* estão no package.json.
  - apps/mobile/package.json: lado HEAD, que já tem catalogo, comum, fontes, expo-print e expo-sharing.
  - apps/mobile/src/lib/modulos.ts e apps/web/lib/modulos.ts: lado HEAD, os 8 módulos por MANIFESTOS_INSTALADOS, mais um comentário sobre a T-0007/ADR-0005.
- Arquivos que o git juntou sozinho:
  - apps/web/package.json ficou com a chave `@macuxi/catalogo` duplicada. Corrigi.
  - apps/mock-api/package.json: só a ordem alfabética, corrigida.
  - apps/mobile/src/services/api.ts e apps/mock-api/src/legado/contratos.ts estão coerentes.
  - O pnpm-lock.yaml ficou inalterado após o install ("Lockfile is up to date").
- Checks:
  - pnpm install OK.
  - pnpm lint verde, fronteiras sem violação.
  - pnpm typecheck verde (18/18).
  - pnpm --filter web build OK.
  - pnpm test: **vermelho em api#test**, 2 testes com banco real em apps/api/test/banco.test.ts:81 e :186. Os outros 17 pacotes e o tests/ estão verdes.
- Causa do vermelho: a T-0007 fez o Vendedor depender do Catálogo, e a fixture db/seeds/fixtures/dois-tenants.ts (dono: **banco-dados**) licencia o vendedor sem o catalogo. Por RN-CORE-03 o Vendedor some (GET /v1/me/modulos devolve ['core'], POST de pedido dá 403). Pedido enviado: R-20261031-121105-engenheiro-software. Depois da fixture, eu ajusto as expectativas de banco.test.ts (é meu). Na nuvem os testes passaram porque, sem banco, são pulados.
- Revisão T-0007 (R-20261031-121124-engenheiro-software): 1 🔴, que é a fixture acima. 3 🟡: consumidor de integracao.produto.atualizado@1, meus registros e ADR-0005 desatualizados, e a duplicata do package.json, já corrigida. As T-0003 Fase 2 e o OrderStatus podem seguir, porque os contratos estão estáveis.

## Pronto quando
O push fica bloqueado até o banco-dados corrigir a fixture e eu ajustar o banco.test.ts. Outra opção, decisão do gerente: commitar o merge sem push e esperar a correção.
