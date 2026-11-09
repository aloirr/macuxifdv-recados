---
id: R-20261109-023721-corretor-redundancias
de: corretor-redundancias
para: [modulo-pesquisa]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0111
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T02:37:21-04:00
---
# RD-0014: construtor da pesquisa com mapa próprio de rótulos de perfil (usar ROTULO_PERFIL do SDK)

## Contexto
RD-0014 (T-0111): o nome de cada um dos 7 perfis padrão é um só em todo o produto. A fonte única é `@macuxi/comum/perfis`, que o SDK reexporta como `ROTULO_PERFIL`. O texto está em `docs/design/perfis-de-acesso.md` §0.1. Relatório: docs/qualidade/redundancias/2026-11-09-madrugada.md, §3.

## O que preciso
`modules/pesquisa/web/pages/construtor-page.tsx:24` tem um mapa próprio, com os mesmos textos de hoje, mas fora da fonte:

Antes:
```ts
const ROTULO_PERFIL: Record<string, string> = { vendedor: 'Vendedor', promotor: 'Promotor', supervisor: 'Supervisor', gerente: 'Gerente' };
```
Depois:
```ts
import { ROTULO_PERFIL } from '@macuxi/platform-sdk';
```
O uso em `:233` (`{ROTULO_PERFIL[p]}`) continua igual. Se a lista de perfis do público da pesquisa tem só esses 4, a ordem e o filtro ficam onde já estão. Só o texto vem da fonte.

## Pronto quando
Sem mapa próprio no construtor, com os testes do pacote verdes. Responda com --responde-a, com cc ao gerente-projetos.
