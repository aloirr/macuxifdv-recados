---
id: R-20261109-143406-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: [testes]
tipo: entrega
prioridade: normal
tarefa: T-0141
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T14:34:06-04:00
---
# T-0141 A, B, C, F e G (Preços de hoje) implementados conforme as pranchas aprovadas

## Contexto
T-0141, itens A, B, C, F e G (conferência) do Novo pedido v3, aprovados pelo Alexandre pela imagem (R-20261109-121700) e pedidos em R-20261109-115204. Barra inferior: é do shell, não mexi (5 abas). Sem commit.

## O que fiz (só em modules/vendedor)
- **A** crédito da aba Venda em `TabelaValores` (Limite, Disponível, Prazo médio; negrito à direita; negativo com "−" em vermelho; "—" sem dado; barras lendo; "Crédito indisponível agora. Sincronize o aparelho."). Regra em `app/lib/textos-venda.ts` (`tabelaDoCredito`), saíram `linhaDoLimite` e `fraseDoFrete`. Forma e prazo e Frete/Observações sem cartão, como na prancha 1.
- **B** aba Entrega sem as frases do CIF e do FOB.
- **C** endereço editável só no pedido. Contrato: `EnderecoEditadoPedido`, `EnderecoEntregaPedido` (origem), `PedidoPush.endereco_entrega_editado` (`contracts/frete.ts`, `index.ts`). Regra no domain (`domain/endereco-pedido.ts`: normalizar, validar com limites da NF-e 60/20/60/60/60, UF das 27, CEP 8 dígitos, `enderecoDoPedido`: igual a um do ERP vira origem erp). API (`receber.ts`, `orcamentos.ts`) grava o retrato com origem e recusa com `endereco_invalido` sem logar o endereço. Detalhe (`mapeamento.ts`, `pull.ts`) devolve `origem`. `aprovado@1` com `origem: 'editado'` (`enderecoParaEvento` no domain). App: cartão com selo e Alterar/Editar, folha com os endereços do ERP e "Editar endereço deste pedido", formulário (offline, à mão, Cidade e UF obrigatórias, sem consulta de CEP, "Descartar a edição?"), Resumo com "Editado neste pedido", detalhe do Campo/Gestão e BKO com o selo, PDFs com "Endereço de entrega" sem marca. Duplicar/Transformar levam o endereço editado.
- **F** `domain/rascunhos.ts` (lista inclui a edição de registro salvo, `minutosParaSumir`, `textoSomeEm`), `app/lib/rascunhos-lista.ts`, tela `rascunhos-screen.tsx` (rota `rascunhos`, estados carregando, vazio, erro, fora da carteira), linha "Rascunhos (n)" no topo de Pedidos (`LinhaAtalho`), retomada na aba em que parou (`Rascunho.aba`, gravar a aba não renova as 24 h). Os rascunhos **saíram da lista Pedidos** (spec F.1).
- **G** a folha "Preços de hoje" **não existia** (só a conferência em frases): criada conforme a prancha 2 (`app/lib/precos-de-hoje.ts`, `reconferirOrcamento` devolve `itens_hoje`, totais em `TabelaValores`, "Mudaram", "Sem preço hoje", "Ver os N itens", botão "Transformar com os preços de hoje" / "sem este item(ns)"), e o apoio "Entra pelos preços de hoje" no Transformar do detalhe. Com bloqueio, segue a conferência de antes.

## Testes
Novos: `domain/endereco-pedido.test.ts` (15), `app/lib/endereco-pedido.test.ts`, `app/lib/endereco-ponta-a-ponta.test.ts` (formulário → rascunho → push → API → retrato → detalhe BKO → Duplicar → 2 PDFs → `aprovado@1`), `app/lib/rascunhos-lista.test.ts`, `app/lib/precos-de-hoje.test.ts`, ampliados `domain/rascunhos`, `preco-orcamento`, `pdf-pedido`, `detalhe-pedido`, `textos-venda`, `web/lib/detalhe-pedido`. tsc (3 projetos) e eslint do módulo sem erro nem aviso; vitest do @macuxi/vendedor: 1190 passam (o único vermelho foi lista-desempenho, meta de 100 ms estourada por carga do PC, e passa isolado). Teste de banco (`*.db.test.ts`) não rodei (sem Docker): a API usa a 0055 do banco-dados.

## Pendências e avisos
- `tests/modulos/linha-salvo-pedidos-t0130.test.ts` (testes) importa funções que saíram (a linha Salvo deixou a lista): recado R-20261109-140227 ao testes.
- Não fiz o aviso "Pedido guardado em Rascunhos" com Abrir (F.4: saída sem a pergunta); depende da navegação do shell (engenheiro-apps) e do item E.
- Ordem de deploy (desenho T-0141 §7): API e migração 0055 antes do APK.
- O ✕ do título das folhas está desenhado dentro do conteúdo (o `Folha` do kit não tem ✕): designer-ux pode querer prop própria.
- Telas só validadas por tipos e testes de função; o print do aparelho (360 e 412 dp) fica para a revisão de UX no build.
