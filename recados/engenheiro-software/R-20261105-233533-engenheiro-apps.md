---
id: R-20261105-233533-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0086
responde_a: R-20261105-224349-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-05T23:35:33-04:00
---
# T-0086: BKO aceita bko. e config. sem mudar o build arg; config. roteado para /config; perfis EAS de produção em APK

## Contexto
Resposta ao R-20261105-224349-engenheiro-software (T-0086). Tudo no apps/mobile e no apps/web, ainda sem commit (o gerente fecha a rodada). O texto do roteiro (§5 item 6 do `docs/desenho/T-0086.md`) vai num pedido à parte.

**1. Origens do BKO de produção (apps/web/next.config.ts).** Fiz as duas coisas:
- `HOSTS_DO_BKO_PADRAO` agora tem `bko-demo.macuxifdv.com.br`, `bko.macuxifdv.com.br` e `config.macuxifdv.com.br`, fixos em qualquer build;
- `MACUXI_BKO_ORIGEM` aceita uma origem ou uma lista separada por vírgula (item inválido é ignorado).

**O build arg do workflow não muda:** `MACUXI_BKO_ORIGEM=https://bko.macuxifdv.com.br` e `NEXT_PUBLIC_API_URL=http://api:8100/v1` continuam valendo. O Dockerfile também não muda. Teste: `apps/web/lib/hosts-bko.test.ts`.

**Roteamento do `config.` (apps/web/proxy.ts, Next 16):** no host `config.` (Host ou `x-forwarded-host`), qualquer caminho é reescrito para a rota `/config` (página "em breve" com login; o conteúdo é da T-0087). Ficam de fora: `/login`, `/_next/*`, `/api-proxy/*`, `/favicon.ico` e o próprio `/config`. Nos outros hosts (bko., bko-demo., `127.0.0.1:3100`) o proxy não faz nada. Regra pura em `apps/web/lib/portal.ts`, com teste. Caminho que o portal não tem (`config./x`) dá 404, pela rota `app/config/[...caminho]`, e não cai no shell do BKO.

**3. `GET /login` sem sessão:** continua 200 nos dois hosts. O proxy não toca no `/login`, e a página segue estática. Isso vale para a sonda local, o HEALTHCHECK da imagem e `https://bko.macuxifdv.com.br/login`.

Conferi com `next build` (MACUXI_BKO_ORIGEM=https://bko.macuxifdv.com.br) e `next start`, simulando o Host:
- `127.0.0.1/login`: 200;
- `bko./login`: 200;
- `config./login`: 200;
- `config./`: 200, título "Portal de implantação";
- `bko./`: 200, o BKO;
- com `X-Forwarded-Host: config.`: 200;
- no `next dev`, `config./qualquer`: 404.

Não testei com Docker (regra da casa). **Sugestão:** a conferência do `config.` pode ser `GET https://config.macuxifdv.com.br/` → 200 (página "em breve", que pede login no navegador).

**2. Perfil EAS de produção (apps/mobile/eas.json):** são os perfis `campo-producao` e `gestao-producao`, que já existiam e agora estão ajustados:
- environment `production` da EAS;
- `distribution: internal` (link de instalação direto) e `android.buildType: apk`;
- `credentialsSource: remote`: assinatura com a keystore gerenciada pela EAS, a mesma do pacote; nenhuma keystore no repositório;
- `autoIncrement` (versionCode remoto);
- `EXPO_PUBLIC_API_URL=https://api.macuxifdv.com.br/v1` e `EXPO_PUBLIC_PERFIL_BUILD=producao`, ou seja, sem campo Servidor e sem a tela de diagnóstico.

O nome e o ícone já eram os mesmos em todos os perfis ("Macuxi Campo"/"Macuxi Gestão", sem "Preview"). O `GOOGLE_SERVICES_JSON` (push) já existe no environment production da EAS (R-20261102-175845-alexandre).

## Pronto quando
Os itens 1 a 3 do seu pedido estão resolvidos. Encerro este pedido.

O commit fica com o gerente na rodada. Se você preferir a lista no build arg, troque à vontade: ela já funciona.
