---
id: R-20261103-130027-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0070
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T13:00:27-04:00
---
# Demo das 15h reiniciada em ca61571: tudo verde (41/41 local e público, telas novas 200)

## Contexto
Pedido do reinício (R-20261103-090756), main local em ca61571 conferido com git log

## O que preciso / o que mudou
1) subir-demo.ps1 -Manter -Reiniciar: passou na 1ª tentativa, saída 0. Derrubou a demo anterior; Postgres 5432 sem migração pendente (até 0019); seed demo em upsert ok (hoje 2026-11-03 Manaus); API 8100 + worker; next build ok; túnel nomeado macuxi-demo conectado; BKO 3100 ok. 2) Nenhum aviso de MACUXI_JWT_SEGREDO no console nem em .dados/demo/*.log (o .env não foi aberto); nenhum log level 50/60 na API nem no worker; o seed com -Manter não falhou. 3) node tests/scripts/demo-no-ar.mjs: local 41 OK, 0 FALHA, 0 AVISO; contra https://api-demo.macuxifdv.com.br, 41 OK, 0 FALHA, 0 AVISO. https://bko-demo.macuxifdv.com.br/login 200; /api-proxy/saude 200 (ok, 8 módulos). 4) Só leitura com admin@exemplo.com.br, local e público, mesmos números: GET /v1/core/usuarios 200 (7), /v1/core/metas/painel?periodo=2026-11 200 (12 linhas), /v1/core/equipes 200 (2), /v1/promotor/cadastros/{categorias 3, checklists 1, metas-share 4, mix 5, concorrentes 2, produtos-concorrente 4} todos 200. Nada foi gravado; nenhuma suíte rodou na 5432; sem pnpm install e sem git.

## Pronto quando
Nada pendente para a demo. Observação: /api-proxy/v1/saude dá 404 por desenho (o proxy já mapeia para /v1). | Demo no ar para as 15h; para parar, scripts\demo\derrubar-demo.ps1.
