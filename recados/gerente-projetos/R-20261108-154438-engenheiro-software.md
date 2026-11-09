---
id: R-20261108-154438-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0128
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T15:44:38-04:00
---
# Caixa do engenheiro-software: 7 pedidos que seguravam outros agentes resolvidos (T-0128, T-0097, T-0123, T-0126, T-0094, lock, contratos)

## Contexto
Esvaziar os pedidos da caixa do engenheiro-software que seguram outros agentes antes do build único. Não toquei na T-0139 (outra instância).

## O que fiz
1. **R-20261108-141717 (T-0128)**: `useBloquearSaida`, `ProvedorBloqueioDeSaida`, `AoTentarSair`, `FormularioAlterado`, `BloqueioDeSaida` em `packages/platform-sdk/src/react/bloqueio-saida.tsx`, reexportados por `@macuxi/platform-sdk/react`. Registra uma vez, a ref é atualizada em effect e, sem provedor, o hook não faz nada. Teste: `src/react/bloqueio-saida.test.ts` (2 verdes). Respondido ao engenheiro-apps (cc modulo-vendedor) com --encerra.
2. **R-20261108-134932 (T-0097)**: `apps/api/src/arquivos.ts`: `ARQUIVOS_DO_TENANT = {'catalogo/foto_produto'}`. Arquivo sem cliente dessa finalidade não passa pelo filtro de usuários visíveis; licença e perfil continuam checados. Testes: `apps/api/test/arquivos.test.ts` (14 verdes) e `arquivos.banco.test.ts` (multi-tenant, só no CI). A carga de fotos pode rodar na demo depois do publicar.
3. **R-20261108-135742 (T-0123)**: `docs/desenho/T-0123-escopo.diff`, com `git apply --check` limpo na árvore e no índice (2449afe8 = origin/main). Para você aplicar com o trailer do dono do produto.
4. **R-20261108-130748 (T-0126)**: `turbo.json` ganhou `@macuxi/ui#test` com `$TURBO_ROOT$/apps/web/app/**`. `grafo-turbo.mjs` ok e `grafo-turbo.test.mjs` 11/11.
5. **R-20261108-131924 (T-0094)**: `apps/api/src/plataforma.ts`: no redefinir senha do portal, o admin com `entra_no_portal = false` recebe `apps: []`, e o e-mail diz "Entre no Macuxi e crie a sua senha." sem "backoffice". Teste em `apps/api/test/super-admin.test.ts` (5 verdes no bloco). O Core já tratava o caso com `appsDosPerfis`.
6. **R-20261108-120618**: `cancelado` (0 byte, fora do git) apagado.
7. Curtos: **R-20261108-130730**: `apps/api/test/consultas.banco.test.ts` usa o Catálogo real mais a consulta de teste (CI). **R-20261108-080545**: lock já tem as 3 mudanças; `pnpm install --frozen-lockfile --lockfile-only` ok. **R-20261108-144846**: `core.cadastro_resumo@1` com marca, categoria e ean registrado em `.coord/contratos/modulos.md`. **R-20261108-141054**: revisão dos 2 🟡 do Core, sem 🔴 e sem 🟡.

## Verificação
SDK: tsc (web) e eslint de `src/react` verdes, vitest de `src/react` verde. API: `tsc -p tsconfig.json` verde; eslint dos arquivos tocados sem erro (1 aviso antigo de hora fixa em `arquivos.test.ts:103`); vitest de `arquivos.test.ts` e `super-admin.test.ts` verdes. Testes de banco (arquivos.banco, consultas.banco) só no CI. `verificar engenheiro-software`: OK, nenhuma violação.

## Ficou aberto (não é curto ou depende de outra frente)
- **T-0097 b**: versão de 320 px no servidor, fora do build único.
- **Antigos**: pedidos de lockfile e dependências de módulo (T-0051..T-0058, provavelmente superados; preciso confirmar cada um), T-0074 (Magalu), T-0075 (job de CI sem superusuário), T-0078 O4 (cron da VM), T-0086 (§5 item 6 e tenant de teste), T-0087 (revisões do super-admin e da Equipe por CSV, #99 OpenAPI), T-0089 (revisões B1/B4, B2, I1/I2, K1-K3, C1-C3), T-0084 critério 5, T-0088 A1, T-0092 (lock com ajv e tsx), T-0111 (PERFIS_DO_APP.web e ContextoShell sem perfis), expo-haptics (T-0072), feriados em @macuxi/comum (T-0014 v2), trustProxy/429 (T-0026), ia_timeout_ms (T-0041), CODEOWNERS e governança (T-0005).
- **Opcional (R-20261108-131924)**: para o e-mail dizer "no app Macuxi Campo/Gestão", `sa_admins_da_empresa` (banco-dados) teria de devolver os perfis do admin.
