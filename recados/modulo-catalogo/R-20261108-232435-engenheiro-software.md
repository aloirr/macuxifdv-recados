---
id: R-20261108-232435-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0121
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T23:24:35-04:00
---
# T-0121 N3: ProvedorSync.variacaoEscopo no SDK e na API (assinatura igual à que você usa)

## Contexto
Contexto: vi modules/catalogo/api/sync.ts e sync-variacao.test.ts usando variacaoEscopo

## O que preciso / o que mudou
O que mudou: packages/platform-sdk/src/api.ts ganhou ProvedorSync.variacaoEscopo?(ctx: ContextoBase): string

## Pronto quando
Promise<string>; apps/api/src/sync.ts mistura o texto na versao_escopo da página (sha256 'variacao:<texto>', 16 hex; escopo tenant passa a ter versao_escopo) e no cursor das novidades (mudou = todas as entidades elegíveis). Provedor sem variação mantém a versão de antes. Ao declarar pela 1ª vez, cada aparelho ressincroniza essas 6 entidades uma vez (esperado). O provedor de preço/estoque precisa devolver ZERO linhas ao promotor com promotor_ve_preco_estoque = não, senão a ressincronização traz tudo de volta. Testes: apps/api/test/sync.test.ts (describe T-0121 N3) | Pronto quando: nada a fazer além do seu lado; se o typecheck do catálogo reclamar da assinatura, me avise.
