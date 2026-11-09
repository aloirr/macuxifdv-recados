---
id: R-20261106-005727-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T00:57:27-04:00
---
# T-0087 P (plataforma): desenho + ADR 0029, SDK (ponto no caminho, tipoConteudo/nomeArquivo, contrato do portal), API do modo super-admin e /v1/plataforma/empresas; 4 pedidos enviados

## Contexto
T-0087, fatia P (parte de plataforma) e os itens do SDK pedidos pelos PRs da nuvem. Portal no ar até 12h de 06/11.

## O que fiz
1. **Desenho** `docs/desenho/T-0087.md` e **ADR 0029** `docs/decisoes/0029-super-admin-de-plataforma.md` (proposta; índice atualizado). O super-admin fica fora dos tenants e o primeiro acesso é por convite secreto (`MACUXI_SUPERADMIN_CONVITE`). O 2º fator é TOTP com `node:crypto`, segredo cifrado e 10 códigos de recuperação. A sessão usa JWT com segredo próprio, dura 15 min renováveis com teto de 8 h e é conferida no banco a cada requisição. Toda requisição é auditada, sem dado pessoal. O portal só abre no host `config.`.
2. **SDK** (`packages/platform-sdk`), mudanças aditivas:
   - caminho com ponto (`modelos/:entidade.csv`, `openapi.json`); `pedidos.csv` continua barrado ao promotor (RN-PRO-01);
   - `tipoConteudo` com lista fechada, sem HTML, JS ou SVG, e `nomeArquivo` no `RotaModulo`;
   - contrato do portal em `plataforma.ts`: Zod das rotas `plataforma/auth/*` e `CriarEmpresaSchema` (CNPJ com DV, parâmetros iniciais do doc 03);
   - `RotaModulo.superAdmin: 'aceita' | 'exige'`, `ServicosCore.autenticarSuperAdmin`, `ContextoBase.superAdmin` e `planoDeOnboardingSemAdmin`.
3. **API** (`apps/api`):
   - `Content-Type`, `Content-Disposition` e `nosniff` honrados nas rotas com `tipoConteudo` e `nomeArquivo`;
   - modo super-admin com o cabeçalho `x-macuxi-tenant`: vale a licença do tenant, a carteira é `'tenant'` e não há checagem de ação/perfil;
   - `GET|POST /v1/plataforma/empresas`: o passo Empresa usa o `tenant:criar` por baixo; core e integracao entram sempre; não cria admin; `simular` grava numa transação desfeita;
   - auditoria de toda requisição do super-admin no `onResponse`, com o prefixo do IP;
   - campos do super-admin nos caminhos redigidos do pino.

   As chamadas ao banco usam os nomes de função do §6. **Até a 0035 do banco-dados chegar, só os testes com fonte falsa provam o fluxo.**
4. **Pedidos enviados**:
   - R-20261106-002304 ao modulo-core: rotas `plataforma/auth/*`, TOTP, token e `autenticarSuperAdmin`;
   - R-20261106-002308 ao banco-dados: migração **0035** (a 0034 ficou com a T-0085, R-20261106-003920);
   - R-20261106-002311 ao engenheiro-apps: páginas, 404 de `/config` fora do host `config.` e QR com `qrcode`;
   - R-20261106-002315 ao modulo-integracao: `superAdmin: 'aceita'` nas rotas da carga, dos lotes e dos conectores, e o `erros.csv`.

## Testes
- `packages/platform-sdk/src/api-conteudo.test.ts` (8) e `plataforma.test.ts` (7).
- `apps/api/test/conteudo-rota.test.ts` (6) e `super-admin.test.ts` (10).
- Regressão: `app.test`, `config.test` e `log-seguro.test`, 81/81 junto com os novos.
- Typecheck do SDK e da API limpo, eslint dos arquivos tocados limpo, `verificar engenheiro-software` sem violações.
- Suítes completas: SDK 39 arquivos, 536 testes verdes; API 18 arquivos, 206 testes verdes (10 arquivos de banco pulados sem Docker, ficam para o CI).

## Pendências e decisões para você
- Ordem: banco-dados (0035) e modulo-core em paralelo até 6h; engenheiro-apps contra os contratos; modulo-integracao com `superAdmin` nas rotas existentes. Às 6h, tudo junto na branch de verificação (CI). Às 9h, deploy.
- **Cabe até 12h:** login com 2º fator, Empresa, cartões das bases do Hub (modelos, conferir, erros, "Baixar erros") e a aba Integração.
- **Risco:** Equipe por CSV com convite (fatia E) e a página navegável da documentação. Plano B para a Equipe: o admin do cliente pelo `tenant:criar`.
- **Segredos novos, já ligados na produção:**
  - `MACUXI_JWT_SEGREDO_PLATAFORMA` e `MACUXI_CHAVE_TOTP` são gerados na VM pelo `scripts/deploy/producao/preparar-vm.sh` e nunca são regenerados;
  - `MACUXI_SUPERADMIN_CONVITE` vem do secret **opcional `PROD_SUPERADMIN_CONVITE`** do environment `PRODUCAO`, gravado no `segredos.env` pelo `producao-publicar.yml`. O Alexandre precisa criar esse secret (≥ 32 caracteres) antes do deploy;
  - `env.modelo` atualizado.

  Para o modulo-core: use exatamente esses nomes.
- Recomendação ao Alexandre, sem código: Cloudflare Access no host `config.` com o e-mail dele.
- Dependência `qrcode` no apps/web: atualizo o lockfile quando o engenheiro-apps mandar a versão.
