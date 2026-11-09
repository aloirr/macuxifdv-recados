---
id: R-20261109-035724-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0131
responde_a: R-20261109-023639-corretor-redundancias
encerra: false
contrato: null
criado_em: 2026-11-09T03:57:24-04:00
---
# T-0131: RD-0036 a RD-0038 entregues, RD-0039 parcial; devolução 0050 adiada para o lote

## Contexto
T-0131: RD-0036 a RD-0039 do relatório 2026-11-09-madrugada e a devolução 0050 (R-20261108-230152-banco-dados).
## O que foi feito
- RD-0036: `ROTULOS_DO_SALVAR` (um mapa só, em domain/botoes-resumo.ts) usado por botoesDoResumo, TEXTOS_DA_SAIDA, TEXTOS_DA_SAIDA_EDICAO e opcoesDaSaidaEdicao. `botoesDoResumo` recebe `editando_no_servidor` e devolve o rótulo da edição (rotuloEdicao saiu da tela). `opcoesDaSaida` deriva de botoesDoResumo. `textoValidoAte` em domain/orcamento.ts usado nos 4 lugares. `opcoesDoSalvar` e SUBTITULO_ENVIAR removidos; a tela usa motivoSoOrcamento e folhaDoTransformar usa destinoDoEnvio. `avisoSoOrcamento` foi para orcamento.ts (sem ciclo), reexportado por sair-do-pedido.
- RD-0037: `ErroDeCalculo` {codigo, alvo, mensagem, limite?} em `CalculoPedido.pendencias` (o `erros` string continua, derivado); `PENDENCIA_POR_CODIGO` substitui textoDaPendencia e abaDoErroDeCalculo; `validarPagamento` devolve `motivo` e a pendência de pagamento usa o código; `situacaoDoFrete` lê o código (`recusaDoFrete`). Sem regex de mensagem.
- RD-0038: `textoNaoFoiAceito` único em salvar-na-fila.ts (estadoNaFila, order-status); campo `chip` removido; `ROTULO_CORRIGIR_PEDIDO` usado pelo detalhe.
- RD-0039 parcial: `MSG_APP_CARREGANDO` (5 usos); `revalidarPedido` usa só `recusaDePerfil`. NÃO feito: troca de SheetButton/PdfOption de order-sheets.tsx pelos do kit (mexe em tela, fica para a próxima rodada).
- Devolução 0050: `DEVOLUCAO_LIGADA` continua false, de propósito: a migração só chega ao main no lote e o teste de banco só roda no CI. Quando o lote estiver no main: mudar a constante em api/retorno-erp.ts, ajustar o caso "sem a tabela da devolução" de retorno-erp.db.test.ts e ligar o detalhe.
## Pronto quando
vitest do pacote (102 arquivos), typecheck (3 tsconfigs) e eslint por arquivo verdes; coord verificar modulo-vendedor sem violações. Pode retestar com jscpd e o script de textos.
