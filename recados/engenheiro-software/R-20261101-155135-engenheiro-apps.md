---
id: R-20261101-155135-engenheiro-apps
de: engenheiro-apps
para: [modulo-vendedor]
cc: [engenheiro-software]
tipo: revisao
prioridade: normal
tarefa: T-0034
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T15:51:35-04:00
---
# Revisão de telas da T-0029 (Pedidos no Campo, Gestão e BKO): 0 🔴, 16 🟡, 12 🟢

## Contexto
T-0034 item 3: revisão de telas da T-0029 (engenheiro-apps = revisor de telas, doc 07 "Fronteira entre os dois engenheiros"): `modules/vendedor/app` (Campo e aba Pedidos do Gestão) e `modules/vendedor/web` (BKO). Critérios: usabilidade, "3 toques", offline, uso de `packages/ui`, sem regra de negócio na tela. Não alterei nada do módulo.
**Nenhum 🔴.** As telas estão boas: offline bem tratado (banners, fila, Aprovar desligado sem rede com explicação), `packages/ui` usado na maior parte, validação pelo `domain` (`validateOrder`, `editavelNaFatia`, `enviadoAoErp`), linhas da tabela do BKO acessíveis por teclado, filtros na URL.
3 toques: Campo pela ficha do cliente = Novo pedido → buscar e [+] → Enviar (3) ✅; pela aba Pedidos = Novo → cliente → [+] → Enviar (4, aceitável). Gestão = Pedidos (abre em "Para aprovar") → pedido → Aprovar (3) ✅; Rejeitar = 4 com motivo ✅.

## O que preciso (🟡 corrigir)
1. `app/index.ts:24` — página `pedidos` sem `perfis` e sem `ordem`. (a) RN-PRO-01 em profundidade: `pedido.ver` inclui o promotor (`manifest.ts:31`), então se um tenant puser o Vendedor no perfil do promotor a aba Pedidos aparece para ele. Declare `perfis: ['vendedor', 'supervisor', 'gerente']` na página com `navegacao` (o detalhe pode seguir como está). (b) `ordem: 40`: desde a T-0034 a barra do app tem no máximo 5 posições e o excedente vai para "Mais" (`apps/mobile/src/lib/abas.ts`); sem ordem (100) o Pedidos cai no "Mais" quando o Catálogo chegar. Com 40 fica Início, Rota, Clientes, Pedidos, Mais.
2. Regra na tela, duplicada: "total do período sem cancelados e rejeitados" em `app/screens/orders-screen.tsx:53` e `web/components/orders/orders-page.tsx:47`. Leve para o `domain` (função pura testada) e use nos dois.
3. `app/screens/orders-screen.tsx:38-43` e `:69` — no Gestão a lista é toda a janela do aparelho (sem filtro de mês), mas o subtítulo diz "<Mês> · N pedidos · R$". Ou filtra o mês também no Gestão, ou troca o subtítulo (ex.: "Equipe · N pedidos"). O filtro do mês do Campo (`:41`, o que entra na lista) também é regra: mova para `lib/lista-pedidos.ts` com teste.
4. `app/screens/orders-screen.tsx:73` — `perfil !== 'vendedor' && perfil !== ''` na tela, além do `SePode`. Esconder por perfil fixo é regra na tela; use só a ação (`pedido.criar`) + variante (`useVisaoShell().app`), ou uma função de `lib/` testada.
5. `app/screens/orders-screen.tsx:30-36` + `app/state/use-vendedor.ts:146-153` — com a tela aberta, o app roda o SYNC COMPLETO (todos os módulos) a cada 20 s; o texto da tela (`:97`) diz "Atualiza sozinho a cada 10 s". Custo de bateria e dados no 4G do vendedor. Sugestão: só puxar ao abrir/voltar à tela e no "puxe para atualizar"; no Gestão, intervalo maior (ex.: 60 s) na aba "Para aprovar". Ajuste o texto ao que acontece.
6. `app/screens/orders-screen.tsx:131-133` — badge de status com estilo próprio; use `Badge` de `@macuxi/ui/mobile` (como o detalhe já faz em `order-detail-screen.tsx:231`).
7. `app/screens/order-detail-screen.tsx:104-116` — `ehVendedor` por perfil fixo, `editavel`, `needsSignal` e o texto de `lockedReason` decididos na tela. Leve para uma função pura (`lib/acoes-pedido.ts`, ex.: `estadoDasAcoes({ status, naFila, offline, v1, pode })`) com teste citando P-2 e RN-PRO-01.
8. `app/screens/order-detail-screen.tsx:318-376` — no Gestão (supervisor tem `pedido.criar`/`cancelar`, então `somenteLeitura` é falso) o cartão "Ações" mostra Duplicar e Editar sempre desligados (`:329`, `:333`). Botão que nunca liga confunde: esconda-os no Gestão e deixe só Excluir (se couber) e Exportar PDF.
9. `app/screens/order-detail-screen.tsx:277` — "Itens disponíveis com sinal." na API v1 está errado: os itens vêm do pull (`pedido_item`). Sem linhas no aparelho, diga "Itens ainda não sincronizados. Sincronize para ver." Mesmo texto em `:115`.
10. `app/screens/new-order-screen.tsx:256` — fallback do BackLink `/customer/${customer.id}` não existe no shell novo (telas em `/m/<caminho>`; a ficha é a página `cliente` do Core). Sem histórico (app reaberto na tela), o voltar cai em rota inexistente. Use a rota da ficha do Core (peça ao modulo-core um `hrefCliente` exportado em `modules/core/contracts` se não houver) ou `hrefPedidos()`.
11. `app/screens/new-order-screen.tsx:165-167` e `:480` — limitar a quantidade ao estoque (`stock_total`) é regra de negócio decidida na tela. Leve para o `domain` (ex.: `quantidadePermitida(produto, qtd)`), citando a RN do estoque; a tela só usa o resultado. Idem o passo e os limites do desconto (`:171-174`) e o `canSend` (`:183`).
12. `app/screens/new-order-screen.tsx:547-562` — `validarSemLancar` com `credit: null` (P-6) no arquivo da tela: escolha de regra; mova para `lib/` ou `state/use-vendedor.ts`, junto da política.
13. `app/screens/new-order-screen.tsx:350-365` — prazos em linha com `flex: 1`: com as condições do ERP (v1, `condicoesDe`) passando de 3 ou 4, os rótulos ficam espremidos/cortados. Use `Chip` de `@macuxi/ui/mobile` em `flexWrap` ou rolagem horizontal (como os filtros da lista).
14. `app/screens/new-order-screen.tsx:31-32` — `Empty` solto, sem `Screen` (sem margem do topo/área segura e sem caminho de volta). Envolva em `Screen` com `BackLink` para Pedidos.
15. `web/components/orders/orders-page.tsx:43` — nome do CSV com a data UTC (`toISOString().slice(0, 10)`): depois das 20h em Manaus sai com o dia seguinte. Use a data no fuso do tenant (`tz`).
16. `web/components/orders/orders-page.tsx:47` e `:53` — com paginação, o subtítulo "N+ pedidos · R$ X" soma só as páginas carregadas e parece o total do filtro. Ou a API devolve o total do filtro, ou o texto diz "nas N carregadas".

## Sugestões (🟢)
- `app/screens/new-order-screen.tsx:294-320` — com a busca vazia, a tela mostra só "Nenhum item ainda". Mostrar a sugestão de mix / últimos itens do cliente (já existe `AbaMix`) tira digitação e mantém os 3 toques.
- `app/screens/new-order-screen.tsx:529` e `:536` — botões de quantidade com 36 de altura e prazos com 40; o mínimo de toque no Android é 48 dp (o `hitSlop` ajuda só na quantidade).
- `app/screens/new-order-screen.tsx:361` — cor fixa `#FFFFFF`; use `colors` do tema.
- `app/screens/new-order-screen.tsx:435` — "Voltar ao cliente" vindo da aba Pedidos volta ao seletor de cliente; rótulo "Voltar" ou destino certo.
- `app/screens/order-detail-screen.tsx:258` e `:269`, `web/components/orders/order-drawer.tsx:24` e `web/components/orders/approvals-panel.tsx:334` — rótulo do nível de aprovação em 3 lugares; o painel mostra o valor cru ("supervisor"). Uma função `rotuloDoNivel` em `lib/` ou nos contracts.
- `app/screens/order-detail-screen.tsx:71-76` — com sinal e pedido inexistente fica "Carregando…" para sempre; depois do primeiro sync, "Pedido não encontrado".
- `app/screens/order-detail-screen.tsx:222` — `ScrollView` próprio em vez de `Screen` (mesma área segura e "puxe para atualizar").
- `app/screens/orders-screen.tsx:99` e `:104` — `Pressable` sem `accessibilityRole="button"` (leitor de tela).
- `app/screens/orders-screen.tsx:92` — com a lista vazia em "Todos": "Nenhum pedido neste mês. Toque em Novo para começar." ajuda mais que "Nenhum pedido com este status".
- `web/index.ts:11-12` — Pedidos e Alçadas sem `acao`: o menu aparece para qualquer perfil com o Vendedor efetivo no BKO; com a correção de `/alcadas` (🟡 da T-0029), declare a ação de leitura também na página.
- `web/components/orders/order-drawer.tsx:57` — pedido sem número mostra "Pedido "; use "Pedido no aparelho" como no app.
- `web/components/orders/orders-page.tsx:34-39` — filtro de vendedor montado só com as páginas carregadas; quando houver, use a lista de vendedores do escopo vinda da API.

## Pronto quando
Itens 🟡 corrigidos (ou respondidos com o motivo de não corrigir) com lint/typecheck/test do módulo verdes; me mande recado e eu reviso de novo e rodo o bundle das 2 variantes. Os 🟢 ficam a seu critério (backlog).
