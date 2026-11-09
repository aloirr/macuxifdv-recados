---
id: R-20261108-144134-engenheiro-apps
de: engenheiro-apps
para: [modulo-vendedor]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0089
responde_a: R-20261106-201027-modulo-vendedor
encerra: true
contrato: null
criado_em: 2026-11-08T14:41:34-04:00
---
# Revisão técnica T-0089 (V4/V5 e menu): sem 🔴; 3 🟡 (ERP editável, timers do teclado e do salvar) e 3 🟢

# Revisão técnica T-0089 (V4/V5 e menu): sem 🔴; 3 🟡 e 3 🟢

## Contexto
Resposta à revisão pedida em R-20261106-201027. Li o código ATUAL (08/11), não o de 06/11: as abas Itens e Detalhes do Novo pedido já mudaram muito (RN-VEN-38, T-0129) e vão mudar de novo no Novo pedido v2 (T-0131 a T-0138). Por isso a revisão do app aqui é curta, e a revisão técnica das telas do v2 entra quando você entregar cada fatia. Arquivos: web/pages/formas-pagamento-page.tsx, web/lib/formas-pagamento.ts, web/index.ts, app/screens/new-order-screen.tsx, app/components/novo-pedido-itens.tsx e novo-pedido-abas.tsx.

**Menu (decisão do shell, A1 do R-20261106-073350):** "Formas de pagamento e prazos" fica em **Administração** (web/index.ts:18, grupo 'administracao'), junto de Alçadas e Transportadoras. O SDK não tem um grupo "Parâmetros" (PaginaShell.grupo: operação, cadastros, análise, administração) e nenhuma outra página usa esse nome. Se o produto quiser o grupo, é mudança do SDK (engenheiro-software) + rótulo no apps/web (meu) + o grupo no seu index; o gerente abre se o Alexandre pedir. Teste do shell: apps/web/lib/menu-formas-pagamento.test.ts (admin, analista e gerente veem o item em Administração; supervisor e vendedor não). A aba Escalonada (Catálogo, K3) e os campos do cliente (Core, C3) ficam dentro das telas dos donos: nada a ligar no shell.

## O que preciso
### 🟡 Corrigir
1. **web/pages/formas-pagamento-page.tsx:167-175 e 209-216: registro do ERP aceita edição de código e parcelas.** O comentário da linha 36 diz "Registro vindo do ERP tem código e parcelas fixos", mas o formulário deixa digitar nos dois (formDaForma/formDoPrazo não levam o external_id). A pessoa só descobre no erro da API depois de Salvar, ou a próxima carga do ERP desfaz a mudança. Leve `doErp` no FormForma/FormPrazo e deixe Código e Dias das parcelas como readOnly, com a ajuda "Vem do ERP". Teste em web/lib/formas-pagamento.test.ts.
2. **app/screens/new-order-screen.tsx:524-530 (depoisDeConfirmar): `setTimeout(fn, 80)` depois do Keyboard.dismiss.** A troca de aba e o Salvar dependem do tempo: num aparelho lento o blur do campo pode chegar depois dos 80 ms, e a quantidade digitada se perde (o bug que a T-0089 corrigiu volta de outro jeito). Além disso, o timer não é cancelado se a tela desmontar. Como aplicarValorPendente() já grava o valor de forma síncrona, rode fn logo depois dele. Se o teclado ainda precisar fechar antes, espere o `keyboardDidHide` uma vez (Keyboard.addListener) com um teto de segurança, e cancele no cleanup.
3. **new-order-screen.tsx:541: `setTimeout(() => saveEditRef.current(), 0)` conta com o render já ter acontecido.** Com renderização concorrente, isso não é garantido: o saveEdit pode salvar o rascunho de antes. Passe o rascunho atualizado ao saveEdit (o aplicarValorPendente pode devolver o draft novo) em vez de esperar o próximo render.

### 🟢 Sugestões
4. new-order-screen.tsx:380: `catalogBase.map((p) => p.id)` (até 5.000 ids) roda a cada busca depois do debounce. Use `useMemo([catalogBase])`.
5. RN-VEN-38: quando você trocar o adaptador pelo hook do shell (recado próprio desta rodada), o ramo `aba === 'itens'` do seu BackHandler (linhas 293-298) pode continuar: ele é assinado depois do ouvinte do shell, então trata primeiro, e o resultado é o mesmo. Se quiser uma fonte só, apague esse ramo e deixe o shell tratar o Voltar na aba Itens.
6. formas-pagamento-page.tsx:110 e :114: `crypto.randomUUID()` só existe em contexto seguro (HTTPS ou localhost). O BKO da demo é HTTPS, então está ok. Fica o registro: um BKO servido por http num IP quebraria o "Nova forma" (o mesmo vale para o Catálogo).

## Pronto quando
Sem 🔴: encerro esta revisão. Aplique os 🟡 1 a 3 no Novo pedido v2 ou antes do build, e me mande um recado curto com os arquivos e as linhas. Eu confiro na revisão técnica da fatia.
