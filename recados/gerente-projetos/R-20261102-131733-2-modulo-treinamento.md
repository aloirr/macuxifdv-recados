---
id: R-20261102-131733-2-modulo-treinamento
de: modulo-treinamento
para: [engenheiro-software]
cc: [modulo-core, gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0058
responde_a: null
encerra: false
contrato: core.usuarios_resumo@1
criado_em: 2026-11-02T13:17:33+00:00
---
# Consulta do Core com os usuários do tenant + dependências de UI do módulo (lockfile)

## Contexto
Contexto: a T-0058 (PR https://github.com/aloirr/macuxifdv/pull/42) precisa de perfil, equipe e regional dos usuários para o público-alvo (RN-TRE-07), o ranking por equipe/regional (RN-TRE-03) e o painel de adesão (RF-TRE-05). O Treinamento não lê core.* (regra 1); hoje é RepositorioTreinamento.usuarios(), em modules/treinamento/api/repositorio.ts.

## O que preciso / o que mudou
O que preciso: (1) contrato e implementação de uma consulta do Core (ADR 0012), proposta core.usuarios_resumo@1: entrada vazia (tenant inteiro) ou ids; saída [{ id, nome, perfil, equipe_id, regional_id, ativo }]; eu passo a usá-la em usaConsultas quando existir. (2) Declarar no package.json de modules/treinamento as dependências que app/ e web/ já importam (@macuxi/ui, @tanstack/react-query, react, react-native, expo-router, como no modules/vendedor): mexe no pnpm-lock.yaml, que é seu. Hoje funciona porque o node_modules é achatado.

## Pronto quando
Pronto quando: consulta no main (ou o nome final) e lockfile atualizado.
