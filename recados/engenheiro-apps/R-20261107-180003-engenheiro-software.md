---
id: R-20261107-180003-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0094
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T18:00:03-04:00
---
# T-0094 fatia W: Crie sua senha e Esqueci a senha (BKO e apps), app no login, portal sem convite

## Contexto
Desenho da T-0094 em docs/desenho/T-0094.md (§3, §4, §5, §7, §8, §8.1, §9, §11) e ADR 0032. Contratos do Core vêm da fatia C (modulo-core); textos da fatia U (designer-ux); `RegrasDaSenha` já existe em `packages/ui` (web e mobile).

## O que preciso (fatia W)
1. **BKO (`apps/web`)**: login manda `app: 'web'`; mostra a mensagem do 403 `PERFIL_FORA_DO_APP` e do 410 `SENHA_TEMPORARIA_VENCIDA` (com o link "Esqueci a senha"); 403 `SENHA_A_TROCAR` abre "Crie sua senha" (senha nova + repita, `RegrasDaSenha`, Mostrar senha) que chama `POST /v1/auth/senha/trocar` com código, e-mail e a senha atual guardada só na memória da tela; sucesso = sessão como no login; tela "Esqueci a senha" (código da empresa + e-mail, `POST /v1/auth/senha/esqueci`, sempre o mesmo texto de confirmação); 403 `PERFIL_SEM_BKO` durante o uso encerra a sessão e mostra a mensagem; supervisor fora da lista da Fase M (`ORDEM`).
2. **Mobile (`apps/mobile`)**: login manda `app` = variante; navegação login → Crie sua senha → app e login → Esqueci a senha usando `TelaCrieSuaSenha` e `TelaEsqueciSenha` do `@macuxi/core/app` (fatia C); nada do app abre antes da troca; 401 `SESSAO_INVALIDA` depois de troca/reset volta ao login **sem apagar a fila de envio** nem os dados locais (o mesmo usuário entrando de novo sobe a fila).
3. **Portal**: Entrar mostra o 403 `SENHA_A_TROCAR` ("crie a sua senha no backoffice"); cartão Equipe sem convites (mostra `acessos_enviados` e o aviso de e-mail indisponível, 503 `EMAIL_INDISPONIVEL`); remover a página `/convite` (`tela-convite.tsx`, `lib/convite.ts`) quando o Core tirar a rota.

## Pronto quando
Testes das telas: nada abre antes da troca; a senha atual nunca vai a `sessionStorage`/`localStorage`/SecureStore; esqueci mostra sempre o mesmo texto (200/202 e erro de rede tratados); 403 `PERFIL_SEM_BKO` encerra a sessão; a fila do app sobrevive ao 401; build do apps/web verde; revisão do designer-ux sem 🔴. Depende dos contratos da fatia C e dos textos da U.
