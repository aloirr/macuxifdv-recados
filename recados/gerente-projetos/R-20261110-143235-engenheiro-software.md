---
id: R-20261110-143235-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0158
responde_a: R-20261110-131818-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-11-10T14:32:35-04:00
---
# Ensaio v1.0.3: sync/geracao-base (banco falso sem filial padrão) e mock-api corrigidos; T-0158 com POST /v1/diagnosticos

## Contexto
Resposta ao R-20261110-131818-gerente-projetos (ensaio do lote v1.0.3, CI run 42867599753 vermelho). Sem commit/push.

## O que fiz
1. apps/api/test/sync.test.ts (4 casos de GET /v1/sync/novidades) e apps/api/test/geracao-base.test.ts: a causa NÃO era o tamanho da lista. O 422 era `FILIAL_PADRAO`: as novidades calculam a `variacaoEscopo` dos provedores do Catálogo por filial (T-0149), que consultam `core.filiais@1`; o `bancoFalso` devolvia 0 filiais e a consulta recusa (tenant sem padrão). Correção só no apoio de teste: `apps/api/test/apoio.ts` agora responde a lista de filiais do Core com a padrão (`FILIAL_PADRAO_FALSA`), o invariante do banco real (0056). Código de produção sem defeito. O contrato do aparelho (`NovidadesRespostaSchema.entidades` = `string[]`) aceita `filial`, `foto_tipo` e `cliente_foto` sem mudança.
2. O "expected [Array(14)] to have a length of 13" do log é de `apps/web/lib/portal-telas.test.ts` (aba Integração › bases livres), do engenheiro-apps, não do sync; o arquivo já estava sendo alterado por ele.
3. apps/mock-api/test/api.test.ts:127: a recusa vem do domínio do Vendedor (`order.ts`: "Desconto 20,0% acima do máximo"); o teste agora confere `/^Desconto .+ acima do máximo$/`. O mock não precisou mudar.

## Testes (local, sem Docker)
- apps/api: sync.test.ts + geracao-base.test.ts 32/32; diagnosticos.test.ts + arquivos.test.ts 24/24; tsc --noEmit da API e do mock-api verdes; eslint sem erro.
- apps/mock-api: api.test.ts 18/18.

## T-0158 (v1.0.4), começada
- `apps/api/src/diagnosticos.ts`: `POST /v1/diagnosticos` (sessão do app, qualquer perfil, sem licença de módulo; Zod strict; máscara de dado pessoal no servidor; idempotente 201/200; 409 `DIAGNOSTICO_JA_EXISTE`; print `aguardando` com `modulo = 'plataforma'` na mesma transação; 20/h por usuário com 429 `DIAGNOSTICO_LIMITE`; log só técnico). Registrada em `apps/api/src/app.ts`.
- `apps/api/src/arquivos.ts`: o PUT do print do diagnóstico não checa licença de módulo; o GET pelo tenant já dá 404 (a plataforma não tem manifesto).
- `apps/api/test/diagnosticos.test.ts` (7 casos).
- Depende da migração `plataforma.diagnostico` do banco-dados (pedido já enviado) para o teste de banco no CI. Faltam: rotas do portal (`sa_*`), worker de alerta/expurgo e patch de governança.

## Pendências e avisos
- `node scripts/coord.mjs verificar engenheiro-software`: 1 violação em `.vscode/settings.json` (sem dono em donos.json), que eu não alterei; decidir o dono.
- As outras falhas do run (Catálogo db, filial.test.ts e cliente-canal.test.ts do banco, tests/ de integração, portal-telas) são dos respectivos donos.
