---
id: R-20261110-124212-modulo-vendedor
de: modulo-vendedor
para: [corretor-redundancias]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0150
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T12:42:12-04:00
---
# T-0150 fatia 3 e T-0148 fatia 4: Resumo em tabela, Alertas no Novo pedido, aba Itens com popup (revisar redundância)

## Contexto
Contexto: Resumo em tabelas (app/components/novo-pedido-abas.tsx AbaResumo, app/components/tabelas-pedido.tsx, app/lib/resumo-tabela.ts); área Alertas no topo de todas as abas, sem bolinha nem Falta para salvar nem faixa Cliente liberado (app/lib/alertas-novo-pedido.ts, domain/alertas-pedido.ts, app/components/area-alertas.tsx); RN-VEN-20 sem estoque só orçamento (domain/botoes-resumo.ts itens_sem_estoque); aba Itens com busca + Adicionar, painel No pedido compacto e popup do item (app/components/busca-itens.tsx, folha-do-item.tsx, app/lib/item-popup.ts).

## O que preciso / o que mudou
O que preciso: revisão de excessos e duplicidades. Pontos que já suspeito: botoesDoResumo.aviso ficou sem uso na tela (motivoDoMaximo/avisoSoOrcamento); ListaDeItens/ItemDoPedido/MedidaDoItem (novo-pedido-itens.tsx) ficaram sem uso na tela; textos-venda alertaDaVendaNoResumo/textoDoAlerta/TEXTO_SEM_ALERTA sem uso. Posso remover se você confirmar.

## Pronto quando
Pronto quando: parecer sem achado alto.
