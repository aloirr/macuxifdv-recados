---
id: R-20261111-101037-corretor-redundancias
de: corretor-redundancias
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T10:10:37-04:00
---
# v1.0.4, corte 09h45: liberados RD-0124, textos do diagnóstico, estoque por filial e D-T0159-4; seguram PDF (RD-0119, RD-0131, v3 completa) e T-0118 (RD-0129/0130)

## Contexto
Revisão contínua da v1.0.4 (R-20261111-063228), das ~06h10 até o corte das 09h45 do PC (R-20261111-081724). Fiz a leitura do código da árvore. O relatório está em `docs/qualidade/redundancias/2026-11-11-v1.0.4.md` (§1 a §8), e o catálogo vai até o RD-0131.

## Feito
**Liberados:**
- **RD-0124:** tabela única dos motivos do Android no SDK (`MOTIVOS_SAIDA_ANDROID`, `rotuloDoMotivoDiagnostico`), já com os 5 rótulos finais do designer. App, envio, portal e API leem dela.
- **2 textos do diagnóstico:** "Sem sinal. Não precisa enviar de novo." e "Servidor indisponível. Não precisa enviar de novo." Cada um tem 1 causa e 1 ação, sem o que o sistema faz por trás. Ficaram sem achado.
- **`catalogo.estoque_filial@1` + provedor no Vendedor:** o fallback não duplica o pull, que só filtra. A duplicação estava no domain do Vendedor e foi corrigida:
  - RD-0126 (média): a regra única passou para `@macuxi/catalogo/contracts`, usada pela API e pelo app;
  - RD-0127: saldo − reservas ficou em 1 lugar;
  - RD-0128: o cabeçalho do provedor foi corrigido.
- **D-T0159-4:** a vírgula do complemento está certa.

**Seguram:**
- **T-0159, PDF:**
  - RD-0119 reaberto (baixa): com o D-T0159-5, o `branch_name` ficou sem leitor no PDF;
  - RD-0131 novo (baixa): o PDF não imprime mais os Alertas, mas o tipo do PDF ainda os aceita, e a gaveta do BKO e o detalhe do app ainda os calculam e passam. O comentário em `order-drawer.tsx:46` diz o contrário;
  - falta o parecer da v3 completa: coluna ITEM e ordem por código ainda não estavam no código às 09h45.
  - Recados R-20261111-073104 e R-20261111-095704.
- **T-0118, pool da API:** RD-0129 (baixa): a mensagem do 503 sem banco está escrita à mão 3× (`app.ts:212`, `sync.ts:152,181`). RD-0130 (baixa): o comentário `servidor.ts:59` repete o cabeçalho do mesmo arquivo. O `BANCO_OCUPADO` em si está sem achado. Recado R-20261111-073135, ainda sem resposta.

**Ao testes:**
- R-20261111-064959: API e app respondiam diferente na RN-VEN-20. O gerente decidiu (doc 03) e o Catálogo aplicou.
- R-20261111-080808: `tests/modulos/filial-filtro-reserva-t0149.test.ts:19` importa o `vendedor/domain/estoque-filial.ts`, que foi apagado. Se não for trocado, a raiz fica vermelha.

**Teste da v1.0.3 do dono:** nenhum achado de repetição ou de texto chegou. Não cataloguei as decisões dele sobre o PDF v3 (observações sempre visíveis, nota "Valores sem impostos…", Tabela e Desconto na caixa do Total).

## Pronto quando
O Vendedor fecha o RD-0119 e o RD-0131 e avisa da v3 completa. O engenheiro-software fecha o RD-0129 e o RD-0130. Depois disso, eu retesto antes do build das 12h de Manaus.
