---
id: R-20261108-131606-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T13:16:06-04:00
---
# Chat do dono do produto, 08/11 ~13h05: Novo pedido v2 (T-0131 a T-0138; junta D a G da manhã)

Registro literal do chat do dono do produto com o gerente-projetos, domingo 08/11/2026, por volta das 13h05.

Tarefas abertas a partir desta mensagem:
- T-0131: tarefa-mãe "Novo pedido v2". Junta a manhã (D T-0127, E T-0128, F T-0129, G T-0130) e a tarde (H a M).
- T-0132: Frente H, docs 02 e 03. Já feita pelo gerente.
- T-0133: Frente H, padrão em docs/design. Com o designer-ux.
- T-0134: Frente I, preço congelado no orçamento.
- T-0135: Frente J, validade do orçamento.
- T-0136: Frente K, 4 abas.
- T-0137: Frente L, Resumo, botões e desconto compacto.
- T-0138: Frente M, detalhe e histórico em tags.

Sequência no modulo-vendedor:
- F (feita) → J e I → K → L (absorve a D, já feita) → E → G → M.
- A E já estava em andamento quando esta mensagem chegou. A base dela (rascunho local, retomada, interceptação no shell) aproveita; os rótulos da folha mudam na L.

=== TEXTO LITERAL ===
@gerente-projetos Segunda rodada do teste de campo de domingo 08/11 (APK Campo demo, vendedor Lucas Andrade, online), prints das 12:43, 12:45 e 12:59. O assunto é o **Novo pedido / orçamento v2**: 4 abas, Resumo completo, desconto compacto, preço congelado no orçamento e nova tela de detalhe com histórico em tags. Tudo entra na esteira agora (R-20261107-164646). Não é backlog.

## 0. Regras desta rodada
- **Numeração:** use os próximos T-nnnn livres. As frentes continuam a letra da rodada da manhã (A–G), por isso esta começa em H.
- **Chat vira recado:** grave esta mensagem como recado `aviso` para `todos`, com o texto literal, a data/hora e as tarefas abertas.
- **Junção com a rodada da manhã:** as frentes D (pendências só no Resumo), E (sair do pedido), F (forma de pagamento volta para Pix) e G (salvar pela fila) mexem nas mesmas telas desta rodada. Junte tudo numa **tarefa-mãe "Novo pedido v2"**, com subtarefas, para ninguém refazer a mesma tela duas vezes.
  - **Sequência sugerida:** F (bug no `domain`, independente) → J (validade) e I (preço congelado) → K (4 abas) → L (Resumo, botões, desconto, pendências da D) → E (sair) → G (salvar pela fila) → M (tela de detalhe).
- **Nomes de aba:** onde os textos da manhã citam "aba Detalhes", passa a valer:
  - "aba Venda" para forma, prazo e alertas;
  - "aba Entrega" para endereço, frete, transportadora e observações.
- **Prioridade:** T-0093 → T-0094 → **Novo pedido v2 (manhã + tarde)** → build único Campo-Demo-v1.0.0 / Gestao-Demo-v1.0.0 → o resto. O pedido é o centro da demo.
- **Ambiente:** sem Docker no PC; banco e stack isolado no CI. Git só por você, pela regra de rodada.

---

## Frente H — Docs: atualizar 02 e 03 (gerente-projetos + designer-ux)
Decisões do Alexandre em 08/11/2026 (tarde). Aplique o texto abaixo e avise `todos`. O designer-ux registra em `docs/design/` o padrão de abas do pedido, o desconto compacto, o detalhe do pedido e as tags de histórico.

**docs/produto/02 — RF-VEN-11, nova redação (substitui a de 3 abas)**
> Tela **Novo pedido** (Campo; a mesma no Gestão para pedido em nome; a mesma para "Editar orçamento" e "Editar pedido"): cabeçalho com o cliente e **quatro abas**: **Venda · Itens (n) · Entrega · Resumo**. Funciona offline.
> - **Venda**: no topo, a caixa **Alertas** (cliente bloqueado/inativo/cadastro incompleto, RN-VEN-13; título vencido com quantidade, valor e dias, RN-VEN-13; crédito excedido, RN-VEN-12). Sem alerta, uma linha só: "Cliente liberado · sem título vencido". Abaixo: **Forma de pagamento** e **Prazo** (RN-VEN-24/25), **Limite** (total e disponível, RN-VEN-12) e **Prazo médio do cliente**, com a data da última sincronização.
> - **Itens (n)**: igual à versão atual, sem forma e prazo. Total do pedido · n itens no topo; busca + árvore do catálogo; itens com quantidade e desconto/acréscimo; **Leve mais e pague menos** (RN-VEN-23) e **Combina com o pedido** no fim da aba.
> - **Entrega**: endereço de entrega (RN-VEN-17), frete CIF/FOB com transportadora no FOB (RN-VEN-16, RF-VEN-12) e Observações.
> - **Resumo**: tudo o que o pedido leva, só leitura, nesta ordem: cliente (nome, código), venda (forma, prazo, alertas), itens compactos, entrega (endereço, frete, transportadora), observações, desconto do pedido, totais (Tabela, Descontos, Total) e faixa da alçada. Depois, o bloco "Falta para salvar" (quando houver) e os botões **Salvar e enviar pedido** · **Apenas salvar** · **Salvar como orçamento** · **Cancelar**.

**docs/produto/03 — RN-VEN-18, acrescentar (preço congelado)**
> O orçamento **congela os preços** dos itens no momento em que é salvo. Editar o orçamento nunca reprecifica os itens já salvos; só o item **novo** incluído na edição entra pelo preço de hoje. Dentro da validade, "Transformar em pedido" mantém os preços do orçamento e reconfere só **estoque** e **preço mínimo** (RN-VEN-11). Se algum item ficar abaixo do mínimo, avisa qual item, sem trocar o preço sozinho. O orçamento vencido só pode ser duplicado, e o duplicado entra pelos preços de hoje. *(Alexandre, 08/11/2026: "se eu salvei o orçamento é porque eu quero os preços congelados nele".)*
> Retirar do texto atual: "reconfere preço … (avisa o que mudou)".

**docs/produto/03 — RN-VEN-30, acrescentar (rótulos do histórico)**
> No app e no BKO, o histórico mostra só **tags de status**, com data e hora curtas, sem frase. Pedido: **Salvo** (`rascunho`) · **Na fila** (`na_fila`, sem sinal) · **Enviado** (`recebido`) · **Em aprovação** · **Aprovado** · **Rejeitado** (+ motivo em 1 linha) · **Recebido no ERP** (`integrado_erp`) · **Faturado parcial** · **Faturado** · **Cancelado** (+ motivo em 1 linha). Orçamento: **Salvo** · **Transformado em pedido nº** · **Vencido** · **Cancelado**. O autor só aparece quando não é o vendedor do pedido (ex.: gestor). Nunca mostrar texto técnico ("Recebido pelo servidor").

**docs/produto/02 — RF-VEN-05, acrescentar (tela de detalhe)**
> Detalhe do pedido/orçamento, com ênfase na informação e não nos botões:
> 1. **Cabeçalho em destaque**: número, tag de tipo/status (ex.: "Orçamento · até 15/11"), cliente (nome e código) e vendedor.
> 2. **Itens**.
> 3. **Total**, separado no fim, com forma e prazo de pagamento.
> 4. **Histórico em tags**.
> 5. **Ações num rodapé compacto**: 1 ação principal (orçamento: Transformar em pedido) e as outras (Editar, PDF, Duplicar) como ícone com rótulo curto; Cancelar fica no menu ⋮, com confirmação.

**Ajuste dos textos da manhã:** na RN-CORE de pendências e na RN-VEN-16, troque "aba Detalhes" por "aba Entrega" (frete/transportadora) e por "aba Venda" (forma/prazo).

**Pronto quando:** docs 02 e 03 atualizados e avisados a `todos`; `docs/design/` com o padrão; as frentes I a M citam as regras novas.

---

## Frente I — Bug: editar orçamento reprecifica os itens (modulo-vendedor)
**Contexto:** print das 12:45, "Editar orçamento 000012", Mercadinho São Jorge · cód. C5002 · prazo médio do cliente 45 dias. A aba Itens abre com o alerta amarelo "Preços atualizados pela tabela de hoje do cliente." Item: AGU-1500 Água mineral 1,5 L (fardo 6), 1 FD, R$ 19,90. O orçamento foi salvo às 10:35 do mesmo dia (o preço não mudou, mas o app reprecificou e avisou).

**Passos:**
1. Pedidos → Orçamento 000012 → Editar.

**Esperado (RN-VEN-18 com o acréscimo da Frente H):**
- nenhum item salvo é reprecificado e não aparece aviso de preço;
- item novo incluído na edição entra pelo preço de hoje;
- desconto e quantidade continuam editáveis.

**Obtido:** o app reaplica a tabela de hoje em todos os itens e mostra o aviso.

**Também:** "Transformar em pedido" passa a manter o preço do orçamento dentro da validade, reconferindo só estoque e preço mínimo (com aviso por item, sem troca silenciosa). A API faz o mesmo no Transformar.

**Pronto quando:**
- teste do `domain` antes da correção: edição não altera o preço unitário gravado; item novo usa a tabela de hoje; Transformar dentro da validade mantém o preço; abaixo do mínimo, avisa o item;
- a API revalida igual;
- print do APK antes/depois;
- testes avisado para regressão.

---

## Frente J — Bug: validade do orçamento diferente na mesma tela (modulo-vendedor)
**Contexto:** print das 12:43, "Orçamento 000012". A tag diz "Orçamento · até **15/11**", e o histórico diz "Orçamento salvo, válido até **16/11/2026**". A folha de salvar da manhã dizia "Válido até 15/11". Salvo em 08/11 às 10:35, com `validade_orcamento_dias` = 7.

**Esperado:** uma data só, igual no app, no BKO, no PDF e na API, calculada por uma função única no `domain` (de preferência pelo calendário de `packages/comum`), no fuso do tenant (America/Manaus).

**Obtido:** 15/11 numa parte e 16/11 na outra. Pode ser fuso (UTC × Manaus) ou contagem inclusiva × exclusiva.

**Decisão (premissa, ajustável pelo Alexandre):** "válido até" = data do salvamento + 7 dias corridos, inclusive. Salvo em 08/11 → válido até 15/11, 23:59, hora de Manaus.

**Pronto quando:** teste cobre salvar às 22h de Manaus (já é outro dia em UTC); app, BKO, PDF e API mostram a mesma data; print do APK antes/depois.

---

## Frente K — Novo pedido em 4 abas: Venda · Itens · Entrega · Resumo (modulo-vendedor; designer-ux no layout e textos; engenheiro-apps revisa o shell)
**Rótulos curtos nas abas** (4 abas num celular de 6"): **Venda · Itens (n) · Entrega · Resumo**. Dentro da aba, o título pode ser completo ("Dados da venda", "Dados da entrega").

**Aba Venda** (abre nela):
```
ALERTAS
⚠ Cliente inadimplente · 1 título vencido · R$ 3.400,00 · 12 dias
  Só à vista ou com aprovação
⛔ Cliente bloqueado · só orçamento                  ← quando houver
(sem alerta: ✓ Cliente liberado · sem título vencido)

FORMA DE PAGAMENTO        PRAZO
[Boleto ˅]                [28/56 dias ˅]

LIMITE            R$ 10.000,00 · disponível R$ 4.000,00
PRAZO MÉDIO DO CLIENTE                           45 dias
⟳ Atualizado hoje às 10:27
```
**Aba Itens (n):** igual à de hoje, sem o card de forma/prazo. Total do pedido · n itens no topo. **Leve mais e pague menos** e **Combina com o pedido** vêm da aba Detalhes para o fim desta aba.

**Aba Entrega:**
```
ENDEREÇO DE ENTREGA
Rua Pará, 137 · São Geraldo · Manaus/AM   [trocar]

FRETE
[CIF]  [FOB]
CIF: frete incluso no preço
FOB: transportadora [escolher da lista ou digitar]

OBSERVAÇÕES
[                                   ]
```
**Valor de frete:** a RN-VEN-16 não tem valor de frete (CIF incluso no preço; FOB pago pelo cliente direto à transportadora). Nesta rodada **não** crie campo de valor; a aba mostra a frase de cada modalidade. Se o Alexandre quiser valor de frete, isso vira RN nova, com mudança no contrato do ERP e nos PDFs.

**Bolinha de pendência:** fica na aba onde está a correção (Venda, Itens ou Entrega), conforme o padrão da Frente D.

**Pronto quando:**
- as 4 abas funcionam offline no Campo e no Gestão (pedido em nome), em Novo pedido, Editar orçamento e Editar pedido;
- o vendedor faz o pedido mais simples (cliente sem alerta, CIF, 1 item) sem perder toques em relação à versão atual;
- revisão de UX do designer-ux e técnica do engenheiro-apps sem 🔴;
- print do APK de cada aba no recado de entrega.

---

## Frente L — Resumo completo, 4 botões e desconto compacto (modulo-vendedor + designer-ux)
**Resumo**, só leitura, com tudo:
```
Mercadinho São Jorge · cód. C5002
VENDA      Boleto · 28/56 dias · ⚠ vai para aprovação (título vencido)
ITENS      Água mineral 1,5 L (fardo 6) · 1 FD ........ R$ 19,90
ENTREGA    Rua Pará, 137 · São Geraldo · Manaus/AM · CIF
OBS.       —

DESCONTO DO PEDIDO   [Desc % ˅][   1,0 ]   −R$ 0,20

Tabela                                   R$ 19,90
Descontos                               −R$ 0,20
Total                                    R$ 19,70
✓ 1,0% · dentro da alçada

FALTA PARA SALVAR                               ← só quando houver
• Transportadora do frete FOB — aba Entrega

[ Salvar e enviar pedido ]                      ← principal, largura total
[ Apenas salvar ]  [ Salvar como orçamento ]    ← secundários, metade cada
Cancelar                                        ← link de texto, abre "Sair do pedido?"
```
**Desconto do pedido compacto:**
- hoje ocupa metade da tela (4 botões grandes Desc./Acrésc./%/R$ + campo com −/+);
- passa a ser **uma linha** com o **mesmo componente do desconto do item** (lista Desc %, Desc R$, Acrésc %, Acrésc R$ + campo), na mesma altura do item, sem −/+;
- o equivalente em R$ (ou %) fica ao lado, na mesma linha;
- um componente só para item e pedido: peça ao designer-ux para pôr em `packages/ui`.

**Botões:**
- **Salvar e enviar pedido:** valida tudo; com pendência, desabilitado. Sem pendência, segue a Frente G (grava `na_fila`, fecha a tela na hora e envia pela fila). O texto embaixo do botão diz o destino: "Vai direto ao ERP" ou "Vai para o supervisor" (RN-VEN-10/13).
- **Apenas salvar:** grava como `rascunho`, sem enviar, e **aceita pendências** (é o rascunho: o vendedor interrompido pelo cliente não pode perder o trabalho). Na lista Pedidos aparece com a tag **Salvo**; ao reabrir, o Resumo mostra o que falta.
- **Salvar como orçamento:** valida itens, forma, prazo e frete; com pendência, desabilitado. Congela os preços (Frente I).
- **Cancelar:** abre a folha "Sair do pedido?" da Frente E.
- Acaba a folha intermediária "Salvar pedido → Enviar pedido / Salvar como orçamento": os botões ficam direto no Resumo (1 toque a menos).
- A folha "Sair do pedido?" (Frente E) usa os mesmos rótulos: Salvar e enviar pedido · Apenas salvar · Salvar como orçamento · Descartar · Continuar editando.
- RN-VEN-13 (cliente bloqueado, inativo, cadastro incompleto): só Apenas salvar e Salvar como orçamento.
- **Editar orçamento:** o Resumo mostra **Salvar orçamento** (principal), **Transformar em pedido** e Cancelar.

**Pronto quando:**
- o Resumo mostra todos os dados das 4 abas;
- o desconto do pedido ocupa uma linha;
- os 4 botões seguem as regras acima, com teste no `domain` para cada estado (sem pendência, com pendência, RN-VEN-13, edição de orçamento);
- print do APK antes/depois.

---

## Frente M — Tela de detalhe do orçamento/pedido e histórico em tags (modulo-vendedor + designer-ux; BKO e Gestão usam o mesmo padrão)
**Contexto:** print das 12:43, "Orçamento 000012". O Alexandre levou cerca de 10 s para entender a tela:
- os botões (Transformar em pedido, Editar, PDF, Duplicar, Cancelar orçamento) ocupam metade da tela;
- "Recebido pelo servidor." é texto técnico;
- o histórico tem uma frase longa ("Orçamento salvo, válido até 16/11/2026; não reserva estoque nem consome crédito").

**Proposta (texto final):**
```
‹ Pedidos                                         ⋮   ← menu: Cancelar orçamento (com confirmação)

Orçamento 000012                     [Orçamento · até 15/11]
Mercadinho São Jorge · cód. C5002
Vendedor: Lucas Andrade

ITENS
Água mineral 1,5 L (fardo 6) · 1 FD              R$ 19,90

──────────────────────────────────────────────
Total                                            R$ 19,90
Pix · À vista · CIF

HISTÓRICO
[Salvo · 08/11 10:35]

[ ↑ Transformar em pedido ]                       ← única ação grande
✎ Editar     ⎙ PDF     ⧉ Duplicar                ← ícone + rótulo curto, uma linha
```
**Regras:**
- **Cabeçalho em destaque:** número, cliente (nome e código) e vendedor.
- **Ordem:** cabeçalho → itens → total separado no fim, com forma, prazo e frete → histórico → ações.
- **Histórico só com tags de status** (Frente H): sem frase e sem "Recebido pelo servidor". Rejeitado e Cancelado levam o motivo em 1 linha.
- **Sem sinal:** a tag **Na fila** substitui qualquer texto de sincronização.
- **Pedido:** mesma estrutura. A ação principal muda pelo status (ex.: rascunho → "Continuar pedido"; enviado → nenhuma ação grande, só PDF/Duplicar).
- **Gestão e BKO:** o mesmo cabeçalho e as mesmas tags.

**Pronto quando:**
- a tela segue a ordem acima no Campo e no Gestão;
- a lista de tags cobre todos os status da RN-VEN-30 e do orçamento;
- "Recebido pelo servidor" sai do app;
- print do APK antes/depois;
- designer-ux sem 🔴.

---

## Fechamento da rodada
- **Quadro:** tarefa-mãe "Novo pedido v2" com as subtarefas D, E, F, G (manhã) e H, I, J, K, L, M (tarde), cada uma com dono, coluna **Onde** e dependências. A sequência está no item 0.
- **Paralelismo:** sem colisão de arquivo no Novo pedido:
  - H (docs) e J (função de validade) podem rodar em paralelo;
  - o corretor-redundancias (frentes A/B da manhã) segue em paralelo.
- **Definição de pronto de cada subtarefa:**
  - lint, typecheck e testes verdes;
  - `node scripts/coord.mjs verificar` sem violações;
  - revisão do engenheiro sem 🔴;
  - docs e quadro atualizados.
- **Reteste:** com a tarefa-mãe pronta, gere o APK de teste e me mande um recado `entrega` (para `alexandre`) com:
  - roteiro de reteste: novo pedido simples; cliente inadimplente com Boleto; FOB sem transportadora; Apenas salvar e reabrir; sair pela barra inferior; salvar sem sinal; editar orçamento sem reprecificar; Transformar dentro da validade; data de validade;
  - prints antes/depois;
  - os números T-nnnn.
- **Fim da rodada:** commit, pull e push pela regra de git, só com tudo verde.
