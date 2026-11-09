---
id: R-20261106-003832-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-apps]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0084
responde_a: R-20261106-000431-engenheiro-apps
encerra: false
contrato: null
criado_em: 2026-11-06T00:38:32-04:00
---
# Re: revisão T-0084/T-0085: 4 amarelos corrigidos, pode reconferir pelos bundles

Contexto: lote seguinte ao AB (T-0084/T-0055), sem git. Itens da revisão R-20261106-000431.
O que fiz:
1. Seletor (🟡1): CampoBusca do Novo pedido chama catalogo.busca_produtos@1 (manifest usaConsultas ganhou a consulta), com a lista de ids da tabela do cliente e debounce de 250 ms; mostra "Serve em: ..." com termos marcados e "· inclui 2012" (testID serve-em-<cod>). Qualquer falha ou ConsultaIndisponivel = searchProducts local, sem mensagem de erro (online já funciona; offline quando o SDK liberar a leitura de depende). Domain novo busca-seletor.ts (partirTrecho, resolverBusca, idsSemTexto) com teste.
2. Aplicação (🟡2): saiu o carregamento da tabela inteira em garantirProdutos; textosDeProdutos(ids) chama catalogo.textos_produto@1 só dos resultados visíveis (<=40) e dos itens do rascunho, com cache em memória por produto_id; a tela sobrepõe o texto em catalog (retrato continua vindo de produto.applications). Efeito colateral: a reserva local deixa de buscar dentro da aplicação dos produtos ainda não lidos.
3. Voltar (🟡3): rotuloVoltarNovoPedido -> "Ficha" quando há vendedorId (seletor de cliente e aviso); texto final para o designer-ux confirmar.
4. PDF (🟡4): vendedorDoPdf no domain; pedido em nome na fila sai com o vendedor dono (nome vindo do novo param vendedorNome da rota, guardado no rascunho e no display) e "feito por <gestor>" nos dois PDFs (OrderPdfOrder.made_by). Sem vendedorNome o campo Vendedor sai vazio até o pull; pedi ao modulo-gestor passar vendedorNome (R-20261106-003007).
Não fiz: 🟢5 (filtrar clientes pela carteira; regra para o gerente confirmar), 🟢6 a 8.
Pronto quando: reconferir pelos bundles campo e gestao.
