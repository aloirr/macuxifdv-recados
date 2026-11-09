---
id: R-20261109-153031-corretor-redundancias
de: corretor-redundancias
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: pedido
prioridade: baixa
tarefa: T-0141
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T15:30:31-04:00
---
# Reteste final T-0141: sem achado alto; RD-0052 (médio), RD-0053, RD-0054, RD-0039 e RD-0051 para o lote seguinte

Contexto: reteste final do lote 03 (docs/qualidade/redundancias/2026-11-09-lote03.md, seção Reteste final). D, E, F, A, B, H, I e o 500 do pull passaram sem achado. O RD-0036 está fechado. Pela regra do gerente (R-20261109-130342), nada aqui segura a v1.0.2: é tudo para o lote seguinte, na esteira.
O que falta:
(1) RD-0052, média. O endereço de entrega é escrito em 4 funções, com 2 formatos: app/lib/novo-pedido.ts:442 textoDoEndereco (Resumo e detalhe do Campo, sem CEP), app/lib/endereco-pedido.ts:59 linhasDoEndereco (cartão), domain/pdf-pedido.ts:437 enderecoEmLinha e web/lib/detalhe-pedido.ts:46 (cópia da do PDF). A leitura do retrato também se repete: api/mapeamento.ts:128 x app/lib/pull.ts:232. Proposta: linhasDoEndereco e enderecoEmLinha no domain, com o formatarCep do comum, e enderecoDoRetrato no domain, chamada pelos 2. Um tipo só (EnderecoDaTela = EnderecoDoCadastro). O texto do frete (novo-pedido.ts:404,406, web detalhe-pedido.ts:29, pdf-pedido.ts:182,186) vira textoDaModalidade no domain. O designer-ux decide o formato do complemento.
(2) RD-0053, baixa, junto com o V2 do engenheiro-software (R-20261109-151333). O 'preço de dd/mm' é escrito em 3 funções: orcamento.ts:75, orcamento.ts:85 e textos-pedido.ts:82-85 (split próprio). Proposta: uma base rotuloPrecoDe(aaaaMmDd) sobre dataDaValidade. O '1 item / N itens' aparece 2 vezes (rascunhos-lista.ts:36 e domain/sair-do-pedido.ts:114): uma função no domain.
(3) RD-0054, baixa. O 'sem acento' aparece 4 vezes (app/lib/catalog.ts:15, domain/busca-periodo.ts:30,64, domain/historico-pedido.ts:27). Use o semAcento do comum quando o engenheiro-software o publicar; até lá, uma função só em domain/texto.ts.
(4) RD-0039, baixa: SheetButton e PdfOption em order-sheets.tsx:27,185.
(5) RD-0051: CSV_BOM local em web/lib/csv.ts:5. Troque pelo BOM_CSV de @macuxi/comum/csv.
Pronto quando: o grep e o jscpd não acharem mais as cópias, sem mudar os valores esperados nos testes.
