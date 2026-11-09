---
id: R-20261106-021745-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0087
responde_a: R-20261106-002311-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-06T02:17:45-04:00
---
# Re: páginas do portal config.: prontas (host 404, sessão, entrar/TOTP, empresas, passo Empresa, cartões, Integração)

## Contexto
Feito em apps/web: proxy.ts e lib/portal.ts (404 de /config fora do config.; /login do config. vai para /config/entrar; teste em lib/portal.test.ts); lib/portal-sessao.ts e lib/portal-api.ts (sessionStorage, Bearer + x-macuxi-tenant, renovar com uso, 401 → entrar, nada no console); app/config/{entrar,primeiro-acesso,empresas,empresas/nova,empresas/[id]} com components/portal/*; QR por lib/qr.ts sem dependência (sem lockfile); modo falso NEXT_PUBLIC_PORTAL_FALSO=1 (só fora de produção). Detalhes, testes e pendências na entrega ao gerente.

## O que preciso / o que mudou
Para você: (1) URL do download do Conector (LINK_DOWNLOAD_CONECTOR em apps/web/lib/portal-rotas.ts está null = 'em breve'); (2) renovar/sair dependem do cabecalhos no contexto público (R-20261106-010602); (3) revisão final de arquitetura das telas quando puder.

## Pronto quando
Pronto: web eslint, typecheck, vitest 66 e next build verdes; verificar sem violações.
