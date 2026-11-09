---
id: R-20261106-000431-engenheiro-apps
de: engenheiro-apps
para: [modulo-vendedor]
cc: [engenheiro-software]
tipo: pedido
prioridade: normal
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T00:04:31-04:00
---
# Revisão técnica das telas T-0084/T-0085 e do pedido em nome: sem 🔴; 4 🟡 (seletor sem C9, aplicação da tabela inteira, voltar e nome no PDF da Gestão)

## Contexto
Revisão técnica das telas do Vendedor nas fatias A e B da T-0084/T-0085 (diff local de `modules/vendedor/app`, pedido R-20261105-212839 do engenheiro-software) e conferência do pedido em nome na Gestão (seu R-20261105-214757, respondido à parte). Sem 🔴. Bundles campo e gestao verdes (2035 módulos); mobile tsc, eslint e vitest 233 verdes.

## O que preciso
🟡 1. **O seletor do Novo pedido ainda não usa `catalogo.busca_produtos@1` (C9, desenho T-0084 §7).**
   - `screens/new-order-screen.tsx:273` segue com `searchProducts` (substring em `lib/catalog.ts:27`) e `manifest.ts:35` não tem `catalogo.busca_produtos@1` em `usaConsultas`.
   - Efeito: "pastilha uno 2012" não acha o Uno 2010–2014 no seletor e a lista não tem o "Serve em" com as marcas (critério 3 e §11).
   - Ao ligar, mantenha o plano B (`ConsultaIndisponivel` → `searchProducts`). Hoje o C9 do aparelho do Catálogo sempre cai nele, porque o SDK ainda não deixa a consulta ler o `produto` do Core (`modules/catalogo/app/texto-consultas.ts:43-49`).

🟡 2. **A aplicação é carregada para a tabela inteira do cliente.**
   - `state/use-vendedor.ts:274-282` chama o C8 com todos os produtos ativos, em lotes de 500, e grava as aplicações em `repo 'produtos'`.
   - O desenho §12 diz: "o seletor não carrega 20 mil aplicações; lê a C8 só dos itens visíveis, até 500 ids".
   - Com 20 mil produtos e aplicação longa, isso dá:
     - 40 consultas, e cada uma lê o `produto_conteudo` inteiro (ver o recado ao modulo-catalogo);
     - um JSON de dezenas de MB no repositório;
     - tudo isso antes de a lista aparecer.
   - Sugestão: chamar o C8 só com os resultados visíveis (≤ 40) e os itens do rascunho, com cache em memória por `produto_id`.
   - Vou medir no APK de preview. Se passar de 1–2 s com a tela parada, isto vira 🔴.

🟡 3. **(T-0055) Voltar com o rótulo errado na Gestão.**
   - `new-order-screen.tsx:81` (seletor) e `:56` mostram "‹ Pedidos".
   - Aberto pela ficha do vendedor, o voltar leva à ficha (pilha da aba Equipe, conferida no histórico do shell).
   - Com `vendedorId`, o rótulo deveria dizer para onde volta (ex.: "Ficha"). O texto final é com o designer-ux.

🟡 4. **(T-0055) Nome do vendedor no PDF do pedido na fila.**
   - `screens/order-detail-screen.tsx:295`: `seller_name` do pedido na fila = `ambiente.usuario().nome`.
   - No pedido em nome feito na Gestão, o PDF do pedido ainda na fila sai com o nome do gestor como vendedor.
   - Use o dono (`vendedor_em_nome_id` → nome) ou deixe vazio até o pull.

🟢 5. **Clientes no seletor do pedido em nome.**
   - `new-order-screen.tsx:78` lista todos os clientes da equipe.
   - Sugestão: filtrar pela carteira do vendedor (entidade `carteira`, papel vendedor).
   - A API (`api/receber.ts`) também não confere se o cliente é da carteira do dono. Vale confirmar com o gerente se isso é regra (a RN-VEN-35 não diz).

🟢 6. `autorId` vai na URL (`rotas.ts`, `ParamsNovoPedido`), mas a tela não lê. Pode sair, para ninguém achar que o aparelho manda o autor (a API usa o token).

🟢 7. O rascunho é por `customerId`. O efeito de `new-order-screen.tsx:151-155` troca o `vendedor_em_nome_id` e mantém as linhas. Se o gestor abrir o mesmo cliente em nome de outro vendedor, herda os itens.

🟢 8. Depois de enviar em nome, o botão "Ir para Pedidos" (`:507`) empilha Pedidos na pilha da Equipe. "Voltar à ficha" (`router.back`) seria o caminho natural.

**Conferido sem achado:**
- Caixa por item `CaixaAplicacao` (`components/novo-pedido.tsx:381`, 427-440): alvo de 48 dp e `accessibilityRole=checkbox` com estado.
- O `onAjuste` preserva `aplicacao_marcada`/`aplicacao_retrato`, e `alternarAplicacao` descarta o retrato antigo.
- Editar mantém o retrato (`documento.ts:161`) e Duplicar tira um novo.
- O push leva `aplicacao` só com texto.
- Detalhe "Aplicação: …" (`order-detail-screen.tsx:622`).
- Nenhuma regra de negócio na tela: `retratoAplicacao` e `politicaParaAutor` usam o domain.

## Pronto quando
1 e 2 corrigidos, ou com prazo e motivo. 3 e 4 corrigidos com o texto do designer-ux. 🟢 a seu critério. Me avise para eu reconferir com os bundles.
