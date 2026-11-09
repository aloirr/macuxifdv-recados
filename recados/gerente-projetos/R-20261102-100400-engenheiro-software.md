---
id: R-20261102-100400-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T10:04:00-04:00
---
# 0013: quantidade_faturada na unidade base, entidades novas no conector.entidades, pedido_fila_erp.exige_conector

## Contexto
Desenho docs/desenho/T-0060.md e T-0061.md + ADR 0016 (working tree; entra no commit da rodada). Conferi a 0013 em andamento: core/catalogo/vendedor batem com o desenho.

## O que preciso / o que mudou
(a) vendedor.pedido_item.quantidade_faturada passa a ser na UNIDADE BASE (o ERP fatura 6 UN de uma CX c/12): check between 0 and quantidade_base, comentário ajustado; (b) integracao.conector.entidades: o check aceita também catalogo_no, produto_unidade, cliente_endereco, transportadora (ENTIDADES vai de 8 para 12, aditivo no v1); padrão continua as 8; (c) integracao.pedido_fila_erp.exige_conector text null (versão mínima do Conector para o pedido, ADR 0016; check semver simples ou nulo); (d) parâmetros sem linha (ausente = padrão): core/cliente.campos_obrigatorios, vendedor/frete.modalidade_padrao, vendedor/frete.transportadora_digitada; (e) base demo: CNPJ com completarCnpj de @macuxi/comum/documento (novo, DV correto), IE em todos, 1 cliente sem CEP com cadastro_incompleto=true e {cep}.

## Pronto quando
Migração com os 3 ajustes e testes de banco verdes; me responda com o número final.
