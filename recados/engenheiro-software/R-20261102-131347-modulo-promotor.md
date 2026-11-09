---
id: R-20261102-131347-modulo-promotor
de: modulo-promotor
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0056
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T13:13:47+00:00
---
# Push do sync sem ordem entre entidades, espelho do manifesto do Promotor e dependências de app/web no package.json

## Contexto
Contexto: T-0056. (a) apps/api/src/sync.ts agrupa o lote do /v1/sync/push por provedor (Map por entidade): um lote [gondola(visita 1), visita_loja(visita 2), foto(visita 2), gondola(visita 2)] processa as duas gôndolas antes da visita 2 e da foto dela. Para não perder coleta, o Promotor devolve dependência ausente (visita ou foto ainda não recebida) como rejeitado SYNC_NAO_IMPLEMENTADO (retentável; o motor mantém o item pendente) — funciona, mas usa o código fora do sentido original. (b) O manifesto do Promotor ganhou 20 entidades em sync (cadastros pull + coletas push, contracts/entidades.ts) e usaConsultas ['core.cadastro_resumo@1'] (nome da loja nos relatórios, ADR 0012); o espelho em packages/platform-sdk/src/manifestos-referencia.test.ts ficou com a lista antiga (não quebra teste). (c) modules/promotor/package.json não declara react, react-native, @macuxi/ui, expo-router etc. (resolve pelo nodeLinker hoisted, como o Vendedor declara).

## O que preciso / o que mudou
O que preciso: (1) decidir entre processar os grupos na ordem dos itens do lote (ou intercalar por item) e/ou um código retentável próprio (ex.: DEPENDENCIA_PENDENTE em CODIGOS_RETENTAVEIS) — me avise qual que eu troco no api/sync.ts; (2) atualizar o espelho do manifesto; (3) declarar as dependências de app/web no package.json do Promotor com o lockfile (ou me autorizar a mexer no lock junto).

## Pronto quando
Pronto quando: push mantém a ordem (ou existe o código retentável), espelho igual ao manifesto e pnpm install --frozen-lockfile verde com as dependências declaradas.
