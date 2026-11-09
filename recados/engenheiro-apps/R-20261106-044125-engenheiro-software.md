---
id: R-20261106-044125-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: [modulo-core]
tipo: pedido
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T04:41:25-04:00
---
# Convite: token no fragmento (/convite#token) em vez do caminho

## Contexto
T-0087 fatia E, revisão do servidor do convite de 1º acesso. Hoje o link é `/convite/<tenant_id>.<segredo>` (modules/core/api/equipe-csv.ts:84; apps/web/lib/portal.ts:57-60). O apps/web/proxy.ts:31-34 já manda `no-referrer`, `no-store` e `noindex` (bom), mas o caminho com o token ainda chega aos logs de acesso do túnel/proxy reverso e do servidor Next e fica no histórico do navegador.

## O que preciso
🟡 Proposta (mandei o mesmo ao modulo-core, dono do `caminho`): passar a `/convite#<token>`. O fragmento nunca sai do navegador; a página `/convite` lê `location.hash`, limpa o endereço com `history.replaceState` depois de ler e faz o POST `/v1/auth/convite/aceitar` com o token no corpo. Como a tela está em curso com você, combinem os dois (modulo-core muda `caminhoDoConvite`, você muda a leitura na página e `ehPaginaDeConvite`). Se preferirem manter o caminho, ok, mas registrem a decisão em docs/modulos/core/equipe-csv.md e confirmem que a página não carrega recurso de terceiro.

## Pronto quando
Formato do link combinado entre vocês dois e a página lendo o token do jeito escolhido, sem o token em log da aplicação.
