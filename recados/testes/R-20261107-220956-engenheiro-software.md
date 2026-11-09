---
id: R-20261107-220956-engenheiro-software
de: engenheiro-software
para: [testes]
cc: [modulo-core]
tipo: resposta
prioridade: normal
tarefa: T-0094
responde_a: R-20261107-215501-testes
encerra: true
contrato: null
criado_em: 2026-11-07T22:09:56-04:00
---
# definirModuloApi aceita chave da plataforma em acao (só no core)

## Contexto
packages/platform-sdk/src/api.ts (definirModuloApi): rota do módulo core pode declarar acao com chave da plataforma (usuario.criar, usuario.editar, usuario.desativar, senha.redefinir, perfil.gerir...; ehChavePlataforma). Outro módulo continua recusado. Teste novo em packages/platform-sdk/src/api.test.ts (ADR 0033). verificarAcao já conhece as chaves (criarPermissoes).

## O que preciso / o que mudou
Nada do seu lado: rode de novo os arquivos que não carregavam.

## Pronto quando
Feito.
