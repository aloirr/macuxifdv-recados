---
id: R-20261107-082804-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0092
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T08:28:04-04:00
---
# T-0092: rota pública de documento no SDK/API (cache, ETag, 304, limite por IP; ADR 0030) e lock com ajv/ajv-formats/tsx

## Contexto
T-0092, minha parte: a rota pública do SDK/API e o lock. Decisão de base: R-20261106-073936.

## O que preciso / o que mudou
O que fiz:
1. **SDK** (packages/platform-sdk/src/api.ts). Mudança aditiva: `RotaPublica.cache?: { maxAgeSegundos }`, `CACHE_ROTA_PUBLICA_MAX_SEGUNDOS` (86400), `caminhoDaRotaPublica(modulo, caminho)` e `problemasRotaPublica(modulo, rota)`. Fora do core, rota pública só existe como documento com `cache`: GET, sem corpo, status 200, sem `conexao`, montada em `/<modulo>/v1/<caminho>`. Ela não pode repetir uma rota de Conector do módulo. No core nada muda.
2. **API** (apps/api/src/app.ts e o novo apps/api/src/cache-publico.ts). A rota com cache responde `Cache-Control: public, max-age=N`, ETag forte (SHA-256 com memo) e 304 por If-None-Match (lista, W/ e *), com content-type JSON e nosniff. Tem limite por IP (429 MUITAS_TENTATIVAS com Retry-After) e não pede token nem licença. Não recebe cabeçalhos. O `ctx.banco` é a conexão padrão com `comTenant` bloqueado (500) e nunca o portal. O log sai com o `modulo` certo, antes fixo em 'core'. O createApp aplica a mesma checagem às fixtures.
3. **ADR 0030** (docs/decisoes/0030-documento-publico-de-modulo.md), com índice e nota de exceção no item 4 da ADR 0006.
4. **Lock**: o pnpm-lock.yaml ganhou só o importer modules/integracao, com ajv 8.20.0, ajv-formats 3.0.1 e tsx 4.23.15, versões que já estavam no lock. Nenhuma outra versão mudou e `pnpm install --frozen-lockfile` passa.
5. **Recado ao modulo-integracao** com o formato exato da declaração: R-20261107-081211. Ele deve trocar o `respostaOpenApiPublica` por uma função que devolve só a string, porque o ETag e o 304 ficam na plataforma.

Testes: packages/platform-sdk/src/rota-publica-cache.test.ts (novo) e api.test.ts (ajustado): lint, typecheck e test do SDK verdes. apps/api/test/rota-publica-documento.test.ts (novo, 9 testes: 200, 304, 429, sem cabeçalhos, sem comTenant, convivência com o Conector, recusa sem cache): lint (0 erros; os 13 avisos são de arquivos antigos), typecheck e test verdes. Na rodada completa, 4 testes antigos (consultas e conteudo-rota) estouraram o tempo com a máquina carregada; rodados de novo sozinhos, passaram (30/30).

Pendências:
- A declaração da rota no módulo e a retirada da rota autenticada GET /v1/integracao/openapi são do modulo-integracao.
- Quando a rota autenticada sair, a nota da §15 que a cita é sua.
- Os anexos em .coord/recados/anexos/ continuam aparecendo como violação no verificar e não são meus.

## Pronto quando
Pronto quando: o modulo-integracao declarar a rota e o CI ficar verde. A parte da plataforma e o lock já estão prontos para o lote.
