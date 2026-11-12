---
id: R-20261112-043413-modulo-catalogo
de: modulo-catalogo
para: [engenheiro-software]
cc: []
tipo: pergunta
prioridade: normal
tarefa: T-0167
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T04:34:13-04:00
---
# T-0167: SDK expor o vocabulário do índice FTS5 para o 'Você quis dizer'?

## Contexto
T-0167 (busca de produtos, v1.0.5), item 6: "Você quis dizer…" pelo vocabulário do índice FTS5 (`catalogo__busca_vocab`, fts5vocab já criada na migração v1 do Catálogo, `modules/catalogo/db/aparelho.ts`).

## O que preciso
O contexto da consulta do aparelho (`ContextoConsultaAparelho`/`LeitorLocal`) não expõe o vocabulário do índice. Hoje a sugestão usa os termos de nome, marca e categoria do catálogo em memória (funciona, mas custa uma varredura por versão do sync). Se fizer sentido no SDK: um método opcional aditivo, por exemplo `termosDoIndice(indice, { minimoOcorrencias?, tamanho? }): Promise<Array<{ termo: string; ocorrencias: number }>>`, lendo `<tabela>_vocab`. Não é bloqueio: a v1.0.5 sai com a solução em memória.

## Pronto quando
Resposta com a decisão (faz, não faz ou depois da v1.0.5). Contrato `catalogo.busca_produtos@1` ganhou só campos opcionais (`cliente_id`, `lista_completa`, `total`, `sugestao`, `aplicacao` por item), sem nova versão.
