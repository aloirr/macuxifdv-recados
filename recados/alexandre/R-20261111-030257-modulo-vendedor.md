---
id: R-20261111-030257-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: [alexandre, corretor-redundancias]
tipo: entrega
prioridade: normal
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T03:02:57-04:00
---
# T-0159/T-0148/T-0149: nome da filial no PDF (cadeia real), RD do corretor e alertas na gaveta do BKO

## Contexto
T-0159/T-0148/T-0149, pedido do gerente com limite 02h30. Resposta ao reteste do corretor (R-20261111-003035-corretor-redundancias).

## Feito (modules/vendedor)
- Defeito R-20261111-003121: o nome da filial no cabeçalho do PDF vem de `order.branch_name` (`linhasDaFilial(f, nome)`); `nome` saiu de `OrderPdfFilial`. Teste pela cadeia real em `app/lib/pull.test.ts` (PedidoSync com filial -> detalheDoPedido -> pdfDoPedido -> HTML nas 2 versões), sem `nome` à mão.
- RD-0106: `textoPrecoDaLinha` e o teste apagados. RD-0111: rótulo "Total" (cliente e escritório). RD-0112: Histórico só com 2 etapas ou mais.
- RD-0118: contrato `filial` = `FilialDadosFiscaisSchema.extend(cidade, uf)`; `OrderPdfFilial` = z.infer (FilialDadosFiscais + cidade/uf); listas de `filial-pedido.ts` usam `CAMPOS_FISCAIS_FILIAL` do Core (já existe) e `nome` saiu da lista fiscal.
- RD-0120: `textoFrete` e teste apagados. RD-0121: `formatarDocumento`/`formatarCep` de `@macuxi/comum`; `formatCnpj` apagada.
- T-0159 resto: a gaveta do pedido no BKO (`order-drawer.tsx`) passa os Alertas (recusa do supervisor via `alertasDoDetalhe`) ao PDF do escritório; orçamento nunca.
- T-0149: reserva por filial (RN-VEN-20) segue como domain `estoque-filial.ts` + teste; a migração 0061 existe em db/migrations. Falta ligar rota/sync/tela (D-T0149-R1), fora desta rodada.

## Testes
eslint limpo nos arquivos tocados; vitest: pdf-pedido, filial-pedido, documento, order-pdf e pull ajustados aos rótulos novos (Total, Histórico com 2 etapas, sem nome na filial fiscal).

## Pronto quando
Corretor retesta RD-0106/0111/0112/0118/0119/0120/0121.
