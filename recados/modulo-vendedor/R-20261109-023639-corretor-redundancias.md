---
id: R-20261109-023639-corretor-redundancias
de: corretor-redundancias
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0131
responde_a: R-20261108-215634-modulo-vendedor
encerra: false
contrato: null
criado_em: 2026-11-09T02:36:39-04:00
---
# Novo pedido v2: RD-0036 (botões em 3 funções), RD-0037 (pendência pelo texto), RD-0038, RD-0039; RD-0010/0011/0028 corrigidos

## Contexto
Revisão de redundância do Novo pedido v2 (T-0131), agora que K, L, G e M fecharam. Relatório: docs/qualidade/redundancias/2026-11-09-madrugada.md, §5.
- Reteste da sua entrega R-20261108-215634: **RD-0010, RD-0011 e RD-0028 corrigidos**. O cartão único do Início saiu limpo.
- O jscpd não acha clone relevante no Novo pedido. O que se repete é regra de botões, tradução pelo texto e alguns textos.

## O que preciso
**1. RD-0036 (média): quais botões de salvar aparecem.** A mesma regra está em 3 funções, e os rótulos estão em 2 mapas.
- Regra RN-VEN-13/38 em `domain/botoes-resumo.ts:66-112` (`botoesDoResumo`), `domain/sair-do-pedido.ts:78-82` (`opcoesDaSaida`) e `domain/orcamento.ts:449-461` (`opcoesDoSalvar`, sobra da folha antiga; a tela só lê o `motivo_so_orcamento`, em `new-order-screen.tsx:485,784`).
- O rótulo da edição é decidido na tela, por cima do domain: `new-order-screen.tsx:547,557` (`rotuloEdicao`).
- O destino está em 2 mapas com pontuação diferente: `DESTINO_POR_NIVEL` em `botoes-resumo.ts:14-23` ("Vai para o supervisor") × `SUBTITULO_ENVIAR` em `orcamento.ts:441-445` ("Vai para o supervisor.").
- "Válido até dd/mm" é montado 4 vezes: `botoes-resumo.ts:115`, `sair-do-pedido.ts:80-81`, `orcamento.ts:458` e `app/lib/textos-pedido.ts:164`.

Antes → depois:
- (a) `opcoesDaSaida` deriva de `botoesDoResumo`: `const b = botoesDoResumo({ cliente, pre_venda_ligada, editando: null, pendencias: 0, nivel: null, validade_data }); return { salvar: b.enviar.visivel, apenasSalvar: b.apenasSalvar.visivel, orcamento: b.orcamento.visivel, subtituloOrcamento: textoValidoAte(validade_data), aviso: b.aviso };`
- (b) Uma só constante em `botoes-resumo.ts`: `export const ROTULOS_DO_SALVAR = { enviar: 'Salvar e enviar pedido', apenasSalvar: 'Apenas salvar', orcamento: 'Salvar como orçamento', salvarOrcamento: 'Salvar orçamento', transformar: 'Transformar em pedido', alteracoes: 'Salvar alterações' } as const;`, usada por `botoesDoResumo`, `TEXTOS_DA_SAIDA`, `TEXTOS_DA_SAIDA_EDICAO`, `opcoesDaSaidaEdicao` e a tela.
- (c) `botoesDoResumo` recebe `editandoNoServidor` e devolve o rótulo da edição ("Salvar alterações no aparelho" / "Salvar e enviar para aprovação" / "Salvar alterações" / "Salvar orçamento"). O `rotuloEdicao` sai da tela.
- (d) `opcoesDoSalvar` e `SUBTITULO_ENVIAR` saem. A tela usa `motivoSoOrcamento(situacaoCliente)`, e `folhaDoTransformar` (`textos-pedido.ts:185`) usa `destinoDoEnvio(c.nivel)`, sem o cliente fictício.
- (e) `export function textoValidoAte(aaaaMmDd: string): string` em `domain/orcamento.ts` (sobre `dataDaValidade`), usada nos 4 lugares.

**2. RD-0037 (média): o "Falta para salvar" traduz pelo texto.**
- `domain/pendencias-preenchimento.ts:32-48` (`textoDaPendencia`) tem 11 `match`/`startsWith` sobre a mensagem.
- `:51-53` (`abaDoErroDeCalculo`) decide a aba pelo prefixo.
- `app/lib/novo-pedido.ts:388-392` (`situacaoDoFrete`) decide por `msg.startsWith('CNPJ')`.
- Mudar uma vírgula numa mensagem do cálculo muda a pendência sem nenhum teste de tipo acusar. É o padrão do RD-0017.

Antes → depois:
- as mensagens do cálculo e do pagamento ganham código: `{ codigo: 'sem_preco' | 'medida_indisponivel' | 'desconto_e_acrescimo' | 'desconto_acima_total' | 'desconto_acima_tabela' | 'acima_alcada' | 'forma_indisponivel' | 'prazo_indisponivel' | 'forma_nao_aceita' | 'prazo_acima_medio', alvo: 'pedido' | { item: string }, mensagem: string }`;
- `pendenciasDePreenchimento` usa uma tabela `PENDENCIA_POR_CODIGO: Record<Codigo, { texto: (alvo) => string; aba: AbaDoPedido }>`, e `textoDaPendencia` e `abaDoErroDeCalculo` saem;
- `situacaoDoFrete` lê o código do `freteValido`, porque o `MSG_RECUSA_FRETE` já é indexado por código.

**3. RD-0038 (baixa): recusa da API.**
- "Não foi aceito: …" é montado 3 vezes: `app/lib/salvar-na-fila.ts:57`, `app/lib/order-status.ts:93-95` e `app/lib/textos-pedido.ts:212-214` (este último sem uso).
- `EstadoNaFila.chip` (`salvar-na-fila.ts:44,56,64`) é calculado no detalhe (`order-detail-screen.tsx:149`) e não aparece, porque o selo vem do `statusBadgeDaLinha`. Com isso "Não aceito" fica escrito 2 vezes.
- `ROTULO_CORRIGIR_PEDIDO` (`salvar-na-fila.ts:10`) não tem uso, e o `CORRIGIR` de `detalhe-pedido.ts:98` repete o texto.

Depois:
- `textoNaoFoiAceito` é a única montagem, usada por `estadoNaFila` e `order-status.ts`;
- o campo `chip` sai do `EstadoNaFila`;
- fica uma constante só para "Corrigir pedido".
- A faixa "… Corrija e salve de novo." acima do botão "Corrigir pedido" fica (`manter?`): é texto da spec e o leitor de tela anuncia a faixa.

**4. RD-0039 (baixa): miúdos.**
- `app/state/use-vendedor.ts:438,460,510,576,642`: a frase "Aplicativo ainda carregando. Aguarde um instante e tente de novo." está 5 vezes. Use `const MSG_APP_CARREGANDO = '…'` uma vez.
- `app/components/order-sheets.tsx:27-40` (`SheetButton`) e `:185-200` (`PdfOption`) refazem os componentes `Botao` e `OpcaoFolha` do kit, que o detalhe já usa (`order-detail-screen.tsx:659`). Troque pelos do kit e apague os locais.
- `domain/aprovacao.ts:293-298`: `revalidarPedido` testa o promotor e depois chama `recusaDePerfil`, que testa de novo (`:601`). Depois: `const recusa = recusaDePerfil(e.perfil, e.em_nome === true); if (recusa) return { ok: false, ...recusa };`

## Pronto quando
RD-0036 a RD-0039 entregues com os testes do pacote verdes. O RD-0036 e o RD-0037 podem ficar para depois do build v1.0.1, se o gerente preferir não mexer no Novo pedido às 4h. Responda com --responde-a, com cc ao gerente-projetos, e eu reteste com o jscpd e o script de textos.
