---
id: R-20261107-081211-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0092
responde_a: R-20261107-075536-modulo-integracao
encerra: false
contrato: null
criado_em: 2026-11-07T08:12:11-04:00
---
# Rota pública pronta no SDK/API: formato exato para declarar GET /integracao/v1/openapi.json; lock regenerado

## Contexto
T-0092, seu pedido R-20261107-075536. A plataforma já monta a rota pública de módulo que não é o core, e o pnpm-lock.yaml já tem ajv 8.20.0, ajv-formats 3.0.1 e tsx 4.23.15 no importer modules/integracao. Só entrou o importer, nenhuma versão nova; `pnpm install --frozen-lockfile` passa. Mudança aditiva no RotaPublica do platform-sdk (packages/platform-sdk/src/api.ts): campo novo `cache?: { maxAgeSegundos }` e funções `caminhoDaRotaPublica` e `problemasRotaPublica`. A montagem fica em apps/api/src/app.ts (montarRotaPublica) e apps/api/src/cache-publico.ts.

## O que preciso
1. Declare em `definirModuloApi` da Integração (modules/integracao/api/index.ts), exatamente assim:
```ts
rotasPublicas: [
  {
    metodo: 'GET',
    caminho: 'openapi.json',                 // vai para /integracao/v1/openapi.json (fora do core: /<modulo>/v1/<caminho>)
    limite: { max: 60, janelaMs: 60_000 },   // por IP; 429 MUITAS_TENTATIVAS com Retry-After
    cache: { maxAgeSegundos: 3600 },         // Cache-Control: public, max-age=3600 + ETag + 304
    executar: async () => documentoOpenApiPublico(),  // string JSON já formatada (vai como está) ou objeto
  },
],
```
2. A plataforma faz o cache: calcula o ETag forte (SHA-256 do corpo, 32 hex entre aspas) com memo, lê o If-None-Match (lista, W/ e *) e responde 304 sem corpo. Também põe content-type application/json; charset=utf-8, nosniff e Cache-Control. O seu `respostaOpenApiPublica(ifNoneMatch)` deixa de ser necessário: a rota nem recebe cabeçalhos (`ctx.cabecalhos` vem vazio, de propósito). Deixe só uma função pura e memoizada que devolve a string idêntica a docs/openapi-hub-v1.json (o teste que compara com o arquivo continua valendo) e remova o resto (status, cabeçalhos, ETag) com o teste. Assim o ETag fica num lugar só.
3. Regras que o `definirModuloApi` e o createApp cobram (erro na subida): fora do core, rota pública só com `cache`; com `cache`, só GET, sem `corpo`, status 200, sem `conexao`, `maxAgeSegundos` inteiro de 1 a 86400. Não pode repetir método e caminho de rota de Conector do módulo (`/openapi.json` em `conector.rotas` daria conflito). Sem licença e sem token. `ctx.banco` é a conexão padrão, mas `comTenant` lança (500), e o portal nunca é usado. Não leia banco nessa rota.
4. Depois que a rota pública entrar e o teste da sua rota passar (200 sem token; 304 com If-None-Match), pode remover a rota autenticada GET /v1/integracao/openapi (bko-openapi.ts e o teste), como você propôs. Antes, confira se o BKO ou a §15 ainda apontam para ela. A nota da §15 que cita a rota autenticada é do gerente: avise-o quando ela sair.

## Pronto quando
A Integração declara a rota acima, o teste do módulo cobre 200 e 304 pelo createApp ou pela função pura, `pnpm --filter @macuxi/integracao test` está verde e a entrega vai ao gerente com cópia para mim.
