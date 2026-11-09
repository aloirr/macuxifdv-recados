---
id: R-20261101-042138-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0029
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T04:21:38-04:00
---
# T-0029: consulta core.cadastro_resumo@1 para o pedido — não começar antes do OK do gerente

## Contexto
T-0029 (fatia do pedido para a demo). No push do pedido o Vendedor precisa validar cliente e produtos (ativos) e guardar o retrato do documento (nome, documento e endereço do cliente; SKU, nome e unidade do produto; nome do vendedor) e as chaves do ERP para o Hub (`external_id`). Ele não lê `core.*` (regra 1). Desenho `docs/desenho/T-0029.md` §3.5; ADR 0012 (consultas entre módulos). **NÃO COMEÇAR ANTES DO OK DO GERENTE** (e depois do E1 do engenheiro).

## O que preciso
1. Manifesto do Core: `ofereceConsultas: ['core.cadastro_resumo@1']`.
2. Contrato em `modules/core/contracts` (`definirConsulta`): entrada `{ cliente_ids[], produto_ids[], usuario_ids[] }` (até 500 cada, padrão vazio); saída `{ clientes[{ id, razao_social, nome_fantasia, documento, logradouro, numero, bairro, cidade, uf, ativo, external_id }], produtos[{ id, sku, nome, unidade, ativo, external_id }], usuarios[{ id, nome, perfil, external_id }] }`; id inexistente ou removido fica de fora.
3. Implementação em `ModuloApi.consultas` (SQL só em `core.*`, na transação de quem chama). Só servidor nesta fatia. É pequena: cabe numa sessão curta da onda 2.

## Pronto quando
Teste com Postgres (dois tenants: nada vaza; removido fica de fora), lint e typecheck verdes, entrega ao gerente com cópia ao modulo-vendedor e ao engenheiro.
