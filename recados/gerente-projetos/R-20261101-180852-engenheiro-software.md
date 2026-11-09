---
id: R-20261101-180852-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0038
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T18:08:52-04:00
---
# T-0038 engenheiro-software: configurar-dominio.ps1, túnel nomeado com reserva, BKO no subir/derrubar, API sem CORS (testes) e revisão SECURITY DEFINER

## Contexto
T-0038 (Domínio fixo da demo), parte do engenheiro-software (scripts/demo, apps/api). **Trava da nuvem conferida antes de editar**: `git log origin/main -- scripts/demo` (último commit b12294e, nosso) e `gh pr diff 26 --name-only` (head 36baf16). O PR #26 NÃO toca scripts/demo/**: ele mexe em .github/**, turbo.json, scripts/ci/** e docs/decisoes/0013-ci-paralelo-cache-do-turbo.md. Segui.

## O que fiz
Passo 0 (R-20261101-172128): revisei as SECURITY DEFINER da 0010/0011 e respondi ao testes e ao banco-dados (R-20261101-172531). Só `integracao.autenticar_chave(p_hash text)` entra em DEFINER_REVISADAS do S0-028. As duas de expurgo são do macuxi_worker, ficaram aprovadas e vão num caso próprio, sugerido. A única exceção justificada do S0-023 é `integracao.credencial_hash_uk`: HMAC com pepper sobre uma chave gerada pelo servidor, busca antes do tenant. Não mexi em db/ nem em tests/.

T-0038:
- `scripts/demo/configurar-dominio.ps1` (novo): confere o login (`tunnel list`), cria o `macuxi-demo` só se faltar, faz o `route dns` de api-demo e bko-demo (idempotente; DNS de outro dono para, e `-SobrescreverDns` troca) e grava `.dados\demo\cloudflared\config.yml` (api-demo → 127.0.0.1:8100, bko-demo → 127.0.0.1:3100, resto → http_status:404) + `tunel.json`, conferidos por `tunnel ingress validate`.
- `scripts/demo/tunel.ps1` (novo): funções compartilhadas. Nada lê %USERPROFILE%\.cloudflared: o config.yml não tem credentials-file e o cloudflared acha o <id>.json sozinho.
- `scripts/demo/subir-demo.ps1`: 7 etapas. Faz o `next build` do BKO e abre o túnel nomeado (`tunnel --config <cfg> run <id do macuxi-demo>`; pronto = "Registered tunnel connection"). Sem marcador, com `-TunelRapido` ou se o nomeado não conectar, volta ao trycloudflare (API + BKO), com aviso de que os APKs de preview não conectam por ele. Depois, `next start -p 3100 -H 127.0.0.1`. Só diz "Pronto" depois de conferir /v1/saude (servico = macuxi-api), /login e /api-proxy/saude do BKO, no PC e pela internet; falha só pela internet = saída 3, com tudo no ar. Opções novas: -SemBko, -TunelRapido, -PortaBko.
- `scripts/demo/derrubar-demo.ps1`: túnel(is), BKO, worker e API, mais os órfãos (cloudflared da demo, `next start` na porta do BKO).
- BKO combinado com o engenheiro-apps (R-20261101-173817): porta 3100 no loopback; `NEXT_PUBLIC_API_URL=http://127.0.0.1:8100/v1` no build e no start (o rewrite /api-proxy vai pelo loopback, não pelo api-demo, por causa da latência e do XFF); `MACUXI_BKO_ORIGEM` lida no next.config dele.
- API (`apps/api/src/app.ts`, comentário; `apps/api/test/app.test.ts`, +2 testes): **sem CORS e sem cookie, de propósito**. O navegador fala só com o BKO (same-origin) e o app usa Bearer. Os testes fixam: Origin do bko-demo aceito, IP do XFF com trust loopback, nenhum Access-Control-*, nenhum Set-Cookie, preflight recusado.
- `scripts/demo/LEIA-ME.md` reescrito; desenho em `docs/desenho/T-0038.md`. O texto do docs/status/demo.md foi em recado à parte.

## Testes
`pnpm --filter api lint`, `typecheck` e `test` verdes (13 arquivos, 121 testes). Os 4 .ps1 passam no parser do PowerShell 5.1 (UTF-8 com BOM, como os outros). Testei com um cloudflared simulado (node, no scratchpad, fora do repo):
- configurar-dominio: sem login sai 1 e orienta; a 1ª execução cria e roteia; a 2ª não cria nem regrava; DNS de outro dono para e o -SobrescreverDns troca; -PortaBko regrava.
- Escolha do túnel: sem marcador → rápido; com marcador → nomeado, com --config e o id; -Rapido; nomeado falha → rápido, com o log preservado; marcador inválido é ignorado.
Bug achado e corrigido: o ConvertFrom-Json do PS 5.1 não enumera arrays no pipeline. Não rodei a subida completa (o seed --recriar mexe na base demo compartilhada) nem o túnel de verdade (sem autorização). `coord verificar engenheiro-software`: OK, sem violações.

## Pendências e avisos
1. Alexandre: `cloudflared tunnel login` e depois `scripts\demo\configurar-dominio.ps1` (uma vez). Sugiro a ele um `_instalar\configurar-dominio.cmd` (caminho dele), igual ao subir-demo.cmd.
2. testes: validação pelo domínio (T-0038, passo 3), com a demo no ar.
3. 🔴 Número de ADR repetido: o PR #26 cria `docs/decisoes/0013-ci-paralelo-cache-do-turbo.md`, mas a 0013 já é `0013-rotas-de-conector-chave-por-conector.md` no main. Antes do merge, a sessão da nuvem precisa renumerar para 0014 (e as citações dela). Repasse, por favor.
4. Na caixa continuam pedidos antigos meus: T-0014/T-0023/T-0025/T-0031/T-0026/T-0005/T-0034. O R-20261101-180016 (relógio de teste + lint, do testes) precisa de uma tarefa; respondi "recebido".

## Premissas
Porta do BKO 3100. A config fica em .dados\demo\cloudflared (o apagar = rodar o configurar de novo). O túnel roda pelo id em vez do nome (é o mesmo túnel, sem depender do cert.pem na subida).
