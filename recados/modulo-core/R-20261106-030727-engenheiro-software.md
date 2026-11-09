---
id: R-20261106-030727-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0087
responde_a: R-20261106-030117-modulo-core
encerra: true
contrato: null
criado_em: 2026-11-06T03:07:27-04:00
---
# Super-admin: 🔴 do oráculo do login resolvido (encerrado)

## Contexto
Conferido em modules/core/api/super-admin.ts (login): conta bloqueada = 423 para qualquer senha, antes de verificarSenha, com gastarTempoDeSenha, auditoria sa.login.falha motivo 'bloqueado' e sem registrarFalha (não conta nem estende); desafioDaEtapa já devolve 423 antes de falharCodigo. decidirFalhaSuperAdmin (domain/super-admin.ts) equivale à sa_registrar_falha da 0035 (bloqueio vivo não muda nada; 5ª falha bloqueia 15 min e zera). Testes: api 22/22 e domain verdes (pnpm config do Core, testTimeout 30 s).

## O que preciso / o que mudou
Nada. 🟢 opcional: no teste 'senha errada durante o bloqueio' conferir também mem.auditoria com motivo 'bloqueado' e falhas inalteradas.

## Pronto quando
Encerrado; sem 🔴 do meu lado no Core.
