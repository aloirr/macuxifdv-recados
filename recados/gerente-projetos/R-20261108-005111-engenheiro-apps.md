---
id: R-20261108-005111-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0094
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T00:51:11-04:00
---
# T-0094 W (retomada) e T-0097 (a): permissões dos shells pelo motor do SDK e miniatura autenticada no app

## Contexto
T-0094 fatia W (retomada depois da 2ª queda) e T-0097 (a). Base: main e00a52df + árvore local; os arquivos do #100 (app.config, eas.json, profile.tsx, scripts/eas) e do #102 não foram tocados.

## O que fiz
**Já entregue antes da queda (sem refazer; diário de 07/11):** apps/web contra os contratos novos do Core; login do BKO com `app: 'web'`, "Crie sua senha" (RegrasDaSenha + repetição) e "Esqueci a senha" na moldura do login; 410/PERFIL_FORA_DO_APP; 403 PERFIL_SEM_BKO encerra a sessão; portal com SENHA_A_TROCAR, cartão Equipe sem convite (acessos_enviados, 503 EMAIL_INDISPONIVEL), /convite virou aviso de link antigo; app com `app` = variante, Crie sua senha/Esqueci (telas do Core) na rota /login, fila preservada no 401.

**Nesta retomada:**
1. Permissões só pelo motor do SDK: `apps/web/lib/acesso.ts` e `apps/mobile/src/lib/acesso.ts` (`podeEntrar` sobre os perfis resolvidos; sem eles, `resolverPerfil(perfilDeFabrica(base))`). Usam: login do BKO (recusa de reserva), app-shell (perfil fora do BKO e menu Plataforma/Auditoria sem lista fixa), lista da demonstração do BKO (supervisor fora; DICA dele removida), lista da demonstração do app ("· usa …" pelo motor; supervisor não diz mais "ou a web do BKO"), Início do app (`visao.pode('pedido.criar')` no lugar de `perfil !== 'promotor'`).
2. T-0097 (a): resolvedor da miniatura no shell: `ApiClient.bytes` (token da sessão, renova no 401, teto bytes_max por content-length e pelo recebido), `lib/miniatura-endereco.ts` (puro, só `/v1/arquivos/<uuid>`, cache por arquivo+versão, um download por arquivo, offline abre do cache), `services/miniaturas.ts` (cache `miniaturas/` do app), ligado em `state/plataforma.tsx`; o bloqueio do aparelho (RN-CORE-15) apaga a pasta junto com as fotos.
3. `apps/web/lib/portal-falso.ts`: `aceita_cancelamento` no conector do modo falso (contrato novo da T-0114 quebrava o tsc do web).
4. Recados encerrados de tarefas já feitas (T-0084, T-0088 x2, T-0090, revisão T-0093).

**Arquivos (apps/web):** components/app-shell.tsx, components/login-screen.tsx, lib/acesso.ts (novo), lib/acesso.test.ts (novo), lib/portal-falso.ts — mais os da fatia W já listados na entrega anterior (ciclo-senha.tsx/.ts, aviso-link-antigo.tsx, equipe-csv.ts, portal/*, portal-*.ts, providers.tsx, login.ts; removidos convite.ts, qr.ts, tela-convite.tsx, cadastro-totp.tsx, tela-primeiro-acesso.tsx, config/primeiro-acesso).
**Arquivos (apps/mobile):** src/app/login.tsx, src/app/(tabs)/index.tsx, src/state/plataforma.tsx, src/services/api.ts, src/services/arquivos.ts, src/services/miniaturas.ts (novo), src/lib/acesso.ts (+test, novos), src/lib/miniatura-endereco.ts (+test, novos), e os da fatia W (components/aviso-pos-login.tsx, lib/aviso-pos-login.ts, lib/ciclo-senha-shell.test.ts).

## Testes
- apps/web: eslint 0, typecheck 0, vitest 139 verdes (15 arquivos), next build 0.
- apps/mobile: typecheck 0 (só com o TS2304 alheio do treinamento no momento, já sumido na raiz), eslint 0, vitest 305 verdes (34 arquivos); bundles Android campo e gestao 0 (2094 módulos cada).
- `pnpm typecheck` da RAIZ (00h45): 17 de 19 tarefas verdes, web e mobile inclusive; falham só `api#typecheck` e `//#typecheck:tests` em apps/api/src/plataforma.ts (gerarSenhaTemporaria não exportado pelo @macuxi/core/api) e apps/api/test/fatia-s-t0094.test.ts: fatia S do engenheiro-software, em andamento.
- `verificar engenheiro-apps`: sem violação.

## Pendências
- modulo-catalogo (R-20261107-233350): exportar `definirResolvedorMiniatura` em `@macuxi/catalogo/app` e aceitar o `file://` do resolvedor; até lá a miniatura relativa fica vazia como antes (o shell liga sozinho quando o export chegar).
- engenheiro-software (R-20261107-233521): `PERFIS_DO_APP.web` ainda tem supervisor (contradiz o motor e a RN-CORE-33); `ContextoShell.perfis`; perfis resolvidos em `/v1/me/modulos`. Os shells já aceitam os perfis (`resolvidos`).
- modulo-core (R-20261107-201401): `emailInicial` no TelaLogin e o texto da senha vencida no app.
- Botão "Redefinir senha do admin" no cartão da empresa: o contrato está no SDK (`RedefinirSenhaAdminSchema`, `ListaAdminsDaEmpresaSchema`), a rota da API ainda não; faço quando o pedido do engenheiro-software chegar. Não há senha mostrada no portal (só e-mail); "Copiar senha" é da tela Usuários do modulo-core.
- Revisão de UX: R-20261107-201930 + complemento R-20261107-235050 (designer-ux).

## Premissas
- Sem perfis resolvidos da API, o shell usa o padrão de fábrica do perfil base pelo próprio motor (os limites travados valem igual); lista vazia de perfis cai na fábrica.
- Miniatura em cache fica em `Paths.cache` (o sistema pode limpar; volta a baixar quando aparecer) e não é apagada no logout, só no bloqueio (foto de produto, sem dado pessoal; nome pelo arquivo_id).
