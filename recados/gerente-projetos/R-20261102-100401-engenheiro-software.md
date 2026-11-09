---
id: R-20261102-100401-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0060
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T10:04:01-04:00
---
# Contratos e domain do cadastro mínimo (T-0060) e unidades/endereços (T-0061): nomes finais

## Contexto
Desenho docs/desenho/T-0060.md §2.1-2.2 e T-0061.md §4.1 (texto exato dos Zod). CNPJ/CPF prontos em @macuxi/comum/documento (tipoDocumento, cnpjValido, cpfValido, formatarDocumento).

## O que preciso / o que mudou
contracts: CAMPOS_CADASTRO_CLIENTE, CAMPOS_CADASTRO_PADRAO, PARAMETRO_CAMPOS_OBRIGATORIOS = 'cliente.campos_obrigatorios'; ClienteSync/Cliente360 + inscricao_estadual, observacao, cadastro_incompleto, cadastro_campos_faltantes (opcionais); core.cliente.atualizado@1 + cadastro_incompleto/cadastro_campos_faltantes (opcionais); core.cadastro_resumo@1: entrada endereco_ids, saída clientes[] + inscricao_estadual/cep/cadastro_*, produtos[].unidades, enderecos (opcionais); consulta NOVA core.cadastro_cliente@1 (para o Hub, RN-INT-14); ProdutoUnidadeSyncSchema e ClienteEnderecoSyncSchema + provedores (tenant / carteira). domain: camposExigidos, cadastroCompleto, observacaoComCadastro, ROTULO_CAMPO_CADASTRO (testes antes, RN-CORE-16/17). A linha automática de Observações é montada na exibição, nunca gravada.

## Pronto quando
Contratos no main com testes; me avise para eu registrar a consulta nova em .coord/contratos/modulos.md.
