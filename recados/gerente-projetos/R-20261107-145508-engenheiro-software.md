---
id: R-20261107-145508-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0093
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T14:55:08-04:00
---
# T-0093 etapa 1: desenho, ADR 0031 (aceita), contratos do SDK, diff de governança e pedidos às fatias B/C/W/U/T

## O que fiz (etapa 1 da T-0093: desenho, ADR, contratos e governança)
- **Desenho** `docs/desenho/T-0093.md`: fluxo de login de uma etapa (§2); busca das empresas do e-mail por `sa_contas_para_login` (EXECUTE só ao `macuxi_portal`, sem grant em tabela, consulta auditada pelo banco), senha conferida no Node em paralelo, bloqueio por chave HMAC do e-mail igual para e-mail inexistente, sem oráculo (§3); sessão e token por empresa: super-admin com o tenant no cabeçalho, como hoje; admin do cliente com `tid` no token, trocar = escolher de novo e o token antigo morre (§4); passo Empresa com o admin inicial (RN-CORE-34, §6); super-admin pelo deploy (§7); RN-CORE-32 em todas as senhas, com a tabela de onde está cada validação hoje (§8); o que sai e o que fica (§9); banco (§10); fatias, critérios e ordem (§11); riscos (§12).
- **ADR 0031** `docs/decisoes/0031-portal-so-email-e-senha.md`, aceita por decisão do dono do produto, com o risco do TOTP registrado. A 0029 ganhou a nota de que foi parcialmente substituída. O README das ADRs foi atualizado.
- **Contratos do SDK** (meus), aditivos: `packages/platform-sdk/src/plataforma.ts` (TIPOS_ACESSO_PORTAL, AcessoPortalAutenticado, MAX_EMPRESAS_LOGIN_PORTAL, LoginPortalSchema, EmpresaDoAcessoSchema, SessaoPortalSchema, EscolherEmpresaPortalSchema, AdminInicialEmpresaSchema, `CriarEmpresaSchema.admin`, `CriarEmpresaRespostaSchema.admin`) e `api.ts` (`ServicosCore.autenticarPortal` e o JSDoc de `RotaModulo.superAdmin`). Teste novo: `plataforma-portal.test.ts`. Os schemas antigos saem no fim, junto com as fatias C e W.
- **Governança** `docs/desenho/T-0093-workflows.diff` (confere com `git apply --check`): `demo-publicar.yml` e `producao-publicar.yml` deixam de ler o convite; workflows novos `producao-super-admin.yml` e `demo-super-admin.yml` (secrets `PROD_SUPERADMIN_SENHA` e `DEMO_SUPERADMIN_SENHA`). Não mexi no `.github` nem no `anexos-dono.diff`.
- **Pedidos com critérios:** banco-dados R-20261107-145424 (B), modulo-core R-20261107-145426 (C), engenheiro-apps R-20261107-145429 (W), designer-ux R-20261107-145431 (U), testes R-20261107-145433 (T).

## Testes
platform-sdk: typecheck, lint e testes verdes (623 + 8 novos). Typecheck de api, web e @macuxi/core verde com o contrato novo. `verificar engenheiro-software` sem violações.

## Ordem e dependências
B, C, U e a minha fatia S (API, CLI `super-admin`, deploy, `funcoes-sa.ts`, `banco-dbaas.sh`) começam juntas contra os contratos. W depende dos textos de U e dos contratos do Core da fatia C. **B, C e S entram no `main` no mesmo commit**, porque a migração apaga as funções que o Core e a API de hoje chamam (o portal daria 500). Depois entra W. O diff de governança vai junto ou depois. T fecha na branch de verificação, e a revisão final é minha.

## Para o dono do produto (via gerente)
1. Ok no `T-0093-workflows.diff`.
2. Criar os secrets `DEMO_SUPERADMIN_SENHA` e `PROD_SUPERADMIN_SENHA`, que seguem a RN-CORE-32.
3. Depois do merge, apagar os secrets `DEMO_SUPERADMIN_CONVITE` e `PROD_SUPERADMIN_CONVITE` e rodar "demo — super-admin" com o e-mail dele.
4. Conferir se o `PROD_TENANT_ADMIN_SENHA` atende a RN-CORE-32, porque o `tenant:criar` passa a recusar senha sem caractere especial.

## Premissas que assumi
- Precedência do super-admin quando o mesmo e-mail também é admin de empresa.
- Teto de 20 empresas por login.
- Bloqueio por e-mail, que substitui o bloqueio por conta.
- O `MACUXI_CHAVE_TOTP` continua gerado na VM, sem uso, para o `stack-isolado.yml` não mudar e o TOTP opcional do backlog poder voltar.
- As colunas de TOTP ficam no banco.
- Os códigos 422 de senha fraca que já existem continuam, com `detalhes.faltas`.
- Continua a regra "senha diferente do e-mail".
- A marca "trocar no 1º uso" do admin inicial fica com a T-0094.
