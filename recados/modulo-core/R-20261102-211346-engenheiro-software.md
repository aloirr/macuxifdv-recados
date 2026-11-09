---
id: R-20261102-211346-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [modulo-core, modulo-vendedor]
tipo: revisao
prioridade: normal
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T21:13:46-04:00
---
# Revisão PR #65 (promotor_ve_pedidos, lado do Core): sem 🔴; regra 7 ok; o 403 depende do PR do Vendedor

## Contexto
Revisão de código do PR #65 (T-0061, Core: opção `promotor_ve_pedidos` do perfil Promotor; branch nuvem/T-0061-core-promotor-ve-pedidos), antes do merge. 27 arquivos, +682/-24. Foco na regra 7 (RN-PRO-01).

## Resultado: sem 🔴, pode mesclar com o CI verde
- Regra 7: a opção controla só a LEITURA. `perfilPodeEscreverPedido` nega sempre ao promotor, e nada no PR libera criar, editar, cancelar, duplicar ou excluir. Está de acordo com a decisão do Alexandre (doc 03, R-20261102-204544).
- Por tenant, em `plataforma.parametro` (fonte única, banco-dados R-20261101-001827); sem registro = ligado; PUT só para admin (ação `parametro.promotor_ve_pedidos` no manifesto), idempotente, auditando antes/depois só quando muda (RN-AUD-01).
- Consulta `core.promotor_ve_pedidos@1` lida do banco a cada chamada, na transação de quem pergunta (RLS), sem cache nem JWT. É o certo para "checada a cada requisição, como a licença". Está declarada em `ofereceConsultas`.
- Sync: a entidade `parametro` passa a levar só `checkin.raio_m` e `promotor_ve_pedidos` (lista fixa), então nenhum outro parâmetro vaza para o aparelho.
- App: `filtrarExtensoesDePedido` esconde abas e ações `pedido.*`/`mostraPedidos` no Cliente 360 offline. A marca `mostraPedidos` nas extensões é aditiva (contrato compatível).

## 🟡 Atenção do gerente (não é defeito deste PR)
1. Este PR é só o lado do Core. A proteção na API (403 em lista, detalhe e pull de pedidos do Vendedor para o promotor com a opção desligada) depende do PR do Vendedor, que deve chamar `core.promotor_ve_pedidos@1` em toda rota e provedor de leitura de pedido. Não marque a decisão do Alexandre como entregue antes desse PR. Eu reviso quando ele aparecer. Desligar a opção também precisa tirar do aparelho os pedidos que já desceram (tombstone ou filtro local no Vendedor), senão eles continuam no disco.

## 🟢
2. `promotorVePedidos` (regra) mora em `contracts/` para o Vendedor importar sem o domain do Core. Aceitável, porque é uma função pura de 1 linha sobre o próprio contrato. Mantenha o teste com a RN em `contracts/promotor-pedidos.test.ts`, que já existe.
