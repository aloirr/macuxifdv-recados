---
id: R-20261111-054033-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T05:40:33-04:00
---
# Roteiro Campo-Demo-v1.0.3 / Gestao-Demo-v1.0.3 atualizado: PDF proposta 2, filial no BKO, reserva por filial, diagnóstico desligado no APK

# Roteiro de teste — Campo-Demo-v1.0.3 e Gestao-Demo-v1.0.3

> Para o Alexandre. Cobre o que mudou desde o **Campo-Demo-v1.0.2 / Gestao-Demo-v1.0.2** (7c9dafe8):
> - a queda na 1ª abertura (T-0144);
> - as permissões obrigatórias (T-0145);
> - a ficha sem repetição e as fotos do PDV (T-0146, T-0147);
> - o Novo pedido v4, o detalhe e a lista de Pedidos (T-0148, T-0150, T-0151, T-0153);
> - a filial e a reserva por filial (T-0149, RN-VEN-20);
> - a demo com pedidos faturados (T-0155);
> - o PDF do pedido, proposta 2 (T-0159);
> - o diagnóstico, que chega desligado (T-0158).
>
> Dono: engenheiro-apps. O commit do lote e os links dos APKs vêm no recado "BUILD PRONTO Campo-Demo-v1.0.3 /
> Gestao-Demo-v1.0.3". Os roteiros do v1.0.0 ao v1.0.2 continuam valendo para o que não mudou.

## 0. Antes de começar (nesta ordem)
1. **Base da demo:** espere o aviso do gerente-projetos de que a base foi recriada (2 filiais, fotos do PDV e pedidos
   faturados).
2. **Não desinstale** o v1.0.2. O v1.0.3 instala **por cima** dele (o versionCode sobe pela EAS).
3. Tenha à mão: uma foto qualquer na galeria do aparelho e, se possível, um segundo aparelho com **Android 11 ou 12**.

## Dados da demo
- Código da empresa: **demo**. Senha de todos: **demo-macuxi**.
- Campo: `vendedor@exemplo.com.br` (Lucas). Gestão: `supervisor@exemplo.com.br`. Backoffice: `admin@exemplo.com.br`.
- Backoffice: https://bko-demo.macuxifdv.com.br
- Clientes do Lucas usados aqui:
  - **Filial Manaus:** Supermercado Bom Preço e Mercadinho São Jorge (os dois com fachada).
  - **Filial Boa Vista:** Padaria Trigo Fino (com fachada, na rota de hoje) e Comercial Rio Negro (sem fachada).

## A. Atualizar por cima e carga inicial sem queda (T-0144, Campo)
A causa das quedas da v1.0.2 era o fechamento do banco do aparelho ao fim de cada gravação. Foi corrigida.
1. **Tentativa 1, por cima.** Instale o v1.0.3 por cima do v1.0.2 e abra. A tela **Permissões** vem primeiro (item B).
   Depois a carga inicial vai até o fim, **sem o app fechar**.
2. **Tentativas 2 e 3, do zero.** Configurações do Android › Apps › Macuxi Campo › Armazenamento › **Limpar dados**.
   Abra, informe o servidor, entre e espere a carga inicial terminar. Repita mais uma vez. Se a tela Permissões voltar,
   conceda tudo de novo.
3. **O print.** Depois da 3ª carga: Perfil › **Diagnóstico** › mostrar. Tire um print com as linhas:
   - **"Build instalado: 1.0.3+…"**;
   - **"Saídas do app (Android)"**: as linhas com **(normal)** são esperadas (ex.: "app atualizado", "permissão alterada",
     "parado pelo usuário"). Nenhuma linha **sem** "(normal)" no horário do teste, como "erro nativo · sinal 6 (SIGABRT)";
   - **"Último erro do app"**: nenhum registro no horário do teste.

## B. Permissões obrigatórias (T-0145)
1. **Campo, antes de tudo.** A tela **Permissões** ("Sem elas o app não funciona.") aparece **antes** do login e da
   sincronização, com 4 linhas: Notificações, Localização o tempo todo, Câmera e Fotos e galeria. Cada linha diz
   **Permitida**, **Falta** ou **Negada**. Há um botão só: **Permitir**, que pede a próxima permissão que falta.
2. **Localização em 2 passos (Android 11+).** O 1º diálogo dá só "Durante o uso". Depois aparece o cartão dos 2 passos:
   - "Durante o uso" já feito;
   - "Em **Permissões › Localização**, marque **Permitir o tempo todo**".

   O botão vira **Abrir configurações** e leva à página de localização do app. Marque e volte: a linha fica Permitida.
   O link **"Como usamos a localização"** abre o aviso curto.
3. **Recusa.** Recuse a mesma permissão 2 vezes: o Android para de perguntar, a linha fica **Negada** com o caminho nas
   configurações, e o botão vira **Abrir configurações**.
4. **Sem as 4, não entra.** Com qualquer linha em Falta ou Negada, o app não faz login nem sincroniza. Com as 4, ele
   segue sozinho.
5. **Retirar depois.** Com o app funcionando, retire a câmera nas configurações do Android e abra o app: ele volta à
   tela Permissões.
6. **Android 11 e 12 (galeria).** Nessas versões o Android pode não mostrar o diálogo de fotos. Com a câmera permitida,
   **Fotos e galeria** fica Permitida sozinha, e a tela **nunca prende** o app nessa linha. Confira no item C.3 que
   "Escolher da galeria" abre e anexa a foto.
7. **Gestão.** Pede só **Notificações** ("Sem ela o app não funciona.").

## C. Ficha do cliente e fotos do PDV (T-0146, T-0147, Campo)
1. **Ficha sem repetição.** Abra Supermercado Bom Preço:
   - o topo traz os indicadores de compra: média por mês, última compra, ticket e frequência;
   - o **limite disponível** e os **títulos vencidos** aparecem **só** no bloco Financeiro;
   - nenhum dado aparece duas vezes.
2. **Botão "Foto do PDV".** Ao lado de Ligar, WhatsApp e Mapa:
   - em Comercial Rio Negro, sem fachada, ele fica **desligado**;
   - em Supermercado Bom Preço, ele abre a fachada em tela cheia (pinça para ampliar, ✕ para fechar). Se a fachada
     semeada não abrir, anote o cliente: vale o teste do passo 4, com a foto que você mesmo enviou.
3. **Tem/falta e Adicionar, offline.** Em Comercial Rio Negro, bloco **"Fotos do PDV"**: Fachada **Falta**, CNH do sócio
   **Falta**, Contrato social **Opcional**, cada um com **Adicionar**. Ligue o **modo avião** e faça:
   - Fachada › Adicionar: a folha "Fachada" oferece **Tirar foto** e **Escolher da galeria**. Tire a foto: a linha passa
     a **Na fila**;
   - CNH do sócio › Adicionar › **Escolher da galeria**: escolha uma foto. A linha passa a **Na fila**.
4. **Na fila → Tem.** Desligue o modo avião e toque em Sincronizar. As duas linhas passam a **Tem** (✓ verde), e
   **Foto do PDV** liga e abre a fachada que você tirou.
5. **O vendedor só abre a fachada.** Na linha CNH do sócio, que tem foto, aparece o **cadeado**, e ela não abre. Onde
   não há foto (Contrato social), não aparece cadeado: aparece **Adicionar**.
6. **Tipo novo pelo Backoffice.** Entre com `admin`: Cadastros › **Fotos do PDV** › crie o tipo "Alvará". No app,
   sincronize: "Alvará" aparece no bloco da ficha.

## D. Novo pedido, detalhe e Pedidos (T-0148, T-0150, T-0151, T-0153, Campo)
Cliente: Mercadinho São Jorge › **Novo pedido**.
1. **Área "Alertas".** Sem problema no pedido, a área não aparece. Quando há problema, o título vermelho **ALERTAS** fica
   no topo de **todas** as abas (Venda, Itens, Entrega, Resumo). Cada problema é uma linha. Tocar na linha leva ao
   item ou à aba. Nenhum aviso aparece solto fora dela.
2. **Aba Itens: busca.** Busque "café". Cada resultado mostra:
   - a descrição em destaque;
   - **"Estoque n UN"** e a descrição 2 resumida, numa linha;
   - o ícone de câmera, quando o produto tem foto;
   - o botão **Adicionar**, sem campo de quantidade.
3. **Foto ao tocar.** Toque na câmera: a foto baixa e abre em tela escura. Ligue o modo avião e toque de novo: ela abre
   pela cópia do aparelho. Num produto que você nunca abriu, sem sinal, aparece "Foto indisponível sem sinal."
4. **Popup do Adicionar.** Toque em **Adicionar**. A folha sobe de baixo com:
   - **Embalagem**: só as do cadastro, ex.: UN e CX c/ 12;
   - **Quantidade** e **Desc./Acrésc.**;
   - os totais do item.

   Confirme em **Adicionar ao pedido**. O total do pedido só muda ao confirmar.
5. **"No pedido".** O painel fica acima da busca, compacto e cinza. Com mais de 3 itens, mostra só **"Ver itens"**,
   sem número, que vira **"Recolher"** ao abrir. Toque num item: o popup reabre com **Salvar item** e **Remover do
   pedido**.
6. **Máximo só como orçamento.** No popup, dê um desconto acima do máximo do produto:
   - o popup mostra "Acima do desconto máximo de x%", e o campo ganha borda vermelha;
   - o item entra mesmo assim;
   - os Alertas mostram **"<código> acima do desconto máximo"**, e o toque reabre o popup;
   - no Resumo, o botão principal é **Salvar como orçamento**, com **Apenas salvar** ao lado. **Salvar e enviar
     pedido** não aparece.
7. **Sem estoque só como orçamento.** Adicione um produto com **"Estoque 0"**. Ele entra, os Alertas mostram
   **"<código> sem estoque"**, e o pedido sai só como orçamento. Salve o orçamento e abra: os Alertas estão no topo, e o
   botão principal é **Editar**, sem Transformar.
8. **Alçada só na pergunta.** Num pedido sem alerta, dê um desconto acima da sua alçada e dentro do máximo:
   - as abas Venda e Resumo **não** falam de alçada;
   - não há texto embaixo do botão;
   - ao tocar em **Salvar e enviar pedido**, vem a pergunta **"Desconto acima da sua alçada. Enviar para aprovação?"**,
     com **Enviar para aprovação** e **Voltar**;
   - como orçamento, não há pergunta.
9. **Resumo em tabela.** A aba Resumo traz:
   - tabelas de Cliente (Razão social, CNPJ), Venda (Pagamento, Prazo), Itens, Entrega e Observações;
   - nos Itens, as colunas **Produto · Qtd · Preço unit. · Desc./Acrésc. · Total**, com a embalagem vendida (FD ou CX,
     nunca UN no lugar);
   - **Totais** em 3 linhas: Tabela, a linha líquida ("Desconto 8,8% · − R$ …" ou "Acréscimo …") e Total;
   - nenhuma caixa verde.
10. **Detalhe em tabela.** Envie o pedido e abra pelo Pedidos:
    - o título "Pedido 0000xx" e o cliente;
    - os Alertas, só se houver;
    - a tabela Pagamento/Entrega/**Filial**;
    - ITENS (n) e Totais **iguais ao Resumo**;
    - o **Histórico**, cuja última etapa é a situação. Não há selo no topo.

    Gere o PDF: os números e a embalagem são os mesmos do Resumo e do detalhe.
11. **Corrigir não reprecifica.** Num pedido rejeitado, toque em **Corrigir pedido**. Os preços salvos continuam, e não
    aparece a faixa "Preços atualizados pela tabela de hoje". Só um item novo entra pelo preço do dia.
12. **Lista de Pedidos limpa.** Na lista:
    - a aba **Pedidos** da barra de baixo **não** tem número;
    - "Rascunhos (n)" aparece sem frase;
    - a linha de contagem é **"Total R$ …"**;
    - cada pedido ocupa 2 linhas (cliente ··· total; "Nº … · hoje hh:mm" ··· selo), e o selo da situação continua na
      lista;
    - o estado da lista é um **selo único** no cabeçalho: **↻ hh:mm**, **Atualizando…**, **Sem sinal** (modo avião) ou
      **Sem resposta**. Não há faixas nem rodapé.

## E. Filial e reserva por filial (T-0149, RN-VEN-20, Campo e Backoffice)
1. **Manaus.** Mercadinho São Jorge › Novo pedido › Itens: anote o **preço** e o **estoque** de 2 produtos, um deles o
   **CAF-500** (café 500 g), que tem estoque.
2. **Boa Vista.** Padaria Trigo Fino › Novo pedido › Itens, com os mesmos 2 produtos:
   - o preço é **5% maior** que o de Manaus;
   - o estoque é o do CD Boa Vista;
   - o **CAF-500** mostra **"Estoque 0"** e, se adicionado, entra nos Alertas como "CAF-500 sem estoque".
3. **O pedido mostra a filial.** Envie um pedido de cada cliente. No detalhe, a linha **Filial** diz **Filial Manaus**
   num e **Filial Boa Vista** no outro. O PDF traz a filial também.
4. **Backoffice, pedido.** No pedido de cada um, o detalhe traz a mesma filial. Em Pedidos, o filtro **Filial** mostra
   só os pedidos da filial escolhida.
5. **Backoffice, cadastro da filial.** Cadastros › Filiais:
   - **CNPJ** e **endereço** são obrigatórios: sem eles, a filial não salva;
   - na lista, uma filial sem esses dados tem o selo **Incompleta**. O aviso antigo acima da lista não aparece mais.
6. **Reserva no aparelho.** Padaria Trigo Fino (Boa Vista) › Novo pedido › Itens: anote o **"Estoque n"** de um produto
   com estoque. Faça e envie um pedido com 2 unidades dele. Abra um Novo pedido para a mesma padaria:
   - o estoque mostrado é **n − 2**: o saldo da filial do cliente menos os pedidos aceitos no aparelho;
   - no modo avião, vale a mesma conta;
   - acima do saldo, o item entra nos Alertas como **"<código> sem estoque"**, e o pedido sai **só como orçamento**.
   - **Premissa:** nesta versão, a API **não recusa** pedido por falta de estoque da filial. Essa recusa fica desligada
     até o contrato `catalogo.estoque_filial@1`.

## F. Demo com pedidos faturados (T-0155)
1. **Campo (Lucas).** Em Pedidos, toque no chip **Aprovados** (se preciso, amplie o período no Filtrar): aparecem os
   pedidos com selo **Faturado**. O Histórico de cada um traz "Enviado ao ERP" e "Faturado".
2. **Devolução do p02.** Um dos faturados do Lucas traz a **devolução parcial** de 6 dos 24 leites (LEI-1L), com a
   nota de devolução **000002315**. O valor faturado e o devolvido aparecem no detalhe e na ficha do cliente.
3. **Gestão (`supervisor`).** O pedido da Camila aparece como **Faturado parcial**. A meta dela continua contando o
   valor total do pedido.

## G. PDF do pedido, proposta 2 (T-0159, Campo)
Compare cada PDF com a imagem aprovada no anexo de mesmo nome:
`recados/anexos/2026-11-11-T-0159-pdf-proposta-2-{cliente,escritorio,orcamento-cliente,orcamento-escritorio}.png`.
1. **Gere os 4 PDFs.** De um pedido enviado **com alerta**, gere o PDF **do cliente** e o **do escritório**. De um
   orçamento, gere os mesmos dois.
2. **Itens.** **Emb.** e **Qtd** em colunas separadas, e a coluna **Marca**.
3. **Cabeçalho.** O nome da filial de faturamento, com o **CNPJ**, o **endereço** e o **telefone** dela. Confira com
   Filial Manaus e com Filial Boa Vista.
4. **Entrega.** A ficha **Entrega** aparece.
5. **Total.** A linha final diz **"Total"**.
6. **Histórico.** Só aparece com **2 etapas ou mais**. Num pedido só enviado, ele não aparece.
7. **Alertas.** Só no PDF **do escritório**. O PDF do cliente não os traz, e o **orçamento** não traz Alertas em
   nenhum dos dois.

## H. Versão no Perfil
1. Campo: no fim do Perfil, **Campo-Demo-v1.0.3**. Gestão: **Gestao-Demo-v1.0.3**.
2. Configurações do Android › Apps: versão **1.0.3**. Ela instala por cima do v1.0.2.

## O que NÃO está nesta versão
- **Envio de diagnóstico desligado (T-0158).** Nesta versão, o Perfil › Diagnóstico serve para leitura e print:
  - o botão **"Enviar diagnóstico"** e a fila **já estão no APK**, mas desligados;
  - eles ligam **sem APK novo**, com `MACUXI_DIAGNOSTICOS_APP=1` no servidor, quando você decidir;
  - o **Portal › Diagnósticos** (só super-admin) já está **ligado** na demo;
  - o **envio automático da queda** e as **5 últimas saídas** no envio: **v1.0.5**.
- O **registro de quem abriu** documento sensível (CNH, contrato social), só para o admin no Backoffice: depois da
  v1.0.5.
- A **barra de status escura** no visor de foto: v1.0.4.
- A **resposta pelo Telegram**: no backlog.

## Itens abertos (v1.0.4)
- **RD-0124:** os motivos de saída do Android em 3 tabelas com textos diferentes; uma tabela só.
- **D-T0159-4:** a vírgula no complemento do endereço do PDF.
- **D-T0159-5:** o formato do nome da filial no PDF.

## O que mandar de volta
- Para cada item (A a H): ok, ou o passo que falhou, o aparelho (Campo ou Gestão, versão do Android) e o que apareceu.
- O **print do Diagnóstico** do item A.3, com "Build instalado", "Saídas do app" e "Último erro do app". Eu encaminho
  cada falha ao dono da tela.

---
Vai junto: o relatório do corretor-redundancias, R-20261111-022251 e R-20261111-024437
(`docs/qualidade/redundancias/2026-11-10-T-0159-pdf.md` e `docs/qualidade/redundancias/2026-11-10-T-0158-diagnostico.md`).
