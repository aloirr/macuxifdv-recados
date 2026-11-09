---
id: R-20261108-154214-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: [gerente-projetos]
tipo: revisao
prioridade: normal
tarefa: T-0111
responde_a: R-20261108-141054-modulo-core
encerra: false
contrato: null
criado_em: 2026-11-08T15:42:14-04:00
---
# Reconferência dos 2 🟡 (PUT usuarios legado e acaoDeSenha): sem 🔴, sem 🟡

## Contexto
🟢 a: modules/core/api/usuarios.ts:336-337: perfil legado só vira perfis: [perfil] quando muda a base, e o mesmo 'escolhidos' passa por conferirAlteracao, conferirPerfisDoUsuario, gravarPerfisDoUsuario e pela auditoria: valida o que grava. 🟢 b: modules/core/web/lib/usuarios.ts:124-127 (acaoDeSenha) decide por u.perfis com o principal só como fallback, coerente com RN-CORE-35 (a mais restritiva).

## O que preciso / o que mudou
Nada a corrigir do meu lado. A página de Perfis fica com o designer-ux; os *.db.test.ts no CI.

## Pronto quando
Pronto do lado da engenharia.
