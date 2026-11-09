---
id: R-20261105-062716-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [engenheiro-apps]
tipo: entrega
prioridade: normal
tarefa: T-0008
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T06:27:16-04:00
---
# expo-sqlite × drizzle-orm resolvido sem pnpmfile: ADR 0023 (overrides + imagem da API --prod)

## Contexto
T-0008, item 1 do R-20261105-054146 (expo-sqlite × drizzle-orm: nem remendo, nem adiar). ADR 0023 (proposta): docs/decisoes/0023-dependencias-do-app-fora-da-imagem-da-api.md, índice docs/decisoes/README.md.

## O que preciso / o que mudou
Opção escolhida (declarativa, sem hook):
1. pnpm-workspace.yaml: `overrides: "drizzle-orm>expo-sqlite": "-"` — o "-" retira só esse peer opcional do drizzle-orm do @macuxi/db; o expo-sqlite fica só no apps/mobile. O .pnpmfile.cjs foi APAGADO (não entra no commit).
2. Achado ao medir o fecho da imagem: o main (af6c368) já levava 97 pacotes expo/react-native à imagem da API pelas devDependencies dos módulos (o filtro "api..." instala dev de todos os projetos). apps/api/Dockerfile agora usa `--prod`; o tsx (roda API, worker e banco.ts) passou de devDependency a dependency do apps/api (mesma 4.23.15).
Alternativas descartadas na ADR: pnpmfile, peerDependencyRules, packageExtensions/peerDependenciesMeta, dependenciesMeta, lock separado do app, isolar o drizzle, trocar o ORM.

Prova:
- lock vs main: só +expo-sqlite@57.0.4 (importer apps/mobile), +await-lock, +bloco overrides, tsx muda de seção no apps/api; snapshot do drizzle igual ao do main: drizzle-orm@0.45.4(@types/pg@8.23.1)(pg@8.23.1); sem pnpmfileChecksum.
- pnpm why expo-sqlite -r → só mobile; pnpm why drizzle-orm -r → só @macuxi/db; pnpm --filter api --filter @macuxi/db why expo --prod / why react-native --prod → vazios.
- fecho da imagem no lock (api... + @macuxi/db..., --prod): 209 pacotes, 0 expo/react-native (sem --prod: 991, 97).
- instalação da imagem simulada sem Docker (cópia do contexto de build em pasta temporária, mesmo comando do Dockerfile): node_modules sem expo*, react-native*, next, vitest; todos os arquivos de entrada da API (menos servidor/worker, que sobem o processo) e dos seeds carregados com node --import tsx sem erro de módulo.
- pnpm install --frozen-lockfile verde.
- typecheck de @macuxi/db e de api verdes; lint do api sem erro (13 avisos já existentes); bundle:android campo 2010 módulos (36 s) e gestao 2010 módulos (38 s), verdes; coord verificar engenheiro-software sem violações.

Arquivos que vão JUNTOS no commit (T-0008): pnpm-workspace.yaml, pnpm-lock.yaml, apps/api/package.json, apps/api/Dockerfile, apps/mobile/package.json (expo-sqlite, do engenheiro-apps), docs/decisoes/0023-dependencias-do-app-fora-da-imagem-da-api.md, docs/decisoes/README.md. NÃO há mais .pnpmfile.cjs.
Observação: o pnpm install na raiz tirou 166 pacotes que estavam no node_modules sem estar no lock (sobra de instalação anterior); nenhum agente precisa reinstalar.

## Pronto quando
Commit dos arquivos acima juntos; o build da imagem no demo-publicar.yml (após o CI verde do push) confirma o --prod no container — sem Docker no PC (R-20261105-053835), essa é a única conferência que ficou para o CI. Depois: build campo-preview com a tela de medição da T-0008, com autorização do Alexandre.
