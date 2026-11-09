---
id: R-20261105-233639-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0086
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T23:36:39-04:00
---
# T-0086: perfis EAS de produção (APK, EAS assina), BKO aceita bko./config. e rota /config pronta; comandos do build

## Contexto
T-0086, a minha parte: o perfil EAS de produção, as origens do BKO de produção e a rota do portal `config.`. Não houve build EAS, commit, Docker nem leitura do `.env`.

**1. Perfil EAS de produção (`apps/mobile/eas.json`).** São os perfis `campo-producao` e `gestao-producao`, que já existiam e agora estão ajustados:
- environment `production` da EAS;
- `android.buildType: apk` e `distribution: internal`, com link de instalação direto;
- `credentialsSource: remote`: a keystore é a gerenciada pela EAS, e nenhuma keystore fica no repositório;
- `autoIncrement` do versionCode, que é remoto;
- `EXPO_PUBLIC_API_URL=https://api.macuxifdv.com.br/v1` e `EXPO_PUBLIC_PERFIL_BUILD=producao`: sem campo Servidor e sem a tela de diagnóstico.

O nome e o ícone já eram iguais em todos os perfis ("Macuxi Campo"/"Macuxi Gestão", sem "Preview"). Ajustei só o cabeçalho do `apps/mobile/app.config.ts`. O `eas-cli 27.2.0 config` lê o perfil sem erro.

**Premissa:** mantive os nomes `*-producao`, já citados no doc 04 e nos recados, em vez de criar um perfil chamado `production`. "production" é o environment da EAS. Se quiser os nomes em inglês, é só um rename.

**2. Origens do BKO (`apps/web/next.config.ts`).**
- `bko.macuxifdv.com.br` e `config.macuxifdv.com.br` entram fixos, junto com o `bko-demo`;
- `MACUXI_BKO_ORIGEM` também aceita uma lista separada por vírgula;
- o build arg atual do workflow (`MACUXI_BKO_ORIGEM=https://bko.macuxifdv.com.br`) não muda, e o Dockerfile também não. Combinado no R-20261105-233533 ao engenheiro-software, com encerramento.

**3. Rota `config` (apps/web).**
- `apps/web/proxy.ts` (Next 16) reescreve qualquer caminho do host `config.` para `/config`. Ficam de fora `/login`, `/_next`, `/api-proxy` e o favicon. A regra é pura, em `apps/web/lib/portal.ts`, com teste;
- `apps/web/app/config/page.tsx` mostra "Portal de implantação — em breve" e exige login: sem sessão, vai para `/login?next=/`;
- `app/config/[...caminho]` devolve 404, para não cair no shell do BKO;
- o conteúdo, o acesso só do super-admin e o 2º fator ficam para a T-0087.

**4. Roteiro.** O `docs/desenho/T-0086.md` é do engenheiro-software. Mandei a ele o texto do §5 item 6, com os comandos, no R-20261105-233600. Os comandos que você roda depois de ligar, em `C:\macuxifdv-check\apps\mobile`, com o commit da tag e `pnpm install --frozen-lockfile`:

```
npx eas-cli build --platform android --profile campo-producao  --non-interactive --no-wait
npx eas-cli build --platform android --profile gestao-producao --non-interactive --no-wait
```

Rode antes o bundle local (no recado) e confira `https://api.macuxifdv.com.br/v1/saude` com `"versao":"v1.0.0"`.

**Testes:**
- apps/web: eslint, typecheck (`next typegen` + tsc) e vitest 25/25 verdes, com os arquivos novos `portal.test.ts` e `hosts-bko.test.ts` atualizado;
- `next build` com o proxy e `next start`, simulando o Host:
  - `/login` dá 200 em 127.0.0.1, bko. e config.;
  - `config./` dá 200 no portal;
  - `bko./` dá 200 no BKO;
  - `config./x` dá 404;
- apps/mobile: eslint, tsc e vitest 229/229 verdes;
- bundle Android com o env de produção verde nas duas variantes, 2035 módulos cada. O bundle tem `api.macuxifdv.com.br/v1` e não tem `api-demo`;
- `verificar engenheiro-apps`: OK.

## O que preciso
**Pendências e riscos:**
- O admin do tenant de teste não entra no Campo nem no Gestão (PERFIS_DO_APP). Para provar "o APK entra no tenant de teste", o tenant precisa de um vendedor ou promotor (Campo) e de um supervisor ou gerente (Gestão). Se o `tenant:criar` só cria o admin, crie esses usuários antes do teste.
- O APK de produção usa o mesmo pacote do APK de preview e instala por cima dele. A base local é por usuário, então não mistura com a demo. Mas, no mesmo aparelho, não dá para ter a demo e a produção ao mesmo tempo.
- O `next start` de conferência ficou rodando na porta 3199 e o `next dev` na 3198, porque o encerramento do processo foi negado pela permissão. Pode fechar.
- Nesta rodada não tratei dois pedidos da caixa: o R-20261105-212839 (T-0084/T-0085, revisão e medição do FTS) e o R-20261105-214757 (T-0055, conferência do novo pedido na Gestão).

## Pronto quando
Commit desta rodada no `main`, com o CI verde. Depois de ligar a produção, os 2 builds acima.
