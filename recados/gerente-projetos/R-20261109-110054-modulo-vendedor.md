---
id: R-20261109-110054-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0141
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T11:00:54-04:00
---
# T-0141 (D, E, G, H, I, F domain, restos RD-0036/0042) entregue; A, B, C e a tela de Rascunhos aguardam a imagem

## Contexto
T-0141, escopo sem esperar a imagem do designer-ux: D, E, G, H, I, F (só domain/lib) e os restos do RD-0036/RD-0042. Sem commit. Lint, typecheck e testes do @macuxi/vendedor verdes (1135 testes; os de banco ficam no CI).

## O que foi feito
- **D:** o botão "Catálogo" (trilha) saiu da aba Itens; `irParaCatalogoDoPedido`/`niveisDaTrilha` removidos. Teste `app/screens/sem-catalogo-no-pedido.test.ts`.
- **E:** diagnóstico do engenheiro-apps (R-20261109-095142): o editor desmonta ao abrir outra `/m/`. Sem o Catálogo, o caminho não existe; o rascunho é gravado a cada alteração e agora é listável/retomável (`domain/rascunhos.ts`). Teste: saída sem a pergunta deixa o pedido em Rascunhos (`domain/rascunhos.test.ts`). Nada mais pedido ao shell.
- **G:** `validadeDoPreco`/`precoDoOrcamentoVale`/`etiquetaPrecoDe` em `domain/orcamento.ts` (D+7 23:59 no fuso do tenant). `situacaoDoOrcamento` nunca devolve `expirado`; sem "Vencido" e sem "até dd/mm" no app, BKO e PDF; selo "Orçamento · preço de dd/mm"; botões "Preço de dd/mm". API: `receber.ts`/`orcamentos.ts` usam a tabela do dia quando o preço venceu; filtro SQL e janela do pull (`pedidos.ts`, `sync.ts`) não olham mais a validade. App: `reconferirOrcamento(..., { preco_vale })` lista a diferença por item e devolve o total (folha mostra "Total: R$ X (era R$ Y), R$ Z a mais"). Cartão do Início sem "vence amanhã".
- **H:** `motivoDaRecusa` mostra a frase do servidor (RN-VEN-40). Causa explicada ao Alexandre (R-20261109-095146-modulo-vendedor): o aparelho descartava a frase; o motivo exato fica na Fila do aparelho do Lucas (mais provável: desconto de 10% acima do máximo do produto).
- **I:** `orderPdfFileName(numero, emissao, fuso, tipo)` → `ORC-0001-09112026.pdf` / `PED-PROV-...`; o arquivo é renomeado com `expo-file-system` antes de compartilhar (app) e o título do PDF vira o nome (BKO). Mesmo nome nas duas versões.
- **F (domain/lib):** `rascunhosParaLista`, `rascunhoExpirou`, `limparRascunhosExpirados` (24 h, relógio injetado); limpeza a cada leitura do repositório; o rascunho "Salvo" da lista Pedidos também some em 24 h.
- **RD-0036:** ponto do destino removido; "Transformar em pedido" pelo `ROTULOS_DO_SALVAR`. **RD-0042:** `somarDias` agora é `somarDiasCivis` do @macuxi/comum. **RD-0039** (folhas em order-sheets.tsx) ficou para depois.
- Docs: `docs/modulos/vendedor/pre-venda-e-erp.md` (seção T-0141).

## Pendências / premissas
- Telas A, B, C e F (Rascunhos) esperam a imagem aprovada; falta a entrada "Rascunhos" do designer-ux.
- Testes de banco ajustados mas só rodam no CI (sem Docker): `api/pre-venda.db.test.ts` (converter com preço vencido aceita; editar depois de 7 dias resolve) — conferir no CI; `api/sync.db.test.ts` não mexi (janela do pull sem validade).
- Premissa: a data do preço = validade − `orcamento.validade_dias`; documento antigo sem `validade_data` mostra só "Orçamento".
- `domain/orcamento-v2.test.ts` já estava reduzido no working tree antes desta tarefa (HEAD tem 284 linhas); reconstruí a versão enxuta e a cobertura do reconferir está em `domain/preco-orcamento.test.ts` e `app/lib/documento.test.ts`. Vale conferir com o corretor/testes se algo foi perdido.
- `node scripts/coord.mjs verificar modulo-vendedor`: só a violação de `.vscode/settings.json` (não é minha).
