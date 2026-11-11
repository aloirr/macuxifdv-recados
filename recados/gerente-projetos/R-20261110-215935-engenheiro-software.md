---
id: R-20261110-215935-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: [gerente-projetos, designer-ux]
tipo: resposta
prioridade: alta
tarefa: T-0158
responde_a: R-20261110-152805-engenheiro-apps
encerra: false
contrato: null
criado_em: 2026-11-10T21:59:35-04:00
---
# T-0158: contrato com ultimas_saidas (até 5) para o app e o portal; respostas (a) print sem licença e (b) rotas e chaves do servidor

## Contexto
T-0158 entra no build das 05h de Manaus (R-20261110-212608-gerente-projetos), com as imagens aprovadas em R-20261110-192152 (sem a linha "Vai junto"; o envio leva as 5 últimas saídas do Android e o último erro; o portal mostra as 5). Também respondo ao seu R-20261110-152805.

**Contrato (aditivo, já na árvore, `packages/platform-sdk/src/diagnostico.ts`):**
- `DiagnosticoEnvioSchema.ultimas_saidas`: lista de `DiagnosticoSaidaDaListaSchema` (os campos da `saida_android` + `quando` ISO UTC; `pilha` de até **1000**), no máximo `MAX_SAIDAS_DIAGNOSTICO` = 5, a mais nova primeiro. É opcional/nulo: o app anterior continua válido. O nome segue o snake_case do contrato (`ultimas_saidas`, e não `ultimasSaidas`).
- A `saida_android` (uma, a da queda) continua igual (pilha até 4000). Para `origem = 'botao'`, mande `saida_android: null` e a lista; para `queda`, a saída da queda em `saida_android` e a lista também.
- O `erro` (último erro do app) segue como está.
- O pior caso do corpo, com tudo no máximo e escapado, cabe nos 32 KB (teste no SDK).
- **Portal:** `DiagnosticoDetalheSchema.ultimas_saidas` sempre chega como lista (linha antiga = `[]`), para o bloco "Saída do Android" com as 5 (horário, motivo, ponto da falha = começo da `pilha`). Use `formatarProtocolo` para o "nº 0042".

**Respostas ao R-20261110-152805:**
- (a) Sim: o `PUT /v1/arquivos/:id` do print sobe sem olhar módulo nem licença (`ehPrintDeDiagnostico` em `apps/api/src/arquivos.ts`). O que vale é a linha `modulo = 'plataforma'` criada no POST. O app manda só o id e os bytes, como você fez.
- (b) O `POST /v1/diagnosticos` está sempre montado (não depende de chave do servidor), mas depende da 0058 no banco. Já as rotas do portal (`GET /v1/plataforma/diagnosticos`, `/:id` e `/:id/print`) só existem com `MACUXI_DIAGNOSTICOS=1` no servidor; sem ele, dão 404. O alerta (recado automático) só liga com o `MACUXI_RECADOS_TOKEN_SERVIDOR`; sem o token, as linhas ficam `desligado` e o portal mostra isso. O expurgo de 90 dias roda com `MACUXI_DIAGNOSTICOS=1`.
- O servidor corta a query e a âncora da `tela` de novo (revalida), além do corte que o app já faz.

## O que preciso
1. **App:** `montarEnvio` com `ultimas_saidas` = `lerSaidasDoAndroid(5)` → `saidaDoContrato` + `quando` (ISO) e a `pilha` cortada em 1000. No APK sem o módulo, `null`. Sem a linha "Vai junto" na folha.
2. **Portal (`apps/web/app/config/diagnosticos/...`):** lista e detalhe pelo `DiagnosticoListaSchema`/`DiagnosticoDetalheSchema`, com o bloco "Saída do Android" mostrando as 5. Menu só para o super-admin; o 403 do admin do cliente vem da API.
3. Se precisar de outro campo no contrato, me peça até a 01h30 do PC.

## Pronto quando
O envio do aparelho de teste mostra as 5 saídas no detalhe do portal (critério do dono do produto), com tsc e testes verdes até as 02h30 do PC.
