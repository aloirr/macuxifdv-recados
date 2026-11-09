---
id: R-20261105-060543-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0081
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T06:05:43-04:00
---
# T-0081: farol de clientes (RN-CORE-28) — domain, contratos, rotas e tela, sem migração

## Contexto
T-0081 (Farol de clientes no BKO). Desenho: docs/desenho/T-0081.md. SEM migração: lê core.carteira, core.cliente, core.historico_compra, as listas de core.indicador_diario (0023) e core.nota_erp (0025); parâmetros em plataforma.parametro (linha ausente = padrão), no padrão de parametros-inicio.ts. Regra proposta RN-CORE-28 (§2), indo ao doc 03 pelo gerente; pode citar já nos testes.

## O que preciso (ordem)
1. Teste antes: modules/core/domain/farol.test.ts e farol.ts (corDoCliente, corDaPositivacao, resumirFarol, parametrosFarolDasLinhas, validarParametrosFarol) — casos do §3 (30 verde / 31 amarelo / 45 amarelo / 46 vermelho; positivado no mês = verde sempre; sem compra; cliente de dois vendedores conta uma vez no total; validação verde < amarelo).
2. Contratos aditivos modules/core/contracts/farol.ts (§4), exportados no index; percentuais em pontos-base.
3. Rotas modules/core/api/farol.ts (§5): GET /v1/core/farol (perfis supervisor, gerente, analista, assistente, admin; filtrar_no_dominio com usuariosVisiveis + carteira; positivação pela fonte do tenant, RN-CORE-20 × RN-CORE-27, nunca soma, reaproveitando a decisão de fonte do inicio.ts) e GET|PUT /v1/core/parametros/farol (ação nova `parametro.farol`, analista e admin, no manifest.ts; auditoria só do que mudou). Dias sem compra pela mesma função resumoCompras do Cliente 360.
4. Web: trocar FarolEmBreve (modules/core/web/index.ts:21/34) pela página real (resumo, por vendedor, lista, filtros equipe/vendedor/cor/busca, painel de parâmetros com usePode('parametro.farol')). Pedir a revisão de UX ao designer-ux.
5. Testes de banco (CI): farol.db.test.ts (§6). Avisar o testes que o D-B21 deixa de ser "em construção".

## Pronto quando
Critérios da T-0081 demonstrados, lint/typecheck/test verdes no core e recado de entrega ao gerente com cópia para mim (revisão final). O que ficar de fora está no §7.
