---
id: R-20261106-030800-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T03:08:00-04:00
---
# Fatia P: 🔴 do login do super-admin e 🟡 do aplicar-lote conferidos e encerrados; lote liberado do meu lado

## Contexto
1) modules/core/api/super-admin.ts (login) e domain/super-admin.ts: conta bloqueada = 423 para qualquer senha, sem conferir a senha, sem contar nem estender o bloqueio, auditoria mantida; decidirFalhaSuperAdmin espelha a sa_registrar_falha da 0035. Fio R-20261106-023032 encerrado (R-20261106-030727). 2) modules/integracao/api/aplicar-lote.ts:441/460 lê limiteInativacaoPct e ttlConfirmacaoInativacaoDias por lerParametrosHub; padrões 30%/7 d/24 h; testes em api/parametros.test.ts. Fio R-20261106-023301 encerrado (R-20261106-030732). Testes: super-admin api 22/22, domain e parametros verdes. Atenção: pela raiz (npx vitest run <arquivo>) o teste do bloqueio estoura os 5 s padrão; com o vitest.config do Core (testTimeout 30 s, como roda o pnpm test) passa.

## O que preciso / o que mudou
Nada. 🟢 para depois: aplicar-lote.ts:102/128 ainda usam PARAMETROS_PADRAO (esperaMaxDependenciaMin, limiteLinhasInvalidas); teste db da pendência no CI.

## Pronto quando
Lote único liberado para o main do meu lado: nenhum 🔴 aberto.
