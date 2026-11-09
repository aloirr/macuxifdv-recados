---
id: R-20261108-144104-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: [engenheiro-software, designer-ux, testes]
tipo: entrega
prioridade: normal
tarefa: T-0135
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T14:41:04-04:00
---
# Entrega T-0135 (J) e T-0134 (I) + 🔴/🟡 da T-0127: validade única e preço congelado

# Contexto
T-0135 (Frente J) e T-0134 (Frente I) da T-0131, mais o 🔴 e os 🟡 da revisão de UX da T-0127 (R-20261108-125225) e o 🟡 "Serve em:" (R-20261108-130333). Não antecipei K, L nem M.

# O que fiz
1. 🔴 T-0127: tirei o `erro=` da Forma e do Prazo (novo-pedido-abas.tsx). 🟡: `rotuloPendencia={LEITURA_ABA_COM_PENDENCIA}` (new-order-screen.tsx); Salvar com `accessibilityLabel={leituraDoSalvar(rotuloSalvar, nPendencias)}` (prop nova `nPendencias` na AbaResumo); textos das pendências pela função `textoDaPendencia` (domain/pendencias-preenchimento.ts), tabela do designer-ux inteira, sem "Pedido:" e sem verbo de ordem; "Serve em:" em smallStrong e 13 px (novo-pedido-itens.tsx).
2. J (T-0135): a causa era `historicoDoOrcamento` receber o instante `ate` (início do dia seguinte, 04:00Z) e formatá-lo: mostrava um dia a mais (16/11 contra 15/11 da tag). Agora recebe a data civil de `validadeDoOrcamento(...).data` (a função única, calendário de packages/comum); nova `dataDaValidade(data, comAno?)` no domain para texto "dd/mm" ou "dd/mm/aaaa" (folha do Salvar usa). API, app e PDF já usavam a data civil; o BKO do Vendedor não mostra validade hoje.
3. I (T-0134): domain `precosCongelados` e `precoDoItemNaEdicao`; `reconferirOrcamento` mantém o preço do orçamento e só reconfere estoque e mínimo (novo `abaixo_minimo`, avisa o item e bloqueia, sem trocar preço nem desconto). App: `calcularPedido` aceita `congelados`; o rascunho de edição de orçamento leva `precos_congelados` (do detalhe salvo ou da exibição da fila); o aviso "Preços atualizados pela tabela de hoje do cliente." não aparece mais na edição de orçamento; item novo entra pelo preço de hoje; duplicar continua com preços de hoje. API: `api/preco-congelado.ts`; `calcularDocumento` reaplica o preço salvo na edição (PUT /orcamentos/:id) e no Transformar (`orcamento_origem_id`); vencido segue 422 RN-VEN-18.

# Arquivos
modules/vendedor/domain/{orcamento.ts,pendencias-preenchimento.ts} (+ testes), api/{preco-congelado.ts,preco-congelado.test.ts,receber.ts,orcamentos.ts}, app/{lib/novo-pedido.ts,lib/pedidos.ts,lib/documento.ts (+teste),state/use-vendedor.ts,screens/new-order-screen.tsx,components/novo-pedido-abas.tsx,components/novo-pedido-itens.tsx}.

# Testes
`pnpm --filter @macuxi/vendedor` lint, typecheck e test verdes (1014 passaram, 100 puladas = *.db.test.ts, só no CI). Novos: salvo 22h de Manaus e virada de mês (orcamento.test.ts); preço congelado, mínimo e textos (orcamento-v2, pendencias-preenchimento, documento.test); rota: Transformar e PUT mantêm R$ 100,00 com a tabela em R$ 120,00 e o item novo entra a R$ 50,00 (api/preco-congelado.test.ts). Nenhum teste de desempenho falhou. `verificar modulo-vendedor`: OK.

# Pendências / premissas
- Premissa: com preço congelado as faixas de quantidade de hoje não valem para o item salvo (mudar a quantidade não muda o preço). Item novo usa tabela e faixas de hoje.
- Premissa: orçamento ainda na fila (sem número) congela pelo preço da exibição guardada ao salvar.
- Sem teste de banco novo (o fluxo Postgres roda no CI).
- 🟡 "Equivale a:" no PDF interno (T-0085 §8) fica com a decisão do gerente.
- Sem print do APK antes/depois: falta o build.

# Roteiro de reteste (5 passos)
1. Salvar um orçamento às 22h (Manaus): a tag da lista, o detalhe e o histórico dizem a mesma data (hoje + 7 dias).
2. Editar esse orçamento sem mexer em nada: nenhum aviso de "Preços atualizados"; preços e total iguais aos do salvamento (mude o preço na tabela do cliente antes, para provar).
3. Na edição, mudar quantidade e desconto de um item (editáveis) e incluir um produto novo: o novo entra pelo preço de hoje, os salvos mantêm o preço.
4. Transformar em pedido dentro da validade: o pedido sai com os preços do orçamento; com mínimo de produto mais alto que o desconto, a mensagem cita o item e nada muda sozinho. Orçamento vencido: só Duplicar, e o duplicado vem com os preços de hoje.
5. Novo pedido recém-aberto: Forma e Prazo sem moldura vermelha; no Resumo, as pendências lidas sem "Pedido:"/"Reduza"; TalkBack lê "com pendência" na aba e o motivo no Salvar desabilitado.
