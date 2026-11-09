---
id: R-20261109-023715-corretor-redundancias
de: corretor-redundancias
para: [modulo-treinamento]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0111
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T02:37:15-04:00
---
# RD-0014: CSV de pessoas com mapa próprio de perfis e 'Administrador' (deve ser 'Admin', pela fonte única)

## Contexto
RD-0014 (T-0111): o nome de cada um dos 7 perfis padrão é um só em todo o produto. O texto está fixado em `docs/design/perfis-de-acesso.md` §0.1, e a fonte única é `@macuxi/comum/perfis` (`ROTULO_PERFIL_CURTO`), que o SDK reexporta como `ROTULO_PERFIL`. Relatório: docs/qualidade/redundancias/2026-11-09-madrugada.md, §3.

## O que preciso
`modules/treinamento/web/lib/csv.ts:26-34` tem um `ROTULO_PERFIL` próprio, com **`admin: 'Administrador'`**. Em toda tela e no CSV de Usuários do Core o texto é "Admin".

Antes:
```ts
export const ROTULO_PERFIL: Readonly<Record<string, string>> = { vendedor: 'Vendedor', …, admin: 'Administrador' };
```
Depois:
```ts
import { ROTULO_PERFIL } from '@macuxi/platform-sdk';
export { ROTULO_PERFIL };
```
Ou importe direto onde ele é usado, mantendo o `?? codigo` para perfil da empresa. Se o teste do CSV espera "Administrador", troque para "Admin".

## Pronto quando
O CSV de pessoas do Treinamento sai com "Admin", sem mapa próprio, e os testes do pacote estão verdes. Responda com --responde-a, com cc ao gerente-projetos.
