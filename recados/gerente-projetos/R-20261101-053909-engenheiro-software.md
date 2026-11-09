---
id: R-20261101-053909-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0029
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T05:39:09-04:00
---
# T-0029 onda 1 (engenheiro): E1–E6 + registro prontos — libera a onda 2 (catálogo, core, vendedor)

## Contexto
T-0029, onda 1, parte do engenheiro: E1 a E6 do desenho docs/desenho/T-0029.md, mais o registro (E7). ADRs 0011 e 0012 marcadas como aceitas. O desenho ganhou a §11.1 com a receita de uso de cada item para a onda 2.

## O que fiz
- **E1 Consultas entre módulos (ADR 0012)**. SDK: `definirConsulta`, `ofereceConsultas`/`usaConsultas` no manifesto (o dono só oferece `<id>.*`; quem usa precisa ter o dono em depende/opcionais), `problemasDasConsultas` em `validarConjunto`, `ModuloApi.consultas` + `implementarConsulta`, `TransacaoTenant.consultar`, `ModuloShell.consultas` + `implementarConsultaAparelho`, `AmbienteModulo.consultar`, `ConsultaIndisponivel` (ErroHttpModulo 503 `CONSULTA_INDISPONIVEL`). Entrada e saída validadas pelo Zod, com a mensagem dizendo de quem é o erro. `definirModuloApi` recusa implementação não declarada, de outro módulo ou repetida. A consulta oferecida sem implementação é barrada por `consultasSemImplementacao`, chamada pelo `createApp` real; assim uma fixture de teste pode trocar um módulo sem reimplementar as consultas dele. No `createApp`: registro das consultas, e `tx.consultar` roda no mesmo `ClienteBanco` (mesma transação, tenant, RLS) e checa o `usaConsultas` de quem chama e a licença do dono para o usuário naquele momento. Log com `modulo`, `consulta` e `request_id`, sem entrada nem saída. No aparelho, `criarShell(...).consultas` vai para `criarMotorSync({ consultas })`, e o dono só lê as próprias entidades.
- **E2** `tx.auditar({ acao, entidade, entidade_id, antes, depois })` grava em `plataforma.auditoria` com o módulo da rota, o usuário, o `request_id` e o relógio da requisição.
- **E3** `ctx.parametros()` na rota e no provedor (parâmetros do módulo da rota, lidos junto com as licenças); a consulta recebe os do dono. No aparelho, `aplicarModulosAtivos(modulos, parametros)` guarda os parâmetros em `sync:parametros`: valem offline e somem com o módulo (RN-CORE-02). Leitura por `motor.parametros(m)`, `useAmbiente().parametros(m)` ou `useParametros(m)`. Em `apps/mobile/src/state/plataforma.tsx`, os parâmetros passam do `GET /v1/me/modulos` para o motor.
- **E4** `apps?` no item de extensão: o shell não registra o item de outro app e o filtro de `listar` também confere.
- **E5** `packages/comum/src/fuso.ts` (`zonedParts`, `localIsoDate`, `formatHHMM`…), exportado pelo subcaminho `@macuxi/comum/fuso`. Ficou fora do índice para não colidir nomes no reexport do mock-api. `@macuxi/ui/mobile/time.ts` só reexporta, e o teste foi junto.
- **E6** `imprimirHtml(html, titulo)` em `@macuxi/platform-sdk/web`: iframe oculto, título sugerido como nome do arquivo, remoção no `afterprint` ou depois de um prazo.
- **Gestão**: o shell não precisou de código novo. O teste do estado-alvo (Vendedor com `apps.gestao`) mostra a aba Pedidos e o detalhe para o supervisor, sem Novo pedido e sem a ação "Novo pedido" do cliente. Com o Vendedor desligado, a aba some.
- **E7 / espelho**: em `manifestos-referencia.test.ts`, Vendedor no Gestão com supervisor, gerente e admin, `aprovado@1` e `usaConsultas`; Catálogo com `cliente_tabela_preco` e a consulta; Core com `cadastro_resumo@1`. Também atualizados `.coord/contratos/modulos.md` (seção Consultas), `eventos.md` (aprovado@1 aprovado) e `extensoes.md` (`apps`).
- Ciclo entre arquivos que o dependency-cruiser apontou (api/ambiente/consultas): corrigido com `consultas-tipos.ts`.

## Arquivos
packages/platform-sdk/src/{consultas.ts, consultas-tipos.ts, consultas.test.ts, nomes.ts, manifesto.ts, api.ts, ambiente.ts, ambiente.test.ts, extensoes.ts, shell.ts, motor-sync.ts, index.ts, react/index.tsx, web/imprimir.ts, web/imprimir.test.ts, web/index.ts, manifestos-referencia.test.ts}; packages/comum/{package.json, src/fuso.ts, src/fuso.test.ts}; packages/ui/src/mobile/time.ts (time.test.ts foi para o comum); apps/api/src/{app.ts, outbox.ts}; apps/api/test/{consultas.test.ts, consultas.banco.test.ts}; apps/mobile/src/{state/plataforma.tsx, lib/instalados.test.ts}; .coord/contratos/{modulos.md, eventos.md, extensoes.md}; docs/decisoes/0011, 0012 (aceitas); docs/desenho/T-0029.md (status e §11.1).

## Testes
Verdes: platform-sdk 288, comum 20, ui 34, api 105 (inclui os de Postgres: consulta no mesmo txid, tenant do token e macuxi_app; auditoria grava e some no rollback), mobile 23, e os 8 módulos (2.076 testes). Lint verde em sdk, comum, ui, api e mobile; typecheck verde em sdk, ui, api e mobile; fronteiras sem erro.
Typecheck da raiz vermelho só em arquivos de outros donos, ainda em edição: `modules/core/web/lib/queries.ts` (modulo-core: Branch, IncentivePlan…) e `db/seeds/fixtures/dois-tenants.ts` (banco-dados: dadosT0029). Nada meu.

## O que libera a onda 2
- **modulo-catalogo**: já pode fazer o contrato `catalogo.precos_cliente@1` + `ofereceConsultas` + `implementarConsulta` (API) + `implementarConsultaAparelho` (aparelho) e `cliente_tabela_preco` no sync. Depende só da migração 0008 do banco-dados, que está em andamento. Manifesto e implementação têm de mudar juntos, senão a API real não sobe (já vale para o Core, que oferece e implementa).
- **modulo-core**: já pode fazer `core.cadastro_resumo@1`, só na API (vi que começou: modules/core/{contracts,api}/consultas.ts).
- **modulo-vendedor**: já pode fazer `receber`, aprovar/rejeitar e as rotas com `tx.consultar`, `tx.auditar` e `ctx.parametros()`; no manifesto, `apps.gestao`, os perfis, `usaConsultas` e `aprovado@1`; nas extensões, `apps: ['campo']`; no app, `useParametros('vendedor')` e `useAmbiente().consultar`; no PDF, `@macuxi/comum/fuso`; no BKO, `imprimirHtml`.
- Aviso com a receita mandado aos três (R-20261101-051151).

## Pendências
- **testes** (onda 3): `tests/integracao/apoio/campo.ts` monta o motor sem `consultas`. Para o preço no aparelho, passar `consultas: shell.consultas` (ou o registro do shell montado lá) a `criarMotorSync`.
- **testes, T-0028** (R-20261101-045301): Playwright na raiz, D-B29 (Auditoria chama `/v1/audit-log` da Fase M) e D-B30 (F5 em página de módulo dá 404 antes de `/me/modulos` carregar) são meus e ficaram fora do escopo desta onda; respondi a eles. Preciso que o gerente priorize; D-B30 é pequeno e pesa na demo.
- `apps/web/next-env.d.ts` foi reescrito pelo `next dev` da demo do testes (O-4). Não mexi; melhor não incluir no commit.
- A caixa tem recados antigos abertos que não tratei, por estarem fora do escopo fechado: bloqueio EAS do Alexandre (resolvido na T-0026, falta encerrar), bugs de login de 02h (T-0026), revisões do Gestor (T-0014) e do Hub (T-0023, T-0025), CI/CODEOWNERS (T-0005) e trustProxy (já feito).

## Premissas
- Consulta que só existe na API (`core.cadastro_resumo@1`) dá `ConsultaIndisponivel` no aparelho, sem erro de montagem.
- Sem tratamento, a `ConsultaIndisponivel` vira 503 (o motor reenvia o lote).
- O fuso fica no subcaminho, fora do índice do comum.
- Os parâmetros de um módulo desligado somem na hora, mesmo com limpeza pendente.
