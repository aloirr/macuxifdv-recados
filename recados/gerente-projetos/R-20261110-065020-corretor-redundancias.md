---
id: R-20261110-065020-corretor-redundancias
de: corretor-redundancias
para: [modulo-vendedor]
cc: [gerente-projetos, designer-ux, testes]
tipo: pedido
prioridade: alta
tarefa: T-0152
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T06:50:20-04:00
---
# RD-0055 a RD-0064, RD-0067 e RD-0068: alçada, %, recusa e situação repetidas no Resumo, detalhe, lista e BKO; mensagens longas

## Contexto
Auditoria de redundância do fluxo de venda na v1.0.2 (T-0152, regra permanente do Alexandre em R-20261110-062506). Tudo o que
segue está no Vendedor. O relatório completo, com arquivo:linha e o texto final de cada proposta, está em
`docs/qualidade/redundancias/2026-11-10-fluxo-de-venda.md`. Pela regra de 10/11, **qualquer achado em aberto segura o lote e o
build da v1.0.3**. O reteste é com o print do aparelho.

## O que preciso / o que mudou
Grande parte já cabe na T-0150 e na T-0151. Este recado diz o que precisa sair de cada tela.

- **RD-0055 (alta) · alçada 3 vezes no Resumo:**
  - na linha Venda, "Vai para aprovação (desconto acima da alçada)" (`textos-venda.ts:97-104`);
  - na faixa, "8,8% · vai para o supervisor" (`textos-pedido.ts:70-78`);
  - embaixo do botão, "Vai para o supervisor" (`botoes-resumo.ts:25-35`);
  - fora do Resumo: "alçada de supervisor" no cabeçalho em nome (`new-order-screen.tsx:686`), o subtítulo e o destino da folha do
    Transformar (`textos-pedido.ts:184-187`) e o destino na saída da edição (`new-order-screen.tsx:829`);
  - `textoDaAlcada` (`novo-pedido.ts:360-369`) está sem leitor e sai;
  - fica só a pergunta ao salvar: "Desconto acima da sua alçada. Enviar para aprovação?", com **Enviar para aprovação** e **Voltar**.
- **RD-0056 (alta) · a caixa repete o %:**
  - sai a `Faixa`;
  - os Totais ficam com uma linha "Acréscimo 5,8%  + R$ 6,94" ou "Desconto 8,8%  − R$ …", com o líquido sobre a tabela
    (`textos-pedido.ts:110-115`).
- **RD-0057 (alta) · a recusa vem com a alçada:**
  - a faixa do detalhe fica só "Desconto acima do máximo: AGU-1500";
  - saem as `notes` da alçada (`order-detail-screen.tsx:521`) e "Corrija e salve de novo" (`salvar-na-fila.ts:79`);
  - a frase da API (`domain/aprovacao.ts:363`) fica sem "Reduza o desconto do item.".
- **RD-0058 (alta) · detalhe aguardando aprovação, com "aguardando", o % e "supervisor" 3 vezes cada:**
  - **Campo:** fica só o selo. Saem a linha `detalhe-pendencia`, o cartão `order-approval` e "Desconto efetivo (sem frete)";
  - **Gestão:** uma linha "Desconto 8,8% · alçada do vendedor 5,0%" acima de Aprovar/Rejeitar;
  - **histórico:** sem a etapa atual, que já está no selo.
- **RD-0059 (média) · lista de Pedidos, o selo e a nota dizem o mesmo:**
  - no aguardando, a nota sai;
  - no recusado, a nota fica só com o motivo, sem "Não foi aceito:" (`order-status.ts:84-95`).
- **RD-0060 (média) · "(RN-VEN-13)" aparece na tela:** `MOTIVO_TITULO_VENCIDO` (`domain/aprovacao.ts:114`) vira "Título vencido".
- **RD-0061 (média) · "só orçamento" 4 vezes:**
  - a aba Venda fica com o alerta;
  - o Resumo fica com uma linha acima dos botões, "Cliente bloqueado · só orçamento", e a linha Venda fica sem alerta;
  - a Entrega só mostra a linha automática no cadastro incompleto (`new-order-screen.tsx:781`).
- **RD-0062 (média) · o "disponível" aparece 2 vezes na aba Venda:** o alerta fica só "Limite excedido" (`textos-venda.ts:40`). O
  "Vai para aprovação" desse alerta foi ao testes: o servidor não manda para aprovação por crédito.
- **RD-0063 (média) · a confirmação depois de enviar repete o selo:** sai a nota no aguardando e no aprovado
  (`textos-pedido.ts:167`).
- **RD-0064 (média) · BKO:**
  - na gaveta, saem o `Notice` do aguardando e o "Motivo:" do rejeitado (o histórico já diz);
  - a Decisão fica numa linha;
  - um % só, na linha do total;
  - "Itens" fica "3 · 12 un.";
  - sai a frase do frete (`order-drawer.tsx:163`);
  - no painel de aprovação, saem a nota do título e "Quem decide".
- **RD-0067 (média) · mensagens longas:** a tabela "hoje → proposta" está no §2 do relatório (API, `order.ts`, `novo-pedido.ts:310`,
  `use-vendedor.ts:506`, `new-order-screen.tsx:701`, `orders-screen.tsx:354` e outros). O texto final é do designer-ux.
- **RD-0068 (baixa) · contagem 2 vezes:**
  - na lista, "12 pedidos · R$ 8.420" sob o chip "Todos 12" vira "Total R$ 8.420";
  - na aba Itens, "Total do pedido · 3 itens" sob a aba "Itens (3)" vira "Total do pedido".

## Pronto quando
- Cada RD acima está corrigido no código e o print do aparelho vem na entrega (Campo, Gestão e BKO).
- O corretor fez o reteste e fechou os RD no catálogo, e o testes conferiu os números (Novo pedido = Resumo = detalhe = PDF).
