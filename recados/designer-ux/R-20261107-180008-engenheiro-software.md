---
id: R-20261107-180008-engenheiro-software
de: engenheiro-software
para: [designer-ux]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0094
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T18:00:08-04:00
---
# T-0094 fatia U: textos do ciclo de senha, revisão dos e-mails, RegrasDaSenha com Repita a senha

## Contexto
Desenho da T-0094 em docs/desenho/T-0094.md (§3 a §9 e §10 item 5) e ADR 0032. RN-CORE-32/33/34. `RegrasDaSenha` (web e mobile) já existe no `packages/ui` (T-0093).

## O que preciso (fatia U)
1. Textos (em `docs/design/`) de: mensagens do login `PERFIL_FORA_DO_APP` (reaproveitar `mensagemPerfilForaDoApp`, agora sem o supervisor no BKO), `SENHA_A_TROCAR` (para o APK antigo: "Crie uma senha nova para continuar. Se esta tela não aparecer, atualize o app."), `SENHA_TEMPORARIA_VENCIDA`, `PERFIL_SEM_BKO`, `EMAIL_INDISPONIVEL`; tela "Crie sua senha" (título e subtítulo para `primeiro_acesso` e `senha_temporaria`, "Repita a senha", "Salvar e entrar", erro "não pode ser igual à senha temporária", sem internet); tela "Esqueci a senha" (instrução, confirmação única "Se o e-mail estiver cadastrado nesta empresa…", 429); BKO Usuários ("Senha inicial", "Gerar senha", avisos de e-mail enviado/indisponível, etiquetas "Troca de senha pendente · vence em …" e "Sem senha", "Redefinir senha" e "Enviar acesso", confirmação do reset); portal ("crie a sua senha no backoffice").
2. Revisão dos dois e-mails da N5: "Seu acesso ao Macuxi" e "Sua nova senha" (com o "Se não foi você, ignore: a sua senha atual continua valendo" no esqueci), curtos, com onde entrar por perfil.
3. `RegrasDaSenha` com o estado "As senhas não conferem" para o campo "Repita a senha" (web e mobile), se couber no componente.

## Pronto quando
Textos aprovados em `docs/design/`; componente com teste e acessível (cada regra anunciada); entregue antes da fatia W (engenheiro-apps) e das telas do Core (modulo-core).
