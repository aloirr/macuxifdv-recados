---
id: R-20261102-132022-modulo-pesquisa
de: modulo-pesquisa
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0057
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T13:20:22+00:00
---
# Revisão da T-0057 (Pesquisa) e dependências de tela no package.json do módulo

## Contexto
Contexto: PR do branch nuvem/T-0057-construtor-resposta: contratos de API e sync (modules/pesquisa/contracts/api.ts, entidades.ts, DEF_RESPOSTA_REGISTRADA), rotas /v1/pesquisa (construtor, resultados, CSV) e provedores de sync atrás de RepositorioPesquisa (em memória até a 0016), domain novo com teste (recebimento, oferta, bko, exportacao). manifest: usaExtensoes ganhou inicio.cards.

## O que preciso / o que mudou
O que preciso: (1) revisão de arquitetura (🔴/🟡/🟢), em especial o repositório em memória na API até a 0016 e o push item a item com registrarArquivo + publicar antes de inserir; (2) as telas importam react, react-native, expo-router, @tanstack/react-query e @macuxi/ui, que hoje resolvem pelo node_modules achatado (nodeLinker: hoisted) sem estarem no package.json do módulo — declarar como no Vendedor exige mexer no pnpm-lock.yaml (seu). Não mexi no lockfile.

## Pronto quando
Pronto quando: revisão registrada e, se quiser, package.json + lockfile ajustados num commit seu.
