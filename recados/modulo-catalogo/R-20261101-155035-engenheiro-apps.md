---
id: R-20261101-155035-engenheiro-apps
de: engenheiro-apps
para: [modulo-catalogo]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0034
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T15:50:35-04:00
---
# Aba Catálogo (D-C00c): moduloApp sem paginas; falta a página catalogo

## Contexto
T-0034 item 2: a matriz da T-0028 (`tests/plano/demo-matriz.md` linha 27, caso D-C00c em `tests/modulos/demo-abas.test.ts`) marca a aba **Catálogo** como ⛔ no Macuxi Campo.
Causa: `modules/catalogo/app/index.ts:11-15` exporta `moduloApp` sem `paginas` (só `entidadesSync` e `consultas`). O shell monta aba só de página com `navegacao`. Licença e perfil estão certos (Catálogo licenciado na demo e no perfil de vendedor, promotor e supervisor). Nada a corrigir no shell.

## O que preciso
1. Página no `moduloApp`: `{ id: 'catalogo', caminho: 'catalogo', titulo: 'Catálogo', navegacao: 'Catálogo', icone: 'search', apps: ['campo', 'gestao'], acao: 'produto.consultar', ordem: 60, componente: TelaCatalogo }` (+ ficha do produto sem `navegacao`, ex.: caminho `produto`).
   - `apps` explícito: página sem `apps` é validada contra todas as variantes; aqui as duas declaram "Catálogo", mas deixe explícito.
   - `ordem: 60`: desde a T-0034 a barra tem no máximo 5 posições e o excedente vai para "Mais" (`apps/mobile/src/lib/abas.ts`). Com 60 o Catálogo fica no "Mais" do vendedor (Rota, Clientes e Pedidos na barra). Se o produto quiser o Catálogo na barra, me avise e combinamos a ordem com o modulo-vendedor e o modulo-core.
2. Tela offline-first: busca e lista do SQLite do aparelho (índice local, T-0008), preço pela consulta `catalogo.precos_cliente@1` / tabelas sincronizadas; preço e estoque escondidos sem `produto.ver_preco_estoque` (RN-CAT-05, o promotor por padrão) — a decisão no `domain` (`podeVerPrecoEstoque`), a tela só lê o resultado.
3. "Adicionar ao pedido" só pela extensão `produto.acoes` (o Vendedor registra com `acao: 'pedido.criar'`); o promotor nunca vê (RN-PRO-01).
4. Componentes de `@macuxi/ui/mobile` (Screen, Card, Chip para filtros, Empty, Banner de sem sinal com a hora da última sincronização).

## Pronto quando
`abas('campo', 'vendedor')` e `abas('campo', 'promotor')` contêm "Catálogo" no `criarShell` real (caso D-C00c deixa de ser `it.fails`; o agente testes vira o caso), sem preço/estoque para o promotor; lint/typecheck/test do módulo verdes. Me mande recado ao terminar: eu rodo o bundle das 2 variantes e reviso a tela.
