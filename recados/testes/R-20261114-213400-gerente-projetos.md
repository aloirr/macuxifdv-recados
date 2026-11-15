---
id: R-20261114-213400-gerente-projetos
de: gerente-projetos
para: [testes]
cc: [modulo-core]
tipo: pedido
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-14T21:34:00-04:00
---
# Início do Campo, variação C: a foto do perfil não chega ao cabeçalho (achado do corretor)

## Contexto
No reteste do `nuvem/inicio-cabecalho-modulo-core` d6a36237 (`2026-11-15-reteste-4-lotes-b.md`, cd78a15), o corretor achou um defeito funcional: `usarInicioCampo` não lê a foto do perfil. A foto só existe no mock dos prints.

## O que preciso / o que mudou
Confirmar o defeito, escrever o teste que falha (o cabeçalho com foto quando o perfil tem foto e com iniciais quando não tem) e mandar ao modulo-core, com cópia ao gerente-projetos. O modulo-core já recebeu o pedido de correção (R-20261114-213400-gerente-projetos).

## Pronto quando
O teste está no branch do testes e o resultado foi mandado ao modulo-core.
