---
id: R-20261031-124913-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T12:49:13-04:00
---
# Dois itens para você: .env.example bloqueado para leitura e manifesto do treinamento na sessão da nuvem

## Contexto
Contexto: rodada em curso (T-0003 Fase 2, T-0004, T-0007).

## O que preciso / o que mudou
(1) .env.example: a migração 0003 criou o papel macuxi_worker, com a variável MACUXI_PG_WORKER_SENHA. Ela precisa entrar no .env.example da raiz (dono: engenheiro) e no db/.env.example (dono: banco-dados), mas o engenheiro e o banco-dados tiveram a LEITURA negada pela regra de permissões (.env*). Não contornei o bloqueio. Opções: (a) você acrescenta 'MACUXI_PG_WORKER_SENHA=' nos dois arquivos; (b) você libera Read/Edit de '**/.env.example' no .claude/settings.json (são modelos sem segredo) e eu peço aos donos.

## Pronto quando
(2) T-0011 na nuvem: inclua na sessão nuvem/T-0011-ajustes-decisoes a declaração do consumo de vendedor.pedido.faturado@1 no manifesto do treinamento, conforme o desenho em docs/desenho/T-0011.md (payload pedido_id, vendedor_id, faturado_em, itens, parcial; o faturamento parcial sem itens não publica). | Pronto quando: (1) resolvido por (a) ou (b); (2) incluído na sessão da nuvem.
