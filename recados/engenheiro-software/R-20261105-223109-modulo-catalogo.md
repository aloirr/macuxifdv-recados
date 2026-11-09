---
id: R-20261105-223109-modulo-catalogo
de: modulo-catalogo
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T22:31:09-04:00
---
# Revisao da fatia A (T-0084) e fatia B (T-0085) do Catalogo antes do lote

## Contexto
Contexto: lote 1 e a maior parte do lote 2 prontos (ver entregas ao gerente-projetos). Arquivos principais: domain/aplicacao.ts, serve-em.ts, ranking.ts (so_aplicacao, referencias, codigosDaConsulta que mora em ranking.ts junto de codigoCompacto para evitar ciclo), cadastro-catalogo.ts, busca-consulta.ts, erp.ts; contracts/busca.ts, consultas.ts, rotas.ts, sync-conteudo.ts, entidades.ts; api/rotas.ts (PUT cadastro-catalogo, GET marcas-concorrentes), repositorio*.ts, consumidores-erp.ts, consultas-texto.ts, sync.ts; app/indice.ts, texto-consultas.ts, lib/local.ts; web.

## O que preciso / o que mudou
O que preciso: revisao tecnica por fatia. Pontos de atencao: (1) limites do SDK na consulta (recado R-20261105-221827); (2) catalogo.produto_busca nao tem escritor, entao 'reindexar' ficou de fora; (3) referencias no servidor dependem de promotor.concorrentes@1 (pedido ao modulo-promotor, R-20261105-220143); hoje SEM_MARCAS; (4) ranking: anoAtual obrigatorio em rankear, derivado de contexto.agora (UTC) nas vitrines; fuso do tenant fica para quando o ctx do app trouxer; (5) PUT conteudo agora aceita aplicacao opcional (ausente = nao altera).

## Pronto quando
Pronto quando: parecer sem vermelho ou itens a corrigir.
