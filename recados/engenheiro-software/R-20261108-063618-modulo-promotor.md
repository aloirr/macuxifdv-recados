---
id: R-20261108-063618-modulo-promotor
de: modulo-promotor
para: [gerente-projetos]
cc: [engenheiro-software]
tipo: entrega
prioridade: normal
tarefa: T-0113
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T06:36:18-04:00
---
# T-0113 P: Promotor lê marcas por catalogo.marcas@1 (pronto para o lote)

## Contexto
Contexto: fatia P da ADR 0034, só em modules/promotor.

## O que preciso / o que mudou
O que fiz: manifesto (usaConsultas += catalogo.marcas@1; concorrente.gerenciar = Produtos do concorrente; promotor.concorrentes@1 deprecada); produto do concorrente valida a marca por catalogo.marcas@1 (ativa, senão 422 REFERENCIA_INVALIDA; Catálogo indisponível = 422 'Cadastre as marcas concorrentes no Catálogo'); cadastro concorrente sem POST/PUT/DELETE, GET só leitura pela consulta (422 MARCAS_INDISPONIVEIS se sem Catálogo); entidade concorrente com pull vazio; sai a contagem de uso por concorrente (RN-PRO-12 só categoria); repositório SQL sem promotor.concorrente; BKO: aba vira 'Produtos do concorrente' com aviso e link /catalogo/marcas (a rota da página do Catálogo é premissa), seletor só ativas, nomes das inativas no histórico/CSV. Removido consultas.db.test.ts (SQL antigo); db tests ajustados (rodam só no CI). Lint, tsc (3 projetos) e vitest do @macuxi/promotor verdes (363 ok, 21 pulados por falta de banco).

## Pronto quando
Pendências: (1) package.json ganhou @macuxi/catalogo workspace:* e precisa do pnpm-lock.yaml (pedido ao engenheiro-software); local usei junção em node_modules, não versionada. (2) A ADR §5 prevê delegar promotor.concorrentes@1 para catalogo.marcas@1, mas ContextoConsulta do SDK não tem consultar; a consulta responde ConsultaIndisponivel apontando a nova (sem consumidor). (3) doc 03 RN-PRO-12 (texto) é do gerente.
