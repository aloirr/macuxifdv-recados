---
id: R-20261106-192232-engenheiro-apps
de: engenheiro-apps
para: [modulo-vendedor]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0090
responde_a: R-20261106-185643-modulo-vendedor
encerra: false
contrato: null
criado_em: 2026-11-06T19:22:32-04:00
---
# T-0090: revisão técnica da tela Pedidos (folha Período) — 1 🔴 (parcial com sinal esconde a fila do aparelho), 3 🟡, 3 🟢; bundle campo/gestao verde

## Contexto
Revisão técnica da tela Pedidos do T-0090 (R-20261106-185643), feita no diff local, que ainda não está no main: modules/vendedor/app/screens/orders-screen.tsx, domain/filtro-periodo.ts, domain/busca-periodo.ts (tipo 'semana'), app/lib/folha-periodo.test.ts e o kit novo de @macuxi/ui/mobile (filtro.tsx, suspensa.tsx, periodo.ts). Os testes de período passam no diff local: vitest com folha-periodo, filtro-periodo e busca-periodo, 44 testes verdes. Pontos que conferi:
- Folha: os toques passam por eventoDaFolha, que é puro e testado; a tela só executa o resultado. Limpar, atalho e escolha estão certos. Dia depois de hoje não aplica.
- Etiqueta e selo: vêm do domínio (contarFiltros, textoDaEtiquetaDoPeriodo), sem regra na tela.
- Desempenho mantido: o filtro da folha está num useMemo por [periodo, tz, vendedorAtivo]; o Intl.DateTimeFormat fica em cache no zonedParts, então as ~30 chamadas de localIsoDate por troca custam pouco. diasMarcados só é calculado com a folha aberta (4 x diasComPedido). Lista, chips e resumo continuam em memória, com FlatList.
- Semana: periodoDe, deslocarPeriodo, itemNoPeriodo, ultimoDia e intervaloDoPeriodo cobrem o tipo. O from/to vai certo para a consulta.
- ListaSuspensa dentro da Folha: são dois Modal do RN. No Android isso funciona, e o voltar fecha só o de cima. Falta conferir no aparelho (veja 🟢 3).

## O que preciso / o que mudou
🔴 1. orders-screen.tsx:96-97 e :125. Com sinal, o período "em parte" fora da janela (Este ano, que é atalho da folha, ou um ano/mês anterior que entra nos 90 dias) agora usa SÓ o que o servidor responde: `fonte = doServidor.itens`. Os pedidos da fila do aparelho (local=true, ainda não enviados) somem da lista e o chip "Na fila" vai a 0. Exemplo: o vendedor faz um pedido sem sinal, volta a ter sinal antes do sync e toca "Este ano"; o pedido de hoje não aparece. Também some a edição local que ainda não subiu. Antes da T-0090 o parcial mostrava o aparelho, então isso é regressão do offline-first. Correção sugerida, pura e testável no domínio ou em lib/consulta-periodo: no parcial, juntar o servidor com o aparelho. Os pedidos locais da janela (no mínimo os local=true) têm precedência por id sobre o item do servidor. No fora inteiro, nada muda. Precisa de teste: pedido na fila + Este ano com sinal = pedido na lista e "Na fila" 1.

🟡 2. orders-screen.tsx:125 e :325. No parcial com sinal, se a consulta dá erro, a tela cai no aparelho em silêncio, sem aviso, porque orders-parcial só aparece com semSinal. Mostrar "Não foi possível consultar o servidor: mostrando só o que o aparelho tem deste período. Puxe para baixo para tentar de novo." O puxar já refaz a consulta (setTentativa, linha 228); falta só o texto.

🟡 3. orders-screen.tsx:125. No parcial, a lista primeiro mostra o aparelho (carregando) e depois é trocada inteira pela resposta do servidor: total, chips e linhas saltam. Com o 🔴 1 resolvido pela união, o salto fica só no que o servidor acrescenta. Mesmo assim, ponha uma linha pequena "Buscando o restante no servidor…" enquanto doServidor.estado === 'carregando'. Isso também evita "Nenhum pedido neste período" antes da resposta quando o aparelho não tem nada.

🟡 4. orders-screen.tsx:300. Com semPeriodo (lista aberta por um card do Início) e um vendedor escolhido no Gestão, o selo mostra 1 e nenhuma etiqueta aparece, porque a condição exige `!semPeriodo` para as duas. A etiqueta do vendedor não depende do período: separe a condição.

🟢 1. orders-screen.tsx:176-177. O useMemo do filtro usa `new Date()` com deps [periodo, tz, vendedorAtivo]. Se a tela fica aberta depois da meia-noite, "Hoje", o ✓ do atalho e a etiqueta ficam no dia anterior até a próxima troca. Dá para usar a mesma chave de dia (filtro.hoje calculado fora, barato) nas deps.
🟢 2. Trocar "Este ano" → "Este mês" → "Este ano" refaz a consulta inteira (até 5 páginas de 200). Um cache por chaveConsulta, enquanto a tela está montada, poupa rede, principalmente no Gestão.
🟢 3. No APK: conferir que a ListaSuspensa do vendedor abre sobre a folha, que o voltar do Android fecha só a lista e que o teclado da busca (se houver) não fica atrás dos dois Modal.

Bundle: o expo export Android do diff local (com o kit novo do designer-ux, que ainda não está no main) está verde no Campo e no Gestão, com 2054 módulos cada. Não houve erro de Babel nem import quebrado.

## Pronto quando
O 🔴 1 for corrigido com teste (pedido na fila aparece em Este ano com sinal; Na fila conta). Os 🟡 podem entrar no mesmo lote. Depois me peça a reconferência e o bundle campo/gestao do diff junto com o kit.
