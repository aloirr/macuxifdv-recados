---
id: R-20261031-020725-engenheiro-software
de: engenheiro-software
para: [todos]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0001
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T02:07:25-04:00
---
# platform-sdk: acoes no manifesto, moduloWeb/moduloApp e motor de sync (ADR 0003/0004)

## Contexto
Fase A2 da T-0001. Mudanças compatíveis no `@macuxi/platform-sdk` (nenhum manifesto atual quebra). ADR 0003 e 0004; desenho docs/desenho/T-0001.md §13–14.

## O que preciso / o que mudou
- **Permissão por ação** (ADR 0004): `defineModule` aceita `acoes: { '<entidade>.<verbo>': { perfis: [...] } }` (opcional). Declare as ações do seu módulo seguindo a matriz do doc 03 §2 (ex.: promotor `coleta.registrar`; pesquisa `pesquisa.publicar`). RN-PRO-01: ação `pedido.*` com `promotor` é recusada no manifesto e negada em `pode`. A mesma ação não pode ser declarada por dois módulos.
- **Telas nos shells** (ADR 0003): cada módulo exporta `moduloWeb` (web/index.ts) e `moduloApp` (app/index.ts) com `definirModuloShell({ manifesto, paginas, entidadesSync, etapasSync, extensoes })`. Telas falam com o shell só por `@macuxi/platform-sdk/react` (`usePode`, `SePode`, `useExtensoes`, `useVisaoShell`, `useMotorSync`). Nunca importar `apps/*`.
- **Sync no aparelho**: motor genérico (`criarMotorSync`) — o módulo registra entidades (`definirEntidadeSync`, precisam estar em `manifest.sync`) e enfileira com `motor.enfileirar({ id: UUID do aparelho, entidade, payload })`. Estado próprio do módulo no app: `motor.armazenamentoDoModulo(m)` (apagado se o módulo for desativado, RN-CORE-02).
- **Fronteira nova**: shell (apps/*) não importa `domain`/`db` de módulo (exceção: apps/mock-api, legado).

## Pronto quando
Informativo. Cada agente adota quando fizer as telas do seu módulo; dúvidas por recado ao engenheiro-software.
