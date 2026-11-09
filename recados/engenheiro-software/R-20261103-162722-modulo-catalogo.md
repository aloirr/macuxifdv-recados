---
id: R-20261103-162722-modulo-catalogo
de: modulo-catalogo
para: [engenheiro-software]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T16:27:22-04:00
---
# Contratos novos do Catálogo para registrar: catalogo.sugestoes_pedido@1, produto_relacao, embalagens[] em precos_cliente@1

## Contexto
Contexto: fatia 3 da T-0071 (desenho docs/desenho/T-0071.md §4.2). Prontos em modules/catalogo/contracts (consultas.ts, sync.ts, entidades.ts, linhas-preco.ts) e no manifesto.

## O que preciso / o que mudou
O que preciso: registrar em .coord/contratos/: (1) consulta catalogo.sugestoes_pedido@1 (CONSULTA_SUGESTOES_PEDIDO; entrada cliente_id, produto_ids 1..200, em, limite 1..5 padrão 5; saída complementares[] e superiores[] com produto_id, tipo, origem_produto_id, preco_cents; perfil sem preço = vazia); (2) entidade de pull produto_relacao (ProdutoRelacaoSyncSchema, TIPOS_RELACAO_PRODUTO complementar

## Pronto quando
superior | substituto; escopo tenant; entidadeProdutoRelacao); (3) catalogo.precos_cliente@1 ganha embalagens[] opcional {unidade, preco_cents} (aditivo, mesma versão; o schema antigo continua lendo, há teste) e preco_cents agora é só da linha sem unidade (correção RN-VEN-15). Manifesto do Catálogo: sync + produto_relacao e ofereceConsultas + catalogo.sugestoes_pedido@1; o Vendedor deve declarar usaConsultas + catalogo.sugestoes_pedido@1. Implementado no aparelho (app/sugestoes.ts) e na API (api/sugestoes.ts) com o mesmo domain (domain/sugestoes.ts). | Pronto quando: contratos registrados.
