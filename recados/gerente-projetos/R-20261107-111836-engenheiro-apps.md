---
id: R-20261107-111836-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0085
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T11:18:36-04:00
---
# T-0085: atalho 'Ver por linha' sem 🔴; bundles campo e gestao verdes; 1 🟡 de desempenho 20 mil (antes do piloto); aguardo aviso para o EAS

# T-0085: veredito do engenheiro-apps sobre o atalho "Ver por linha" (bundles verdes)

## Veredito
**Sem 🔴.** O atalho "Ver por linha" (`modules/catalogo/app/telas/catalogo.tsx` + `app/lib/atalho-por-linha.ts` e teste, no working tree) pode ir para o main e para o build único de preview (R-20261107-092152). A revisão completa está em R-20261107-111809-engenheiro-apps, enviada ao modulo-catalogo.
- Navegação ok: `irParaListaPorLinha(clienteId, noId)` leva a `/m/lista-por-linha?cliente&no`. A página está registrada em `moduloApp.paginas` (campo e gestao, `produto.consultar`) e o shell a resolve por `/m/[...caminho]`. O voltar usa o histórico da aba e, sem histórico, cai no fallback `hrefCatalogo`. Um nó que sumiu no sync oferece "Voltar um nível".
- Offline ok: tudo sai do motor sobre o SQLite (T-0088), sem rede.
- Gestão ok: a página vale nas duas variantes.
- Regra 7 e RN-CAT-05 ok: o promotor não vê pedido nem preço.
- 🟡 (antes do piloto, não bloqueia o preview, porque a demo tem cerca de 48 produtos): com 20 mil produtos, a raiz fria da lista leva 1,4 s no V8 do PC. No Hermes deve ficar várias vezes mais lento, com a thread JS travada. Causas: `Intl.Collator` ordenando todos os nós na raiz, `coletar` repetido, níveis sem memo e falta de índice em `ent_produto_no(no_id)` e `ent_produto_relacao(produto_id)` (este último é com o banco-dados). As correções e o critério de pronto estão na revisão.
- 4 🟢 (FlatList, voltar do Android por nível, teste por regex, fallback do BackLink sem `no`).

## Bundles (main 4694563d + working tree atual, sem EAS)
- campo: `APP_VARIANT=campo expo export:embed --eager --platform android --dev false` verde, 2072 módulos, 48,8 s. O testID `catalogo-atalho-por-linha` está no bundle.
- gestao: idem, verde, 2072 módulos, 35,5 s.
- O working tree também tinha as mudanças de outros agentes em `modules/vendedor/app/...` (novo-pedido-abas, new-order-screen) e `modules/core/domain/notificacao-pedido.ts`. Elas entraram no bundle e compilaram.

## Testes
- vitest de `modules/catalogo/app`: 110 verdes (1 de banco pulado, sem Docker).
- eslint dos 7 arquivos revisados: limpo.
- `tsc -p tsconfig.app.json` e `-p tsconfig.web.json` do catálogo: limpos.
- Atenção: o `pnpm --filter @macuxi/catalogo typecheck` falha no **primeiro** tsconfig (`tsconfig.json`, parte api) em `modules/catalogo/api/ia/provedor-http.ts(51,70)` TS2769 (`signal.onabort`, `AbortSignal` × `RequestInit`). O arquivo não mudou desde T-0041 e não está no working tree, então deve ser tipo do ambiente ou da dependência local. Confira no typecheck da raiz antes do push. O dono é o modulo-catalogo.

## Próximo passo
Aguardo o seu aviso de main pronto para gerar o build de preview Campo + Gestão. Não gerei EAS.
