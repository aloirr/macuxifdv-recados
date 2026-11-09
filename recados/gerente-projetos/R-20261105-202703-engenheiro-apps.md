---
id: R-20261105-202703-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T20:27:03-04:00
---
# APKs preview Campo e Gestão do 0263f9f prontos (T-0071, T-0052, T-0039, T-0082) com roteiro só do que é novo

## Contexto
Build de preview pedido pelo gerente para o Alexandre (T-0071, T-0052, T-0039, T-0082). O main está em 0263f9f31a5e12978d2b89beb9310f9b6122a803, o mesmo commit do CI verde e da demo publicada.
- O worktree limpo C:\macuxifdv-check foi para checkout destacado no 0263f9f, sem alteração local (git status vazio antes e depois).
- `pnpm install --frozen-lockfile` passou LÁ, sem passo de resolução.
- Entre o f0dcf03 e o 0263f9f não mudou nada em apps/mobile/package.json, app.config.ts, eas.json nem pnpm-lock.yaml. A parte nativa é a mesma; só o JS muda.
- Bundle Android das duas variantes verde (expo export com as variáveis do perfil preview e a API da demo): Campo e Gestão com 2028 módulos e .hbc de 5,8 MB.
- A Expo registrou o gitCommitHash 0263f9f31a5e12978d2b89beb9310f9b6122a803 nos dois builds.

## O que preciso / o que mudou
Os dois builds terminaram (FINISHED): o Campo em 22 min e o Gestão em 23 min.
- Campo (campo-preview, br.com.macuxi.campo): APK https://expo.dev/artifacts/eas/Qi20DX4EyHUUNgKnD5pMFln2-v6by4engfo9UaE4foA.apk · página https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/3a3193bc-d158-496c-801a-59bece85f0d8
- Gestão (gestao-preview, br.com.macuxi.gestao): APK https://expo.dev/artifacts/eas/fvZw-DfFttGLy6utp8iORfUiyLOP4Xli_qBnos-dRtI.apk · página https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/5ad333d0-5d03-4c20-ba65-209dbfa5b67e

Roteiro só do que é NOVO neste APK (Campo, com o vendedor, salvo onde diz outra coisa). O roteiro do APK do f0dcf03 (R-20261105-180916) continua valendo. Se der, use um aparelho de 360 x 780 dp.

**A. Adicionar ao pedido pela ficha do produto, com cliente**
- Abra um Novo pedido de um cliente, toque na trilha do Catálogo, abra a ficha de um produto com preço e toque em "Adicionar ao pedido" (botão laranja).
- Você volta ao Novo pedido, na aba Itens, com o item × 1 e o rodapé "<produto> no pedido" com Desfazer.

**B. Adicionar pelo cartão da vitrine**
- Repita pelo botão "Adicionar ao pedido" do cartão (contorno, sem laranja), sem abrir a ficha. O resultado é o mesmo do item A.

**C. Sem cliente (Catálogo pelo Mais)**
- Mais › Catálogo › ficha ou cartão › Adicionar ao pedido: abre "Para qual cliente?" com a linha "Item: <produto>".
- Escolha o cliente: o item entra no Novo pedido desse cliente.
- Repita e volte sem escolher o cliente. Depois abra um Novo pedido comum: nenhum item pode entrar sozinho.
- Esperado: aqui o voltar do editor passa pelo "Para qual cliente?" antes de chegar ao Catálogo. São 2 toques, como já era antes.

**D. Segundo toque no mesmo produto**
- Adicione de novo o mesmo produto: o rodapé mostra "<produto> já está no pedido", sem Desfazer, e o item não duplica.
- Teste também depois de trocar a medida do item.

**E. Produto sem preço na tabela do cliente**
- O rodapé mostra "<produto> está sem preço na tabela do cliente e não entrou no pedido.".
- O aviso some sozinho. Ele não volta ao trocar de aba nem ao reabrir o rascunho, e não fica Banner no pedido.

**F. Desfazer**
- Toque em Desfazer no rodapé do item A: o item sai do pedido e o total volta ao de antes.

**G. Catálogo aberto de dentro do pedido e voltar**
- Novo pedido › trilha › Catálogo › produto › Adicionar: o pedido aparece uma vez só.
- 1 voltar (o "‹" ou o voltar do Android) leva à tela de antes do editor, sem passar por um Novo pedido repetido.
- Pela ficha do cliente (Novo pedido aberto na visita): o Adicionar volta ao mesmo editor da visita, e 1 voltar leva à ficha.

**H. Pedido em edição recebendo o item**
- Pedidos › detalhe de um orçamento › Editar › trilha › Catálogo › Adicionar: o item entra na edição desse orçamento, e não num pedido novo do mesmo cliente.
- 1 voltar leva ao detalhe.
- Abra depois um Novo pedido do mesmo cliente: o item não pode estar lá.

**I. Promotor não vê o botão**
- Entre com o promotor no Campo: nem a ficha nem os cartões da vitrine mostram "Adicionar ao pedido" (regra 7, RN-PRO-01).
- Confira também com um usuário que tem os dois módulos.

**J. Rodapé de Pedidos e do detalhe**
- Com sinal, ao pé da lista de Pedidos e do detalhe aparece "Atualizado às hh:mm · puxe para sincronizar" (no fuso de Manaus).
- Depois de puxar para baixo, aparece "Atualizado há instantes".
- Um pedido enviado de outro aparelho (ou do BKO) aparece sozinho na próxima sincronização automática, sem sair da tela.
- Em modo avião, aparece só "Atualizado às hh:mm", sem o "puxe para sincronizar". Se nunca sincronizou, aparece "Ainda não sincronizado".

**K. Vitrine sem botão laranja nos cartões**
- Na vitrine do Catálogo, nenhum cartão tem botão laranja: a ação é de contorno, com 48 px.
- Na ficha do produto, só o "Adicionar ao pedido" é laranja (52 px), e é o único principal da tela.
- No Gestão, a vitrine não mostra o botão.

Entram também, sem roteiro próprio:
- no APK, o PDF do pedido mostra "CNPJ/CPF não informado" quando falta o documento, e o rótulo CPF com 11 dígitos;
- os outros commits do intervalo não mudam nada visível no app: o tabela_preco_nome do contrato, que o app ainda não mostra, o código compacto do SKU numa só função, e o seed da demo, que roda no servidor.

## Pronto quando
O Alexandre precisa instalar os dois APKs novos (o JS mudou e vem no APK) e devolver o roteiro.
Se um item falhar, eu separo o que é do shell (C, G e H: pilha e histórico de telas) do que é dos módulos:
- A, B, D, E, F, H e J: vendedor;
- K: catálogo;
- I: vendedor/catálogo e o filtro de extensões do shell.

Nada foi alterado no repositório: sem commit, sem install no C:\macuxifdv e sem segredo em log. Minha caixa estava vazia. Não há pendência minha.
