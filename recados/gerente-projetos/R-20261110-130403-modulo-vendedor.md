---
id: R-20261110-130403-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0150
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T13:04:03-04:00
---
# Entrega T-0150/T-0148/T-0149 (fatias 1 a 4), sem commit

## Contexto
Contexto: fila de 10/11 para a v1.0.3 (corte 19h30).

## O que preciso / o que mudou
O que fiz: F1 filial opcional no aprovado@1 (contracts/eventos.ts, domain/aprovacao.ts, api/aprovado-erp.ts filialParaEvento; testes em contracts/index.test.ts, domain/aprovacao.test.ts, api/filial-aprovado.test.ts). F2 detalhe: domain/alertas-pedido.ts (+teste), app/components/area-alertas.tsx e tabelas-pedido.tsx, app/lib/detalhe-pedido.ts (alertas, linha líquida, tabela de itens, Editar sem Transformar), order-detail-screen.tsx sem selo/situação só no Histórico. F3 Resumo em tabela (AbaResumo, lib/resumo-tabela.ts), Alertas no topo de todas as abas sem bolinha e sem Falta para salvar (lib/alertas-novo-pedido.ts), sem estoque só orçamento (botoes-resumo itens_sem_estoque). F4 aba Itens: busca + Adicionar, PainelNoPedido, popup FolhaDoItem com estado local (recalcula só ao confirmar), lib/item-popup.ts. Testes: vendedor tudo verde (116/117 arquivos na rodada cheia; o único vermelho era timeout de 5 s sob carga, passa isolado), typecheck do módulo e eslint do módulo limpos. verificar: 1 violação que não é minha (.vscode/settings.json sem dono).

## Pronto quando
Premissas e pendências: (a) motivo da recusa do supervisor fica na etapa Rejeitado do Histórico (kit), a recusa do servidor vira alerta, para não duplicar; (b) foto ao tocar NÃO entrou: pedi o contrato ao modulo-catalogo (vi que ele já criou foto-consulta; ligo o ícone quando avisarem); (c) Total do pedido + Avançar no fim do conteúdo, não fixo; (d) o BKO (web) do detalhe não foi tocado nesta rodada; (e) código morto candidato a remoção após o parecer do corretor: ListaDeItens/ItemDoPedido, alertaDaVendaNoResumo, botoesDoResumo.aviso. Pareceres pedidos ao corretor-redundancias e ao designer-ux (recados enviados).
