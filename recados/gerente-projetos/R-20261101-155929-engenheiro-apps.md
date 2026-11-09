---
id: R-20261101-155929-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0034
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T15:59:29-04:00
---
# T-0034 entregue: next-env fora do git, abas ⛔ com recados aos donos + barra com Mais, revisão das telas da T-0029

## Contexto
T-0034 (primeira tarefa do engenheiro-apps, R-20261101-150911). Três itens: next-env definitivo, abas ⛔ da matriz T-0028 e revisão das telas da T-0029.

## O que fiz
**1. next-env.d.ts (O-4)**
- `apps/web/.gitignore`: `next-env.d.ts` (com comentário); `git rm --cached apps/web/next-env.d.ts` feito (a exclusão está NO ÍNDICE; o arquivo segue no disco). No commit, inclua a exclusão (`git add apps/web` ou `git rm --cached` já preparado).
- `apps/web/package.json`: `typecheck` = `next typegen && tsc --noEmit`. Testado sem o arquivo: o `next typegen` recria `next-env.d.ts` e `.next/types`, então o CI (checkout limpo) não precisa dele versionado. `next dev` e o e2e não sujam mais a árvore.
- Nada na raiz nem no CI precisou mudar (`turbo.json` e `.github/**` intocados).
- Doc desatualizado (não é meu): `docs/desenho/T-0001.md:284` diz que `next-env.d.ts` é versionado; `docs/backlog.md:50` pode ser dado como feito.

**2. Abas ⛔ (nenhuma causa no shell; o shell monta certo a partir de manifesto + licença + perfil + ação)**
- Loja (D-C00b): `modules/promotor/app/index.ts` exporta `{}` → R-20261101-155034 ao modulo-promotor.
- Catálogo (D-C00c): `modules/catalogo/app/index.ts` tem `moduloApp` sem `paginas` → R-20261101-155035 ao modulo-catalogo.
- Equipe/Aprovações (D-G05): `modules/gestor/app/index.ts` exporta `{}` E o Gestor não está licenciado no tenant demo (T-0026) → R-20261101-155037 ao modulo-gestor. **Decisão sua/do Alexandre**: licenciar o Gestor na demo (seed do banco-dados) quando as telas chegarem; sem licença a aba não aparece, o que está certo. Apontei também a sobreposição Aprovações (Gestor) × Pedidos › "Para aprovar" (Vendedor) e propus um só lugar de decisão.
- Melhorias no shell (preparando a chegada dessas abas):
  - Barra inferior com no máximo 5 posições; o excedente vai para a tela **Mais** (`/mais`, `tab-mais`, itens `mais-<modulo>-<id>`). Com Catálogo, Pesquisas, Treinar, Equipe etc. o Campo chegaria a 8 abas e o Gestão a 10 (inutilizável no aparelho de entrada). Hoje a demo não muda (Campo 5, Gestão 3 posições), então os testIDs e os casos e2e atuais continuam valendo.
  - Furo de licença fechado: na API real, sem resposta de `/v1/me/modulos` guardada, o app montava TODOS os módulos do perfil (sem olhar a licença). Agora monta só o Core; o 404 só cai no padrão do perfil no modo demo (mock-api).
  - Pedi `ordem` às páginas (Pedidos 40, Loja 40, Catálogo 60, Equipe 10, Aprovações 20) para o que é frequente ficar na barra.
- RN-PRO-01: promotor sem aba Pedidos (barra e "Mais"), coberto em `apps/mobile/src/lib/abas.test.ts`. Pedi ao Vendedor `perfis` na página `pedidos` (defesa em profundidade: `pedido.ver` inclui o promotor).

**3. Revisão das telas da T-0029** → R-20261101-155135 ao modulo-vendedor (cc engenheiro-software): 0 🔴, 16 🟡, 12 🟢 com arquivo:linha. 3 toques ok (Campo pela ficha: 3; Gestão aprovar: 3).

## Arquivos
- `apps/web/.gitignore`, `apps/web/package.json`, `apps/web/next-env.d.ts` (fora do índice)
- `apps/mobile/src/lib/abas.ts` (novo), `apps/mobile/src/lib/abas.test.ts` (novo, 7 testes), `apps/mobile/src/lib/efetivos-locais.ts` (novo), `apps/mobile/src/app/(tabs)/mais.tsx` (novo), `apps/mobile/src/app/(tabs)/_layout.tsx`, `apps/mobile/src/components/tab-bar.tsx`, `apps/mobile/src/state/plataforma.tsx`
- `packages/ui/src/mobile/icon.tsx` (ícone `menu`)
- `.coord/diario/engenheiro-apps.md`

## Testes
- web: typecheck (`next typegen && tsc`) e lint verdes.
- mobile: lint, typecheck e test verdes (7 arquivos, 43 testes); packages/ui: lint, typecheck e test verdes (34).
- Bundle Android (`expo export:embed`) verde nas 2 variantes: campo e gestao (1635 módulos cada). **Nenhum build EAS disparado.**
- `node scripts/coord.mjs verificar engenheiro-apps`: OK, nenhuma violação.

## Pendências
- Donos dos módulos: telas Loja, Catálogo, Equipe/Aprovações (recados acima); quando chegarem, eu reviso e rodo o bundle.
- Licença do Gestor no tenant demo: decisão do gerente/Alexandre + banco-dados.
- testes: os `it.fails` D-C00b/D-C00c/D-G05 de `tests/modulos/demo-abas.test.ts` viram `it` quando os módulos entregarem; os casos de UI (Maestro/manual M-D09) podem conferir `tab-mais` quando houver mais de 5 posições.
- Falso positivo do guardião: avisos sobre `modules/vendedor/api/*`, `packages/platform-sdk/src/fuso*` e recados do engenheiro-software durante meus comandos; não desfiz nada.

## Pronto quando
Fechamento da T-0034 pelo gerente; o commit precisa levar a exclusão de `apps/web/next-env.d.ts` do índice junto com o `.gitignore`.
