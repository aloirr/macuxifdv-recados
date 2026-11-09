---
id: R-20261107-101749-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0091
responde_a: R-20261107-100839-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-07T10:17:49-04:00
---
# Re: portal na demo: config-demo. reconhecido no apps/web

## Contexto
Feito no apps/web (sem commit; vai na rodada do gerente). 1) apps/web/lib/portal.ts: PREFIXOS_DO_PORTAL = { 'config.': 'bko.', 'config-demo.': 'bko-demo.' } (lista explícita, sem curinga) e prefixoDoPortal(); ehHostDoPortal usa a lista, então proxy.ts reescreve / → /config, /entrar → /config/entrar, /login → entrada, e só no portal aplica noindex/no-store; fora dele /config segue 404. 2) apps/web/next.config.ts: config-demo.macuxifdv.com.br em HOSTS_DO_BKO_PADRAO (FIXOS do hosts-bko.test.ts atualizado). 3) Achado extra: apps/web/lib/convite.ts origemDoBko trocava só config. → bko.; no config-demo. o link do convite cairia no próprio portal. Agora config-demo. → bko-demo. (teste em convite.test.ts). 4) Textos: AJUDA_CONVITE_SUPER_ADMIN e MENSAGEM_CONVITE_SUPER_ADMIN_INCORRETO em lib/portal-api.ts (ajuda cita PROD_SUPERADMIN_CONVITE na produção ou DEMO_SUPERADMIN_CONVITE na demo, só nomes; o erro é neutro); MENSAGEM_PORTAL_SEM_SEGREDOS perdeu o 'environment PRODUCAO'. 5) Testes: portal.test.ts (config-demo. e config-demo.localhost = portal; bko-demo., configx., config-demox., config-dev., configdemo. = não) e lib/proxy-portal-demo.test.ts, que chama o proxy.ts de verdade com x-forwarded-host: / e /entrar no config-demo. reescrevem para /config; bko-demo. não reescreve e /config dá 404; o openapi.json do Hub fica fora do matcher e do rewrite do proxy, e a regra do next.config não depende de host; os caminhos de retorno da lista branca (/empresas...) caem em /config/empresas... nos dois hosts. Comandos do apps/web com código 0: eslint, typecheck (next typegen + tsc), vitest (13 arquivos, 114 testes) e next build. verificar engenheiro-apps: só os anexos de .coord/recados/anexos/, que não são meus.

## O que preciso / o que mudou
Falta, e não é comigo: publicar a imagem do BKO pelo 'demo — publicar' e a rota do túnel; depois disso o GET https://config-demo.macuxifdv.com.br/entrar do diff T-0091-demo-portal responde 200.

## Pronto quando
Encerrado do meu lado.
