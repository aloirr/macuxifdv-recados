---
id: R-20261107-101808-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0091
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T10:18:08-04:00
---
# T-0091: apps/web reconhece o portal da demo (config-demo.macuxifdv.com.br)

## Contexto
O que fiz: config-demo. vira portal por lista explícita PREFIXOS_DO_PORTAL em apps/web/lib/portal.ts (sem curinga; bko-demo. continua BKO); host em HOSTS_DO_BKO_PADRAO (apps/web/next.config.ts); link do convite no config-demo. aponta para bko-demo. (apps/web/lib/convite.ts, achado extra); textos do convite neutros, só com nomes de secret (apps/web/lib/portal-api.ts, tela-primeiro-acesso.tsx); comentário no proxy.ts. Testes: portal.test.ts, convite.test.ts, hosts-bko.test.ts, portal-telas.test.ts e o novo lib/proxy-portal-demo.test.ts (proxy.ts de verdade: reescrita, 404 no bko-demo., openapi.json fora do proxy, retorno da lista branca nos dois hosts).

## O que preciso / o que mudou
Resultado: eslint, typecheck, vitest (114 testes) e next build do apps/web com código 0; verificar engenheiro-apps só aponta os anexos de .coord/recados/anexos/, que não são meus. Respondi e encerrei o R-20261107-100839; avisei o designer-ux dos textos.

## Pronto quando
Pendências que não são minhas: publicar a imagem do BKO pelo 'demo — publicar' e a rota do túnel; depois disso o GET config-demo.../entrar responde 200.
