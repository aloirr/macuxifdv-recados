---
id: R-20261114-070137-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: alta
tarefa: null
responde_a: R-20261114-072600-alexandre
encerra: false
contrato: null
criado_em: 2026-11-14T07:01:37-04:00
---
# PC pronto para desligar: árvore limpa (retestes locais no stash oficial-local-14-11); EAS do Oficial precisa do PC por ~10 min (comando dentro) ou de EXPO_TOKEN + workflow

## Contexto
Resposta ao R-20261114-072600 (o PC desliga às 7h45).

**Itens 1 a 3, feitos:**
- **Nada novo no PC.** Nenhum agente local está rodando.
- **Git:** a árvore do PC está limpa. Ela fica na branch `trabalho/v1.0.6` (base 1387e788), que não sobe para o main.
  - Descartados, por já estarem no main: o `versao.json` 1.0.7, o doc 03 com a RN-CORE-52 e os pareceres da v1.0.6.
  - Só existiam no PC os retestes locais do corretor e da marca: `docs/qualidade/redundancias/2026-11-14-oficial.md`, `docs/marca/pareceres/2026-11-14-oficial.md`, os dois catálogos e os dois diários. Foram para o **stash `oficial-local-14-11`** e **não são publicados**; vale o reteste da nuvem.
  - Ficam fora do git, como sempre: `.vscode/`, que não tem dono, e `_instalar/agentes-novos/`, que é seu.
  - Backup anterior no ref `backup/pc-2026-11-13-2140`.

## a) EAS do Oficial sem o PC
**Hoje não dá: o EAS só sai do PC.** Não há workflow de EAS no GitHub, e a sessão do Expo (`npx eas login`) vive no PC. Há três caminhos:

1. **Ligar o PC por uns 10 minutos** quando o commit do Oficial estiver pronto. No PowerShell, com `<commit>` igual ao commit final do "PRONTO PARA A TAG":
   ```powershell
   cd C:\macuxifdv-check
   git fetch origin main
   git checkout --detach <commit>
   pnpm install --frozen-lockfile
   cd apps\mobile
   $env:EAS_SKIP_AUTO_FINGERPRINT="1"
   node scripts/eas/build.mjs ambos oficial -- --no-wait
   ```
   Isso leva uns 5 minutos para enviar. Com o `--no-wait`, dá para desligar o PC logo depois do "enviado ao EAS". O build roda na nuvem do Expo em uns 25 a 30 minutos, e os links aparecem em https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds.
   - O `--no-wait` ainda não foi testado com o `build.mjs`. Se ele recusar, rode sem ele e deixe o PC ligado até os dois links saírem (~30 min).
2. **Sem o PC, pela nuvem.** Exige três coisas:
   - você cria um **EXPO_TOKEN** em expo.dev → Account settings → Access tokens;
   - você grava o token como secret `EXPO_TOKEN` no GitHub;
   - você autoriza o engenheiro-software a criar um workflow `eas-build.yml` com `workflow_dispatch` (variante e perfil). É governança (`.github`), então precisa do seu ok. Leva uns 30 minutos para escrever e testar, e o CI gasta minutos de Actions.
3. **Pelo painel do Expo**, se o repositório estiver ligado ao Expo pelo GitHub (expo.dev → Project → GitHub). Não sei se ele está ligado, então não conte com esse caminho.

**Recomendo o 1.** É o mais rápido e não mexe na governança no dia do Oficial.

## b) Outros passos do Oficial que dependem do PC
- **Deploy de produção (`producao — publicar`):** não depende do PC. A chave SSH da VM está nos secrets do GitHub. Precisa só da sua tag `v1.0.7` (no navegador) e do seu aprovo, que já foi dado (R-20261114-052600).
- **Recados (`coord.mjs`):** a ponte e a nuvem usam o token delas. Não dependem do PC.
- **APK com nome legível (`baixar-apk.mjs --publicar`):** depende do PC e das variáveis `MACUXI_APK_S3_*`, que ainda não existem. Sem elas, use o link do EAS. Não segura o Oficial.
- **`.env` do PC:** só a demo e a carga de fotos usam. O Oficial não usa.
- **Guardião:** está desligado só neste PC (`MACUXI_GUARDA=off` no `.claude/settings.local.json`). Para religar, apague a chave `env` desse arquivo. A nuvem não é afetada.

## Pronto quando
Você escolheu o caminho do EAS (recomendo o 1). O diário foi gravado. Pode fechar o VS Code.
