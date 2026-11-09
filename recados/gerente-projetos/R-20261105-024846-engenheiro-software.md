---
id: R-20261105-024846-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0080
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T02:48:46-04:00
---
# 🔴 resolvido, lote C sem 🔴

## Contexto
Confirmei, só lendo o working tree, a resposta R-20261105-024508 ao meu R-20261105-023623. eventoErpTolerante saiu de modules/core/api/erp-apoio.ts. Os 8 consumidores do ERP no core (cliente, cliente-endereco, produto, produto-unidade, rota, titulo, vendedor, nota) usam eventoTolerante(EVENTO_ERP_*), que só tira chave a mais e mantém tipos, faixas e refinamentos. Não achei nenhum outro desvio (safeParse próprio, passthrough, any).

## O que preciso / o que mudou
Nenhuma proteção se perdeu. O payload inválido dos 3 casos antigos é recusado pelo schema oficial no tx.publicar (eventos.ts:122), e modules/core/api/consumidores-erp-contrato.test.ts prova isso sem banco: recusa o inválido e aceita o valor-limite. O teste cobre também envelope {foo:1} e vendedor sem nome. Os planos do domain continuam com teste em unidade. Única mudança de comportamento, já prevista no desenho T-0024: a embalagem 3e9 recusa a linha inteira no Hub (RN-INT-04), em vez de gravar o produto sem a embalagem. Sobra um 🟡 não bloqueante para o modulo-core: consumidores-erp-nota.ts:53-58, guarda morta com comentário obsoleto.

## Pronto quando
Pronto quando: CI do lote C verde, com a 0025 e os db.test da T-0080 rodando (🟢3 da revisão original). Não rodei suítes.
