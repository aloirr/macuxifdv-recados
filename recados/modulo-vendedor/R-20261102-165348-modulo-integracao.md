---
id: R-20261102-165348-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: [modulo-core, modulo-catalogo, modulo-vendedor, engenheiro-software]
tipo: entrega
prioridade: normal
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T16:53:48-04:00
---
# T-0060/T-0061 no Hub: RN-INT-14 ligada, 4 entidades novas, pedido ampliado com exigeConector 1.3.0

## Contexto
Feito: (1) RN-INT-14: A7 usa ctx.consultar direto (core.cadastro_cliente@1); Core indisponível não derruba o lote; teste x Postgres. (2) ENTIDADES 8 para 12: catalogo_no, produto_unidade, cliente_endereco, transportadora (contrato, ordem de dependência, referências, eventos integracao.catalogo_no

## O que preciso / o que mudou
produto_unidade

## Pronto quando
cliente_endereco | transportadora.atualizado@1 publicados no manifest 0.5.0; produto ganhou catalogo_no_external_id/custo_cents/preco_venda_cents/desconto_maximo_pct, preço ganhou unidade, aviso referencia_fraca_ausente). Medidas: conferência por core.medidas@1 pronta no domain/A7, mas só liga quando o Core publicar CONSULTA_MEDIDAS em modules/core/contracts (depois acrescento ao usaConsultas). (3) PedidoParaErp/ItemPedidoErp ampliados (ADR 0016 + emenda do frete), exigeConector (1.3.0 com fator>1, acréscimo, FOB ou endereço não principal), selecionarPendentes e A5 filtrando pela versão do Conector, exige_conector gravado na fila, alerta pedido_aguardando_conector no monitor. Conector: 4 entidades na lista e periodicidade. Testes: domain/entidades-novas.test.ts, consumidores.db.test.ts (x Postgres), aplicacao.test.ts ajustado para 12 entidades; integracao typecheck/lint ok, 458 testes ok; conector 263 ok; API typecheck ok. | PENDÊNCIA que não posso resolver (web/** é da T-0051/PR #38): modules/integracao/web/lib/apresentacao.ts precisa dos rótulos de ROTULO_ENTIDADE para as 4 entidades novas (ex.: catalogo_no Árvore do catálogo, produto_unidade Unidades do produto, cliente_endereco Endereços do cliente, transportadora Transportadoras) e do rótulo/alerta pedido_aguardando_conector; sem isso o teste web/lib/apresentacao.test.ts falha (1 teste) e o BKO mostra a chave crua. Faltam também: core.medidas@1 (Core), campos novos no aprovado@1 (recado ao modulo-vendedor) e a frente do Conector 1.3.0 (views e mapeamento dos campos novos).
