---
id: R-20261106-235149-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0091
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T23:51:49-04:00
---
# T-0091 (eng. software): conexao 'portal' no SDK, 2º pool macuxi_portal na API, portal.env no deploy; diff do stack-isolado.yml aguarda o ok do dono do produto

## Contexto
T-0091, desenho docs/desenho/T-0091.md §3 e §5 (parte do engenheiro-software). Condição da ADR 0029: a sessão do super-admin só abre no papel `macuxi_portal`.

## O que fiz
- **SDK** (packages/platform-sdk/src/api.ts): `RotaPublica.conexao?: 'portal'` e `problemasConexaoRotaPublica` (usada no `definirModuloApi` e na subida da API). Recusa: `'portal'` fora do manifesto core ou fora de `plataforma/...`, e `plataforma/...` sem `'portal'`. JSDoc do `autenticarSuperAdmin`. O modulo-core foi avisado (R-20261106-231715) e já marcou as 8 rotas.
- **API**:
  - apps/api/src/banco.ts: `criarBancoPortal`/`BancoPortal`. `verificar()` exige `macuxi_portal`, sem superusuário e sem BYPASSRLS; `comTenant` lança. Também `PRAZO_PROVISIONAR_PORTAL_MS = 1500`.
  - apps/api/src/app.ts: `OpcoesApp.bancoPortal`. O pool do portal serve só a rotas `conexao: 'portal'`, `/v1/plataforma/*`, `autenticarSuperAdmin`, `sa_tenant_ativo` e a auditoria do `onResponse`. É conferido no `onReady`. Sem ele, a resposta é 503 `PORTAL_INDISPONIVEL` e os tenants seguem normais.
  - apps/api/src/plataforma.ts: `set local statement_timeout` antes da `sa_provisionar_tenant` (o risco do horizonte do pull, §3.5).
  - apps/api/src/servidor.ts: 2º pool (`MACUXI_API_POOL_PORTAL`, padrão 2), aberto só com `MACUXI_PG_PORTAL_SENHA`.
- **Deploy** (scripts/deploy):
  - `preparar-vm.sh` (produção e demo) gera `/opt/macuxi/portal.env` (600), uma vez só, fora do `.env`.
  - `compose.yml`: o `portal.env` só entra na `api` e no `banco`. Worker, tenant, seed e bko nunca o recebem.
  - `implantar.sh` exige o `portal.env`; `env.modelo` atualizado.
  - `banco-dbaas.sh` confere: `macuxi_portal` com LOGIN; as `sa_*` executam só pelo portal; nenhum grant de tabela para ele. A linha de log que o CI procura não mudou.
- **Governança, PRECISA DO OK DO DONO DO PRODUTO:** o diff do `.github/workflows/stack-isolado.yml` está em docs/desenho/T-0091-stack-isolado.diff (`git apply --check` ok). Não editei o .github. O CI passa sem o diff; ele só acrescenta conferências:
  - `portal.env` 600, mascarado e intacto na 2ª execução;
  - só a api e o banco recebem a senha;
  - o portal responde 401 e não 503;
  - as `sa_*` ficam só no portal.
- Desenho §8 com o que foi feito; diário atualizado.

## Testes
- SDK: 569 verdes; lint limpo.
- API: 222 verdes, 62 pulados (testes de banco, rodam no CI); lint sem erro (só avisos antigos de outros arquivos).
- Testes novos:
  - super-admin.test.ts: sessão, tenant ativo, empresas, provisionar e auditoria só no banco do portal; licença e `comTenant` no macuxi_app; sem portal = 503; a API não sobe com rota fora do lugar; `criarBancoPortal` recusa macuxi_app; o prazo do provisionar fica abaixo da margem do horizonte.
  - rota-publica-cabecalhos.test.ts: a rota marcada usa o pool do portal; sem ele, 503.
  - portal.banco.test.ts (CI): macuxi_app e worker sem EXECUTE nas `sa_*`, pelo catálogo; 42501 real; o portal não lê tabela; a API sobe com os dois pools.
- Typecheck da API: verde na última rodada. Antes disso, os únicos erros eram de packages/platform-sdk/src/sqlite/passagem.ts (T-0088, outra frente), nenhum nos arquivos da T-0091.
- `verificar engenheiro-software`: as 4 violações são os anexos do Alexandre em .coord/recados/anexos/, nenhuma minha.

## Pendências
- testes: `tests/integracao/apoio/api.ts` precisa passar `bancoPortal` (R-20261106-234618), senão o super-admin-t0087 fica vermelho no CI. Também falta o §6 do desenho.
- Revisão final (etapa 5): migração 0038 do banco-dados (R-20261106-234700), Core e testes.
- Ordem do merge: 0038, API e Core juntos no mesmo push.
- Recomendação fora do corte: levar `MACUXI_JWT_SEGREDO_PLATAFORMA` e `MACUXI_CHAVE_TOTP` para o `portal.env`.
