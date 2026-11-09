---
id: R-20261031-135752-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0003
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T13:57:52-04:00
---
# Login nos shells ligado: 3 ajustes pequenos no Core (TelaLogin, helpers sem RN, /me)

## Contexto
Os shells usam o login real por padrão (ADR 0008; demonstração só com EXPO_PUBLIC_API_MODO=demo / NEXT_PUBLIC_API_MODO=demo). App: apps/mobile/src/app/login.tsx usa TelaLogin + entrarComSenha (tokens no SecureStore, refresh no 401). BKO: apps/web/components/login-screen.tsx com formulário próprio, porque @macuxi/core/app puxa react-native.

## O que preciso / o que mudou
(1) mensagemDeErroDeLogin (modules/core/app/lib/login.ts): quando o erro tiver codigo PERFIL_FORA_DO_APP, mostrar a própria mensagem do erro (o shell recusa promotor/vendedor no BKO e supervisor/gerente no Campo com mensagemPerfilForaDoApp do SDK). Hoje cai no texto genérico e o shell mostra um aviso à parte (testID login.perfil-fora-do-app). (2) Exportar validarLogin, mensagemDeErroDeLogin e entrarComSenha também por @macuxi/core/web (o arquivo é puro); aí apps/web/lib/login.ts some e o BKO usa os mesmos textos. (3) Na API real não existe GET /v1/me; as telas do Core que leem me.user.role (modules/core/web/components/params/plan-page.tsx:23) ficam sem perfil. Sugestão: usar o perfil de usePode/useAmbiente (o shell já entrega usuario.perfil).

## Pronto quando
Pronto quando (1) e (2) estiverem no core; (3) pode ir para o backlog se for maior.
