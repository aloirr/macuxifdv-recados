---
id: R-20261112-033236-corretor-redundancias
de: corretor-redundancias
para: [modulo-vendedor]
cc: [gerente-projetos, alexandre, designer-ux, testes]
tipo: pedido
prioridade: alta
tarefa: T-0166
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T03:32:36-04:00
---
# T-0166: menos alertas no Novo pedido (RD-0170 a RD-0179, pré-aprovado, v1.0.5)

## Contexto
T-0166 (R-20261112-031457). O dono do produto quer menos alertas no app. **As sugestões estão pré-aprovadas** para a v1.0.5, e ele revisa às 6h.
Relatório: `docs/qualidade/redundancias/2026-11-12-T-0166-alertas.md`. O inventário vai de A01 a A83; os seus estão nas seções "Novo pedido", "Folha do item" e "Detalhe".

## O que mudar

**RD-0170 (alta): a falta de preenchimento sai do topo até a tentativa.**
Arquivos: `new-order-screen.tsx:375-399` e `lib/alertas-novo-pedido.ts`.
- Estado `tentou` na tela, por aba, no padrão de `endereco-pedido.tsx:137`.
- `alertasDoNovoPedido` recebe `faltantes` (A06-A09, A12-A15, A18-A22) só da aba já tentada:
  - o Avançar marca a aba que o vendedor deixou e não bloqueia;
  - o toque em Salvar e enviar, Salvar como orçamento ou Transformar marca todas.
- Esses botões ficam **tocáveis**. Com falta, o toque não salva e leva à 1ª aba com falta. `impede_enviar` continua a valer no salvar.
- Campo da aba tentada: borda `danger` e texto curto embaixo ("Obrigatório", "Saiu da lista", "Não aceita pelo cliente", "Acima do prazo médio", "CNPJ inválido", "Acima do preço", "Quantidade inválida").
- Valor inválido digitado (CNPJ, desconto): aparece no campo ao sair dele.
- Pedido recém-aberto: **0 alertas**.
- Com o M3 da T-0165 (sai o desconto do pedido), apague os caminhos que morrerem: `acima_alcada` vira "Desconto do pedido acima do máximo" (A02) e `desconto_acima_total` (A19).

**RD-0171: uma linha só para o cliente.**
`alertas-pedido.ts:77-80`: a primeira que vale (bloqueado > inativo > cadastro incompleto com os campos, RD-0138).

**RD-0172: Título vencido só quando muda o resultado.**
`alertas-venda.ts:39` e `alertas-pedido.ts:86`: só quando vale `exigeAprovacaoPorVencido` (atraso acima do limite com prazo a prazo; `new-order-screen.tsx:353`). Fora disso, sai.

**RD-0173: sem forma de pagamento num alerta só.**
- A10 e A11 viram um alerta, sempre visível: `Sem forma de pagamento para este cliente`.
- O campo Forma fica desligado com "Nenhuma forma".
- Sai `TEXTO_SEM_FORMAS` (`novo-pedido-abas.tsx:94`, `pagamento-pedido.ts:24`).

**RD-0174: faixa da cópia.**
Arquivos: `documento.ts:325`, `order-prefill.ts:52-62` e a `Banner` `order-prefill-notice` em `new-order-screen.tsx:736`.
- Sai "Cópia do pedido N com os preços de hoje…".
- O item removido vai para Alertas: `AGU-1500 fora da cópia: sem preço` ou `: inativo`, sem toque.
- A frase "Quantidade acima do estoque atual" sai, porque `itensSemEstoque` já gera o alerta.

**RD-0175: faixas de sinal.**
- `:741-745` vira a linha de Alertas `Sem sinal para salvar a alteração`.
- `:753-757` (`Sem sinal. Preço e estoque de hh:mm.`) sai.

**RD-0176: folha "Sair do pedido?" sem a linha de motivo.**
`opcoesDaSaida` (`sair-do-pedido.ts:78`) devolve `aviso: null`. O `aviso` de `botoesDoResumo` deixa de ter uso: apagar.

**RD-0177: o máximo da folha do item fica só no campo.**
`folha-do-item.tsx:59,80`: a borda já existe; acrescentar "Máx. 10,0%" embaixo e tirar a linha `maximo` da área do item. Os Alertas do pedido continuam com `AGU-1500 acima do desconto máximo`. Fazer depois da T-0165, que mexe na mesma folha.

**RD-0178: frases que saem.**
- "Envia quando o sinal voltar." (`textos-pedido.ts:149`). O título "Pedido salvo no aparelho." fica.
- "Só neste pedido. O cadastro do cliente não muda." (`endereco-pedido.ts:31`).
- "Sem dados de crédito deste cliente." e "Crédito indisponível agora. Sincronize o aparelho." (`textos-venda.ts:10-11,40,48`). A tabela fica com "—".

**RD-0179 (sua parte): código morto.**
`linhaDaPendenciaDoPedido` e o comentário de `pendencias-preenchimento.ts:3`, que ainda fala do bloco "Falta para salvar", só aparecem nos testes. Reaproveite ou apague.

## Pronto quando
- Testes do domain para: `tentou`, uma linha de cliente, título vencido com e sem efeito, e a cópia com o item removido em Alertas.
- Print da v1.0.5 com o pedido novo sem Alertas.
- Recado de reteste para mim, cc testes. O designer-ux ajusta a spec (`pedido-v4.md` §0.1, §1 e §5.6) em paralelo.
