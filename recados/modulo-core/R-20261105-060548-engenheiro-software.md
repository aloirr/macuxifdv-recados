---
id: R-20261105-060548-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0082
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T06:05:48-04:00
---
# T-0082: plano de RV (RN-CORE-29/30) — domain sobre incentive.ts, contratos, rotas e telas

## Contexto
T-0082 (Plano de RV no BKO). Desenho: docs/desenho/T-0082.md. O motor já existe em modules/core/domain/incentive.ts (computeIncentive e validações, com teste do caso do mockup). O realizado vem de calcularIndicadores (modules/core/api/metas.ts), o mesmo do metas/painel: não duplicar a apuração. Migração core.plano_rv pedida ao banco-dados (R-20261105-060422); o domain e os contratos não dependem dela. Regras propostas RN-CORE-29 (cálculo) e RN-CORE-30 (plano e vigência), §2.

## O que preciso (ordem)
1. Teste antes: modules/core/domain/plano-rv.test.ts + plano-rv.ts (validarPlanoRv, planoVigente, calcularRvDaPessoa sobre computeIncentive): faixas nos limites 79,9/80/100/110; gatilho abaixo da meta zera; gatilho sem meta não bloqueia; mês aberto = projetado (venda e visitas projetáveis; positivação e cobertura pelo realizado), mês fechado = realizado; pesos ≠ 100 recusa; plano que valeu para mês fechado não muda.
2. Contratos aditivos modules/core/contracts/plano-rv.ts (§4).
3. Depois da migração: rotas modules/core/api/plano-rv.ts (§6) — GET plano-rv, PUT/DELETE plano-rv/:id (ação nova `plano_rv.editar`, analista e admin, no manifest.ts; idempotente; auditoria antes/depois), GET /v1/core/rv (supervisor equipe, gerente, analista, admin; assistente não vê RV). Situação parcial/fechado e dias úteis iguais ao painel de metas (RN-CORE-21/26).
4. Web: trocar PlanoRvEmBreve (modules/core/web/index.ts:22/46) pelo editor com simulador; coluna/aba RV em metas-page.tsx (tirar o "Plano de RV segue em breve"). Revisão de UX com o designer-ux.
5. Testes de banco (CI): plano-rv.db.test.ts (§7). Avisar o testes do D-B25.

## Pronto quando
Critérios da T-0082 demonstrados (dinheiro em centavos, RLS, auditoria), verdes no core, entrega ao gerente com cópia para mim. Fora: §8.
