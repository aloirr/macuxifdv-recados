---
id: R-20261105-013242-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0024
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T01:32:42-04:00
---
# T-0024 revisão (catraca só com o catalogo, decisões a/b) e expo-sqlite instalado sem commit

## Contexto
T-0024 (onda C, revisão) e instalação do expo-sqlite (R-20261105-004914, janela nos moldes do R-20261104-231036).

## O que fiz
**T-0024 — veredito por módulo** (detalhe em docs/desenho/T-0024.md §4):
- integracao 🟢 com 2 🟡 (pedido R-20261105-013123): importar do subpath `@macuxi/platform-sdk/eventos`; corrigir o tipo do `registro` por entidade.
- vendedor 🟢 (🟢 tirar `registroDaNota` depois da correção da integracao).
- treinamento 🟢.
- core 🟢 com 1 🟡 (R-20261105-013128): trocar `eventoErp<E>` por `eventoTolerante(EVENTO_ERP_*)` quando a integracao corrigir.
- gestor 🟢 parcial (ainda mexendo): `EVENTOS_CONSUMIDOS` todo `tolerante(<dono>)`, `core.meta.definida@1` passou a ser consumido; revisão final quando ele entregar.
- pesquisa/promotor: só o teste conferir, nunca estiveram nos PENDENTES.
**Catraca**: `apps/api/test/eventos-contratos.test.ts` agora só tem pendentes do **catalogo** (2 publicações sem schema + 4 consumos `integracao.*`); 3/3 verdes. O catalogo está trabalhando nisso agora (arquivos novos em modules/catalogo/contracts); quando ele entregar, tiro as linhas.
**Decisão (a)**: o Conector não vai levar o índice do SDK: criei o subpath leve `@macuxi/platform-sdk/eventos` (packages/platform-sdk/package.json exports + teste `src/eventos-subpath.test.ts`, que garante que `eventos.ts` só importa `./nomes`). Regra: contracts que roda fora da API importa do SDK só esse subpath.
**Decisão (b)**: a correção fica no dono (Integracao): `z.optional(SCHEMA_REGISTRO[entidade] as (typeof SCHEMA_REGISTRO)[E])`, só tipo, continua `@1`, sem ADR (conferi com tsc).
**Registro** `.coord/contratos/eventos.md`: coluna "Schema em" atualizada (dono/tolerante por evento, só o catalogo com cópia).

**expo-sqlite**: `npx expo install expo-sqlite` instalou 57.0.4 (`~57.0.4` no apps/mobile/package.json). O primeiro lock mexeu em outra dependência: o drizzle-orm do @macuxi/db tem expo-sqlite como peer opcional e o pnpm passou a ligá-lo, o que levaria expo + react-native para a imagem da API (Dockerfile `--filter "@macuxi/db..."`). Fui desfazer (`git checkout -- apps/mobile/package.json pnpm-lock.yaml`), mas **o guardião bloqueou** o checkout do package.json (dono: engenheiro-apps). Não contornei: corrigi pelo meu lado com `.pnpmfile.cjs` na raiz (hook readPackage que deixa o drizzle só com os peers `pg`/`@types/pg`) e `pnpm install`. Lock final: só `expo-sqlite` + `await-lock` (subdependência direta) + `pnpmfileChecksum`, além de os metadados de peers opcionais do drizzle saírem do lock (mesma versão, mesma resolução `0.45.4(@types/pg)(pg)`). `pnpm --filter mobile typecheck` verde; os tipos do sqlite-expo.ts existem no .d.ts.

## Arquivos
Meus: apps/api/test/eventos-contratos.test.ts, packages/platform-sdk/package.json, packages/platform-sdk/src/eventos.ts (comentário), packages/platform-sdk/src/eventos-subpath.test.ts (novo), docs/desenho/T-0024.md, .coord/contratos/eventos.md, .pnpmfile.cjs (novo), pnpm-lock.yaml. Do engenheiro-apps (escrito pelo expo install): apps/mobile/package.json.

## Testes
Catraca 3/3; SDK eventos-subpath 3/3, tsc do SDK e eslint limpos; mobile typecheck verde; verificar engenheiro-software OK.

## Pendências / para o commit
- **Sem commit**: apps/mobile/package.json + pnpm-lock.yaml + .pnpmfile.cjs prontos para o commit do engenheiro-apps (junto com a tela de diagnóstico). Os TRÊS juntos: sem o .pnpmfile.cjs o `--frozen-lockfile` do CI/EAS/Docker falha pelo checksum. Se preferir não ter o pnpmfile, a saída é apagar ele e o engenheiro-apps reverter o package.json; aí a imagem da API leva o React Native.
- T-0024 fecha quando: integracao 🟡1/🟡2, core 🟡, catalogo e gestor entregues; eu tiro os PENDENTES do catalogo.
- O engenheiro-apps ainda roda o bundle:android das duas variantes.
