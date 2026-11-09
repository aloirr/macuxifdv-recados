---
id: R-20261105-202746-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T20:27:46-04:00
---
# APKs de preview do 0263f9f (Campo e Gestão) com o Adicionar ao pedido: links e roteiro

## Contexto
Builds de preview do main **0263f9f**, o mesmo commit da demo (CI e "demo — publicar" verdes). A parte nativa é igual à do f0dcf03: só o JS mudou. Instale o APK novo; ele substitui o do f0dcf03 e traz tudo o que já estava nele.

## Links
- **Campo:** APK https://expo.dev/artifacts/eas/Qi20DX4EyHUUNgKnD5pMFln2-v6by4engfo9UaE4foA.apk · página https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/3a3193bc-d158-496c-801a-59bece85f0d8
- **Gestão:** APK https://expo.dev/artifacts/eas/fvZw-DfFttGLy6utp8iORfUiyLOP4Xli_qBnos-dRtI.apk · página https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/5ad333d0-5d03-4c20-ba65-209dbfa5b67e

## O que é novo neste APK (toque real)
1. **Adicionar com cliente:** na ficha de um produto do Catálogo, aberto pela trilha de um pedido, toque em "Adicionar ao pedido". Volta ao mesmo pedido, aba Itens, com 1 unidade no preço da tabela, e aparece "<produto> no pedido" com **Desfazer**. Toque em Desfazer: o item sai.
2. **Segundo toque:** o mesmo produto mostra "<produto> já está no pedido" e não duplica.
3. **Sem cliente:** pelo Catálogo do Mais, "Adicionar ao pedido" abre "Para qual cliente?" com "Item: <produto>". Escolha o cliente e o item entra. Se desistir, o item não sobra para o próximo pedido. Nesse caminho, o voltar passa pelo seletor: são 2 toques, como antes.
4. **Produto sem preço ou fora da tabela:** aparece um aviso no rodapé, que some sozinho e não volta ao trocar de aba.
5. **Pedido em edição:** na edição de um pedido, abra o Catálogo pela trilha e adicione um produto. O item entra **nesse** pedido, e não num pedido novo.
6. **Ficha do cliente:** o pedido aberto pela visita recebe o item e o voltar leva à ficha.
7. **Promotor:** o botão "Adicionar ao pedido" não aparece. No Gestão também não.
8. **Pedidos:** a lista e o detalhe se atualizam sozinhos depois de sincronizar, e o rodapé mostra "Atualizado às hh:mm". No modo sem sinal, não aparece mais "puxe para sincronizar".
9. **Vitrine do Catálogo:** os cartões não têm mais botão laranja. O laranja fica só na ficha do produto.
10. **PDF do pedido:** um cliente sem documento mostra "CNPJ/CPF não informado", e um documento de 11 dígitos sai como "CPF".

## Continua valendo
O roteiro do APK do f0dcf03 (R-20261105-181001): etapa pendente, Minha RV, "‹ Início", faixa "Em atendimento", folhas, busca vazia e a tela de medição.
