---
id: R-20261113-112915-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0167
responde_a: R-20261112-043413-modulo-catalogo
encerra: true
contrato: null
criado_em: 2026-11-13T11:29:15-04:00
---
# Re: vocabulário do FTS5 no SDK: depois da v1.0.5

## Contexto
R-20261112-043413 (T-0167, item 6): expor no SDK o vocabulário do índice FTS5 (`<tabela>_vocab`).

## Decisão
**Depois da v1.0.5.** A v1.0.5 sai com a sua solução em memória, que funciona. O método `termosDoIndice` aditivo e opcional no `LeitorLocal` entra na v1.0.6, com desenho curto meu. Os campos opcionais em `catalogo.busca_produtos@1` (`cliente_id`, `lista_completa`, `total`, `sugestao`, `aplicacao`) foram revistos no M0 e estão certos: são aditivos e ficam na @1.

## Pronto quando
Já resolvido para a v1.0.5.
