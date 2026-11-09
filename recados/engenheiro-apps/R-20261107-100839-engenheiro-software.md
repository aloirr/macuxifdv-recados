---
id: R-20261107-100839-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0091
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T10:08:39-04:00
---
# Portal na demo: apps/web reconhecer o host config-demo.macuxifdv.com.br (ehHostDoPortal, HOSTS_DO_BKO_PADRAO, texto do convite)

## Contexto
Decisão do dono do produto (R-20261107-103434, item 2): o portal de implantação tem de funcionar NA DEMO, para ensaiar a implantação. Endereço proposto: `config-demo.macuxifdv.com.br` → `http://bko:3100` no túnel `macuxi-demo-nuvem` (um nível de subdomínio, como `api-demo` e `bko-demo`; o certificado universal da Cloudflare não cobre `config.demo.`). Desenho: `docs/desenho/T-0091.md` §9. O deploy já gera as chaves da plataforma na VM da demo (`scripts/deploy/demo/preparar-vm.sh`).

Hoje o apps/web NÃO reconhece esse host como portal:
- `apps/web/lib/portal.ts:17` — `PREFIXO_DO_HOST = 'config.'`; `ehHostDoPortal('config-demo.macuxifdv.com.br')` = false, então o proxy.ts não reescreve para `/config` e o host abriria o BKO comum (e `/config/*` daria 404).
- `apps/web/next.config.ts` — `HOSTS_DO_BKO_PADRAO` não tem `config-demo.macuxifdv.com.br` (allowedOrigins das Server Actions e allowedDevOrigins).
- Texto: `apps/web/components/portal/tela-primeiro-acesso.tsx:71` e `:111` citam só "PROD_SUPERADMIN_CONVITE (GitHub, environment PRODUCAO)"; na demo o secret é `DEMO_SUPERADMIN_CONVITE` (environment `DEMO_SSH_KEY`).

## O que preciso
1. `ehHostDoPortal` aceitar também o primeiro rótulo `config-demo` (sugestão: lista explícita de prefixos `['config.', 'config-demo.']`, nada de curinga tipo `config*`), com teste (`config-demo.macuxifdv.com.br` e `config-demo.localhost` = portal; `bko-demo.` e `configx.` = não).
2. `config-demo.macuxifdv.com.br` em `HOSTS_DO_BKO_PADRAO` (e no `FIXOS` do `apps/web/lib/hosts-bko.test.ts`).
3. Texto da ajuda/erro do convite neutro ou pelo host (ex.: "o valor do secret do convite: PROD_SUPERADMIN_CONVITE na produção, DEMO_SUPERADMIN_CONVITE na demo"); se o texto for do designer-ux, combine com ele.

## Pronto quando
`GET https://config-demo.macuxifdv.com.br/entrar` (rota criada pelo dono do produto) abre a tela de entrada do portal, e `/` abre o portal; testes do apps/web verdes; a imagem do BKO publicada pelo "demo — publicar". O workflow proposto (`docs/desenho/T-0091-demo-portal.diff`) confere `config-demo.macuxifdv.com.br/entrar`, que só responde 200 depois deste ajuste.
