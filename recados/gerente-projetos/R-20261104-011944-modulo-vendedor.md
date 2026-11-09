---
id: R-20261104-011944-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T01:19:44-04:00
---
# T-0071: itens 1 e 2 verdes (🟡 cópia do ajuste, manifest, embalagens[]) + fatia 6 estrutura das telas do Campo

## Contexto
Contexto: escopo da rodada (R-20261103-174442 e avisos do Catálogo e do engenheiro-software).

## O que preciso / o que mudou
Feito (commit separado dos itens 1 e 2): (1) 🟡 pedidoDoOrcamento/duplicarDocumento em modules/vendedor/domain/orcamento.ts copiam só o modo gravado (ajuste_em) no item e no pedido, discount_pct=0 no modo valor; testes antes em domain/orcamento-v2.test.ts (RN-VEN-18/RN-VEN-02): Transformar com R$ no item e R$ no pedido, Duplicar com R$ no item e % no pedido, legado sem ajuste_em; todos passam em revalidarPedido (receber). (2) manifest.ts: usaConsultas ganhou catalogo.sugestoes_pedido@1 (Catálogo é dependência obrigatória, então não usei usaConsultasOpcionais) e manifest.test.ts atualizado; recado R-20261104-001250 ao engenheiro-software para o manifestos-referencia.test.ts. embalagens[] lido no app: embalagensDaConsulta em app/lib/novo-pedido.ts, guardado em TabelaDePrecos.embalagens (repositorio.ts), preço próprio da caixa entra no calcularPedido/prepararPedido (RN-VEN-15), com testes. Também respondi e encerrei o recado do modulo-core (vendedor.pedidos_da_meta@1 já existia).

## Pronto quando
Fatia 6 (estrutura, ainda sem commit; arquivos em modules/vendedor/app): lib/textos-pedido.ts(+test) com os textos da referência enxuta (abas, rótulo curto do prazo, faixa da alçada, selo do orçamento, item compacto, linha de entrega, totais, situação do cliente); components/novo-pedido-abas.tsx (CardFreteEPrazo, AbaDetalhes, AbaResumo, FolhaSalvar com opcoesDoSalvar, DialogoDescartar) usando Abas, Segmentado, CampoBusca, Folha, OpcaoFolha, Dialogo, RodapeTotal, LinhaValor, BlocoTotais, Faixa, Chip do packages/ui; screens/new-order-screen.tsx em 3 abas com rodapé só de total+Avançar na 1 e 2, Salvar abre a folha (Enviar pedido | Salvar como orçamento, offline entra na fila), Cancelar com diálogo (rascunho só cai ao confirmar; descartarRascunho no hook); lib/lista-pedidos.ts porTipo + chips Pedidos | Orçamentos na orders-screen (Campo e Gestão), orçamento fora dos totais. Testes: lint e tsc (app/web/domínio) do @macuxi/vendedor verdes; vitest 154 testes verdes (domain/orcamento*, manifest, app/*); verificar sem violações. | Pendências da fatia 6 (próxima rodada): ajuste em R$ no item e no pedido (o calculador do app ainda é só em %: falta migrar calcularPedido para o preco-pedido v2 e o Rascunho/push com ajuste_em), chip da medida e equivalente 'R$ 17,90 → 17,01' no item, sugestões 'Combina com o pedido'/'Leve mais' (consulta catalogo.sugestoes_pedido@1 agora declarada), trilha do catálogo, tela do orçamento (Transformar/Editar/PDF com selo, folha de transformar) e filtro no Gestão já herda a lista. Aguardo o designer-ux (T-0072) para o visual final. Typecheck do apps/mobile: rodando, resultado no resumo final.
