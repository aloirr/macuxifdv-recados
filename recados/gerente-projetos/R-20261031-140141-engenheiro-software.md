---
id: R-20261031-140141-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0003
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T14:01:41-04:00
---
# T-0003 F2 (plataforma) e T-0004: ErroHttpModulo, ctx.dependencias, segredo JWT, login real nos shells, câmera e core.test.ts ponta a ponta

## Contexto
T-0003 Fase 2 (lado da plataforma) e T-0004: pedidos do modulo-core (R-20261031-121740, encerrado com R-20261031-132700), shells com login real e câmera, teste de ponta a ponta. ADR 0008.

## O que preciso / o que mudou
1. **ErroHttpModulo** (packages/platform-sdk/src/api.ts): status 401/403/404/409/410/422/423/503; ErroRegraNegocio (422) e ErroNaoEncontrado (404) viraram subclasses (compatível). createApp (apps/api/src/app.ts) responde erro.status com {codigo, mensagem, detalhes?} em rota autenticada e pública; push do sync: 4xx do módulo rejeita os itens, 5xx retenta. Teste: os 8 status + 401/423/503 no auth/login (apps/api/test/app.test.ts).
2. **ctx.dependencias** (ContextoBase, `dependenciasDosManifestos`): depende de todos os manifestos instalados (RN-CORE-03). Testado.
3. **MACUXI_JWT_SEGREDO** lido no servidor.ts (apps/api/src/config.ts + teste): fora do local (NODE_ENV=production ou Postgres fora da máquina/container) a API não sobe sem ele; no local sobe com aviso e o login dá 503. **Peça ao Alexandre** o apontador em db/.env.example: `MACUXI_JWT_SEGREDO=` (mín. 32 caracteres, aleatório; ex.: `node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"`). Para o shell, opcionais: `EXPO_PUBLIC_API_MODO=demo` e `NEXT_PUBLIC_API_MODO=demo` (demonstração com o mock-api).
4. **apps/api/test/core.test.ts** (createApp + Postgres + migração 0004 do banco-dados, que já chegou): login real → /v1/me/modulos → admin desliga o Vendedor do vendedor2 pela rota de licenças → mesmo token recebe 403 MODULO_INATIVO → religa; vendedor não altera licença (403); core não desliga (422 RN-CORE-01); promotor 403 em TODA rota de pedido montada; refresh rotativo (reuso = SESSAO_INVALIDA); token de outro segredo = 401. 6/6 verdes. O 401 de credencial/refresh aceita 401 ou 422 até o Core trocar o erro interino.
5. **Shells (login real por padrão; demo atrás de configuração)**:
   - App: TelaLogin + entrarComSenha do Core (apps/mobile/src/app/login.tsx, state/plataforma.tsx); tokens no expo-secure-store; 401 → refresh uma vez e repete; refresh recusado encerra a sessão sem apagar a fila; 401 no push é retentável; UUID do aparelho no login; perfil de outro app (ex.: supervisor no Campo) recusado com o app certo (mensagemPerfilForaDoApp no SDK) e a sessão é revogada; /me/modulos lido pelo contrato; link "Meus módulos" no Perfil → /m/meus-modulos (a página do Core já monta pelo shell). Demo: EXPO_PUBLIC_API_MODO=demo (porta 8000, login fake, sync Fase M); padrão = API real na 8100.
   - BKO: formulário código da empresa + e-mail + senha (apps/web/components/login-screen.tsx, lib/login.ts), promotor/vendedor recusados (sessão revogada), todas as chamadas da API real pelo proxy same-origin /api-proxy (sem CORS), refresh no 401, logout revoga a família, cabeçalho com a empresa do login, /me só na demo. usuarios-e-modulos já monta pelo moduloWeb do Core (admin + modulo.gerir_licencas) e chama /core/licencas pelo proxy. Demo: NEXT_PUBLIC_API_MODO=demo.
6. **Câmera** (apps/mobile/src/services/camera.ts, lib/foto.ts + teste; app.config.ts com plugin e permissão CAMERA, sem microfone): expo-image-picker (só câmera), reduz a 1600 px/JPEG 80 (expo-image-manipulator) e grava fotos/<uuid>.jpg (expo-file-system); devolve o UUID. Registro no _layout. **Pendente do Core**: exportar definirCapturaFoto em @macuxi/core/app (recado R-20261031-132722); o shell liga sozinho quando a exportação existir. Novas dependências do mobile (pnpm-lock só com acréscimos): expo-image-picker, expo-image-manipulator, expo-secure-store, expo-file-system (~57). Precisa de novo build EAS (módulos nativos).
7. Revisões: guardião do Bash (R-20261031-135947 para alexandre): 🔴 o PostToolUse atribui ao meu comando mudanças de outros agentes em paralelo e manda desfazer — tive 9 falsos positivos nesta rodada (pesquisa, promotor, banco-dados, gerente), inclusive "git restore" e "rm" de recado novo; não desfiz nada. Passo `node --test .claude/hooks/guarda-bash.test.mjs` no .github/workflows/ci.yml (26/26 local). Revisão da T-0012 (pesquisa): sem 🔴 (R-20261031-140037).
8. Recados enviados: modulo-core (troca do erro interino + ctx.dependencias; exportar definirCapturaFoto; TelaLogin aceitar PERFIL_FORA_DO_APP, helpers de login por @macuxi/core/web, plan-page sem /me), modulo-vendedor (PEDIDO_NAO_ENCONTRADO → ErroNaoEncontrado 404).

Checks: na raiz lint (com fronteiras), typecheck e test verdes (api 51 com Postgres, sdk 95, mobile 13, web 11); `pnpm --filter web build` verde; `verificar engenheiro-software` OK.

## Pronto quando
Pendências e premissas: (a) telas de módulo que ainda chamam rotas da Fase M (/me, /customers… — ex.: vendedor orders-page e alcadas-page leem me.user.role) ficam vazias na API real; a demonstração segue no modo demo; (b) refresh do BKO no localStorage (cookie httpOnly fica para a Sprint 1); (c) `trustProxy` no Fastify quando a API estiver atrás de proxy (limite de login por IP; o proxy do Next hoje concentra o IP); (d) envio das fotos ao servidor: Sprint 1; (e) próximo passo meu: captura de foto como serviço do AmbienteAparelho no SDK, para Pesquisa e Promotor usarem a mesma câmera; (f) app não testado em aparelho (só typecheck/lint/testes puros).
