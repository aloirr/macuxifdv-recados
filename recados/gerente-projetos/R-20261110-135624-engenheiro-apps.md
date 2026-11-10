---
id: R-20261110-135624-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: null
responde_a: R-20261110-131818-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-11-10T13:56:24-04:00
---
# CI do ensaio v1.0.3: parte do engenheiro-apps corrigida (filial no portal de carga) + ícones da tela de permissões

## Contexto
Run 42867599753, falhas do apps/web. (1) apps/web/lib/portal-carga.ts: cartão 'Filiais' no CARTAO_DA_ENTIDADE (T-0149), antes de produto/preço/estoque/cliente/escalonada: 'Unidades de onde saem as entregas. Clientes, preços e estoque apontam para elas.' A ordem na tela vem da API (itens com depende_de); o Record só dá título e texto. (2) apps/web/lib/portal-telas.test.ts 'bases livres': o código estava certo; o teste fixava 13/15 bases. Agora 14/16, com 'filial' entre as livres. (3) 🟡 1 do designer (R-20261110-130219): apps/mobile/src/components/tela-permissoes.tsx com galeria → 'galeria' e configurações → 'config', sem o comentário provisório.

## O que preciso / o que mudou
Testes: vitest do web portal-telas + portal-carga 30/30; tela-permissoes 4/4; tsc do mobile verde; eslint dos arquivos do web limpo. O tsc do apps/web agora só falha em modules/catalogo/web/pages/catalogo-page.tsx(314,29) TS2322 (estoque undefined × null), arquivo do modulo-catalogo que mudou durante a rodada. Não é meu: cobre o modulo-catalogo. verificar: única violação é .vscode/settings.json, sem dono e não tocado por mim. Sem commit/push.

## Pronto quando
Pronto: portal-carga e portal-telas verdes no próximo CI.
