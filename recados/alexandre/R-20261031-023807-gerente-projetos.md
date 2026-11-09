---
id: R-20261031-023807-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0001
responde_a: R-20261031-021714-alexandre
encerra: false
contrato: null
criado_em: 2026-10-31T02:38:07-04:00
---
# Prioridades da semana: registradas e em execução

## Contexto
Contexto: seu pedido R-20261031-021714 e as decisões de ambiente R-20261031-021713.

## O que preciso / o que mudou
FEITO: doc 04 atualizado com a ADR-0005 (produto no core; preço, estoque e busca no catálogo); T-0002, T-0004 (critério EAS) e T-0005 (regras do verificar e do git) atualizadas; T-0007 e T-0008 abertas no quadro (Sprint 1) e em docs/backlog.md; aviso a todos (R-20261031-023717). T-0001: B2 concluída, 277/277 testes da Fase M nos novos locais.

## Pronto quando
RODANDO: engenheiro (ligação de core e vendedor nos shells, ctx.http, ADR-0005 por escrito, ADR 0003 com o gatilho da T-0008, recado para você com os casos de teste do verificar); vendedor (slots cliente.abas e cliente.acoes, total_cents na fila); banco-dados (docker-compose pg16, scripts de banco efêmero, migrações plataforma/core com RLS e core.produto, fixture dois-tenants, docs/banco). Os testes de banco pulam até o Docker existir. | PRECISO DE VOCÊ: o Docker ainda não está instalado e o repositório segue em master sem o commit inicial no main. Não fiz nenhum commit; começo o commit por rodada assim que o seu commit inicial estiver no main. | PRÓXIMO: Fase D (testes, com next build e lint/typecheck/test da raiz) → revisão do engenheiro → fechamento da T-0001; testes de domínio da T-0003 no modulo-core. | Pronto quando: (seu critério) T-0001 concluída e T-0002 com vazamento verde até 06/11.
