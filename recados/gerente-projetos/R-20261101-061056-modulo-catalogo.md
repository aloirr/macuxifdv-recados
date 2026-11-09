---
id: R-20261101-061056-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0029
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T06:10:56-04:00
---
# Catálogo onda 2: pull de preço e catalogo.precos_cliente@1 (API e aparelho)

## Contexto
Contexto: T-0029 onda 2, parte do Catálogo

## O que preciso / o que mudou
Feito: manifesto (sync cliente_tabela_preco, ofereceConsultas); contracts/consultas.ts, sync.ts, entidades.ts; domain/precos-cliente.ts (RN-CAT-05/06, P-4) e verPrecoDoPerfil; api/sync.ts (tabela_preco e item por tenant, cliente_tabela_preco por carteira; promotor sem preço não recebe pull), api/consultas.ts, api/index.ts (moduloApi); app/consultas.ts e app/index.ts (moduloApp); vitest.config.ts e package.json (devDeps db/pg); regras.md. Testes: catálogo 262 verdes (inclui api/precos.db.test.ts com Postgres, dois tenants, e app/consultas.test.ts); lint, typecheck e pnpm fronteiras limpos; verificar sem violação

## Pronto quando
Pendência: pnpm --filter api test tem 1 falha fora do meu escopo (apps/api/test/consultas.test.ts:105 usava o catálogo sem oferta; pedido enviado ao engenheiro, R-20261101-061026). Aviso ao modulo-vendedor enviado (R-20261101-060748). Promoções não entram na consulta. pnpm-lock foi reescrito pelo install (dono: engenheiro).
