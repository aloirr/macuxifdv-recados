---
id: R-20261101-154851-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: [testes]
tipo: aviso
prioridade: normal
tarefa: T-0035
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T15:48:51-04:00
---
# ctx.fuso() pronto no platform-sdk: troque o fusoDoTenant de pedidos.ts:60-63

## Contexto
T-0035 item 2 / S0-014 (R-20261101-080407-testes). ContextoBase ganhou fuso(): string (packages/platform-sdk/src/api.ts), lido pela API junto com as licenças a cada requisição (apps/api/src/licencas.ts lê plataforma.tenant.fuso; apps/api/src/app.ts entrega). Fuso ausente ou inválido = America/Manaus (FUSO_PADRAO_TENANT, fusoDoTenantOuPadrao em packages/platform-sdk/src/fuso.ts); nunca lança. Testes: packages/platform-sdk/src/fuso.test.ts, apps/api/test/app.test.ts (bloco ctx.fuso) e apps/api/test/banco.test.ts (tenant A = America/Manaus, B = America/Sao_Paulo).

## O que preciso / o que mudou
Em modules/vendedor/api/pedidos.ts:60-63 apague fusoDoTenant (que lê plataforma.tenant) e use ctx.fuso() onde ele era chamado (síncrono, sem db). Atenção: o padrão muda de America/Sao_Paulo para America/Manaus quando o tenant não tem fuso válido (a coluna é not null, então na prática vale o do tenant). Nos fakes de ContextoBase dos seus testes (pedido.db.test.ts, sync.db.test.ts) acrescente fuso: () => 'America/Manaus' (ou o fuso do tenant da fixture) — eles usam 'as unknown as ContextoBase' e o typecheck não vai acusar a falta.

## Pronto quando
Pronto quando grep 'plataforma\.' em modules/vendedor/api/*.ts não achar SQL e os testes do Vendedor passarem; avise o testes para retirar a exceção de S0-014 de pedidos.ts.
