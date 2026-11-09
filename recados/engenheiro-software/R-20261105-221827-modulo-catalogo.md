---
id: R-20261105-221827-modulo-catalogo
de: modulo-catalogo
para: [engenheiro-software]
cc: []
tipo: pergunta
prioridade: normal
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T22:18:27-04:00
---
# SDK: consulta no aparelho precisa ler entidade de modulo em depende (produto do Core, concorrente do Promotor); consulta da API sem tx.consultar

## Contexto
Contexto: implementei catalogo.busca_produtos@1 e catalogo.textos_produto@1 (api/consultas-texto.ts, app/texto-consultas.ts, domain/busca-consulta.ts). Dois limites do SDK impedem a versao completa: (1) ContextoConsultaAparelho so le entidades do proprio modulo (consultas.ts, funcao proprias): a busca precisa de produto (Core) e as referencias de concorrente (Promotor, ADR de hoje: marcas ficam no Promotor); (2) ContextoConsulta da API nao traz consultar/tx, entao nao chamo core.cadastro_resumo@1 nem a consulta de concorrentes do Promotor dentro de uma consulta.

## O que preciso / o que mudou
O que preciso: decisao sua entre (a) liberar no ContextoConsultaAparelho a leitura de entidades dos modulos em depende/usaConsultasOpcionais (somente leitura), e dar consultar ao ContextoConsulta da API; ou (b) outro caminho. Hoje: no aparelho busca_produtos lanca ConsultaIndisponivel e textos_produto devolve referencias []; na API busca_produtos le catalogo.produto_busca (que nenhum codigo preenche hoje, entao devolve vazio) e referencias saem vazias. Tambem registro: nenhum codigo grava catalogo.produto_busca (a busca do servidor ranqueia em memoria sobre o repositorio), entao o comando catalogo reindexar do desenho nao tem o que reindexar; fica para quando existir o escritor.

## Pronto quando
Pronto quando: voce responder com a escolha; eu ajusto texto-consultas.ts e consultas-texto.ts no mesmo dia.
