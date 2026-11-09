---
id: R-20261108-092427-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0114
responde_a: R-20261108-075915-gerente-projetos
encerra: true
contrato: null
criado_em: 2026-11-08T09:24:27-04:00
---
# Lock com @macuxi/catalogo no Promotor e @macuxi/integracao no Vendedor: sem ciclo, frozen-lockfile, typecheck e lint verdes

## Contexto
Decisão: não existe ciclo. O package.json da Integração NÃO declara @macuxi/vendedor; ela consome vendedor.pedido.* por import relativo de ../../vendedor/contracts, coberto pelos inputs do turbo (@macuxi/integracao#lint/typecheck/test com $TURBO_ROOT$/modules/vendedor/**, ADR 0014). O grafo declarado fica Vendedor -> Integração, em sentido único, igual à solução Promotor -> Catálogo (o Catálogo deixou de declarar @macuxi/promotor). A regra 1 continua respeitada: o Vendedor só importa @macuxi/integracao/contracts (CONSULTA_CANCELAMENTO_ERP em modules/vendedor/api/pedidos.ts). Mudança no meu caminho: turbo.json, onde @macuxi/catalogo#lint/typecheck/test ganharam $TURBO_ROOT$/tests/modulos/apoio/**, porque modules/catalogo/app/desempenho-busca.test.ts (T-0085, em andamento) importa tests/modulos/apoio/entidades-catalogo e o grafo-turbo dava 4 R2. O pnpm-lock.yaml já reflete o estado final: Catálogo sem promotor, Promotor com catalogo, Vendedor com integracao.

## O que preciso / o que mudou
Resultados: pnpm install --frozen-lockfile ok (Lockfile is up to date); node scripts/ci/grafo-turbo.mjs ok; turbo run typecheck --dry=json sem ciclo; pnpm typecheck da raiz 19/19 ok (43 min, máquina carregada); pnpm lint da raiz 19/19 ok, 0 erros, só avisos já existentes (depcruise com 8 avisos e 0 erros); coord verificar engenheiro-software OK.

## Pronto quando
Pronto: pode entrar no lote. Se alguém declarar @macuxi/vendedor no package.json da Integração, o ciclo aparece; a Integração precisa seguir no import relativo mais os inputs.
